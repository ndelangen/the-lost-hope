import { createHash, timingSafeEqual } from 'node:crypto'

import type { Config } from '@netlify/functions'

import { createGitHubIssue } from '../lib/github-issues'

export const config: Config = {
  path: '/api/corrections/submit',
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}

export type IssueInput = {
  owner: 'ndelangen'
  repo: 'the-lost-hope'
  title: string
  body: string
  labels: ['submitted-correction']
}

type HandlerContext = {
  requestId: string
}

type HandlerDependencies = {
  expectedAccessCodeHash: string
  createIssue: (issue: IssueInput) => Promise<void>
  log: (entry: Record<string, string | number>) => void
}

type CanonicalValue =
  | string
  | number
  | boolean
  | null
  | CanonicalValue[]
  | { [key: string]: CanonicalValue }

type EntrySnapshot = {
  snapshotVersion: 1
  entity: {
    kind: EntityKind
    slug: string
    name: string
    path: string
  }
  data: { [key: string]: CanonicalValue }
}

type CorrectionSubmission =
  | {
      accessCode: string
      context: {
        type: 'question'
        itemNumber: number
        itemMarkdown: string
      }
      text: string
    }
  | {
      accessCode: string
      context: {
        type: 'entry'
        snapshot: EntrySnapshot
      }
      text: string
    }

const ENTITY_KINDS = [
  'beast',
  'pc',
  'npc',
  'location',
  'event',
  'session',
  'quest',
  'organization',
  'item',
] as const

type EntityKind = (typeof ENTITY_KINDS)[number]

const COLLECTION_PATH: Record<EntityKind, string> = {
  beast: 'beasts',
  pc: 'pcs',
  npc: 'npcs',
  location: 'locations',
  event: 'events',
  session: 'sessions',
  quest: 'quests',
  organization: 'organizations',
  item: 'items',
}

const MAX_REQUEST_BYTES = 65_536
const MAX_SNAPSHOT_BYTES = 32_768
const MAX_SNAPSHOT_DEPTH = 16
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

class InvalidSnapshotError extends Error {}

function jsonResponse(body: object, status: number): Response {
  return Response.json(body, {
    status,
    headers: { 'cache-control': 'no-store' },
  })
}

function accessCodeMatches(accessCode: string, expectedHash: string): boolean {
  const actual = createHash('sha256').update(accessCode).digest()
  const expected = Buffer.from(expectedHash, 'hex')
  return expected.length === actual.length && timingSafeEqual(actual, expected)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasExactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  return Object.keys(value).toSorted().join(',') === expected.toSorted().join(',')
}

function quoteMarkdown(markdown: string): string {
  return markdown
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')
}

function escapeMentions(value: string): string {
  return value.replaceAll('@', '@\u200b')
}

function normalizeLineEndings(value: string): string {
  return value.replaceAll('\r\n', '\n').replaceAll('\r', '\n')
}

function characterCount(value: string): number {
  return Array.from(value).length
}

function hasUnexpectedControlCharacter(value: string): boolean {
  for (const character of value) {
    const codePoint = character.codePointAt(0)
    if (
      codePoint === undefined ||
      codePoint <= 8 ||
      (codePoint >= 11 && codePoint <= 12) ||
      (codePoint >= 14 && codePoint <= 31) ||
      (codePoint >= 127 && codePoint <= 159)
    ) {
      return true
    }
  }
  return false
}

function validBoundedString(value: unknown, minimum: number, maximum: number): value is string {
  return (
    typeof value === 'string' &&
    !hasUnexpectedControlCharacter(value) &&
    characterCount(value) >= minimum &&
    characterCount(value) <= maximum
  )
}

function canonicalizeReference(value: unknown): CanonicalValue {
  if (!isRecord(value)) throw new InvalidSnapshotError()
  const kind = value.kind
  const key = value.key
  if (
    typeof kind !== 'string' ||
    !ENTITY_KINDS.includes(kind as EntityKind) ||
    !validBoundedString(key, 1, 256) ||
    key.includes('\n') ||
    key.includes('\r')
  ) {
    throw new InvalidSnapshotError()
  }

  if (value.unresolved === true) {
    if (!hasExactKeys(value, ['kind', 'key', 'unresolved'])) throw new InvalidSnapshotError()
    return { kind, key, unresolved: true }
  }

  if (!hasExactKeys(value, ['kind', 'key', 'slug', 'name'])) throw new InvalidSnapshotError()
  if (
    !validBoundedString(value.slug, 1, 256) ||
    !SLUG_PATTERN.test(value.slug) ||
    !validBoundedString(value.name, 1, 512)
  ) {
    throw new InvalidSnapshotError()
  }
  return { kind, key, slug: value.slug, name: normalizeLineEndings(value.name) }
}

function canonicalizeValue(value: unknown, depth: number): CanonicalValue {
  if (depth > MAX_SNAPSHOT_DEPTH) throw new InvalidSnapshotError()
  if (value === null || typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const normalized = normalizeLineEndings(value)
    if (hasUnexpectedControlCharacter(normalized)) throw new InvalidSnapshotError()
    return normalized
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new InvalidSnapshotError()
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => canonicalizeValue(item, depth + 1))
  }
  if (!isRecord(value)) throw new InvalidSnapshotError()

  if ('$date' in value) {
    if (!hasExactKeys(value, ['$date']) || typeof value.$date !== 'string') {
      throw new InvalidSnapshotError()
    }
    const parsed = new Date(value.$date)
    if (Number.isNaN(parsed.valueOf()) || parsed.toISOString() !== value.$date) {
      throw new InvalidSnapshotError()
    }
    return { $date: value.$date }
  }

  if ('$ref' in value) {
    if (!hasExactKeys(value, ['$ref'])) throw new InvalidSnapshotError()
    return { $ref: canonicalizeReference(value.$ref) }
  }

  const canonical: { [key: string]: CanonicalValue } = {}
  for (const key of Object.keys(value).toSorted()) {
    if (
      !validBoundedString(key, 1, 256) ||
      key.includes('\n') ||
      key.includes('\r') ||
      key === '__proto__' ||
      key === 'constructor' ||
      key === 'prototype'
    ) {
      throw new InvalidSnapshotError()
    }
    canonical[key] = canonicalizeValue(value[key], depth + 1)
  }
  return canonical
}

function canonicalizeSnapshot(value: unknown): EntrySnapshot | undefined {
  try {
    if (
      !isRecord(value) ||
      !hasExactKeys(value, ['snapshotVersion', 'entity', 'data']) ||
      value.snapshotVersion !== 1 ||
      !isRecord(value.entity) ||
      !hasExactKeys(value.entity, ['kind', 'slug', 'name', 'path']) ||
      !isRecord(value.data)
    ) {
      return
    }

    const kind = value.entity.kind
    const slug = value.entity.slug
    const name = value.entity.name
    const path = value.entity.path
    if (
      typeof kind !== 'string' ||
      !ENTITY_KINDS.includes(kind as EntityKind) ||
      !validBoundedString(slug, 1, 256) ||
      !SLUG_PATTERN.test(slug) ||
      !validBoundedString(name, 1, 512) ||
      typeof path !== 'string' ||
      path !== `/${COLLECTION_PATH[kind as EntityKind]}/detail/${slug}`
    ) {
      return
    }

    const data = canonicalizeValue(value.data, 1)
    if (Array.isArray(data) || !isRecord(data)) return

    const snapshot: EntrySnapshot = {
      snapshotVersion: 1,
      entity: {
        kind: kind as EntityKind,
        slug,
        name: normalizeLineEndings(name),
        path,
      },
      data,
    }
    if (new TextEncoder().encode(JSON.stringify(snapshot)).byteLength > MAX_SNAPSHOT_BYTES) return
    return snapshot
  } catch (error) {
    if (error instanceof InvalidSnapshotError) return
    throw error
  }
}

function parseSubmission(value: unknown): CorrectionSubmission | undefined {
  if (!isRecord(value) || !hasExactKeys(value, ['accessCode', 'context', 'text'])) return
  if (
    typeof value.accessCode !== 'string' ||
    typeof value.text !== 'string' ||
    !isRecord(value.context)
  ) {
    return
  }

  const accessCode = normalizeLineEndings(value.accessCode)
  const text = normalizeLineEndings(value.text).trim()
  if (
    [accessCode, text].some(hasUnexpectedControlCharacter) ||
    characterCount(accessCode) === 0 ||
    characterCount(accessCode) > 256 ||
    characterCount(text) < 20 ||
    characterCount(text) > 16_384
  ) {
    return
  }

  if (
    value.context.type === 'question' &&
    hasExactKeys(value.context, ['type', 'itemNumber', 'itemMarkdown'])
  ) {
    const itemMarkdown =
      typeof value.context.itemMarkdown === 'string'
        ? normalizeLineEndings(value.context.itemMarkdown)
        : undefined
    if (
      !Number.isInteger(value.context.itemNumber) ||
      (value.context.itemNumber as number) < 1 ||
      (value.context.itemNumber as number) > 9_999 ||
      itemMarkdown === undefined ||
      itemMarkdown.trim().length === 0 ||
      characterCount(itemMarkdown) > 32_768 ||
      hasUnexpectedControlCharacter(itemMarkdown)
    ) {
      return
    }
    return {
      accessCode,
      context: {
        type: 'question',
        itemNumber: value.context.itemNumber as number,
        itemMarkdown,
      },
      text,
    }
  }

  if (value.context.type === 'entry' && hasExactKeys(value.context, ['type', 'snapshot'])) {
    const snapshot = canonicalizeSnapshot(value.context.snapshot)
    if (!snapshot) return
    return {
      accessCode,
      context: { type: 'entry', snapshot },
      text,
    }
  }
}

function safeJsonFence(json: string): string {
  const longestRun = Math.max(0, ...(json.match(/`+/g)?.map((run) => run.length) ?? []))
  return '`'.repeat(Math.max(3, longestRun + 1))
}

function issueForSubmission(submission: CorrectionSubmission): IssueInput {
  if (submission.context.type === 'question') {
    return {
      owner: 'ndelangen',
      repo: 'the-lost-hope',
      title: `Submitted correction for item-${submission.context.itemNumber}`,
      body: [
        quoteMarkdown(escapeMentions(submission.context.itemMarkdown)),
        '',
        '## Submitted answer',
        '',
        escapeMentions(submission.text),
      ].join('\n'),
      labels: ['submitted-correction'],
    }
  }

  const json = JSON.stringify(submission.context.snapshot, null, 2)
  const fence = safeJsonFence(json)
  return {
    owner: 'ndelangen',
    repo: 'the-lost-hope',
    title: `Submitted correction or addition for ${submission.context.snapshot.entity.kind}/${submission.context.snapshot.entity.slug}`,
    body: [
      '## Entry snapshot',
      '',
      '_Context captured from the page; current repository canon remains authoritative._',
      '',
      `${fence}json`,
      json,
      fence,
      '',
      '## Submitted correction or addition',
      '',
      escapeMentions(submission.text),
    ].join('\n'),
    labels: ['submitted-correction'],
  }
}

function logMetadata(submission: CorrectionSubmission): Record<string, string | number> {
  return submission.context.type === 'question'
    ? { contextType: 'question', itemNumber: submission.context.itemNumber }
    : { contextType: 'entry' }
}

export function createCorrectionSubmissionHandler({
  expectedAccessCodeHash,
  createIssue,
  log,
}: HandlerDependencies) {
  return async (request: Request, context: HandlerContext): Promise<Response> => {
    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, code: 'method_not_allowed' }, 405)
    }

    const origin = request.headers.get('origin')
    const fetchSite = request.headers.get('sec-fetch-site')
    if (
      (origin !== null && origin !== new URL(request.url).origin) ||
      (fetchSite !== null && fetchSite !== 'same-origin')
    ) {
      return jsonResponse({ ok: false, code: 'forbidden_origin' }, 403)
    }

    const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
    if (contentType !== 'application/json') {
      return jsonResponse({ ok: false, code: 'invalid_request' }, 400)
    }

    const declaredLength = Number(request.headers.get('content-length'))
    if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ ok: false, code: 'request_too_large' }, 413)
    }

    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ ok: false, code: 'request_too_large' }, 413)
    }

    let parsedBody: unknown
    try {
      parsedBody = JSON.parse(rawBody) as unknown
    } catch {
      return jsonResponse({ ok: false, code: 'invalid_request' }, 400)
    }

    const submission = parseSubmission(parsedBody)
    if (!submission) {
      return jsonResponse({ ok: false, code: 'invalid_request' }, 400)
    }

    const metadata = logMetadata(submission)
    if (!/^[\da-f]{64}$/i.test(expectedAccessCodeHash)) {
      log({ requestId: context.requestId, outcome: 'configuration_unavailable', ...metadata })
      return jsonResponse({ ok: false, code: 'submission_failed' }, 502)
    }

    if (!accessCodeMatches(submission.accessCode, expectedAccessCodeHash)) {
      log({ requestId: context.requestId, outcome: 'access_denied', ...metadata })
      return jsonResponse({ ok: false, code: 'access_denied' }, 401)
    }

    try {
      await createIssue(issueForSubmission(submission))
    } catch {
      log({ requestId: context.requestId, outcome: 'submission_failed', ...metadata })
      return jsonResponse({ ok: false, code: 'submission_failed' }, 502)
    }

    log({ requestId: context.requestId, outcome: 'created', ...metadata })
    return jsonResponse({ ok: true }, 201)
  }
}

const submitCorrection = createCorrectionSubmissionHandler({
  expectedAccessCodeHash: process.env.CORRECTIONS_ACCESS_CODE_SHA256 ?? '',
  createIssue: createGitHubIssue,
  log: (entry) => console.info(JSON.stringify(entry)),
})

export default submitCorrection

import { createHash, timingSafeEqual } from 'node:crypto'

import type { Config } from '@netlify/functions'

import { createGitHubIssue } from '../lib/github-issues'

export const config: Config = {
  path: '/api/questions/submit',
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

type CorrectionSubmission = {
  accessCode: string
  itemNumber: number
  itemMarkdown: string
  answer: string
}

const MAX_REQUEST_BYTES = 65_536
const SUBMISSION_KEYS = ['accessCode', 'answer', 'itemMarkdown', 'itemNumber']

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

function quoteMarkdown(markdown: string): string {
  return markdown
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')
}

function escapeMentions(answer: string): string {
  return answer.replaceAll('@', '@\u200b')
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

function parseSubmission(value: unknown): CorrectionSubmission | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return
  if (Object.keys(value).toSorted().join(',') !== SUBMISSION_KEYS.join(',')) return

  const candidate = value as Record<string, unknown>
  if (
    typeof candidate.accessCode !== 'string' ||
    typeof candidate.itemNumber !== 'number' ||
    typeof candidate.itemMarkdown !== 'string' ||
    typeof candidate.answer !== 'string'
  ) {
    return
  }

  const accessCode = normalizeLineEndings(candidate.accessCode)
  const itemMarkdown = normalizeLineEndings(candidate.itemMarkdown)
  const answer = normalizeLineEndings(candidate.answer).trim()
  if (
    [accessCode, itemMarkdown, answer].some(hasUnexpectedControlCharacter) ||
    characterCount(accessCode) < 16 ||
    characterCount(accessCode) > 256 ||
    !Number.isInteger(candidate.itemNumber) ||
    candidate.itemNumber < 1 ||
    candidate.itemNumber > 9_999 ||
    itemMarkdown.trim().length === 0 ||
    characterCount(itemMarkdown) > 32_768 ||
    characterCount(answer) < 20 ||
    characterCount(answer) > 16_384
  ) {
    return
  }

  return {
    accessCode,
    itemNumber: candidate.itemNumber,
    itemMarkdown,
    answer,
  }
}

export function createQuestionSubmissionHandler({
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

    if (!/^[\da-f]{64}$/i.test(expectedAccessCodeHash)) {
      log({
        requestId: context.requestId,
        outcome: 'configuration_unavailable',
        itemNumber: submission.itemNumber,
      })
      return jsonResponse({ ok: false, code: 'submission_failed' }, 502)
    }

    if (!accessCodeMatches(submission.accessCode, expectedAccessCodeHash)) {
      log({
        requestId: context.requestId,
        outcome: 'access_denied',
        itemNumber: submission.itemNumber,
      })
      return jsonResponse({ ok: false, code: 'access_denied' }, 401)
    }

    try {
      await createIssue({
        owner: 'ndelangen',
        repo: 'the-lost-hope',
        title: `Submitted correction for item-${submission.itemNumber}`,
        body: [
          quoteMarkdown(escapeMentions(submission.itemMarkdown)),
          '',
          '## Submitted answer',
          '',
          escapeMentions(submission.answer.trim()),
        ].join('\n'),
        labels: ['submitted-correction'],
      })
    } catch {
      log({
        requestId: context.requestId,
        outcome: 'submission_failed',
        itemNumber: submission.itemNumber,
      })
      return jsonResponse({ ok: false, code: 'submission_failed' }, 502)
    }

    log({ requestId: context.requestId, outcome: 'created', itemNumber: submission.itemNumber })
    return jsonResponse({ ok: true }, 201)
  }
}

const submitQuestion = createQuestionSubmissionHandler({
  expectedAccessCodeHash: process.env.QUESTIONS_ACCESS_CODE_SHA256 ?? '',
  createIssue: createGitHubIssue,
  log: (entry) => console.info(JSON.stringify(entry)),
})

export default submitQuestion

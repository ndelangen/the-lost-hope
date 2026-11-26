/**
 * Dev-only write-back: `POST /__dev/records` edits one campaign record in its data file. The page
 * sends field edits (see `./record-source.ts`); the server checks each against the file text,
 * validates the edited record with its schema and checks its references, then splices only the
 * changed fields into the file. Vite's hot update brings the change back to the page.
 *
 * The plugin applies only to `vite dev`, so nothing here reaches the static deployment.
 */
import { spawn } from 'node:child_process'
import { readFile, rename, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'

import type { Plugin, ViteDevServer } from 'vite'

import {
  applyRecordEdits,
  Conflict,
  definitionModule,
  NotEditable,
  readRecord,
  type RecordEdit,
} from './record-source.ts'

const ROOT = process.cwd()

/** The campaign kinds the page may edit, by their data folder. */
const EDITABLE_KINDS: Readonly<Record<string, string>> = {
  beast: 'beasts',
  pc: 'pcs',
  npc: 'npcs',
  location: 'locations',
  event: 'events',
  session: 'sessions',
  quest: 'quests',
  organization: 'organizations',
  item: 'items',
  effect: 'effects',
  card: 'cards',
}

const ENDPOINT = '/__dev/records'

/** Only the app's own pages, served from this machine, may write campaign data. */
function allowed(request: IncomingMessage): boolean {
  if (request.headers['sec-fetch-site'] !== 'same-origin') return false
  const host = request.headers.host?.replace(/:\d+$/u, '')
  if (host !== 'localhost' && host !== '127.0.0.1' && host !== '[::1]') return false
  return request.headers['content-type']?.startsWith('application/json') ?? false
}

async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of request) chunks.push(chunk as Buffer)
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

function send(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json')
  response.end(JSON.stringify(body))
}

/** One save at a time, across the plugin instances a dev server restart creates. */
const lock = globalThis as { theLostHopeDevRecordsLock?: Promise<unknown> }
function exclusive<T>(task: () => Promise<T>): Promise<T> {
  const next = (lock.theLostHopeDevRecordsLock ?? Promise.resolve()).then(task, task)
  lock.theLostHopeDevRecordsLock = next.catch(() => undefined)
  return next
}

/** The data file of a registered record, from its kind's `_index.ts`, never from the request. */
async function recordFile(kind: string, key: string): Promise<string | undefined> {
  const folder = EDITABLE_KINDS[kind]
  if (!folder || !/^[a-z][a-z0-9_]*$/u.test(key)) return undefined
  const index = await readFile(path.join(ROOT, 'src/data', folder, '_index.ts'), 'utf8')
  const file = new RegExp(`^import ${key} from '\\./([a-z0-9-]+)\\.ts'$`, 'mu').exec(index)?.[1]
  return file ? path.join(ROOT, 'src/data', folder, `${file}.ts`) : undefined
}

function refsIn(value: unknown, found: { ref: string; key: string }[] = []) {
  if (Array.isArray(value)) for (const item of value) refsIn(item, found)
  else if (value && typeof value === 'object') {
    const { ref, key } = value as { ref?: unknown; key?: unknown }
    if (typeof ref === 'string' && typeof key === 'string' && Object.keys(value).length === 2)
      found.push({ ref, key })
    else for (const item of Object.values(value)) refsIn(item, found)
  }
  return found
}

/** References the record names that do not exist. Kinds this cannot look up are left to the schema. */
async function missingRefs(server: ViteDevServer, record: unknown) {
  const { SOURCE_REGISTRIES } = (await server.ssrLoadModule('/src/lib/campaign-registries.ts')) as {
    SOURCE_REGISTRIES: Record<string, Record<string, unknown>>
  }
  const { magicItemBooks } = (await server.ssrLoadModule(
    '/src/data/generated/magic-item-names.ts',
  )) as { magicItemBooks: Record<string, string> }
  const lookup: Record<string, Record<string, unknown>> = {
    ...SOURCE_REGISTRIES,
    magicItem: magicItemBooks,
  }
  return refsIn(record).filter(
    ({ ref, key }) => lookup[ref] !== undefined && !Object.hasOwn(lookup[ref], key),
  )
}

function oxfmt(file: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn('bunx', ['oxfmt', file], { cwd: ROOT, stdio: 'ignore' })
    child.on('error', reject)
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error('oxfmt failed'))))
  })
}

type EditRequest = { kind?: unknown; key?: unknown; edits?: unknown }

const isEdit = (edit: unknown): edit is RecordEdit => {
  if (!edit || typeof edit !== 'object') return false
  const { op, path: editPath } = edit as { op?: unknown; path?: unknown }
  return (
    (op === 'set' || op === 'remove') &&
    Array.isArray(editPath) &&
    editPath.every((segment) => typeof segment === 'string' || Number.isInteger(segment))
  )
}

export function devRecordsPlugin(): Plugin {
  return {
    name: 'dev-records',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (new URL(request.url ?? '/', 'http://localhost').pathname !== ENDPOINT) return next()
        void handle(server, request, response)
      })
    },
  }
}

async function handle(server: ViteDevServer, request: IncomingMessage, response: ServerResponse) {
  if (request.method !== 'POST') return send(response, 405, { error: 'POST edits here' })
  if (!allowed(request)) return send(response, 403, { error: 'Not allowed from this page' })
  try {
    const { kind, key, edits } = (await readJson(request)) as EditRequest
    if (typeof kind !== 'string' || typeof key !== 'string')
      return send(response, 422, { error: 'Say which record to edit' })
    if (!Array.isArray(edits) || edits.length === 0 || !edits.every(isEdit))
      return send(response, 422, { error: 'Send one or more set or remove edits' })
    const file = await recordFile(kind, key)
    if (!file) return send(response, 404, { error: `No editable ${kind} called ${key}` })

    const result = await exclusive(async () => {
      // The file text is the truth: the server's loaded copy lags a moment behind a write.
      const source = await readFile(file, 'utf8')
      const next = applyRecordEdits(source, edits)
      const record = readRecord(next)
      const { create } = (await server.ssrLoadModule(
        definitionModule(next).replace('#/', '/src/'),
      )) as {
        create?: (input: unknown) => unknown
      }
      if (!create) throw new NotEditable('The record’s definition has no create helper')
      try {
        create(record)
      } catch (error) {
        const issues = (error as { issues?: { path: PropertyKey[]; message: string }[] }).issues
        const message = issues
          ? issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
          : (error as Error).message
        return { status: 422, body: { error: message } }
      }
      const missing = await missingRefs(server, record)
      if (missing.length > 0) {
        return {
          status: 422,
          body: {
            error: `Unknown references: ${missing.map((r) => `${r.ref} ${r.key}`).join(', ')}`,
          },
        }
      }
      const temporary = file.replace(/\.ts$/u, `.${process.pid}.tmp.ts`)
      await writeFile(temporary, next)
      await oxfmt(temporary)
      await rename(temporary, file)
      return { status: 200, body: { record: readRecord(await readFile(file, 'utf8')) } }
    })
    return send(response, result.status, result.body)
  } catch (error) {
    if (error instanceof Conflict) return send(response, 409, { error: error.message })
    if (error instanceof NotEditable) return send(response, 422, { error: error.message })
    return send(response, 500, { error: (error as Error).message })
  }
}

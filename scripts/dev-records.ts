/**
 * Dev-only write-back: `POST /__dev/records` edits one campaign record in its data file. The page
 * sends field edits (see `./record-source.ts`); the server checks each against the file text,
 * validates the edited record with its schema and checks its references, then splices only the
 * changed fields into the file. Vite's hot update brings the change back to the page. It also
 * makes up library items from the DM's words (`make`): an agent drafts, this server writes.
 *
 * The plugin applies only to `vite dev`, so nothing here reaches the static deployment.
 */
import { spawn } from 'node:child_process'
import { readFile, rename, rm, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'

import type { Plugin, ViteDevServer } from 'vite'

import { generateRefs } from './generate-refs.ts'
import { draftLibraryItem, type ItemDraft, type LibraryItemKind } from './library-item-agent.ts'
import {
  addLibraryEntry,
  addToIndex,
  applyRecordEdits,
  Conflict,
  definitionModule,
  libraryKey,
  NotEditable,
  readRecord,
  recordIdentity,
  recordModule,
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
  const { equipmentBooks } = (await server.ssrLoadModule(
    '/src/data/generated/equipment-names.ts',
  )) as { equipmentBooks: Record<string, string> }
  const lookup: Record<string, Record<string, unknown>> = {
    ...SOURCE_REGISTRIES,
    magicItem: magicItemBooks,
    equipment: equipmentBooks,
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

type EditRequest = {
  kind?: unknown
  key?: unknown
  edits?: unknown
  create?: unknown
  make?: unknown
}

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
    const { kind, key, edits, create: input, make } = (await readJson(request)) as EditRequest
    if (make !== undefined) {
      const result = await makeLibraryItem(server, make)
      return send(response, result.status, result.body)
    }
    if (typeof kind === 'string' && input !== undefined) {
      const result = await createRecord(server, kind, input)
      return send(response, result.status, result.body)
    }
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

type Outcome = { status: number; body: unknown }

/** Every name already taken: record keys and slugs of every kind, since slugs are shared. */
async function takenIdentities(server: ViteDevServer) {
  const { SOURCE_REGISTRIES } = (await server.ssrLoadModule('/src/lib/campaign-registries.ts')) as {
    SOURCE_REGISTRIES: Record<string, Record<string, { slug?: string }>>
  }
  const dm = (await server.ssrLoadModule('/src/lib/dm-campaign.ts')) as Record<
    string,
    Record<string, { slug?: string }>
  >
  const registries = [...Object.values(SOURCE_REGISTRIES), dm.arcs, dm.scenes, dm.creatures]
  return {
    keys: new Set(registries.flatMap((registry) => Object.keys(registry ?? {}))),
    slugs: new Set(
      registries.flatMap((registry) =>
        Object.values(registry ?? {}).flatMap((record) => (record.slug ? [record.slug] : [])),
      ),
    ),
  }
}

/**
 * Creates a campaign record: validates it, writes its file, registers it and regenerates the refs.
 * The refs change reaches almost every module, so the page reloads after a create.
 */
async function createRecord(server: ViteDevServer, kind: string, input: unknown): Promise<Outcome> {
  const folder = EDITABLE_KINDS[kind]
  if (!folder) return { status: 404, body: { error: `Cannot create a ${kind} here` } }
  if (!input || typeof input !== 'object' || Array.isArray(input))
    return { status: 422, body: { error: 'Send the new record' } }
  const record = input as Record<string, unknown>
  const { create } = (await server.ssrLoadModule(`/src/definitions/${kind}.ts`)) as {
    create?: (input: unknown) => { slug: string }
  }
  if (!create) return { status: 404, body: { error: `No definition for ${kind}` } }
  let slug: string
  try {
    slug = create(record).slug
  } catch (error) {
    const issues = (error as { issues?: { path: PropertyKey[]; message: string }[] }).issues
    return {
      status: 422,
      body: {
        error: issues
          ? issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
          : (error as Error).message,
      },
    }
  }
  const identity = recordIdentity(slug)
  const missing = await missingRefs(server, record)
  if (missing.length > 0) {
    return {
      status: 422,
      body: { error: `Unknown references: ${missing.map((r) => `${r.ref} ${r.key}`).join(', ')}` },
    }
  }

  return exclusive(async () => {
    const taken = await takenIdentities(server)
    if (taken.keys.has(identity.key) || taken.slugs.has(identity.slug))
      return { status: 409, body: { error: `Something called ${identity.slug} already exists` } }
    const file = path.join(ROOT, 'src/data', folder, `${identity.slug}.ts`)
    const indexPath = path.join(ROOT, 'src/data', folder, '_index.ts')
    const index = await readFile(indexPath, 'utf8')
    await writeFile(file, recordModule(kind, record), { flag: 'wx' })
    try {
      await writeFile(indexPath, addToIndex(index, identity))
      await oxfmt(file)
      await oxfmt(indexPath)
      await generateRefs()
    } catch (error) {
      await writeFile(indexPath, index)
      await rm(file, { force: true })
      await generateRefs()
      throw error
    }
    return { status: 201, body: identity }
  })
}

/** The library kinds an agent may add to, and the campaign's own book of each. */
const HOMEBREW = {
  equipment: {
    file: 'src/data/library/equipment/the-lost-hope.ts',
    helper: 'createEquipment',
    names: { module: '/src/data/generated/equipment-names.ts', exported: 'equipmentNames' },
  },
  magicItem: {
    file: 'src/data/library/magic-items/the-lost-hope.ts',
    helper: 'createMagicItems',
    names: { module: '/src/data/generated/magic-item-names.ts', exported: 'magicItemNames' },
  },
} as const

const issueMessage = (error: unknown) => {
  const issues = (error as { issues?: { path: PropertyKey[]; message: string }[] }).issues
  return issues
    ? issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
    : (error as Error).message
}

type Checked =
  | { problem: string }
  | { problem?: undefined; key: string; entry: Record<string, unknown> }

/**
 * Checks a library entry for the campaign's own publication (`the_lost_hope`): its schema, its
 * references, and that no book in the library already has its name.
 */
async function checkLibraryEntry(
  server: ViteDevServer,
  { kind, entry: input }: ItemDraft,
): Promise<Checked> {
  const target = HOMEBREW[kind]
  if (!target) return { problem: `The library takes no ${String(kind)} from here` }
  const entry: Record<string, unknown> = {
    ...input,
    publication: { ref: 'publication', key: 'the_lost_hope' },
  }
  const definitions = (await server.ssrLoadModule('/src/definitions/library.ts')) as Record<
    string,
    (input: unknown) => unknown
  >
  let key: string
  try {
    key = libraryKey(String(entry.name ?? ''))
    definitions[target.helper]!({ [key]: entry })
  } catch (error) {
    return { problem: issueMessage(error) }
  }
  const missing = await missingRefs(server, entry)
  if (missing.length > 0)
    return { problem: `Unknown references: ${missing.map((r) => `${r.ref} ${r.key}`).join(', ')}` }
  const names = (await server.ssrLoadModule(target.names.module)) as Record<
    string,
    Record<string, string>
  >
  const existing = names[target.names.exported]!
  const name = String(entry.name).trim().toLowerCase()
  const sameName = Object.values(existing).find((other) => other.toLowerCase() === name)
  if (Object.hasOwn(existing, key) || sameName)
    return { problem: `The library already has ${sameName ?? key}; give it another name` }
  return { key, entry }
}

/** Writes a checked entry into its book, in key order, and regenerates the library refs. */
async function writeLibraryEntry(
  kind: LibraryItemKind,
  key: string,
  entry: Record<string, unknown>,
) {
  const file = path.join(ROOT, HOMEBREW[kind].file)
  const source = await readFile(file, 'utf8')
  const next = addLibraryEntry(source, key, entry)
  const temporary = file.replace(/\.ts$/u, `.${process.pid}.tmp.ts`)
  await writeFile(temporary, next)
  await oxfmt(temporary)
  await rename(temporary, file)
  try {
    await generateRefs()
  } catch (error) {
    await writeFile(file, source)
    await generateRefs()
    throw error
  }
}

/** The shop a location keeps, for the agent's brief. */
async function shopContext(server: ViteDevServer, location: unknown) {
  if (typeof location !== 'string') return undefined
  const { SOURCE_REGISTRIES } = (await server.ssrLoadModule('/src/lib/campaign-registries.ts')) as {
    SOURCE_REGISTRIES: Record<string, Record<string, { name: string; shop?: { type: string } }>>
  }
  const { SHOP_TYPE_LABELS } = (await server.ssrLoadModule('/src/definitions/shop.ts')) as {
    SHOP_TYPE_LABELS: Record<string, string>
  }
  const record = SOURCE_REGISTRIES.location?.[location]
  if (!record) return undefined
  const type = record.shop?.type
  return {
    location: record.name,
    shopType: type ? (SHOP_TYPE_LABELS[type] ?? type).toLowerCase() : 'general',
  }
}

/**
 * Makes up a library item from the DM's words: an agent drafts it, the server checks it (the
 * agent gets one go at fixing what fails) and writes it into the campaign's own book.
 */
async function makeLibraryItem(server: ViteDevServer, input: unknown): Promise<Outcome> {
  const { request, location, shopType } = (input ?? {}) as {
    request?: unknown
    location?: unknown
    shopType?: unknown
  }
  if (typeof request !== 'string' || !request.trim())
    return { status: 422, body: { error: 'Describe the item first' } }
  const shop = await shopContext(server, location)
  const draft = await draftLibraryItem(
    request,
    shop,
    async (candidate) => (await checkLibraryEntry(server, candidate)).problem,
  )
  return exclusive(async () => {
    // Check again inside the lock: another save may have taken the name meanwhile.
    const checked = await checkLibraryEntry(server, draft)
    if (checked.problem !== undefined) return { status: 409, body: { error: checked.problem } }
    await writeLibraryEntry(draft.kind, checked.key, checked.entry)
    const item = { ref: draft.kind, key: checked.key }
    if (typeof location === 'string') await shelve(location, item, shopType)
    return { status: 201, body: { ...item, name: checked.entry.name } }
  })
}

/**
 * Puts a new library item on a location's shop in its data file, so it stays there without a
 * separate save. A place that is not a shop yet becomes one of `shopType`.
 */
async function shelve(
  location: string,
  item: { ref: LibraryItemKind; key: string },
  shopType: unknown,
) {
  const file = await recordFile('location', location)
  if (!file) throw new NotEditable(`No location called ${location}`)
  const source = await readFile(file, 'utf8')
  const shop = readRecord(source).shop as { stock: unknown[] } | undefined
  const line = item.ref === 'magicItem' ? { item, quantity: 1 } : { item }
  const edit: RecordEdit = shop
    ? { op: 'set', path: ['shop', 'stock', shop.stock.length], value: line }
    : { op: 'set', path: ['shop'], value: { type: shopType, stock: [line] } }
  const next = applyRecordEdits(source, [edit])
  const temporary = file.replace(/\.ts$/u, `.${process.pid}.tmp.ts`)
  await writeFile(temporary, next)
  await oxfmt(temporary)
  await rename(temporary, file)
}

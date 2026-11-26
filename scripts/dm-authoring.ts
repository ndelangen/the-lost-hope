/**
 * Dev-only DM authoring endpoints (issues #158 and #159). The Vite plugin below is applied only by
 * `vite dev`, so neither the endpoints nor the checkout-writing code reach the static deployment.
 *
 * - `GET  /__dm/npc/context`         creature stat blocks and locations for the draft form
 * - `POST /__dm/npc/draft`           runs a read-only `codex exec` and returns an NPC draft
 * - `POST /__dm/npc/save`            validates a draft, writes and registers the NPC
 * - `GET  /__dm/npc/saved?name=`     whether an NPC with that name is registered
 * - `GET  /__dm/npc/portrait?key=`   the background portrait job for a saved NPC
 * - `POST /__dm/npc/portrait`        starts or retries that job
 * - `POST /__dm/tokens`              adds or removes one of a PC's DM or curse tokens
 */
import { execFile, spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

import type { Plugin, ViteDevServer } from 'vite'

import type { Tokens } from '../src/definitions/tokens.ts'
import {
  NPC_DRAFT_JSON_SCHEMA,
  NpcDraft,
  addNpcToIndex,
  draftPrompt,
  draftReferences,
  identityProblem,
  npcIdentity,
  npcSourceFile,
} from '../src/lib/npc-authoring.ts'
import { adjustTokens, tokensSource, withCounts } from '../src/lib/pc-tokens.ts'
import { GENERATED_REFS_PATH, generateRefs } from './generate-refs.ts'

type PortraitJob = { description: string } & (
  | { state: 'running'; startedAt: number }
  | { state: 'done' }
  | { state: 'failed'; error: string }
)

const DRAFT_TIMEOUT_MS = 3 * 60_000
const PORTRAIT_TIMEOUT_MS = 10 * 60_000

type Registries = Record<string, Readonly<Record<string, { name: string; slug?: string }>>>

const ROOT = process.cwd()
/**
 * The Codex CLI: `CODEX_BIN` when set, else `codex` on the PATH, else the copy bundled with the
 * ChatGPT desktop app on macOS.
 */
const CODEX_BIN =
  process.env.CODEX_BIN ??
  [
    ...(process.env.PATH ?? '').split(path.delimiter).map((dir) => path.join(dir, 'codex')),
    '/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex',
    '/Applications/Codex.app/Contents/Resources/codex',
  ].find((candidate) => existsSync(candidate)) ??
  'codex'

/** Runs `codex exec` in the checkout and returns its final message. */
export async function runCodex({
  prompt,
  sandbox,
  schema,
  cwd = ROOT,
  timeoutMs,
}: {
  prompt: string
  sandbox: 'read-only' | 'workspace-write'
  schema?: object
  cwd?: string
  timeoutMs: number
}): Promise<string> {
  const scratch = await mkdtemp(path.join(tmpdir(), 'dm-codex-'))
  try {
    const out = path.join(scratch, 'last-message.txt')
    const args = ['exec', '--sandbox', sandbox, '--output-last-message', out]
    if (cwd !== ROOT) args.push('--skip-git-repo-check')
    if (schema) {
      const schemaFile = path.join(scratch, 'schema.json')
      await writeFile(schemaFile, JSON.stringify(schema))
      args.push('--output-schema', schemaFile)
    }
    args.push(prompt)
    await new Promise<void>((resolve, reject) => {
      const child = spawn(CODEX_BIN, args, { cwd, stdio: ['ignore', 'ignore', 'pipe'] })
      const timer = setTimeout(() => {
        child.kill('SIGTERM')
        reject(new Error(`Codex took longer than ${Math.round(timeoutMs / 60_000)} minutes`))
      }, timeoutMs)
      child.on('exit', () => clearTimeout(timer))
      let stderr = ''
      child.stderr.on('data', (chunk: Buffer) => {
        stderr = (stderr + chunk.toString()).slice(-4000)
      })
      child.on('error', (error) =>
        reject(new Error(`Could not start Codex (${CODEX_BIN}): ${error.message}`)),
      )
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(`Codex exited with ${code}: ${stderr.trim()}`)),
      )
    })
    return await readFile(out, 'utf8')
  } finally {
    await rm(scratch, { recursive: true, force: true })
  }
}

async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of request) chunks.push(chunk as Buffer)
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

/**
 * Only the app's own pages may call these endpoints: they write campaign data and run Codex, so a
 * page on another site must not be able to trigger them while the dev server is running.
 */
function sameOrigin(request: IncomingMessage): boolean {
  const site = request.headers['sec-fetch-site']
  if (site !== undefined && site !== 'same-origin') return false
  const origin = request.headers.origin
  if (origin !== undefined && new URL(origin).host !== request.headers.host) return false
  if (request.method === 'POST' && !request.headers['content-type']?.startsWith('application/json'))
    return false
  return true
}

/**
 * Serialises edits to shared files (the NPC registry, image sources) across concurrent saves and
 * portrait jobs, and across the plugin instances a Vite restart creates.
 */
/** How long the dev server must stay up after a restart before the editor opens a saved NPC. */
const SETTLE_MS = 3000

/** When the checkout last changed, across dev server restarts. */
const writes = globalThis as { theLostHopeDmLastWriteAt?: number }

const lock = globalThis as { theLostHopeDmAuthoringLock?: Promise<unknown> }
function exclusive<T>(task: () => Promise<T>): Promise<T> {
  const next = (lock.theLostHopeDmAuthoringLock ?? Promise.resolve()).then(task, task)
  lock.theLostHopeDmAuthoringLock = next.catch(() => undefined)
  return next
}

function send(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json')
  response.end(JSON.stringify(body))
}

/** Every campaign record by kind, including unmet records and shared creature stat blocks. */
async function registries(server: ViteDevServer): Promise<Registries> {
  const { SOURCE_REGISTRIES } = await server.ssrLoadModule('/src/lib/campaign-registries.ts')
  const { creatures } = await server.ssrLoadModule('/src/lib/dm-campaign.ts')
  return { ...(SOURCE_REGISTRIES as Registries), creature: creatures as Registries[string] }
}

async function creatureChoices(server: ViteDevServer) {
  const { creatures } = await server.ssrLoadModule('/src/lib/dm-campaign.ts')
  return Object.entries(creatures as Record<string, { name: string; stats: { cr: string } }>).map(
    ([key, creature]) => ({ key, name: creature.name, cr: creature.stats.cr }),
  )
}

/** Width and height from a PNG's IHDR chunk. */
function pngSize(bytes: Buffer): { width: number; height: number } | undefined {
  const signature = '89504e470d0a1a0a'
  if (bytes.subarray(0, 8).toString('hex') !== signature) return undefined
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
}

async function run(command: string, args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd: ROOT, stdio: 'ignore' })
    child.on('error', reject)
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} failed`)),
    )
  })
}

/** Registers a square portrait and points the NPC record at it. */
async function installPortrait(slug: string, png: string) {
  const bytes = await readFile(png)
  const size = pngSize(bytes)
  if (!size) throw new Error('Codex did not produce a PNG')
  if (size.width !== size.height)
    throw new Error(`Portrait is ${size.width}×${size.height}, not square`)

  const repositoryPath = `assets/images/content/npcs/${slug}.png`
  const logicalSource = `/assets/npcs/${slug}.png`
  await mkdir(path.join(ROOT, 'assets/images/content/npcs'), { recursive: true })
  await copyFile(png, path.join(ROOT, repositoryPath))

  const sourcesPath = path.join(ROOT, 'scripts/image-sources.ts')
  const sources = await readFile(sourcesPath, 'utf8')
  if (!sources.includes(`'${repositoryPath}'`)) {
    const marker = 'export const RESPONSIVE_IMAGE_SOURCES: readonly ResponsiveImageSource[] = [\n'
    if (!sources.includes(marker)) throw new Error('Could not find the image source list')
    const entry = `  {\n    id: '${slug}',\n    role: 'avatar',\n    logicalSource: '${logicalSource}',\n    repositoryPath: '${repositoryPath}',\n  },\n`
    await writeFile(sourcesPath, sources.replace(marker, marker + entry))
  }

  const recordPath = path.join(ROOT, 'src/data/npcs', `${slug}.ts`)
  const record = await readFile(recordPath, 'utf8')
  if (!/^ {2}avatar:/m.test(record)) {
    const withAvatar = record.replace(/(\n {2}name: .*\n)/, `$1  avatar: '${logicalSource}',\n`)
    if (withAvatar === record) throw new Error('Could not set the avatar on the NPC record')
    await writeFile(recordPath, withAvatar)
  }
  await run('bunx', ['oxfmt', sourcesPath, recordPath])
  // Upload first: a repainted portrait differs from the lock, and generation refuses that.
  await run('bun', ['scripts/media-sync.ts']).catch(() => {
    throw new Error(
      'The portrait is saved, but uploading it failed. Run `bun run media:sync` on the Mac to retry.',
    )
  })
  await run('bun', ['scripts/generate-responsive-images.ts'])
}

/**
 * Jobs live on `globalThis` so a running portrait survives a Vite server restart (editing the
 * config or a file it imports), which recreates this plugin.
 */
const portraits: Map<string, PortraitJob> = ((
  globalThis as { theLostHopeDmPortraitJobs?: Map<string, PortraitJob> }
).theLostHopeDmPortraitJobs ??= new Map())

/** True once the regenerated refs include the NPC, read from disk so it survives a restart. */
async function registered(key: string) {
  const generated = await readFile(GENERATED_REFS_PATH, 'utf8')
  return new RegExp(`ref\\(\\s*'npc',\\s*'${key}',?\\s*\\)`).test(generated)
}

type ArtStyleBrief = {
  guide: string[]
  references: { name: string; file: string; present: boolean }[]
}

/**
 * The portrait style from `src/data/dm/art-styles.ts`: its guide and reference portraits. Read
 * through the script on every job, so a change to the picks applies without restarting Vite.
 */
async function portraitStyle(): Promise<ArtStyleBrief> {
  const { stdout } = await promisify(execFile)(
    'bun',
    ['scripts/art-style.ts', 'portrait', '--json'],
    {
      cwd: ROOT,
    },
  )
  return JSON.parse(stdout) as ArtStyleBrief
}

const TOKENS_MODULE = '/src/data/dm/tokens.ts'
const TOKENS_PATH = path.resolve('src/data/dm/tokens.ts')

export function dmAuthoringPlugin(): Plugin {
  /**
   * Paints a portrait in the background. Codex works in a scratch folder holding only copies of
   * the reference avatars, so the write-enabled run cannot touch the checkout; the app installs
   * the result.
   */
  function startPortrait(npc: { key: string; slug: string; name: string }, description: string) {
    if (portraits.get(npc.key)?.state === 'running') return
    portraits.set(npc.key, { state: 'running', startedAt: Date.now(), description })
    paintPortrait(npc, description)
  }

  /** The painting itself, for a job already marked running. */
  function paintPortrait(npc: { key: string; slug: string; name: string }, description: string) {
    const { key, slug } = npc
    void (async () => {
      const scratch = await mkdtemp(path.join(tmpdir(), 'dm-portrait-'))
      try {
        const style = await portraitStyle()
        const references = style.references
          .filter(({ present }) => present)
          .map(({ file }, index) => ({ file, name: `reference-${index + 1}${path.extname(file)}` }))
        if (references.length === 0) throw new Error('The portrait style has no reference files')
        await Promise.all(
          references.map(({ file, name }) => copyFile(file, path.join(scratch, name))),
        )
        await runCodex({
          cwd: scratch,
          sandbox: 'workspace-write',
          timeoutMs: PORTRAIT_TIMEOUT_MS,
          prompt: [
            `Generate a square portrait for ${npc.name}, an NPC in a fantasy campaign, with your built-in image generation tool.`,
            `Look: ${description}`,
            `Match the painted style of the reference portraits in this folder (${references.map(({ name }) => name).join(', ')}). Copy their look, not their subjects.`,
            'House style:',
            ...style.guide.map((line) => `- ${line}`),
            'Save exactly one square PNG named portrait.png in this folder.',
          ].join('\n'),
        })
        const out = path.join(scratch, 'portrait.png')
        if (!existsSync(out)) throw new Error('Codex finished without saving the portrait')
        const kept = path.join(ROOT, 'output/imagegen/npcs', `${slug}.png`)
        await mkdir(path.dirname(kept), { recursive: true })
        await copyFile(out, kept)
        await exclusive(() => installPortrait(slug, kept))
        portraits.set(key, { state: 'done', description })
      } catch (error) {
        portraits.set(key, { state: 'failed', error: (error as Error).message, description })
      } finally {
        await rm(scratch, { recursive: true, force: true })
      }
    })()
  }

  /**
   * Until when the token record is being stepped. The dashboard already shows the saved count, so
   * the browser skips the page reload each step would cause; the server still reloads the record.
   */
  let tokenWritesUntil = 0
  let lastTokens: Tokens | undefined

  return {
    name: 'dm-authoring',
    apply: 'serve',
    hotUpdate({ file, modules }) {
      if (this.environment.name !== 'client' || file !== TOKENS_PATH) return
      if (tokenWritesUntil < Date.now()) return
      for (const module of modules) this.environment.moduleGraph.invalidateModule(module)
      return []
    },
    configureServer(server) {
      // Saving restarts the dev server a few times as files change. The editor only opens the new
      // NPC once this instance has run undisturbed for a moment, so the page does not load midway
      // through a restart and come up without its scripts.
      const startedAt = Date.now()
      server.middlewares.use((request, response, next) => {
        void handle(request, response, next)
      })
      async function handle(request: IncomingMessage, response: ServerResponse, next: () => void) {
        const url = new URL(request.url ?? '/', 'http://localhost')
        if (!url.pathname.startsWith('/__dm/npc/') && url.pathname !== '/__dm/tokens') return next()
        if (!sameOrigin(request))
          return send(response, 403, { error: 'Not allowed from this page' })
        try {
          if (url.pathname === '/__dm/npc/context' && request.method === 'GET') {
            const locations = (await registries(server)).location ?? {}
            return send(response, 200, {
              creatures: await creatureChoices(server),
              locations: Object.entries(locations)
                .map(([key, location]) => ({ key, name: location.name }))
                .toSorted((a, b) => a.name.localeCompare(b.name)),
            })
          }

          if (url.pathname === '/__dm/npc/draft' && request.method === 'POST') {
            const body = (await readJson(request)) as { request?: string; location?: string }
            if (!body.request?.trim())
              return send(response, 422, { error: 'Describe the NPC first' })
            const locations = (await registries(server)).location ?? {}
            const location =
              body.location && locations[body.location]
                ? { key: body.location, name: locations[body.location]!.name }
                : undefined
            const message = await runCodex({
              sandbox: 'read-only',
              timeoutMs: DRAFT_TIMEOUT_MS,
              schema: NPC_DRAFT_JSON_SCHEMA,
              prompt: draftPrompt({
                request: body.request,
                location,
                creatures: await creatureChoices(server),
              }),
            })
            const draft = NpcDraft.safeParse(JSON.parse(message))
            if (!draft.success)
              return send(response, 502, { error: 'Codex returned an invalid draft' })
            return send(response, 200, { draft: draft.data })
          }

          if (url.pathname === '/__dm/npc/save' && request.method === 'POST') {
            const parsed = NpcDraft.safeParse((await readJson(request)) as unknown)
            if (!parsed.success) {
              return send(response, 422, {
                error: parsed.error.issues
                  .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                  .join('; '),
              })
            }
            const draft = parsed.data
            const identity = npcIdentity(draft.name)
            const problem = identityProblem(identity)
            if (problem) return send(response, 422, { error: problem })
            const all = await registries(server)
            const missing = draftReferences(draft).filter(
              ({ ref, key }) => !Object.hasOwn(all[ref] ?? {}, key),
            )
            if (missing.length > 0) {
              return send(response, 422, {
                error: `Unknown references: ${missing.map(({ ref, key }) => `${ref} ${key}`).join(', ')}`,
              })
            }

            // Check the record against the real schema before touching the checkout.
            const { NPC } = await server.ssrLoadModule('/src/definitions/npc.ts')
            const record = NPC.safeParse({
              name: draft.name,
              location: draft.location ? { ref: 'location', key: draft.location } : undefined,
              species: draft.species ?? undefined,
              languages: draft.languages.length > 0 ? draft.languages : undefined,
              notes: draft.notes.length > 0 ? draft.notes : undefined,
              motivations: draft.motivations.length > 0 ? draft.motivations : undefined,
              background: draft.background.length > 0 ? draft.background : undefined,
              stats: { ref: 'creature', key: draft.creature },
            })
            if (!record.success) return send(response, 422, { error: record.error.message })

            const file = path.join(ROOT, 'src/data/npcs', `${identity.slug}.ts`)
            const indexPath = path.join(ROOT, 'src/data/npcs/_index.ts')
            const outcome = await exclusive(async () => {
              const index = await readFile(indexPath, 'utf8')
              if (existsSync(file) || index.includes(`import ${identity.key} from`)) return 'exists'
              // Mark the portrait as running before the NPC registers, so the page the editor
              // opens once it is registered never sees an idle job.
              portraits.set(identity.key, {
                state: 'running',
                startedAt: Date.now(),
                description: draft.portrait,
              })
              await writeFile(file, npcSourceFile(draft))
              try {
                await writeFile(indexPath, addNpcToIndex(index, identity))
                await run('bunx', ['oxfmt', file, indexPath])
                await generateRefs()
              } catch (error) {
                portraits.delete(identity.key)
                await writeFile(indexPath, index)
                await rm(file, { force: true })
                await generateRefs()
                throw error
              }
              return (await registered(identity.key)) ? 'saved' : 'unregistered'
            })
            writes.theLostHopeDmLastWriteAt = Date.now()
            if (outcome !== 'saved') portraits.delete(identity.key)
            if (outcome === 'exists') {
              return send(response, 409, { error: `An NPC called ${draft.name} already exists` })
            }
            if (outcome === 'unregistered') {
              return send(response, 500, { error: 'The NPC was written but did not register' })
            }
            paintPortrait({ ...identity, name: draft.name }, draft.portrait)
            return send(response, 200, identity)
          }

          if (url.pathname === '/__dm/npc/saved' && request.method === 'GET') {
            const { key, slug } = npcIdentity(url.searchParams.get('name') ?? '')
            const settled =
              Date.now() - Math.max(startedAt, writes.theLostHopeDmLastWriteAt ?? 0) > SETTLE_MS
            return send(response, 200, {
              slug: settled && key && (await registered(key)) ? slug : undefined,
            })
          }

          if (url.pathname === '/__dm/npc/portrait' && request.method === 'GET') {
            const key = url.searchParams.get('key') ?? ''
            return send(response, 200, portraits.get(key) ?? { state: 'idle', description: '' })
          }

          if (url.pathname === '/__dm/npc/portrait' && request.method === 'POST') {
            const body = (await readJson(request)) as { key?: string; description?: string }
            if (!body.key || !body.description?.trim()) {
              return send(response, 422, { error: 'Say how the portrait should look' })
            }
            const npc = ((await registries(server)).npc ?? {})[body.key]
            if (!npc?.slug) return send(response, 404, { error: `Unknown NPC ${body.key}` })
            startPortrait({ key: body.key, slug: npc.slug, name: npc.name }, body.description)
            return send(response, 202, portraits.get(body.key))
          }

          if (url.pathname === '/__dm/tokens' && request.method === 'POST') {
            const body = (await readJson(request)) as {
              key?: string
              kind?: string
              delta?: number
            }
            const kind = body.kind === 'dm' || body.kind === 'curse' ? body.kind : undefined
            if (!kind || (body.delta !== 1 && body.delta !== -1)) {
              return send(response, 422, { error: 'Add or remove one DM or curse token' })
            }
            const delta = body.delta
            const key = body.key ?? ''
            if (!Object.hasOwn((await registries(server)).pc ?? {}, key)) {
              return send(response, 404, { error: `Unknown PC ${key}` })
            }
            const counts = await exclusive(async () => {
              const { default: current } = (await server.ssrLoadModule(TOKENS_MODULE)) as {
                default: Tokens
              }
              // Steps arrive faster than the server reloads the record, so a quick follow-up step
              // builds on the previous write.
              const tokens = lastTokens && tokenWritesUntil > Date.now() ? lastTokens : current
              const held = tokens.holdings.find(({ pc }) => pc.key === key)
              const next = adjustTokens(held, kind, delta)
              lastTokens = withCounts(tokens, key, next)
              tokenWritesUntil = Date.now() + 5000
              await writeFile(TOKENS_PATH, tokensSource(lastTokens))
              return next
            })
            return send(response, 200, { counts })
          }

          return send(response, 404, { error: 'Unknown DM authoring endpoint' })
        } catch (error) {
          return send(response, 500, { error: (error as Error).message })
        }
      }
    },
  }
}

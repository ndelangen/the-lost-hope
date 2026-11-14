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
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { Plugin, ViteDevServer } from 'vite'

import {
  NPC_DRAFT_JSON_SCHEMA,
  NpcDraft,
  addNpcToIndex,
  draftPrompt,
  draftReferences,
  npcIdentity,
  npcSourceFile,
} from '../src/lib/npc-authoring.ts'
import { GENERATED_REFS_PATH, generateRefs } from './generate-refs.ts'

type PortraitJob =
  | { state: 'running'; startedAt: number }
  | { state: 'done' }
  | { state: 'failed'; error: string }

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
}: {
  prompt: string
  sandbox: 'read-only' | 'workspace-write'
  schema?: object
  cwd?: string
}): Promise<string> {
  const scratch = await mkdtemp(path.join(tmpdir(), 'dm-codex-'))
  try {
    const out = path.join(scratch, 'last-message.txt')
    const args = ['exec', '--sandbox', sandbox, '--output-last-message', out]
    if (schema) {
      const schemaFile = path.join(scratch, 'schema.json')
      await writeFile(schemaFile, JSON.stringify(schema))
      args.push('--output-schema', schemaFile)
    }
    args.push(prompt)
    await new Promise<void>((resolve, reject) => {
      const child = spawn(CODEX_BIN, args, { cwd, stdio: ['ignore', 'ignore', 'pipe'] })
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
  if (!record.includes('avatar:')) {
    await writeFile(
      recordPath,
      record.replace(/(\n {2}name: .*\n)/, `$1  avatar: '${logicalSource}',\n`),
    )
  }
  await run('bunx', ['oxfmt', sourcesPath, recordPath])
  await run('bun', ['scripts/generate-responsive-images.ts'])
}

/**
 * Writing campaign data restarts the Vite server (the config imports the registries), which
 * recreates this plugin. Jobs live on `globalThis` so a running portrait survives the restart.
 */
const portraits: Map<string, PortraitJob> = ((
  globalThis as { theLostHopeDmPortraitJobs?: Map<string, PortraitJob> }
).theLostHopeDmPortraitJobs ??= new Map())

/** True once the regenerated refs include the NPC, read from disk so it survives a restart. */
async function registered(key: string) {
  const generated = await readFile(GENERATED_REFS_PATH, 'utf8')
  return generated.includes(`ref('npc', '${key}')`)
}

export function dmAuthoringPlugin(): Plugin {
  function startPortrait(npc: { key: string; slug: string; name: string }, description: string) {
    const { key, slug } = npc
    if (portraits.get(key)?.state === 'running') return
    portraits.set(key, { state: 'running', startedAt: Date.now() })
    const out = path.join(ROOT, 'output/imagegen/npcs', `${slug}.png`)
    void (async () => {
      try {
        await mkdir(path.dirname(out), { recursive: true })
        await rm(out, { force: true })
        await runCodex({
          sandbox: 'workspace-write',
          prompt: [
            `Generate a square portrait for ${npc.name}, an NPC in The Lost Hope campaign, with your built-in image generation tool.`,
            `Look: ${description}`,
            'Match the painted style of the existing campaign avatars in assets/images/content/npcs/ (for example sarogarth.png and bob-the-merchant.png): head and shoulders, face clearly visible, works as a circular thumbnail.',
            `Save exactly one square PNG to ${path.relative(ROOT, out)}. Do not modify any other file.`,
          ].join('\n'),
        })
        if (!existsSync(out)) throw new Error('Codex finished without saving the portrait')
        await installPortrait(slug, out)
        portraits.set(key, { state: 'done' })
      } catch (error) {
        portraits.set(key, { state: 'failed', error: (error as Error).message })
      }
    })()
  }

  return {
    name: 'dm-authoring',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        void handle(request, response, next)
      })
      async function handle(request: IncomingMessage, response: ServerResponse, next: () => void) {
        const url = new URL(request.url ?? '/', 'http://localhost')
        if (!url.pathname.startsWith('/__dm/npc/')) return next()
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
            const all = await registries(server)
            const missing = draftReferences(draft).filter(
              ({ ref, key }) => !Object.hasOwn(all[ref] ?? {}, key),
            )
            if (missing.length > 0) {
              return send(response, 422, {
                error: `Unknown references: ${missing.map(({ ref, key }) => `${ref} ${key}`).join(', ')}`,
              })
            }
            const identity = npcIdentity(draft.name)
            const file = path.join(ROOT, 'src/data/npcs', `${identity.slug}.ts`)
            if (existsSync(file) || Object.hasOwn(all.npc ?? {}, identity.key)) {
              return send(response, 409, { error: `An NPC called ${draft.name} already exists` })
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

            const indexPath = path.join(ROOT, 'src/data/npcs/_index.ts')
            const index = await readFile(indexPath, 'utf8')
            await writeFile(file, npcSourceFile(draft))
            try {
              await writeFile(indexPath, addNpcToIndex(index, identity))
              await run('bunx', ['oxfmt', file, indexPath])
              await generateRefs()
            } catch (error) {
              await writeFile(indexPath, index)
              await rm(file, { force: true })
              throw error
            }
            if (!(await registered(identity.key))) {
              return send(response, 500, { error: 'The NPC was written but did not register' })
            }
            startPortrait({ ...identity, name: draft.name }, draft.portrait)
            return send(response, 200, identity)
          }

          if (url.pathname === '/__dm/npc/saved' && request.method === 'GET') {
            const { key } = npcIdentity(url.searchParams.get('name') ?? '')
            return send(response, 200, { key: key && (await registered(key)) ? key : undefined })
          }

          if (url.pathname === '/__dm/npc/portrait' && request.method === 'GET') {
            const key = url.searchParams.get('key') ?? ''
            return send(response, 200, portraits.get(key) ?? { state: 'idle' })
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

          return send(response, 404, { error: 'Unknown DM authoring endpoint' })
        } catch (error) {
          return send(response, 500, { error: (error as Error).message })
        }
      }
    },
  }
}

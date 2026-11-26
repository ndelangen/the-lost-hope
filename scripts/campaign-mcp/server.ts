/**
 * The campaign knowledge MCP server. Claude Code starts it from `.mcp.json` (`bun run mcp`).
 *
 * Tool calls are answered by workers: one loads the campaign data, the other the published
 * library. Before each call the server checks whether the files a worker reads changed, and if so
 * starts a fresh one, so answers always reflect the files on disk without restarting the session.
 * `get` and `check_idea` end with the library entries their records point at, which the campaign
 * worker names and the library worker writes.
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import type { ZodRawShape } from 'zod'

import {
  LIBRARY_TOOLS,
  TOOLS,
  type LibraryFollowUp,
  type LibraryRequest,
  type LibraryToolName,
  type ToolName,
} from './tools'

const ROOT = fileURLToPath(new URL('../..', import.meta.url))

function fingerprint(paths: readonly string[]): string {
  let latest = 0
  let count = 0
  const visit = (path: string) => {
    const stat = statSync(path, { throwIfNoEntry: false })
    if (!stat) return
    count++
    latest = Math.max(latest, stat.mtimeMs)
    if (stat.isDirectory()) for (const entry of readdirSync(path)) visit(join(path, entry))
  }
  for (const path of paths) visit(path)
  return `${count}:${latest}`
}

type Reply = { text?: string; error?: string; library?: LibraryFollowUp }

/** A worker script that is replaced whenever the files it reads change. */
function reloadingWorker(script: string, watched: readonly string[]) {
  let worker: Worker | undefined
  let loadedFingerprint = ''
  let nextId = 0
  const pending = new Map<number, (reply: Reply) => void>()

  function current(): Worker {
    const now = fingerprint(watched)
    if (worker && now === loadedFingerprint) return worker
    worker?.terminate()
    for (const resolve of pending.values()) resolve({ error: 'Data changed; ask again.' })
    pending.clear()
    loadedFingerprint = now
    worker = new Worker(new URL(script, import.meta.url).href)
    worker.addEventListener('message', (message: MessageEvent<{ id: number } & Reply>) => {
      const { id, ...reply } = message.data
      pending.get(id)?.(reply)
      pending.delete(id)
    })
    return worker
  }

  return (message: object): Promise<Reply> =>
    new Promise((resolve) => {
      const target = current()
      const id = nextId++
      pending.set(id, resolve)
      target.postMessage({ id, ...message })
    })
}

const campaign = reloadingWorker('./worker.ts', [join(ROOT, 'src'), join(ROOT, 'QUESTIONS.md')])
const library = reloadingWorker('./library-worker.ts', [join(ROOT, 'src')])

async function callCampaign(name: ToolName, args: unknown): Promise<Reply> {
  const reply = await campaign({ name, args })
  if (reply.error || !reply.library) return reply
  const extra = await library(reply.library satisfies LibraryRequest)
  if (extra.error) return { text: `${reply.text}\n\n(Library entries failed: ${extra.error})` }
  return { text: extra.text ? `${reply.text}\n\n${extra.text}` : reply.text }
}

const server = new McpServer(
  { name: 'campaign', version: '1.0.0' },
  {
    instructions:
      'Read-only knowledge of The Lost Hope campaign canon, derived live from the campaign data. Use it for any story, session, scene or arc work instead of reading data files: start with `overview`, read records with `get`, `motives` and `timeline`, and run `check_idea` on every suggestion before proposing it. Records are named `Name (refs.<kind>s.<key>)`; use those refs when writing campaign data. Only settled data is canon; brainstormed ideas are not. The published library (creatures, spells, magic items, equipment, species, NPCs, rules, encounter ideas) is rules reference, not canon: find entries with `library_search` and read them with `library_get`.',
  },
)

function register(
  name: string,
  tool: { title: string; description: string; input: ZodRawShape },
  call: (args: unknown) => Promise<Reply>,
) {
  server.registerTool(
    name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.input,
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async (args: unknown) => {
      const reply = await call(args)
      return reply.error
        ? { isError: true, content: [{ type: 'text' as const, text: reply.error }] }
        : { content: [{ type: 'text' as const, text: reply.text ?? '' }] }
    },
  )
}

for (const [name, tool] of Object.entries(TOOLS) as [ToolName, (typeof TOOLS)[ToolName]][])
  register(name, tool, (args) => callCampaign(name, args))

for (const [name, tool] of Object.entries(LIBRARY_TOOLS) as [
  LibraryToolName,
  (typeof LIBRARY_TOOLS)[LibraryToolName],
][])
  register(name, tool, (args) => library({ name, args }))

await server.connect(new StdioServerTransport())

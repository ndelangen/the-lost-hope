/**
 * The campaign knowledge MCP server. Claude Code starts it from `.mcp.json` (`bun run mcp`).
 *
 * Tool calls are answered by a worker that loads the campaign data. Before each call the server
 * checks whether anything under `src/` or `QUESTIONS.md` changed, and if so starts a fresh worker,
 * so answers always reflect the files on disk without restarting the session.
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { TOOLS, type ToolName } from './tools'

const ROOT = fileURLToPath(new URL('../..', import.meta.url))
const WATCHED = [join(ROOT, 'src'), join(ROOT, 'QUESTIONS.md')]

function fingerprint(): string {
  let latest = 0
  let count = 0
  const visit = (path: string) => {
    const stat = statSync(path, { throwIfNoEntry: false })
    if (!stat) return
    count++
    latest = Math.max(latest, stat.mtimeMs)
    if (stat.isDirectory()) for (const entry of readdirSync(path)) visit(join(path, entry))
  }
  for (const path of WATCHED) visit(path)
  return `${count}:${latest}`
}

let worker: Worker | undefined
let loadedFingerprint = ''
let nextId = 0
const pending = new Map<number, (reply: { text?: string; error?: string }) => void>()

function currentWorker(): Worker {
  const now = fingerprint()
  if (worker && now === loadedFingerprint) return worker
  worker?.terminate()
  for (const resolve of pending.values()) resolve({ error: 'Campaign data changed; ask again.' })
  pending.clear()
  loadedFingerprint = now
  worker = new Worker(new URL('./worker.ts', import.meta.url).href)
  worker.addEventListener(
    'message',
    (message: MessageEvent<{ id: number; text?: string; error?: string }>) => {
      pending.get(message.data.id)?.(message.data)
      pending.delete(message.data.id)
    },
  )
  return worker
}

function call(name: ToolName, args: unknown): Promise<{ text?: string; error?: string }> {
  return new Promise((resolve) => {
    const target = currentWorker()
    const id = nextId++
    pending.set(id, resolve)
    target.postMessage({ id, name, args })
  })
}

const server = new McpServer(
  { name: 'campaign', version: '1.0.0' },
  {
    instructions:
      'Read-only knowledge of The Lost Hope campaign canon, derived live from the campaign data. Use it for any story, session, scene or arc work instead of reading data files: start with `overview`, read records with `get`, `motives` and `timeline`, and run `check_idea` on every suggestion before proposing it. Records are named `Name (refs.<kind>s.<key>)`; use those refs when writing campaign data. Only settled data is canon; brainstormed ideas are not.',
  },
)

for (const [name, tool] of Object.entries(TOOLS) as [ToolName, (typeof TOOLS)[ToolName]][]) {
  server.registerTool(
    name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.input,
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async (args: unknown) => {
      const reply = await call(name, args)
      return reply.error
        ? { isError: true, content: [{ type: 'text' as const, text: reply.error }] }
        : { content: [{ type: 'text' as const, text: reply.text ?? '' }] }
    },
  )
}

await server.connect(new StdioServerTransport())

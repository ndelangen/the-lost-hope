# Local Codex handoff for the DM dev app

## What is available

| Interface | What it gives the local app | What the app still owns |
| --- | --- | --- |
| `codex exec` | A non-interactive process with an explicit working directory, preset sandbox and approval settings, and optional JSONL events. It reports file activity, completion, and failures. It can return a JSON Schema-constrained result. | Starting and tracking the process, translating events into useful UI status, and verifying files before reporting that an NPC is available. [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [Command reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli#cli-codex-exec) |
| Codex TypeScript SDK | A server-side Node library for starting, continuing, and resuming local Codex threads. Its documented runtime is Node.js 18 or later. | Test Bun compatibility if the dev process will run the library directly, or run it in a Node sidecar. Keep storage and validation in the app. [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk) |
| Codex app-server | A local JSON-RPC client can start a thread in a specific `cwd`, send a turn, consume streamed events, handle approval requests, interrupt turns, and check the final turn status. | A richer client and its lifecycle. Use a server-side stdio connection for this comparison. The documented WebSocket transport is experimental and rejects requests with an Origin header. [App-server](https://learn.chatgpt.com/docs/app-server) |
| Codex in the desktop app | The user can open a Local chat on a chosen project and work in that checkout. Worktree mode isolates changes in another checkout. | I found no documented integration for a web page to dispatch to the currently open desktop chat and subscribe to its completion. Use a supported local process interface for an automated round trip. [Codex environments](https://learn.chatgpt.com/docs/environments/modes) |

For a single create-and-reload action, compare `codex exec` first. An app-server client becomes relevant if the DM needs interactive approvals, conversation history, or follow-up turns in the DM UI.

## Checkout and permissions

- The local server knows the dev checkout that started it. Use that path as the job's working directory. A fresh run in the same checkout can inspect current working files, including uncommitted edits. An isolated worktree needs an explicit apply step before Vite in the active checkout can see its writes.
- A read-only run can propose a structured NPC for the app to validate and write. A workspace-write run can edit files directly, subject to the sandbox, and the app can validate the resulting changes. Pick between these when deciding the in-session review flow. Configure approval behavior explicitly. Give the browser an app-owned create action rather than a generic command runner.
- The CLI reuses its saved authentication by default. This machine's installed CLI advertised checkout selection, JSONL, schema output, and sandbox controls, and reported an existing ChatGPT login. No model call was made. The browser does not need Codex credentials. Local execution describes where files are accessed and edited. With OpenAI models, relevant prompts and file excerpts can reach the model service and the selected sign-in determines which data policies apply. `--ephemeral` avoids persisting the local session rollout. [Authentication](https://learn.chatgpt.com/docs/auth) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)

## What the repo already does

An NPC is a structured data file registered in its kind's `_index.ts`. The registry drives the generated typed reference. The current Vite plugin watches the kind list and registry files, regenerates references after a relevant edit, and requests a full browser reload if the generated file changes. This path covers the current campaign registries. A separate private source or registry would need its own integration. [Campaign data rules](https://github.com/ndelangen/the-lost-hope/blob/4ebf2cdfb3bfba892a8a3451ac1720f49ede7fee/src/data/AGENTS.md#L63-L72) · [Reference generator](https://github.com/ndelangen/the-lost-hope/blob/4ebf2cdfb3bfba892a8a3451ac1720f49ede7fee/scripts/generate-refs.ts#L24-L27) · [Vite plugin](https://github.com/ndelangen/the-lost-hope/blob/4ebf2cdfb3bfba892a8a3451ac1720f49ede7fee/vite.config.ts#L13-L28)

Turn completion only confirms the Codex job ended. The live workflow still has to check that the intended files were written, the schema and names are valid, the generated ref resolves, and the browser can display the result. Test one synthetic NPC in the chosen private storage once that workflow is agreed. Include an invalid or interrupted run so the app can show a recoverable state while preserving other edits.


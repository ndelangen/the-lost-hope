/// <reference lib="webworker" />
import {
  arc,
  checkIdea,
  getRecord,
  links,
  list,
  motives,
  openQuestions,
  overview,
  search,
  timeline,
} from '#/lib/campaign-knowledge'

import type { ToolName } from './tools'

type Args = Record<string, never>

/** Answers tool calls from a fresh load of the campaign data; the server replaces it on change. */
const HANDLERS: Record<ToolName, (args: Args) => string> = {
  overview: () => overview(),
  get: (a) => getRecord(a.record, a.includeDm),
  links: (a) => links(a.record, a.direction),
  search: (a) => search(a.query, { kinds: a.kinds, visibility: a.visibility }),
  list: (a) => list(a.kind, a.visibility),
  timeline: (a) => timeline({ ...a }),
  motives: (a) => motives(a.record),
  arc: (a) => arc(a.record),
  check_idea: (a) => checkIdea(a.idea, a.involves),
  open_questions: (a) => openQuestions(a.filter),
}

self.addEventListener(
  'message',
  (message: MessageEvent<{ id: number; name: ToolName; args: Args }>) => {
    const { id, name, args } = message.data
    try {
      postMessage({ id, text: HANDLERS[name](args) })
    } catch (error) {
      postMessage({
        id,
        error: error instanceof Error ? (error.stack ?? error.message) : String(error),
      })
    }
  },
)

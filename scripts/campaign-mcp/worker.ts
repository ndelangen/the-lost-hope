/// <reference lib="webworker" />
import {
  arc,
  checkIdea,
  getRecord,
  ideaLibraryContext,
  libraryPointersOf,
  links,
  list,
  met,
  motives,
  openQuestions,
  overview,
  search,
  timeline,
} from '#/lib/campaign-knowledge'

import type { LibraryFollowUp, ToolName } from './tools'

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
  met: (a) => met(a.record),
  arc: (a) => arc(a.record),
  check_idea: (a) => checkIdea(a.idea, a.involves),
  open_questions: (a) => openQuestions(a.filter),
}

/** The library entries `get` and `check_idea` add, which the library worker writes. */
const FOLLOW_UPS: Partial<Record<ToolName, (args: Args) => LibraryFollowUp | undefined>> = {
  get: (a) => {
    const pointers = libraryPointersOf(a.record)
    return pointers.length ? { name: 'sheets', args: { pointers } } : undefined
  },
  check_idea: (a) => ({
    name: 'check',
    args: { idea: a.idea, ...ideaLibraryContext(a.idea, a.involves) },
  }),
}

self.addEventListener(
  'message',
  (message: MessageEvent<{ id: number; name: ToolName; args: Args }>) => {
    const { id, name, args } = message.data
    try {
      postMessage({ id, text: HANDLERS[name](args), library: FOLLOW_UPS[name]?.(args) })
    } catch (error) {
      postMessage({
        id,
        error: error instanceof Error ? (error.stack ?? error.message) : String(error),
      })
    }
  },
)

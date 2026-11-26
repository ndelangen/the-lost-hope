/// <reference lib="webworker" />
import { libraryCheck, libraryGet, librarySearch, librarySheets } from '#/lib/library-knowledge'

import type { LibraryRequest } from './tools'

/** Answers library tool calls from a fresh load of the library; the server replaces it on change. */
function answer(request: LibraryRequest): string {
  switch (request.name) {
    case 'library_search': {
      const { query, ...options } = request.args
      return librarySearch(query, options)
    }
    case 'library_get':
      return libraryGet(request.args.entry, request.args.printing)
    case 'sheets':
      return librarySheets(request.args.pointers)
    case 'check':
      return libraryCheck(request.args.idea, request.args.pointers, request.args.queries)
  }
}

self.addEventListener('message', (message: MessageEvent<{ id: number } & LibraryRequest>) => {
  const { id, ...request } = message.data
  try {
    postMessage({ id, text: answer(request) })
  } catch (error) {
    postMessage({
      id,
      error: error instanceof Error ? (error.stack ?? error.message) : String(error),
    })
  }
})

/** One field edit for the dev server's record endpoint (see `scripts/dev-records.ts`). */
export type RecordEdit =
  | { op: 'set'; path: readonly (string | number)[]; value: unknown; expected?: unknown }
  | { op: 'remove'; path: readonly (string | number)[]; expected: unknown }

/** Whether this page can save to the checkout: only under `vite dev`. */
export const canSaveRecords = import.meta.env.DEV

/**
 * Saves edits to one campaign record through the dev server. Resolves once the file is written;
 * the page then picks the change up through Vite's hot update.
 */
export async function saveRecordEdits(
  kind: string,
  key: string,
  edits: readonly RecordEdit[],
): Promise<void> {
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kind, key, edits }),
  }).catch(() => undefined)
  if (response?.ok) return
  const body = (await response?.json().catch(() => undefined)) as { error?: string } | undefined
  throw new Error(body?.error ?? 'Not saved. Is the dev server running?')
}

/**
 * Holds Vite's full reload until released. Vite waits for every `vite:beforeFullReload` listener
 * before it reloads, so a listener that is still pending keeps the page as it is.
 */
function holdReload(): () => void {
  let release!: () => void
  const held = new Promise<void>((resolve) => {
    release = resolve
  })
  import.meta.hot?.on('vite:beforeFullReload', () => held)
  return release
}

/**
 * Creates a campaign record through the dev server; resolves with its slug and key. Writing the
 * record makes Vite reload the page before the answer arrives, which would drop it, so the reload
 * is held: after a create the caller navigates to the new record itself. A failed create lets the
 * reload through.
 */
export async function createRecord(
  kind: string,
  record: Record<string, unknown>,
): Promise<{ slug: string; key: string }> {
  const release = holdReload()
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kind, create: record }),
  }).catch(() => undefined)
  const body = (await response?.json().catch(() => undefined)) as
    | { slug?: string; key?: string; error?: string }
    | undefined
  if (response?.ok && body?.slug && body.key) return { slug: body.slug, key: body.key }
  release()
  throw new Error(body?.error ?? 'Not created. Is the dev server running?')
}

/**
 * Adds a made-up entry to the campaign's own library publication through the dev server, and
 * resolves with its key. The refs regenerate, which may want a full reload; that is held while the
 * request runs, so the page keeps the editor it was made from.
 */
export async function createLibraryEntry(
  library: 'equipment',
  entry: Record<string, unknown>,
): Promise<{ key: string }> {
  const release = holdReload()
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ library, create: entry }),
  }).catch(() => undefined)
  const body = (await response?.json().catch(() => undefined)) as
    | { key?: string; error?: string }
    | undefined
  release()
  if (response?.ok && body?.key) return { key: body.key }
  throw new Error(body?.error ?? 'Not created. Is the dev server running?')
}

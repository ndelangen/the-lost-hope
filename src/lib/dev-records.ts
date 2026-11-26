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

/** Creates a campaign record through the dev server; resolves with its slug and key. */
export async function createRecord(
  kind: string,
  record: Record<string, unknown>,
): Promise<{ slug: string; key: string }> {
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kind, create: record }),
  }).catch(() => undefined)
  const body = (await response?.json().catch(() => undefined)) as
    | { slug?: string; key?: string; error?: string }
    | undefined
  if (response?.ok && body?.slug && body.key) return { slug: body.slug, key: body.key }
  throw new Error(body?.error ?? 'Not created. Is the dev server running?')
}

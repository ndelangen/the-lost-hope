import { expectOwnChange } from '#/lib/dev-reload-guard'
import type { responsiveImageFor } from '#/lib/public-media'

/** A picture's responsive sizes, as the generated image modules hold them. */
export type ResponsiveImageSizes = NonNullable<ReturnType<typeof responsiveImageFor>>

/** One field edit for the dev server's record endpoint (see `scripts/dev-records.ts`). */
export type RecordEdit =
  | { op: 'set'; path: readonly (string | number)[]; value: unknown; expected?: unknown }
  | { op: 'remove'; path: readonly (string | number)[]; expected: unknown }

/** Whether this page can save to the checkout: only under `vite dev`. */
export const canSaveRecords = import.meta.env.DEV

/**
 * Saves edits to one campaign record through the dev server. Resolves once the file is written;
 * the page then picks the change up through Vite's hot update, which is let through even while
 * other code changes wait for the DM.
 */
export async function saveRecordEdits(
  kind: string,
  key: string,
  edits: readonly RecordEdit[],
): Promise<void> {
  expectOwnChange()
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kind, key, edits }),
  }).catch(() => undefined)
  if (response?.ok) return expectOwnChange()
  const body = (await response?.json().catch(() => undefined)) as { error?: string } | undefined
  throw new Error(body?.error ?? 'Not saved. Is the dev server running?')
}

/**
 * Creates a campaign record through the dev server; resolves with its slug and key. The new
 * record reaches the page as a code change, which is let through; the caller then navigates to it.
 */
export async function createRecord(
  kind: string,
  record: Record<string, unknown>,
): Promise<{ slug: string; key: string }> {
  expectOwnChange()
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kind, create: record }),
  }).catch(() => undefined)
  const body = (await response?.json().catch(() => undefined)) as
    | { slug?: string; key?: string; error?: string }
    | undefined
  if (response?.ok && body?.slug && body.key) {
    expectOwnChange()
    return { slug: body.slug, key: body.key }
  }
  throw new Error(body?.error ?? 'Not created. Is the dev server running?')
}

/**
 * Makes up a library item from the DM's own words: an agent on the dev server drafts it, and the
 * server writes it into the campaign's own book and onto the location's shop in its data file.
 * Resolves with its library ref. The written files reach the page as code changes, let through
 * once the request is answered, so the page keeps the shop it was asked from meanwhile.
 */
export async function makeLibraryItem(
  request: string,
  location: string,
  shopType: string,
): Promise<{ ref: 'equipment' | 'magicItem'; key: string; name: string }> {
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ make: { request, location, shopType } }),
  }).catch(() => undefined)
  const body = (await response?.json().catch(() => undefined)) as
    | { ref?: 'equipment' | 'magicItem'; key?: string; name?: string; error?: string }
    | undefined
  if (response?.ok) expectOwnChange()
  if (response?.ok && body?.ref && body.key)
    return { ref: body.ref, key: body.key, name: body.name ?? body.key }
  throw new Error(body?.error ?? 'Nothing was made. Is the dev server running?')
}

/** Where a made-up item's background painting is: still going, done with its picture, or failed. */
export async function itemArtState(
  key: string,
): Promise<
  | { state: 'painting' }
  | { state: 'done'; picture: string; sizes?: ResponsiveImageSizes }
  | { state: 'failed' }
> {
  const response = await fetch('/__dev/records', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ art: key }),
  }).catch(() => undefined)
  if (!response?.ok) return { state: 'painting' }
  return (await response.json()) as Awaited<ReturnType<typeof itemArtState>>
}

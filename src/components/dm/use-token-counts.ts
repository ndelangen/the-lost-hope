import { useState } from 'react'

import { adjustTokens } from '#/lib/pc-tokens'
import type { TokenCounts, TokenKind, TokenRow } from '#/lib/pc-tokens'

/**
 * Counts the dev server saved since this page loaded. The browser keeps the token record it
 * loaded with (a step does not reload the page), so they outlive leaving and reopening the
 * dashboard until the next full load.
 */
const saved = new Map<string, TokenCounts>()

/** The token rows with this visit's saved steps applied, and a step that saves to the record. */
export function useTokenCounts(rows: readonly TokenRow[]) {
  const [, rerender] = useState(0)
  const [error, setError] = useState<string>()
  const current = rows.map((row) => ({ ...row, counts: saved.get(row.key) ?? row.counts }))
  const set = (key: string, counts: TokenCounts) => {
    saved.set(key, counts)
    rerender((n) => n + 1)
  }

  const adjust = async (key: string, kind: TokenKind, delta: 1 | -1) => {
    const before = current.find((row) => row.key === key)?.counts
    setError(undefined)
    set(key, adjustTokens(saved.get(key) ?? before, kind, delta))
    const response = await fetch('/__dm/tokens', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ key, kind, delta }),
    }).catch(() => undefined)
    const body = (await response?.json().catch(() => undefined)) as
      | { counts?: TokenCounts; error?: string }
      | undefined
    if (response?.ok && body?.counts) return set(key, body.counts)
    setError(body?.error ?? 'The token change was not saved. Is the dev server running?')
    if (before) set(key, before)
  }

  return { rows: current, adjust, error }
}

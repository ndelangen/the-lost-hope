import type { LiveStats } from './encounter'

/** A drawer beside the fight: adding to it, the prep notes, or the DM screen. */
export type EncounterDrawer = 'add' | 'notes' | 'screen'

/**
 * Keyboard shortcuts while running an encounter: A adds to the fight, N opens the prep notes, ?
 * opens the DM screen, the same key again closes its drawer, and Escape closes whichever is open.
 * Keys typed into a field, or pressed with a modifier other than Shift, belong to that field or the
 * browser.
 */
export function focusShortcut(
  event: { key: string; altKey: boolean; ctrlKey: boolean; metaKey: boolean },
  { typing, open }: { typing: boolean; open: EncounterDrawer | undefined },
): EncounterDrawer | 'close' | undefined {
  if (typing || event.altKey || event.ctrlKey || event.metaKey) return undefined
  if (event.key === 'Escape') return open ? 'close' : undefined
  const drawer = (
    { a: 'add', A: 'add', n: 'notes', N: 'notes', '?': 'screen' } as const satisfies Record<
      string,
      EncounterDrawer
    >
  )[event.key as 'a']
  if (!drawer) return undefined
  return drawer === open ? 'close' : drawer
}

/** Share of maximum HP left, from 0 to 1, for HP bars. Unknown HP has no bar. */
export function hpFraction({ hp, maxHp }: LiveStats): number | undefined {
  if (hp === undefined || !maxHp) return undefined
  return Math.max(0, Math.min(1, hp / maxHp))
}

/** Color band for an HP bar: healthy, bloodied (half or less), or down. */
export function hpBand(fraction: number): 'healthy' | 'bloodied' | 'down' {
  if (fraction <= 0) return 'down'
  return fraction <= 0.5 ? 'bloodied' : 'healthy'
}

/** Read a typed damage or healing amount. Only whole positive numbers count. */
export function parseAmount(text: string): number | undefined {
  const trimmed = text.trim()
  if (!/^\d+$/.test(trimmed)) return undefined
  const amount = Number(trimmed)
  return amount > 0 ? amount : undefined
}

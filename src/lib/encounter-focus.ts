import type { LiveStats } from './encounter'

/** Two ways to run a fight in combat focus, kept side by side so the DM can compare them. */
export const FOCUS_LAYOUTS = {
  turn: { label: 'Turn view', hint: 'Initiative rail and a large panel for the current turn' },
  table: { label: 'Table view', hint: 'Every combatant as a row with inline HP and abilities' },
} as const

export type FocusLayout = keyof typeof FOCUS_LAYOUTS

export const DEFAULT_FOCUS_LAYOUT: FocusLayout = 'turn'

/**
 * Keyboard shortcuts while running an encounter: F toggles focus, A adds enemies, ? opens the DM
 * screen in focus, and Escape closes the open drawer, or else leaves focus. Keys typed into a field, or pressed with
 * a modifier other than Shift, belong to that field or the browser.
 */
export function focusShortcut(
  event: { key: string; altKey: boolean; ctrlKey: boolean; metaKey: boolean },
  {
    typing,
    focused,
    screenOpen = false,
  }: { typing: boolean; focused: boolean; screenOpen?: boolean },
): 'toggle' | 'exit' | 'screen' | 'close-screen' | 'add' | undefined {
  if (typing || event.altKey || event.ctrlKey || event.metaKey) return undefined
  if (event.key === 'f' || event.key === 'F') return 'toggle'
  if ((event.key === 'a' || event.key === 'A') && !screenOpen) return 'add'
  if (event.key === '?' && focused) return screenOpen ? 'close-screen' : 'screen'
  if (event.key === 'Escape' && screenOpen) return 'close-screen'
  if (event.key === 'Escape' && focused) return 'exit'
  return undefined
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

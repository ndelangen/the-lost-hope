import type { AbilityKind } from '#/lib/stat-block'

const RED = 'text-red-600 dark:text-red-400 border-red-500/40 bg-red-500/10'
// Amber belongs to conditions and sky to temporary hit points, so saves and the rest avoid them.
const ORANGE = 'text-orange-700 dark:text-orange-400 border-orange-500/40 bg-orange-500/10'

/** Each kind of ability's label, icon-and-badge colour, and card edge, so attacks stand out. */
export const ABILITY_KIND = {
  melee: { label: 'Melee attack', tone: RED, edge: 'border-l-red-500' },
  ranged: { label: 'Ranged attack', tone: RED, edge: 'border-l-red-500' },
  attack: { label: 'Attack', tone: RED, edge: 'border-l-red-500' },
  save: { label: 'Saving throw', tone: ORANGE, edge: 'border-l-orange-500' },
  healing: {
    label: 'Healing',
    tone: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    edge: 'border-l-emerald-500',
  },
  other: {
    label: 'Ability',
    tone: 'text-slate-700 dark:text-slate-300 border-slate-500/40 bg-slate-500/10',
    edge: 'border-l-slate-500',
  },
} satisfies Record<AbilityKind, { label: string; tone: string; edge: string }>

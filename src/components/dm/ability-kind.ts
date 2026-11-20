import type { AbilityKind } from '#/lib/stat-block'

const RED = 'text-red-600 dark:text-red-400 border-red-500/40 bg-red-500/10'
const AMBER = 'text-amber-700 dark:text-amber-400 border-amber-500/40 bg-amber-500/10'

/** Each kind of ability's label, icon-and-badge colour, and card edge, so attacks stand out. */
export const ABILITY_KIND = {
  melee: { label: 'Melee attack', tone: RED, edge: 'border-l-red-500' },
  ranged: { label: 'Ranged attack', tone: RED, edge: 'border-l-red-500' },
  attack: { label: 'Attack', tone: RED, edge: 'border-l-red-500' },
  save: { label: 'Saving throw', tone: AMBER, edge: 'border-l-amber-500' },
  healing: {
    label: 'Healing',
    tone: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    edge: 'border-l-emerald-500',
  },
  other: {
    label: 'Ability',
    tone: 'text-sky-700 dark:text-sky-400 border-sky-500/40 bg-sky-500/10',
    edge: 'border-l-sky-500',
  },
} satisfies Record<AbilityKind, { label: string; tone: string; edge: string }>

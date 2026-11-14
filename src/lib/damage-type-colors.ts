import type { DamageType } from './rules'

/**
 * Text colour per damage type, so the type stands out where damage is dealt. Each pair keeps at
 * least WCAG AA contrast (4.5:1) on cards and muted chips in the light and dark themes.
 */
export const DAMAGE_TYPE_COLORS: Record<DamageType, string> = {
  acid: 'text-lime-700 dark:text-lime-300',
  bludgeoning: 'text-stone-700 dark:text-stone-300',
  cold: 'text-sky-700 dark:text-sky-300',
  fire: 'text-orange-700 dark:text-orange-400',
  force: 'text-violet-700 dark:text-violet-300',
  lightning: 'text-blue-700 dark:text-blue-300',
  necrotic: 'text-purple-800 dark:text-purple-300',
  piercing: 'text-stone-700 dark:text-stone-300',
  poison: 'text-green-700 dark:text-green-400',
  psychic: 'text-pink-700 dark:text-pink-300',
  radiant: 'text-amber-700 dark:text-amber-300',
  slashing: 'text-stone-700 dark:text-stone-300',
  thunder: 'text-indigo-700 dark:text-indigo-300',
}

import type { Spell } from '#/definitions/library'

/** "Level 3 Evocation" or "Evocation cantrip", as a spell's header reads. */
export function spellLevelLabel({ level, school }: Spell) {
  const School = school.charAt(0).toUpperCase() + school.slice(1)
  return level === 0 ? `${School} cantrip` : `Level ${level} ${School}`
}

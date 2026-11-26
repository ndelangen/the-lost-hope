import spells from '#/data/library/spells'
import type { EntityRef } from '#/definitions/kind'
import type { Spell } from '#/definitions/library'

export function spellOf(ref: EntityRef<'spell'>): Spell {
  const spell = spells[ref.key]
  if (!spell) throw new Error(`Unknown spell: ${ref.key}`)
  return spell
}

/** "Level 3 Evocation" or "Evocation cantrip", as a spell's header reads. */
export function spellLevelLabel({ level, school }: Spell) {
  const School = school.charAt(0).toUpperCase() + school.slice(1)
  return level === 0 ? `${School} cantrip` : `Level ${level} ${School}`
}

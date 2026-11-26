import books from '#/data/library/spells/_index'
import type { EntityRef } from '#/definitions/kind'
import type { Spell } from '#/definitions/library'

/** Every spell the library holds, by spell key. */
export const spells: Readonly<Record<string, Spell>> = Object.assign({}, ...books)

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

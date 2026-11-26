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

export type SpellFilters = {
  q?: string
  level?: number
  school?: string
  spellClass?: string
  book?: string
}

function normalize(text: string) {
  return text.normalize('NFKD').replaceAll(/\p{M}/gu, '').toLowerCase()
}

/** Spells matching a search, by level then name, with their keys. */
export function browseSpells({ q, level, school, spellClass, book }: SpellFilters) {
  const words = normalize(q ?? '')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
  return Object.entries(spells)
    .filter(([, spell]) => {
      if (level !== undefined && spell.level !== level) return false
      if (school && spell.school !== school) return false
      if (spellClass && !spell.classes.includes(spellClass)) return false
      if (book && spell.publication.key !== book) return false
      if (!words.length) return true
      const text = normalize(
        [
          spell.name,
          ...spell.text.flat().map((part) => (typeof part === 'string' ? part : '')),
        ].join(' '),
      )
      const name = normalize(spell.name)
      return words.every((word) => text.includes(word) || name.includes(word))
    })
    .map(([key, spell]) => ({ key, spell }))
    .toSorted(
      (left, right) =>
        left.spell.level - right.spell.level || left.spell.name.localeCompare(right.spell.name),
    )
}

/** The values each spell filter can take, for the filter menus. */
export function spellFacets() {
  const all = Object.values(spells)
  return {
    classes: [...new Set(all.flatMap(({ classes }) => classes))]
      .filter((name) => name !== '—')
      .toSorted(),
    books: [...new Set(all.map(({ publication }) => publication.key))],
  }
}

import books from '#/data/library/monsters/_index'
import type { EntityRef } from '#/definitions/kind'
import type { MonsterPrinting } from '#/definitions/library'

import { typedMonsterPrinting } from './monster-printing'

/** Every printing of each monster, keyed by the publication that holds the stat block. */
export const printingsByMonster = new Map<string, Map<string, MonsterPrinting>>()
for (const { publication, monsters } of books)
  for (const [key, printing] of Object.entries(monsters)) {
    const printings = printingsByMonster.get(key) ?? new Map<string, MonsterPrinting>()
    if (printings.has(publication.key)) throw new Error(`${publication.key} prints ${key} twice`)
    printings.set(publication.key, printing)
    printingsByMonster.set(key, printings)
  }

/**
 * The typed printing a publication gives a monster: its own stat block, or the one it reprints
 * unchanged from another book. This reads every book; a page that shows one creature uses
 * `loadMonsterPrinting`, which loads only the book that holds it.
 */
export function monsterPrinting(
  monster: EntityRef<'monster'>,
  publication: EntityRef<'publication'>,
) {
  const printings = printingsByMonster.get(monster.key)
  if (!printings) return undefined
  const own = printings.get(publication.key)
  const [heldBy, printing] = own
    ? [publication.key, own]
    : ([...printings].find(([, candidate]) =>
        candidate.reprintedIn?.some(({ key }) => key === publication.key),
      ) ?? [])
  if (!printing || !heldBy) return undefined
  return typedMonsterPrinting(printing, heldBy, monster.key)
}

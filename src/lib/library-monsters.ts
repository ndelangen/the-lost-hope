import books from '#/data/library/monsters/_index'
import publications from '#/data/library/publications'
import type { EntityRef } from '#/definitions/kind'
import type { MonsterPrinting, Publication } from '#/definitions/library'

import { deriveStatBlock } from './stat-block'

/** Every printing of each monster, keyed by the publication that holds the stat block. */
export const printingsByMonster = new Map<string, Map<string, MonsterPrinting>>()
for (const { publication, monsters } of books)
  for (const [key, printing] of Object.entries(monsters)) {
    const printings = printingsByMonster.get(key) ?? new Map<string, MonsterPrinting>()
    if (printings.has(publication.key)) throw new Error(`${publication.key} prints ${key} twice`)
    printings.set(publication.key, printing)
    printingsByMonster.set(key, printings)
  }

export function publicationOf(ref: EntityRef<'publication'>): Publication {
  const publication = publications[ref.key]
  if (!publication) throw new Error(`Unknown publication: ${ref.key}`)
  return publication
}

/**
 * The typed printing a publication gives a monster: its own stat block, or the one it reprints
 * unchanged from another book.
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
  return {
    printing,
    heldBy: publicationOf({ ref: 'publication', key: heldBy }),
    reprints: (printing.reprintedIn ?? []).map(publicationOf),
    derived: deriveStatBlock(printing.stats),
  }
}

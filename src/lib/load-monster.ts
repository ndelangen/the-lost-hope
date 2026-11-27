import { monsterBooks, monsterPrintings } from '#/data/generated/monster-books'
import type { EntityRef } from '#/definitions/kind'
import type { MonsterPrinting } from '#/definitions/library'

import { typedMonsterPrinting, type TypedMonsterPrinting } from './monster-printing'

type Book = { publication: EntityRef<'publication'>; monsters: Record<string, MonsterPrinting> }

const bookModules = import.meta.glob<{ default: Book }>([
  '/src/data/library/monsters/*.ts',
  '!/src/data/library/monsters/_index.ts',
])

/**
 * The publication whose stat block a publication shows for a monster: its own, or the one it
 * reprints unchanged.
 */
function holderOf(monster: string, publication: string): string | undefined {
  const printings = monsterPrintings[monster]
  if (!printings) return undefined
  if (Object.hasOwn(printings, publication)) return publication
  return Object.keys(printings).find((holder) => printings[holder]!.includes(publication))
}

/**
 * Load the typed printing a publication gives a monster. Only the book that holds the stat block
 * loads, not every creature the library holds.
 */
export async function loadMonsterPrinting(
  monster: EntityRef<'monster'>,
  publication: EntityRef<'publication'>,
): Promise<TypedMonsterPrinting | undefined> {
  const holder = holderOf(monster.key, publication.key)
  const book = holder ? monsterBooks[holder] : undefined
  const load = book ? bookModules[`/src/data/library/monsters/${book}.ts`] : undefined
  if (!holder || !load) return undefined
  const { default: held } = await load()
  const printing = Object.hasOwn(held.monsters, monster.key)
    ? held.monsters[monster.key]
    : undefined
  return printing ? typedMonsterPrinting(printing, holder) : undefined
}

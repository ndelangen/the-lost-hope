import type { MonsterPrinting } from '#/definitions/library'

import { publicationOf } from './library-publications'
import { deriveStatBlock } from './stat-block'

/** A typed stat block as a library page shows it: the book that holds it, its reprints, and its numbers. */
export function typedMonsterPrinting(printing: MonsterPrinting, heldBy: string) {
  return {
    printing,
    heldBy: publicationOf({ ref: 'publication', key: heldBy }),
    reprints: (printing.reprintedIn ?? []).map(publicationOf),
    derived: deriveStatBlock(printing.stats),
  }
}

export type TypedMonsterPrinting = ReturnType<typeof typedMonsterPrinting>

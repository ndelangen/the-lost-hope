import type { MonsterPrinting } from '#/definitions/library'

import { publicationOf } from './library-publications'
import { ownedCreatureOf } from './owned-creatures'
import { deriveStatBlock } from './stat-block'

/** A typed stat block as a library page shows it: the book that holds it, its reprints, and its numbers. */
export function typedMonsterPrinting(printing: MonsterPrinting, heldBy: string, monster: string) {
  return {
    printing,
    // A creature that follows its owner names its function, which the page runs.
    owned: ownedCreatureOf(heldBy, monster)
      ? ({ publication: heldBy, monster } as MonsterOwner)
      : undefined,
    heldBy: publicationOf({ ref: 'publication', key: heldBy }),
    reprints: (printing.reprintedIn ?? []).map(publicationOf),
    derived: deriveStatBlock(printing.stats),
  }
}

/** The book and monster whose owner function a creature follows. */
export type MonsterOwner = { publication: string; monster: string }

export type TypedMonsterPrinting = ReturnType<typeof typedMonsterPrinting>

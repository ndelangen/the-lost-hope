import monsterManual2014 from '#/data/library/monsters/monster-manual-2014'
import monsterManual2024 from '#/data/library/monsters/monster-manual-2024'
import srd51 from '#/data/library/monsters/srd-5-1'
import srd521 from '#/data/library/monsters/srd-5-2-1'
import publications from '#/data/library/publications'
import type { EntityRef } from '#/definitions/kind'
import type { MonsterPrinting, Publication } from '#/definitions/library'

import { deriveStatBlock } from './stat-block'

const books = [monsterManual2014, monsterManual2024, srd51, srd521]

/** Every printing of each monster, keyed by the publication that holds the stat block. */
const printingsByMonster = new Map<string, Map<string, MonsterPrinting>>()
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
export function monsterPrinting(monster: string, publication: string) {
  const printings = printingsByMonster.get(monster)
  if (!printings) return undefined
  const own = printings.get(publication)
  const [heldBy, printing] = own
    ? [publication, own]
    : ([...printings].find(([, candidate]) =>
        candidate.reprintedIn?.some(({ key }) => key === publication),
      ) ?? [])
  if (!printing || !heldBy) return undefined
  return {
    printing,
    heldBy: publicationOf({ ref: 'publication', key: heldBy }),
    reprints: (printing.reprintedIn ?? []).map(publicationOf),
    derived: deriveStatBlock(printing.stats),
  }
}

/**
 * The pilot bridge from the older text library: its printing labels name these publications.
 * It goes away once every printing of an entry is typed.
 */
const LEGACY_LABELS: Record<string, string> = {
  'SRD 5.1': 'srd_5_1',
  'SRD 5.2.1': 'srd_5_2_1',
  'Basic Rules (2018)': 'basic_rules_2018',
  'Monster Manual (2014)': 'monster_manual_2014',
  'Monster Manual (2024)': 'monster_manual_2024',
}

export function typedLibraryPrinting(slug: string, label: string) {
  const publication = LEGACY_LABELS[label]
  return publication ? monsterPrinting(slug.replaceAll('-', '_'), publication) : undefined
}

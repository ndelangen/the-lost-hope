import { spellNames } from '#/data/generated/spell-names'
import type { EntityRef, LinkedLibraryKind } from '#/definitions/kind'
import { libraryRecords, loadLibraryIndex } from '#/lib/published-library-data'
import type { LibraryType } from '#/lib/published-library-routing'

/** Where a library entry lives: a catalog page, or a spell's own page. */
export type LibraryLink =
  | { name: string; type: LibraryType; slug: string }
  | { name: string; spell: string }

/**
 * The page a library reference in DM prose links to, or undefined when the library lacks it.
 * Loads only the catalog index of the entry's type.
 */
export async function loadLibraryLink(
  ref: EntityRef<LinkedLibraryKind>,
): Promise<LibraryLink | undefined> {
  if (ref.ref === 'spell') {
    const name = spellNames[ref.key]
    return name ? { name, spell: ref.key } : undefined
  }
  const type: LibraryType = ref.ref === 'monster' ? 'monsters' : 'items'
  await loadLibraryIndex([type])
  for (const record of libraryRecords([type])) {
    for (const { typed } of record.printings) {
      if (!typed) continue
      const pointer =
        'monster' in typed
          ? typed.monster
          : 'magicItem' in typed
            ? typed.magicItem
            : typed.equipment
      if (pointer.ref === ref.ref && pointer.key === ref.key)
        return { name: record.name, type, slug: record.slug }
    }
  }
  return undefined
}

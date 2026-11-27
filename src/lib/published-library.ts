import type { monsterPrinting as MonsterPrinting } from './library-monsters'
import {
  libraryTextSearchLoaded as printedTextLoaded,
  libraryCatalogTypes,
  libraryPlayerTypes,
  libraryRecord,
  libraryRecords,
  loadLibrarySearch as loadPrintedText,
  searchWords,
  type LibraryType,
} from './published-library-data'
import { allAbilities } from './stat-block'

export {
  isLibraryType,
  librarySearch,
  libraryTypes,
  type LibraryType,
} from './published-library-routing'
export { loadLibraryDetail, loadLibraryIndex, type SrdVersion } from './published-library-data'

/** Every creature's stat blocks, which a DM search also matches by ability name, once loaded. */
let typedMonsterPrinting: typeof MonsterPrinting | undefined

/** Whether `loadLibrarySearch` has run for this kind of search. */
export function libraryTextSearchLoaded(dm: boolean) {
  return printedTextLoaded() && (!dm || typedMonsterPrinting !== undefined)
}

/**
 * Load what search matches in printed text, and for a DM search the creatures whose ability names
 * it matches; browsing without a query needs neither.
 */
export async function loadLibrarySearch(dm: boolean) {
  await Promise.all([
    loadPrintedText(),
    dm && !typedMonsterPrinting
      ? import('./library-monsters').then(({ monsterPrinting }) => {
          typedMonsterPrinting = monsterPrinting
        })
      : undefined,
  ])
}

export function libraryBrowseTypes(dm: boolean) {
  return new Set(dm ? libraryCatalogTypes : libraryPlayerTypes)
}

export function libraryGroups(dm: boolean, type?: LibraryType) {
  if (!type) return []
  return [
    ...new Set(
      libraryRecords([type])
        .filter((entry) => dm || !entry.gmOnly)
        .flatMap((entry) => entry.groups ?? [entry.group]),
    ),
  ].toSorted((left, right) => left.localeCompare(right))
}

function normalize(text: string) {
  return text.normalize('NFKD').replaceAll(/\p{M}/gu, '').toLowerCase()
}

/**
 * Entries matching a search. `printedText` also matches words inside printed text, once
 * `loadLibrarySearch` has run; leave it off for a render that must match the server's.
 */
export function browseLibrary(
  dm: boolean,
  query?: string,
  type?: LibraryType,
  group?: string,
  printedText = true,
) {
  const term = normalize(query?.trim() ?? '')
  // Split like the search index does, so "half-orc" finds printed "half-orc".
  const words = term.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  const entries = libraryRecords(type ? [type] : undefined).flatMap((record) => {
    if (!dm && record.gmOnly) return []
    const { name, slug, summary, group: mainGroup, groups = [mainGroup], price, art } = record
    if (group && !groups.includes(group)) return []
    if (words.length) {
      const searchable = [name, summary, ...groups, price ?? '']
      // Printed words come from the search module; rules arrive with their text.
      const printed = printedText ? searchWords.get(record.type + '/' + record.slug) : undefined
      if (printed) searchable.push(printed.player, dm ? printed.gm : '')
      for (const printing of record.printings) {
        searchable.push(printing.label, printing.edition ?? '', printing.variantName ?? '')
        const sections = [...(printing.player ?? []), ...(dm ? (printing.gm ?? []) : [])]
        // Rules always carry their text; other entries' text may be loaded on the server only.
        if (!printed && (printedText || record.type === 'rules'))
          searchable.push(...sections.flatMap(({ title, lines }) => [title, ...lines]))
        const typed =
          dm &&
          printing.typed &&
          'monster' in printing.typed &&
          typedMonsterPrinting?.(printing.typed.monster, printing.typed.publication)
        if (typed) searchable.push(...allAbilities(typed.printing.stats).map(({ name }) => name))
      }
      const text = normalize(searchable.join(' '))
      if (!words.every((word) => text.includes(word))) return []
    }
    return [
      {
        name,
        slug,
        summary,
        group: mainGroup,
        type: record.type,
        price,
        art: art?.[0] ?? record.printings[0].art?.[0],
      },
    ]
  })
  function rank(name: string) {
    const normalized = normalize(name)
    return normalized === term
      ? 0
      : normalized.startsWith(term)
        ? 1
        : normalized.includes(term)
          ? 2
          : 3
  }
  return term
    ? entries.toSorted(
        (left, right) => rank(left.name) - rank(right.name) || left.name.localeCompare(right.name),
      )
    : entries.toSorted(
        (left, right) =>
          (type ? left.group.localeCompare(right.group) : 0) || left.name.localeCompare(right.name),
      )
}

/** An entry as its page shows it; load its type with `loadLibraryDetail` first. */
export function getLibraryEntry(type: LibraryType, slug: string, dm: boolean, version?: string) {
  const record = libraryRecord(type, slug)
  if (!record || (!dm && record.gmOnly)) return undefined
  const { name, group, groups = [group], summary, printings, art, price, rating } = record
  const selected = version ? printings.find(({ id }) => id === version) : printings[0]
  if (!selected) return undefined
  const defaultArt = art ?? []
  const printingArt = selected.art ?? []
  const [primary, alternates] =
    selected === printings[0] ? [defaultArt, printingArt] : [printingArt, defaultArt]
  const artwork = [
    ...primary,
    ...alternates.filter((image) => !primary.some(({ file }) => file === image.file)),
  ]
  const glossary =
    selected.edition === '2014 fifth edition' ||
    selected.edition === '2014 fifth edition compatible'
      ? 'srd-5-1'
      : selected.edition === '2024 fifth edition'
        ? 'srd-5-2-1'
        : selected.id
  return {
    name,
    group,
    groups,
    summary,
    art: artwork,
    price,
    rating: dm ? rating : undefined,
    gmOnly: record.gmOnly === true,
    printings: printings.map(({ id, label, variantName }) => ({
      id,
      label: variantName ? label + ' · ' + variantName : label,
    })),
    selected: {
      id: selected.id,
      label: selected.label,
      edition: selected.edition,
      variantName: selected.variantName,
      source: selected.source,
      artReference: selected.artReference,
      status: dm ? selected.status : undefined,
      glossary,
      typed: selected.typed,
      publication: selected.publication ?? selected.typed?.publication,
    },
    sections: [...(selected.player ?? []), ...(dm ? (selected.gm ?? []) : [])],
    abilityDisplay: dm ? selected.abilityDisplay : undefined,
  }
}

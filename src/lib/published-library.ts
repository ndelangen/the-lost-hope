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
import { libraryTypes } from './published-library-routing'
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
        if (typed)
          searchable.push(
            ...allAbilities(typed.printing.stats).map(({ name }) => name),
            // Its optional abilities too, such as Summoner and its Summon Demon action.
            ...(typed.printing.stats.options ?? []).flatMap((option) => [
              option.name,
              ...option.abilities.map((ability) => ability.name),
            ]),
          )
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

/** How many entries one page of library results shows. */
const RESULTS_PER_PAGE = 36

export type LibraryBrowseEntry = ReturnType<typeof browseLibrary>[number]

export type LibraryBrowseQuery = {
  dm: boolean
  q?: string
  type?: LibraryType
  group?: string
  page?: number
}

/**
 * One page of library results as the browse page shows it, grouped under headings. Load the
 * types it reads first: `type`, or every type when it is unset. `printedText` widens a search to
 * printed text once `loadLibrarySearch` has run.
 */
export function libraryBrowseView(
  { dm, q, type, group, page }: LibraryBrowseQuery,
  printedText: boolean,
) {
  const entries = browseLibrary(dm, q, type, group, printedText)
  const pageCount = Math.max(1, Math.ceil(entries.length / RESULTS_PER_PAGE))
  // Until printed-text matches load, the list is partial: keep the requested page and hold the
  // count back rather than show a number that is about to change.
  const pending = Boolean(q) && !printedText
  const currentPage = pending ? (page ?? 1) : Math.min(page ?? 1, pageCount)
  const start = (currentPage - 1) * RESULTS_PER_PAGE
  const sections: { label: string; entries: LibraryBrowseEntry[] }[] = []
  for (const entry of entries.slice(start, start + RESULTS_PER_PAGE)) {
    const label = type ? (group ?? entry.group) : libraryTypes[entry.type]
    const section = sections.find((candidate) => candidate.label === label)
    if (section) section.entries.push(entry)
    else sections.push({ label, entries: [entry] })
  }
  return {
    sections,
    total: entries.length,
    pageCount,
    currentPage,
    pending,
    groups: libraryGroups(dm, type),
  }
}

export type LibraryBrowseView = ReturnType<typeof libraryBrowseView>

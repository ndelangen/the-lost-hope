import { monsterPrinting } from './library-monsters'
import { publishedLibrary, searchWords, type LibraryType } from './published-library-data'
import { allAbilities } from './stat-block'

export {
  isLibraryType,
  librarySearch,
  libraryTypes,
  type LibraryType,
} from './published-library-routing'
export { loadLibraryDetail, loadLibrarySearch, type SrdVersion } from './published-library-data'

const entriesByPath = new Map(
  publishedLibrary.map((entry) => [entry.type + '/' + entry.slug, entry]),
)
if (entriesByPath.size !== publishedLibrary.length)
  throw new Error('Duplicate published library entry path')

export function libraryBrowseTypes(dm: boolean) {
  return new Set(publishedLibrary.filter((entry) => dm || !entry.gmOnly).map((entry) => entry.type))
}

export function libraryGroups(dm: boolean, type?: LibraryType) {
  if (!type) return []
  return [
    ...new Set(
      publishedLibrary
        .filter((entry) => entry.type === type && (dm || !entry.gmOnly))
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
  const entries = publishedLibrary.flatMap((record) => {
    if ((!dm && record.gmOnly) || (type && record.type !== type)) return []
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
          monsterPrinting(printing.typed.monster, printing.typed.publication)
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

export function getLibraryEntry(type: string, slug: string, dm: boolean, version?: string) {
  const record = entriesByPath.get(type + '/' + slug)
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
    },
    sections: [...(selected.player ?? []), ...(dm ? (selected.gm ?? []) : [])],
    abilityDisplay: dm ? selected.abilityDisplay : undefined,
  }
}

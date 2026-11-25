import { publishedLibrary, type LibraryType } from './published-library-data'

export {
  isLibraryType,
  librarySearch,
  libraryTypes,
  type LibraryType,
} from './published-library-routing'
export { type SrdVersion } from './published-library-data'

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

export function browseLibrary(dm: boolean, query?: string, type?: LibraryType, group?: string) {
  const term = normalize(query?.trim() ?? '')
  const words = term.split(/\s+/u).filter(Boolean)
  const entries = publishedLibrary.flatMap((record) => {
    if ((!dm && record.gmOnly) || (type && record.type !== type)) return []
    const { name, slug, summary, group: mainGroup, groups = [mainGroup], price, art } = record
    if (group && !groups.includes(group)) return []
    if (words.length) {
      const searchable = [name, summary, ...groups, price ?? '']
      for (const printing of record.printings) {
        const sections = [...(printing.player ?? []), ...(dm ? printing.gm : [])]
        searchable.push(...sections.flatMap(({ title, lines }) => [title, ...lines]))
      }
      const text = normalize(searchable.join(' '))
      if (!words.every((word) => text.includes(word))) return []
    }
    return [{ name, slug, summary, group: mainGroup, type: record.type, price, art: art?.[0] }]
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
  const relatedType = type === 'beasts' ? 'monsters' : type === 'monsters' ? 'beasts' : undefined
  const related = relatedType ? entriesByPath.get(relatedType + '/' + slug) : undefined
  return {
    name,
    group,
    groups,
    relatedType: related && (dm || !related.gmOnly) ? relatedType : undefined,
    summary,
    art,
    price,
    rating: dm ? rating : undefined,
    gmOnly: record.gmOnly === true,
    printings: printings.map(({ id, label }) => ({ id, label })),
    selected: { id: selected.id, label: selected.label, artReference: selected.artReference },
    sections: [...(selected.player ?? []), ...(dm ? selected.gm : [])],
    abilityDisplay: dm ? selected.abilityDisplay : undefined,
  }
}

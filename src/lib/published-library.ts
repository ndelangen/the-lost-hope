import { libraryTypes, publishedLibrary, type LibraryType } from './published-library-data'

export { libraryTypes, type LibraryType, type SrdVersion } from './published-library-data'

function libraryEntryKey(type: string, slug: string) {
  return type + '/' + slug
}

const entriesByPath = new Map(
  publishedLibrary.map((entry) => [libraryEntryKey(entry.type, entry.slug), entry]),
)
if (entriesByPath.size !== publishedLibrary.length)
  throw new Error('Duplicate published library entry path')

export function isLibraryType(value: unknown): value is LibraryType {
  return typeof value === 'string' && Object.hasOwn(libraryTypes, value)
}

type LibrarySearch = {
  dm?: true
  q?: string
  version?: string
}

export function librarySearch(input: Record<string, unknown>): LibrarySearch {
  return {
    dm: input.dm === '' || input.dm === true ? (true as const) : undefined,
    q: typeof input.q === 'string' ? input.q.slice(0, 200) || undefined : undefined,
    version: typeof input.version === 'string' ? input.version.slice(0, 80) : undefined,
  }
}

export function libraryBrowseTypes(dm: boolean) {
  return new Set(publishedLibrary.filter((entry) => dm || !entry.gmOnly).map((entry) => entry.type))
}

export function browseLibrary(dm: boolean, query?: string, type?: LibraryType) {
  const terms = query?.toLocaleLowerCase().split(/\s+/u).filter(Boolean) ?? []
  return publishedLibrary.flatMap((record) => {
    if ((!dm && record.gmOnly) || (type && record.type !== type)) return []
    const { name, slug, summary, group } = record
    const searchable = [name, summary, group]
    if (dm)
      searchable.push(
        ...record.printings.flatMap(({ gm }) =>
          gm.flatMap(({ title, lines }) => [title, ...lines]),
        ),
      )
    if (
      !terms.every((term) => searchable.some((value) => value.toLocaleLowerCase().includes(term)))
    )
      return []
    return [{ name, slug, summary, group, type: record.type }]
  })
}

export function getLibraryEntry(type: string, slug: string, dm: boolean, version?: string) {
  const record = entriesByPath.get(libraryEntryKey(type, slug))
  if (!record || (!dm && record.gmOnly)) return undefined
  const { name, group, summary, printings } = record
  const selected = version ? printings.find(({ id }) => id === version) : printings[0]
  if (!selected) return undefined
  return {
    name,
    group,
    summary,
    gmOnly: record.gmOnly === true,
    printings: printings.map(({ id, label }) => ({ id, label })),
    selected: { id: selected.id, label: selected.label },
    sections: dm ? selected.gm : [],
  }
}

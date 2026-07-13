import type { IconCatalogEntry, IconClassification, IconSource } from './types'

export type IconCatalogSearchOptions = {
  query?: string
  classifications?: ReadonlyArray<IconClassification>
  sources?: ReadonlyArray<IconSource>
  category?: string
  limit?: number
}

type RankedEntry = {
  indexedEntry: IndexedEntry
  score: number
}

type WeightedToken = {
  value: string
  weight: number
}

type IndexedEntry = {
  entry: IconCatalogEntry
  id: string
  componentName: string
  label: string
  aliases: ReadonlyArray<string>
  associatedTerms: ReadonlyArray<string>
  keywords: ReadonlyArray<string>
  categories: ReadonlySet<string>
  fullText: string
  tokens: ReadonlyArray<WeightedToken>
}

export type IconCatalogSearchIndex = {
  search: (options?: IconCatalogSearchOptions) => Array<IconCatalogEntry>
}

const CLASSIFICATION_ORDER: Readonly<Record<IconClassification, number>> = {
  useful: 0,
  questionable: 1,
  'marked-for-deletion': 2,
}

const SOURCE_ORDER: Readonly<Record<IconSource, number>> = {
  custom: 0,
  lucide: 1,
  gi: 2,
  fa: 3,
}

const INDEX_CACHE = new WeakMap<ReadonlyArray<IconCatalogEntry>, IconCatalogSearchIndex>()

function normalized(value: string): string {
  return value.trim().toLocaleLowerCase()
}

function tokensFrom(value: string): Array<string> {
  return normalized(value)
    .split(/[^a-z\d]+/u)
    .filter(Boolean)
}

function addWeightedTokens(
  target: Map<string, number>,
  values: ReadonlyArray<string>,
  weight: number,
): void {
  for (const token of values.flatMap(tokensFrom)) {
    target.set(token, Math.max(weight, target.get(token) ?? 0))
  }
}

function indexEntry(entry: IconCatalogEntry): IndexedEntry {
  const id = normalized(entry.id)
  const componentName = normalized(entry.componentName)
  const label = normalized(entry.label)
  const aliases = entry.aliases.map(normalized)
  const associatedTerms = entry.associatedTerms.map(normalized)
  const keywords = entry.keywords.map(normalized)
  const categories = new Set([...entry.categories, ...entry.sourceCategories].map(normalized))
  const tokenWeights = new Map<string, number>()

  addWeightedTokens(tokenWeights, [entry.id, entry.componentName, entry.label], 120)
  addWeightedTokens(tokenWeights, entry.aliases, 105)
  addWeightedTokens(tokenWeights, entry.associatedTerms, 95)
  addWeightedTokens(tokenWeights, entry.keywords, 85)
  addWeightedTokens(tokenWeights, [...entry.categories, ...entry.sourceCategories], 70)
  addWeightedTokens(tokenWeights, entry.useCases, 55)
  addWeightedTokens(tokenWeights, [entry.description, entry.sourceDescription ?? ''], 35)

  return {
    entry,
    id,
    componentName,
    label,
    aliases,
    associatedTerms,
    keywords,
    categories,
    fullText: normalized(
      [
        entry.id,
        entry.componentName,
        entry.label,
        ...entry.aliases,
        ...entry.associatedTerms,
        ...entry.keywords,
        ...entry.categories,
        ...entry.sourceCategories,
        ...entry.useCases,
        entry.description,
        entry.sourceDescription ?? '',
      ].join(' '),
    ),
    tokens: [...tokenWeights].map(([value, weight]) => ({ value, weight })),
  }
}

function defaultEntryOrder(left: IndexedEntry, right: IndexedEntry): number {
  return (
    CLASSIFICATION_ORDER[left.entry.classification] -
      CLASSIFICATION_ORDER[right.entry.classification] ||
    SOURCE_ORDER[left.entry.source] - SOURCE_ORDER[right.entry.source] ||
    left.entry.label.localeCompare(right.entry.label)
  )
}

function isSubsequence(needle: string, haystack: string): boolean {
  let needleIndex = 0
  for (const character of haystack) {
    if (character === needle[needleIndex]) needleIndex += 1
    if (needleIndex === needle.length) return true
  }
  return false
}

function isAdjacentTransposition(left: string, right: string): boolean {
  if (left.length !== right.length) return false

  let mismatch = -1
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] === right[index]) continue
    if (mismatch !== -1) return false
    mismatch = index
    if (
      index + 1 >= left.length ||
      left[index] !== right[index + 1] ||
      left[index + 1] !== right[index]
    ) {
      return false
    }
    index += 1
  }

  return mismatch !== -1
}

function editDistance(left: string, right: string, maximum: number): number {
  if (Math.abs(left.length - right.length) > maximum) return maximum + 1

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex]
    let rowMinimum = leftIndex

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1
      const distance = Math.min(
        (current[rightIndex - 1] ?? maximum + 1) + 1,
        (previous[rightIndex] ?? maximum + 1) + 1,
        (previous[rightIndex - 1] ?? maximum + 1) + substitutionCost,
      )
      current.push(distance)
      rowMinimum = Math.min(rowMinimum, distance)
    }

    if (rowMinimum > maximum) return maximum + 1
    previous = current
  }

  return previous[right.length] ?? maximum + 1
}

function fuzzyTokenScore(query: string, candidate: string): number {
  if (candidate === query) return 100
  if (candidate.startsWith(query)) return query.length === 1 ? 72 : 90
  if (query.length >= 2 && candidate.includes(query)) return 78
  if (query.length < 3) return 0
  if (isAdjacentTransposition(query, candidate)) return 70

  const maximumDistance = query.length <= 8 ? 1 : query.length <= 12 ? 2 : 3
  const distance = editDistance(query, candidate, maximumDistance)
  if (distance <= maximumDistance) return 68 - distance * 9
  if (isSubsequence(query, candidate)) return 44
  return 0
}

function scoreEntry(indexedEntry: IndexedEntry, query: string, queryTokens: Array<string>): number {
  let score = 0

  if (indexedEntry.id === query) score += 1_000
  if (indexedEntry.componentName === query) score += 900
  if (indexedEntry.label === query) score += 850
  if (indexedEntry.aliases.includes(query)) score += 800
  if (indexedEntry.associatedTerms.includes(query)) score += 750
  if (indexedEntry.keywords.includes(query)) score += 700
  if (indexedEntry.componentName.startsWith(query)) score += 500
  if (indexedEntry.label.startsWith(query)) score += 450
  if (query.length >= 2 && indexedEntry.fullText.includes(query)) score += 180

  for (const queryToken of queryTokens) {
    let bestTokenScore = 0
    for (const token of indexedEntry.tokens) {
      const fuzzyScore = fuzzyTokenScore(queryToken, token.value)
      if (fuzzyScore === 0) continue
      bestTokenScore = Math.max(bestTokenScore, fuzzyScore + token.weight)
      if (bestTokenScore === 220) break
    }
    if (bestTokenScore === 0) return 0
    score += bestTokenScore
  }

  return score
}

function searchIndex(
  indexedEntries: ReadonlyArray<IndexedEntry>,
  options: IconCatalogSearchOptions = {},
): Array<IconCatalogEntry> {
  const query = normalized(options.query ?? '')
  const queryTokens = tokensFrom(query)
  const classifications = options.classifications ? new Set(options.classifications) : undefined
  const sources = options.sources ? new Set(options.sources) : undefined
  const category = normalized(options.category ?? '')
  const limit = options.limit === undefined ? undefined : Math.max(0, options.limit)
  const ranked: Array<RankedEntry> = []

  for (const indexedEntry of indexedEntries) {
    const { entry } = indexedEntry
    if (classifications && !classifications.has(entry.classification)) continue
    if (sources && !sources.has(entry.source)) continue
    if (category && !indexedEntry.categories.has(category)) continue

    const score = query ? scoreEntry(indexedEntry, query, queryTokens) : 0
    if (query && score === 0) continue
    ranked.push({ indexedEntry, score })
  }

  if (query) {
    ranked.sort(
      (left, right) =>
        right.score - left.score || defaultEntryOrder(left.indexedEntry, right.indexedEntry),
    )
  }

  return ranked
    .slice(0, limit === undefined ? ranked.length : limit)
    .map(({ indexedEntry }) => indexedEntry.entry)
}

export function createIconCatalogSearchIndex(
  entries: ReadonlyArray<IconCatalogEntry>,
): IconCatalogSearchIndex {
  const indexedEntries = entries.map(indexEntry).toSorted(defaultEntryOrder)
  return {
    search: (options = {}) => searchIndex(indexedEntries, options),
  }
}

export function searchIconCatalog(
  entries: ReadonlyArray<IconCatalogEntry>,
  options: IconCatalogSearchOptions = {},
): Array<IconCatalogEntry> {
  let index = INDEX_CACHE.get(entries)
  if (!index) {
    index = createIconCatalogSearchIndex(entries)
    INDEX_CACHE.set(entries, index)
  }
  return index.search(options)
}

export function iconCatalogCategories(entries: ReadonlyArray<IconCatalogEntry>): Array<string> {
  return [...new Set(entries.flatMap((entry) => entry.categories))].toSorted()
}

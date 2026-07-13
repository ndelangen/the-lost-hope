import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import * as GameIcons from 'react-icons/gi'

const ROOT = path.resolve(import.meta.dirname, '..')
const UPSTREAM_DIR = path.join(ROOT, 'src/icon-catalog/upstream')
const FONT_AWESOME_PATH = path.join(UPSTREAM_DIR, 'font-awesome.json')
const GAME_ICONS_PATH = path.join(UPSTREAM_DIR, 'game-icons.json')

const FONT_AWESOME_METADATA_URL =
  'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/5.15.4/metadata/icons.json'
const ALGOLIA_URL = 'https://9HQ1YXUKVC-dsn.algolia.net/1/indexes/*/queries'
const ALGOLIA_APP_ID = '9HQ1YXUKVC'
const ALGOLIA_SEARCH_KEY = 'fa437c6f1fcba0f93608721397cd515d'
const ALGOLIA_INDEX = 'icons'

type FontAwesomeSourceIcon = {
  label: string
  search?: { terms?: Array<string> }
  free?: Array<string>
}

type GameIconHit = {
  id?: string
  name?: string
  content?: string
  tags?: string | Array<string>
}

type AlgoliaResponse = {
  results: Array<{ hits?: Array<GameIconHit> }>
}

function unique(values: ReadonlyArray<string>): Array<string> {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].toSorted()
}

function canonicalName(value: string): string {
  return value.toLocaleLowerCase().replace(/[^a-z\d]/gu, '')
}

function wordsFromExportName(exportName: string): Array<string> {
  return exportName
    .replace(/^Gi/u, '')
    .replace(/([a-z\d])([A-Z])/gu, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/gu, '$1 $2')
    .replace(/(\d)([A-Za-z])/gu, '$1 $2')
    .replace(/([A-Za-z])(\d)/gu, '$1 $2')
    .split(/[^A-Za-z\d]+/u)
    .filter(Boolean)
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (!response.ok) throw new Error(`Could not fetch ${url}: ${response.status}`)
  return (await response.json()) as T
}

async function fontAwesomeMetadata() {
  const source = await fetchJson<Record<string, FontAwesomeSourceIcon>>(FONT_AWESOME_METADATA_URL)

  return Object.fromEntries(
    Object.entries(source)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([name, icon]) => [
        name,
        {
          label: icon.label,
          searchTerms: unique(icon.search?.terms ?? []),
          styles: unique(icon.free ?? []),
        },
      ]),
  )
}

function algoliaParams(exportName: string): string {
  const query = wordsFromExportName(exportName).join(' ')
  return new URLSearchParams({
    query,
    hitsPerPage: '50',
    attributesToRetrieve: 'id,name,content,tags',
    restrictSearchableAttributes: 'name',
    typoTolerance: 'false',
  }).toString()
}

function sourceUrl(id: string): string {
  return `https://game-icons.net/${id}.html`
}

function authorFromId(id: string): string | undefined {
  return id.split('/')[1]
}

function tagsFromHit(hit: GameIconHit): Array<string> {
  if (Array.isArray(hit.tags)) return hit.tags
  return hit.tags?.split(/\s+/u) ?? []
}

async function gameIconsMetadata() {
  const exportNames = Object.keys(GameIcons).toSorted()
  const output: Record<
    string,
    {
      label: string
      sourceDescriptions: Array<string>
      tags: Array<string>
      sourceUrls: Array<string>
      authors: Array<string>
      ambiguous: boolean
    }
  > = {}

  for (let offset = 0; offset < exportNames.length; offset += 50) {
    const batch = exportNames.slice(offset, offset + 50)
    // Batches stay sequential to respect the public search service instead of creating 81 bursts.
    // eslint-disable-next-line no-await-in-loop
    const response = await fetchJson<AlgoliaResponse>(ALGOLIA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-API-Key': ALGOLIA_SEARCH_KEY,
        'X-Algolia-Application-Id': ALGOLIA_APP_ID,
      },
      body: JSON.stringify({
        requests: batch.map((exportName) => ({
          indexName: ALGOLIA_INDEX,
          params: algoliaParams(exportName),
        })),
      }),
    })

    batch.forEach((exportName, index) => {
      const expectedName = canonicalName(exportName.replace(/^Gi/u, ''))
      const hits = (response.results[index]?.hits ?? []).filter((hit) => {
        const slug = hit.id?.split('/').at(-1)
        return slug ? canonicalName(slug) === expectedName : false
      })

      if (hits.length === 0) return

      output[exportName] = {
        label: hits[0]?.name ?? wordsFromExportName(exportName).join(' '),
        sourceDescriptions: unique(hits.flatMap((hit) => (hit.content ? [hit.content] : []))),
        tags: unique(hits.flatMap(tagsFromHit)),
        sourceUrls: unique(hits.flatMap((hit) => (hit.id ? [sourceUrl(hit.id)] : []))),
        authors: unique(
          hits.flatMap((hit) => {
            const author = hit.id ? authorFromId(hit.id) : undefined
            return author ? [author] : []
          }),
        ),
        ambiguous: hits.length > 1,
      }
    })

    console.log(
      `Fetched Game Icons metadata ${Math.min(offset + batch.length, exportNames.length)}/${exportNames.length}`,
    )
  }

  return Object.fromEntries(
    Object.entries(output).toSorted(([left], [right]) => left.localeCompare(right)),
  )
}

await mkdir(UPSTREAM_DIR, { recursive: true })

const [fontAwesome, gameIcons] = await Promise.all([fontAwesomeMetadata(), gameIconsMetadata()])

await Promise.all([
  writeFile(FONT_AWESOME_PATH, `${JSON.stringify(fontAwesome, null, 2)}\n`),
  writeFile(GAME_ICONS_PATH, `${JSON.stringify(gameIcons, null, 2)}\n`),
])

console.log(`Wrote ${path.relative(ROOT, FONT_AWESOME_PATH)}`)
console.log(`Wrote ${path.relative(ROOT, GAME_ICONS_PATH)}`)

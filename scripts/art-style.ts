/**
 * Prints one art style: its guide and the files of its reference pictures, for whoever generates
 * the next picture of that kind (Codex, or Claude driving Codex).
 *
 *   bun run art:style              lists the styles
 *   bun run art:style portrait     the guide and reference files as Markdown
 *   bun run art:style portrait --json
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import artStyles from '#/data/dm/art-styles'
import { artStyleReferences, type LibraryArtEntry } from '#/lib/art-styles'

import { ORIGINAL_IMAGE_SOURCES } from './image-sources'

const ROOT = path.resolve(import.meta.dirname, '..')
const CATALOG = path.join(ROOT, 'src/lib/published-library-catalog')

function libraryRecords(): LibraryArtEntry[] {
  return readdirSync(CATALOG)
    .filter((file) => file.endsWith('.json'))
    .flatMap(
      (file) => JSON.parse(readFileSync(path.join(CATALOG, file), 'utf8')) as LibraryArtEntry[],
    )
}

const originals = new Map(
  ORIGINAL_IMAGE_SOURCES.map((source) => [source.logicalSource, source.repositoryPath]),
)

/** A style with each reference resolved to its original file in this checkout. */
export function artStyleBrief(key: string) {
  const style = artStyles[key]
  if (!style) return undefined
  const references = artStyleReferences(style, libraryRecords()).flatMap((picture) => {
    const original = picture && originals.get(picture.src)
    return picture && original
      ? [
          {
            name: picture.name,
            file: path.join(ROOT, original),
            present: existsSync(path.join(ROOT, original)),
          },
        ]
      : []
  })
  return {
    key,
    name: style.name,
    use: style.use,
    canvas: style.canvas,
    guide: style.guide,
    references,
  }
}

if (import.meta.main) {
  const key = process.argv.slice(2).find((arg) => !arg.startsWith('--'))
  if (!key) {
    for (const [name, style] of Object.entries(artStyles)) console.log(`${name}\t${style.name}`)
    process.exit(0)
  }
  const brief = artStyleBrief(key)
  if (!brief) {
    console.error(`No art style "${key}". Styles: ${Object.keys(artStyles).join(', ')}`)
    process.exit(1)
  }
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(brief, null, 2))
  } else {
    console.log(`# ${brief.name}\n\n${brief.use}\n`)
    console.log(`Canvas: ${brief.canvas.width}×${brief.canvas.height} px\n`)
    console.log(brief.guide.map((line) => `- ${line}`).join('\n'))
    console.log('\n## Reference pictures\n')
    for (const reference of brief.references) {
      console.log(
        `- ${reference.name}: ${reference.file}${reference.present ? '' : ' (not fetched yet: run bun run generate:images)'}`,
      )
    }
  }
}

import process from 'node:process'

import catalogJson from '../src/icon-catalog/catalog.json'
import { searchIconCatalog } from '../src/icon-catalog/search'
import {
  ICON_CLASSIFICATIONS,
  ICON_SOURCES,
  type IconCatalog,
  type IconClassification,
  type IconSource,
} from '../src/icon-catalog/types'

type CliOptions = {
  query: string
  classifications: Array<IconClassification>
  sources?: Array<IconSource>
  limit: number
  json: boolean
}

function commaValues(value: string | undefined): Array<string> {
  return (
    value
      ?.split(',')
      .map((part) => part.trim())
      .filter(Boolean) ?? []
  )
}

function parseChoice<T extends string>(
  values: ReadonlyArray<string>,
  allowed: ReadonlyArray<T>,
  option: string,
): Array<T> {
  const invalid = values.find((value) => !allowed.includes(value as T))
  if (invalid) throw new Error(`Unknown ${option} value “${invalid}”. Use: ${allowed.join(', ')}`)
  return values as Array<T>
}

function cliOptions(args: ReadonlyArray<string>): CliOptions {
  let limit = 20
  let json = false
  let classifications: Array<IconClassification> = ['useful']
  let sources: Array<IconSource> | undefined
  const queryParts: Array<string> = []

  for (const argument of args) {
    if (argument === '--all') classifications = [...ICON_CLASSIFICATIONS]
    else if (argument === '--json') json = true
    else if (argument.startsWith('--group=')) {
      classifications = parseChoice(
        commaValues(argument.slice('--group='.length)),
        ICON_CLASSIFICATIONS,
        '--group',
      )
    } else if (argument.startsWith('--source=')) {
      sources = parseChoice(
        commaValues(argument.slice('--source='.length)),
        ICON_SOURCES,
        '--source',
      )
    } else if (argument.startsWith('--limit=')) {
      limit = Number.parseInt(argument.slice('--limit='.length), 10)
      if (!Number.isFinite(limit) || limit < 1)
        throw new Error('--limit must be a positive integer')
    } else if (argument !== '--') queryParts.push(argument)
  }

  return { query: queryParts.join(' '), classifications, sources, limit, json }
}

function printHelp(): void {
  console.log(`Search the project icon catalog.

Usage:
  bun run icons:search -- "dragon fire"
  bun run icons:search -- "arrow left" --source=lucide --limit=8
  bun run icons:search -- "modern weapon" --all

Options:
  --all               Include every review group (default: useful only)
  --group=<groups>    useful, questionable, or marked-for-deletion
  --source=<sources>  lucide, fa, gi, or custom
  --limit=<count>     Maximum results (default: 20)
  --json              Print machine-readable entries`)
}

try {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    printHelp()
  } else {
    const options = cliOptions(process.argv.slice(2))
    if (!options.query) throw new Error('Provide a concept to search for, or use --help.')

    const catalog = catalogJson as IconCatalog
    const results = searchIconCatalog(catalog.entries, options)

    if (options.json) console.log(JSON.stringify(results, null, 2))
    else if (results.length === 0) console.log('No matching icons in the selected review groups.')
    else {
      for (const entry of results) {
        const context = entry.useCases.slice(0, 2).join('; ') || entry.description
        const duplicate = entry.duplicateOf ? ` · duplicate of ${entry.duplicateOf}` : ''
        console.log(
          `${entry.id} · ${entry.classification}${duplicate}\n  ${entry.label}: ${context}`,
        )
      }
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}

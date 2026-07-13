import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import catalogJson from '../src/icon-catalog/catalog.json'
import { parseIconClassificationCommand } from '../src/icon-catalog/classification-command'
import type {
  IconCatalog,
  IconCatalogOverride,
  IconClassification,
} from '../src/icon-catalog/types'
import { generateIconCatalog } from './generate-icon-catalog'

const ROOT = path.resolve(import.meta.dirname, '..')
const OVERRIDES_PATH = path.join(ROOT, 'src/icon-catalog/overrides.json')

const MANUAL_REASONS: Readonly<Record<IconClassification, string>> = {
  useful: 'Manually classified as useful from the /_icons review page.',
  questionable: 'Manually classified as questionable from the /_icons review page.',
  'marked-for-deletion': 'Manually marked for deletion from the /_icons review page.',
}

function printHelp(): void {
  console.log(`Apply manual review decisions to the icon catalog.

Usage:
  bun run icons:classify -- --useful='gi/GiDragonHead,lucide/ArrowLeft' \\
    --questionable='fa/FaFlask' --delete='fa/FaFacebook'

Parameters:
  --useful=<ids>       Comma-separated catalog IDs to classify as useful
  --questionable=<ids> Comma-separated catalog IDs to classify as questionable
  --delete=<ids>       Comma-separated IDs to mark for deletion; no files are deleted
  --dry-run            Validate and report changes without writing them
  --help               Show this help`)
}

async function main(): Promise<void> {
  const parsed = parseIconClassificationCommand(process.argv.slice(2))
  if (parsed.help) {
    printHelp()
    return
  }

  const decisions = (
    Object.entries(parsed.selections) as Array<[IconClassification, ReadonlyArray<string>]>
  ).flatMap(([classification, ids]) => ids.map((id) => ({ id, classification })))
  if (decisions.length === 0) {
    throw new Error('No icon decisions supplied. Use --help for command examples.')
  }

  const decisionById = new Map<string, IconClassification>()
  for (const decision of decisions) {
    const existing = decisionById.get(decision.id)
    if (existing && existing !== decision.classification) {
      throw new Error(
        `Icon ${decision.id} appears in both ${existing} and ${decision.classification}.`,
      )
    }
    decisionById.set(decision.id, decision.classification)
  }

  const catalog = catalogJson as IconCatalog
  const catalogIds = new Set(catalog.entries.map(({ id }) => id))
  const unknownId = decisions.find(({ id }) => !catalogIds.has(id))?.id
  if (unknownId) throw new Error(`Unknown icon ID ${unknownId}. Search with bun run icons:search.`)

  const overrides = JSON.parse(await readFile(OVERRIDES_PATH, 'utf8')) as Record<
    string,
    IconCatalogOverride
  >
  const updatedOverrides = { ...overrides }

  for (const [id, classification] of decisionById) {
    updatedOverrides[id] = {
      ...updatedOverrides[id],
      classification,
      classificationReason: MANUAL_REASONS[classification],
    }
  }

  const summary = Object.entries(parsed.selections)
    .filter(([, ids]) => ids.length > 0)
    .map(([classification, ids]) => `${classification}: ${ids.length}`)
    .join(', ')

  if (parsed.dryRun) {
    console.log(`Validated ${decisionById.size} icon decisions (${summary}). No files changed.`)
    return
  }

  const orderedOverrides = Object.fromEntries(
    Object.entries(updatedOverrides).toSorted(([left], [right]) => left.localeCompare(right)),
  )
  await writeFile(OVERRIDES_PATH, `${JSON.stringify(orderedOverrides, null, 2)}\n`)
  await generateIconCatalog()
  console.log(
    `Applied ${decisionById.size} icon decisions (${summary}) and regenerated the catalog.`,
  )
}

try {
  await main()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}

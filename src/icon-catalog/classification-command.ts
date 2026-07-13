import type { IconClassification } from './types'

export type IconClassificationSelectionLists = Record<IconClassification, ReadonlyArray<string>>

export type ParsedIconClassificationCommand = {
  selections: IconClassificationSelectionLists
  dryRun: boolean
  help: boolean
}

const COMMAND_OPTIONS = [
  { classification: 'useful', flag: '--useful' },
  { classification: 'questionable', flag: '--questionable' },
  { classification: 'marked-for-deletion', flag: '--delete' },
] as const

const CLASSIFICATION_SHORTCUTS: Readonly<Record<string, IconClassification>> = {
  u: 'useful',
  q: 'questionable',
  d: 'marked-for-deletion',
}

function uniqueSorted(values: ReadonlyArray<string>): Array<string> {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].toSorted()
}

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'"'"'`)}'`
}

export function emptyIconClassificationSelections(): Record<IconClassification, Array<string>> {
  return {
    useful: [],
    questionable: [],
    'marked-for-deletion': [],
  }
}

export function iconClassificationForShortcut(key: string): IconClassification | undefined {
  return CLASSIFICATION_SHORTCUTS[key.toLocaleLowerCase()]
}

export function buildIconClassificationCommand(
  selections: IconClassificationSelectionLists,
): string {
  const parameters = COMMAND_OPTIONS.flatMap(({ classification, flag }) => {
    const ids = uniqueSorted(selections[classification])
    return ids.length > 0 ? [`${flag}=${shellQuote(ids.join(','))}`] : []
  })

  return ['bun run icons:classify --', ...parameters].join(' ')
}

export function parseIconClassificationCommand(
  args: ReadonlyArray<string>,
): ParsedIconClassificationCommand {
  const selections = emptyIconClassificationSelections()
  let dryRun = false
  let help = false

  for (const argument of args) {
    if (argument === '--') continue
    if (argument === '--dry-run') {
      dryRun = true
      continue
    }
    if (argument === '--help' || argument === '-h') {
      help = true
      continue
    }

    const option = COMMAND_OPTIONS.find(({ flag }) => argument.startsWith(`${flag}=`))
    if (!option) {
      throw new Error(
        `Unknown argument “${argument}”. Use --useful=, --questionable=, --delete=, or --dry-run.`,
      )
    }

    selections[option.classification].push(
      ...argument
        .slice(option.flag.length + 1)
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    )
  }

  for (const classification of Object.keys(selections) as Array<IconClassification>) {
    selections[classification] = uniqueSorted(selections[classification])
  }

  return { selections, dryRun, help }
}

import { readdirSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(import.meta.dirname, '..')
export const GENERATED_REFS_PATH = path.join(ROOT, 'src/data/generated/refs.ts')
export const GENERATED_LIBRARY_REFS_PATH = path.join(ROOT, 'src/data/generated/library-refs.ts')
export const GENERATED_SPELL_NAMES_PATH = path.join(ROOT, 'src/data/generated/spell-names.ts')
export const GENERATED_MONSTER_BOOKS_PATH = path.join(ROOT, 'src/data/generated/monster-books.ts')
const LIBRARY_PATH = path.join(ROOT, 'src/data/library')
const ENTITY_KINDS_PATH = path.join(ROOT, 'src/definitions/kind.ts')

const COLLECTIONS = [
  { kind: 'beast', plural: 'beasts', typeName: 'BeastKey' },
  { kind: 'event', plural: 'events', typeName: 'EventKey' },
  { kind: 'npc', plural: 'npcs', typeName: 'NpcKey' },
  { kind: 'pc', plural: 'pcs', typeName: 'PcKey' },
  { kind: 'location', plural: 'locations', typeName: 'LocationKey' },
  { kind: 'quest', plural: 'quests', typeName: 'QuestKey' },
  { kind: 'session', plural: 'sessions', typeName: 'SessionKey' },
  { kind: 'organization', plural: 'organizations', typeName: 'OrganizationKey' },
  { kind: 'item', plural: 'items', typeName: 'ItemKey' },
  { kind: 'effect', plural: 'effects', typeName: 'EffectKey' },
  { kind: 'card', plural: 'cards', typeName: 'CardKey' },
  { kind: 'arc', plural: 'arcs', typeName: 'ArcKey' },
  { kind: 'scene', plural: 'scenes', typeName: 'SceneKey' },
  { kind: 'creature', plural: 'creatures', typeName: 'CreatureKey' },
  { kind: 'rule', plural: 'rules', typeName: 'RuleKey' },
] as const

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/

export const REFERENCE_SOURCE_PATHS = [
  ENTITY_KINDS_PATH,
  path.join(LIBRARY_PATH, 'publications.ts'),
  ...readdirSync(path.join(LIBRARY_PATH, 'spells'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.join(LIBRARY_PATH, 'spells', file)),
  ...readdirSync(path.join(LIBRARY_PATH, 'magic-items'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.join(LIBRARY_PATH, 'magic-items', file)),
  ...readdirSync(path.join(LIBRARY_PATH, 'equipment'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.join(LIBRARY_PATH, 'equipment', file)),
  ...readdirSync(path.join(LIBRARY_PATH, 'monsters'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.join(LIBRARY_PATH, 'monsters', file)),
  ...COLLECTIONS.map(({ plural }) => path.join(ROOT, 'src/data', plural, '_index.ts')),
]

async function registryKeys(plural: string): Promise<string[]> {
  const registryPath = path.join(ROOT, 'src/data', plural, '_index.ts')
  const source = await readFile(registryPath, 'utf8')
  const match = /export default\s*\{(?<body>[\s\S]*?)\}/u.exec(source)

  if (!match?.groups) {
    throw new Error(
      `Could not find the default registry object in ${path.relative(ROOT, registryPath)}`,
    )
  }

  const keys = match.groups.body
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  const invalidKey = keys.find((key) => !IDENTIFIER.test(key))
  if (invalidKey) {
    throw new Error(
      `Unsupported registry entry ${JSON.stringify(invalidKey)} in ${path.relative(ROOT, registryPath)}; use shorthand identifier entries`,
    )
  }

  if (new Set(keys).size !== keys.length) {
    throw new Error(`Duplicate registry entry in ${path.relative(ROOT, registryPath)}`)
  }

  return keys
}

async function assertAllEntityKindsAreConfigured(): Promise<void> {
  const source = await readFile(ENTITY_KINDS_PATH, 'utf8')
  const entityKinds = ['ENTITY_KINDS', 'DM_ENTITY_KINDS', 'GLOSSARY_KINDS'].flatMap((constant) => {
    const match = new RegExp(
      `export const ${constant}\\s*=\\s*\\[(?<body>[\\s\\S]*?)\\]\\s*as const`,
      'u',
    ).exec(source)
    if (!match?.groups?.body) {
      throw new Error(`Could not read ${constant} from ${path.relative(ROOT, ENTITY_KINDS_PATH)}`)
    }
    return [...match.groups.body.matchAll(/['"](?<kind>[\w-]+)['"]/gu)].map(
      ({ groups }) => groups?.kind,
    )
  })
  const configuredKinds = COLLECTIONS.map(({ kind }) => kind)

  if (
    entityKinds.length !== configuredKinds.length ||
    entityKinds.some(
      (kind) => !kind || !configuredKinds.includes(kind as (typeof configuredKinds)[number]),
    )
  ) {
    throw new Error(
      `Reference generator collections do not match ENTITY_KINDS. Expected: ${entityKinds.join(', ')}`,
    )
  }
}

function referenceEntry(kind: string, key: string): string {
  const entry = `    ${key}: ref('${kind}', '${key}'),`

  return entry.length <= 100 ? entry : `    ${key}: ref(\n      '${kind}',\n      '${key}',\n    ),`
}

async function generatedSource(): Promise<string> {
  await assertAllEntityKindsAreConfigured()

  const collections = await Promise.all(
    COLLECTIONS.map(async ({ kind, plural, typeName }) => ({
      kind,
      plural,
      typeName,
      keys: await registryKeys(plural),
    })),
  )

  const namespaces = collections
    .map(({ kind, plural, keys }) =>
      keys.length
        ? `  ${plural}: {\n${keys.map((key) => referenceEntry(kind, key)).join('\n')}\n  },`
        : `  ${plural}: {},`,
    )
    .join('\n')

  const keyTypes = collections
    .map(({ plural, typeName }) => `export type ${typeName} = keyof typeof refs.${plural}`)
    .join('\n')

  return `// GENERATED FILE — DO NOT EDIT.
// Generated by \`bun run generate:refs\` from the entity registries in \`src/data/*/_index.ts\`.
// Regenerate after adding, removing, renaming, or re-keying any referenceable entity.

import type { AnyKind, EntityRef } from '#/definitions/kind.ts'

function ref<K extends AnyKind>(kind: K, key: string): EntityRef<K> {
  return { ref: kind, key }
}

export const refs = {
${namespaces}
} as const

${keyTypes}
`
}

/** Top-level keys of a library data object, read at a fixed indent so no module is imported. */
function libraryKeys(source: string, indent: string): string[] {
  return [...source.matchAll(new RegExp(`^${indent}([a-z][a-z0-9_]*): \\{$`, 'gmu'))].map(
    ([, key]) => key!,
  )
}

/**
 * The library's refs live in their own file, so campaign pages never load thousands of library
 * keys. A monster's key is shared by every publication that prints it.
 */
export async function generatedLibrarySource(): Promise<string> {
  const publications = libraryKeys(
    await readFile(path.join(LIBRARY_PATH, 'publications.ts'), 'utf8'),
    '  ',
  )
  const monsterDir = path.join(LIBRARY_PATH, 'monsters')
  // The registry lists the publication modules; the lookup in src/lib reads the same list.
  const registry = await readFile(path.join(monsterDir, '_index.ts'), 'utf8')
  const files = [...registry.matchAll(/from '\.\/(?<file>[\w-]+\.ts)'/gu)].map(
    ({ groups }) => groups!.file!,
  )
  const monsters = new Set<string>()
  for (const file of files)
    for (const key of libraryKeys(await readFile(path.join(monsterDir, file), 'utf8'), '    '))
      monsters.add(key)
  const spellSource = await spellModulesSource()
  const spells = libraryKeys(spellSource, '  ')
  const magicItems = libraryKeys(await registrySource('magic-items'), '  ')
  const equipment = libraryKeys(await registrySource('equipment'), '  ')
  const namespace = (kind: string, plural: string, keys: Iterable<string>) =>
    `  ${plural}: {\n${[...keys]
      .toSorted()
      .map((key) => referenceEntry(kind, key))
      .join('\n')}\n  },`
  return `// GENERATED FILE — DO NOT EDIT.
// Generated by \`bun run generate:refs\` from \`src/data/library\`.

import type { EntityRef, LibraryKind } from '#/definitions/kind.ts'

function ref<K extends LibraryKind>(kind: K, key: string): EntityRef<K> {
  return { ref: kind, key }
}

export const refs = {
${namespace('publication', 'publications', publications)}
${namespace('monster', 'monsters', monsters)}
${namespace('spell', 'spells', spells)}
${namespace('magicItem', 'magicItems', magicItems)}
${namespace('equipment', 'equipment', equipment)}
} as const

export type PublicationKey = keyof typeof refs.publications
export type MonsterKey = keyof typeof refs.monsters
export type SpellKey = keyof typeof refs.spells
`
}

/**
 * Each spell's printed name, so rules text shows a spell ref by name without loading the spell
 * list. Kept apart from the library refs so campaign pages carry only these few kilobytes.
 */
/** The spell modules the registry lists. */
async function spellModuleFiles() {
  const registry = await readFile(path.join(LIBRARY_PATH, 'spells', '_index.ts'), 'utf8')
  return [...registry.matchAll(/from '\.\/(?<file>[\w-]+)\.ts'/gu)].map(
    ({ groups }) => groups!.file!,
  )
}

/** Every spell module the registry lists, read as one text. */
async function spellModulesSource() {
  return registrySource('spells')
}

/** Every module a library registry (`<folder>/_index.ts`) lists, read as one text. */
async function registrySource(folder: string) {
  const spellDir = path.join(LIBRARY_PATH, folder)
  const registry = await readFile(path.join(spellDir, '_index.ts'), 'utf8')
  const files = [...registry.matchAll(/from '\.\/(?<file>[\w-]+\.ts)'/gu)].map(
    ({ groups }) => groups!.file!,
  )
  const sources = await Promise.all(
    files.map((file) => readFile(path.join(spellDir, file), 'utf8')),
  )
  return sources.join('\n')
}

export async function generatedSpellNamesSource(): Promise<string> {
  // Which module holds each spell, so a spell's text loads alone with its book.
  const books: string[] = []
  for (const file of await spellModuleFiles()) {
    const text = await readFile(path.join(LIBRARY_PATH, 'spells', `${file}.ts`), 'utf8')
    for (const key of libraryKeys(text, '  ')) books.push(`  ${key}: '${file}',`)
  }
  const source = await spellModulesSource()
  const names = [...source.matchAll(/^ {2}([a-z0-9_]+): \{\n {4}name: (['"])(.+?)\2,$/gmu)].map(
    // Quoted as the formatter writes them, so the check compares like with like.
    ([, key, , name]) =>
      `  ${key}: ${name!.includes("'") ? JSON.stringify(name) : `'${name!.replaceAll('\\', '\\\\')}'`},`,
  )
  return `// GENERATED FILE — DO NOT EDIT.
// Generated by \`bun run generate:refs\` from \`src/data/library/spells\`.

export const spellNames: Readonly<Record<string, string>> = {
${names.join('\n')}
}

/** The spell module (src/data/library/spells) that holds each spell. */
export const spellBooks: Readonly<Record<string, string>> = {
${books.join('\n')}
}
`
}

/**
 * Which module holds each monster's printings and which publications reprint each one, so a
 * library page loads only the one book whose stat block it shows.
 */
export async function generatedMonsterBooksSource(): Promise<string> {
  const monsterDir = path.join(LIBRARY_PATH, 'monsters')
  const registry = await readFile(path.join(monsterDir, '_index.ts'), 'utf8')
  const files = [...registry.matchAll(/from '\.\/(?<file>[\w-]+)\.ts'/gu)].map(
    ({ groups }) => groups!.file!,
  )
  const books: string[] = []
  const printings = new Map<string, string[]>()
  for (const file of files) {
    const text = await readFile(path.join(monsterDir, `${file}.ts`), 'utf8')
    const publication = /^ {2}publication: refs\.publications\.([a-z0-9_]+),$/mu.exec(text)?.[1]
    if (!publication) throw new Error(`${file}.ts names no publication`)
    const book = `  ${publication}: '${file}',`
    // Written as the formatter lays it out, so the check compares like with like.
    books.push(book.length > 100 ? `  ${publication}:\n    '${file}',` : book)
    // Each monster's block runs from its key to the next one; its reprints sit one level in.
    const keys = [...text.matchAll(/^ {4}([a-z][a-z0-9_]*): \{$/gmu)]
    keys.forEach((match, index) => {
      const block = text.slice(match.index, keys[index + 1]?.index ?? text.length)
      const list = /^ {6}reprintedIn: \[([^\]]*)\]/mu.exec(block)?.[1] ?? ''
      const reprints = [...list.matchAll(/refs\.publications\.([a-z0-9_]+)/gu)].map(
        ([, key]) => key,
      )
      const quoted = reprints.map((key) => `'${key}'`)
      const inline = `    ${publication}: [${quoted.join(', ')}],`
      const entry =
        inline.length > 100
          ? `    ${publication}: [\n${quoted.map((key) => `      ${key},`).join('\n')}\n    ],`
          : inline
      printings.set(match[1]!, [...(printings.get(match[1]!) ?? []), entry])
    })
  }
  const monsters = [...printings]
    .toSorted(([left], [right]) => left.localeCompare(right))
    .map(([key, entries]) => `  ${key}: {\n${entries.join('\n')}\n  },`)
  return `// GENERATED FILE — DO NOT EDIT.
// Generated by \`bun run generate:refs\` from \`src/data/library/monsters\`.

/** The monster module (src/data/library/monsters) that holds each publication's stat blocks. */
export const monsterBooks: Readonly<Record<string, string>> = {
${books.join('\n')}
}

/** The publications that reprint a publication's stat block unchanged, by that publication. */
type Reprints = Readonly<Record<string, readonly string[]>>

/** The publications that hold a stat block for each monster, with each one's reprints. */
export const monsterPrintings: Readonly<Record<string, Reprints>> = {
${monsters.join('\n')}
}
`
}

export const GENERATED_MAGIC_ITEM_NAMES_PATH = path.join(
  ROOT,
  'src/data/generated/magic-item-names.ts',
)

export const GENERATED_EQUIPMENT_NAMES_PATH = path.join(
  ROOT,
  'src/data/generated/equipment-names.ts',
)

/**
 * Each item's printed name and the module that holds it, for one library folder (magic items or
 * equipment), so the encounter tracker can find an item by name and load only its book.
 */
async function generatedItemNamesSource(
  folder: string,
  prefix: string,
  what: string,
): Promise<string> {
  const dir = path.join(LIBRARY_PATH, folder)
  const registry = await readFile(path.join(dir, '_index.ts'), 'utf8')
  const files = [...registry.matchAll(/from '\.\/(?<file>[\w-]+)\.ts'/gu)].map(
    ({ groups }) => groups!.file!,
  )
  const names: string[] = []
  const books: string[] = []
  for (const file of files) {
    const text = await readFile(path.join(dir, `${file}.ts`), 'utf8')
    for (const [, key, , name] of text.matchAll(
      /^ {2}([a-z0-9_]+): \{\n {4}name: (['"])(.+?)\2,$/gmu,
    )) {
      const quoted = name!.includes("'")
        ? JSON.stringify(name)
        : `'${name!.replaceAll('\\', '\\\\')}'`
      // Wrapped as the formatter wraps a line past 100 characters.
      const line = `  ${key}: ${quoted},`
      names.push(line.length > 100 ? `  ${key}:\n    ${quoted},` : line)
      books.push(`  ${key}: '${file}',`)
    }
  }
  return `// GENERATED FILE — DO NOT EDIT.
// Generated by \`bun run generate:refs\` from \`src/data/library/${folder}\`.

export const ${prefix}Names: Readonly<Record<string, string>> = {
${names.join('\n')}
}

/** The module (src/data/library/${folder}) that holds each ${what}. */
export const ${prefix}Books: Readonly<Record<string, string>> = {
${books.join('\n')}
}
`
}

export const generatedMagicItemNamesSource = () =>
  generatedItemNamesSource('magic-items', 'magicItem', 'magic item')

export const generatedEquipmentNamesSource = () =>
  generatedItemNamesSource('equipment', 'equipment', 'piece of equipment')

export async function writeGenerated(target: string, expected: string, check?: boolean) {
  const current = await readFile(target, 'utf8').catch(() => '')
  if (current === expected) return false
  if (check)
    throw new Error(
      'Generated references are stale. Run `bun run generate:refs` and commit the result.',
    )
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, expected)
  return true
}

export async function generateRefs(options: { check?: boolean } = {}): Promise<boolean> {
  const campaign = await writeGenerated(GENERATED_REFS_PATH, await generatedSource(), options.check)
  const library = await writeGenerated(
    GENERATED_LIBRARY_REFS_PATH,
    await generatedLibrarySource(),
    options.check,
  )
  const spellNames = await writeGenerated(
    GENERATED_SPELL_NAMES_PATH,
    await generatedSpellNamesSource(),
    options.check,
  )
  const monsterBooks = await writeGenerated(
    GENERATED_MONSTER_BOOKS_PATH,
    await generatedMonsterBooksSource(),
    options.check,
  )
  const magicItemNames = await writeGenerated(
    GENERATED_MAGIC_ITEM_NAMES_PATH,
    await generatedMagicItemNamesSource(),
    options.check,
  )
  const equipmentNames = await writeGenerated(
    GENERATED_EQUIPMENT_NAMES_PATH,
    await generatedEquipmentNamesSource(),
    options.check,
  )
  return campaign || library || spellNames || monsterBooks || magicItemNames || equipmentNames
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : undefined
const isCli = invokedPath === fileURLToPath(import.meta.url)

if (isCli) {
  const checkOnly = process.argv.includes('--check')

  try {
    const changed = await generateRefs({ check: checkOnly })
    if (!checkOnly) {
      console.log(
        changed
          ? `Generated ${path.relative(ROOT, GENERATED_REFS_PATH)}`
          : `${path.relative(ROOT, GENERATED_REFS_PATH)} is already current`,
      )
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}

import { readFileSync } from 'node:fs'

import equipmentBooks from '#/data/library/equipment/_index'
import magicItemBooks from '#/data/library/magic-items/_index'
import publications from '#/data/library/publications'
import spellBooks from '#/data/library/spells/_index'
import type { EntityRef, LibraryKind } from '#/definitions/kind'
import type {
  Equipment,
  ItemEffect,
  MagicItem,
  MonsterPrinting,
  Spell,
  SpellEffect,
} from '#/definitions/library'
import type { Ability, PrintedStatBlock } from '#/definitions/stat-block'

import { abilityTextSegments, plainAbilityText } from './dm-ability-text'
import { printingsByMonster } from './library-monsters'
import type { LibrarySearchType } from './library-search-types'
import { libraryTypes, type LibraryType } from './published-library-routing'
import { rules } from './rules'
import { abilitySummary, deriveStatBlock, formatSpeed, plainStatParts, signed } from './stat-block'

/**
 * Read-only knowledge of the published library for the campaign MCP server: the catalog `/library`
 * shows (creatures, items, species, NPCs, rules, encounter ideas) and the typed library under
 * `src/data/library` (monsters, spells, magic items, equipment). It reads the catalog JSON and the
 * typed modules directly, so it runs under Bun without Vite's virtual modules or globs.
 */

type Section = { title: string; lines: readonly string[] }
type TypedPointer =
  | { monster: EntityRef<'monster'>; publication: EntityRef<'publication'> }
  | { magicItem: EntityRef<'magicItem'>; publication: EntityRef<'publication'> }
  | { equipment: EntityRef<'equipment'>; publication: EntityRef<'publication'> }
type CatalogPrinting = {
  id: string
  label: string
  edition?: string
  variantName?: string
  status?: string
  source?: string
  player?: readonly Section[]
  gm?: readonly Section[]
  typed?: TypedPointer
}
type CatalogRecord = {
  type: LibraryType
  slug: string
  name: string
  summary: string
  group: string
  groups?: readonly string[]
  price?: string
  gmOnly?: boolean
  printings: readonly CatalogPrinting[]
}

type TypedRef = EntityRef<'monster' | 'spell' | 'magicItem' | 'equipment'>

/** One thing search can find: a catalog entry, a spell, or a typed entry no catalog entry shows. */
type Entry = {
  id: string
  name: string
  type: LibrarySearchType
  groups: readonly string[]
  summary: string
  gmOnly: boolean
  catalog?: CatalogRecord
  typed: readonly TypedRef[]
}

const CATALOG_FILES = ['entries', 'monsters-a-f', 'monsters-g-p', 'monsters-q-z']

const PLURAL: Record<TypedRef['ref'], string> = {
  monster: 'monsters',
  spell: 'spells',
  magicItem: 'magicItems',
  equipment: 'equipment',
}

const spells: Readonly<Record<string, Spell>> = Object.assign({}, ...spellBooks)
const magicItems: Readonly<Record<string, MagicItem>> = Object.assign({}, ...magicItemBooks)
const equipment: Readonly<Record<string, Equipment>> = Object.assign({}, ...equipmentBooks)

function normalize(text: string) {
  return text.normalize('NFKD').replaceAll(/\p{M}/gu, '').toLowerCase()
}

function wordsOf(text: string) {
  return normalize(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
}

function refId(ref: TypedRef) {
  return `${ref.ref}:${ref.key}`
}

function pointerRef(typed: TypedPointer): TypedRef {
  if ('monster' in typed) return typed.monster
  if ('magicItem' in typed) return typed.magicItem
  return typed.equipment
}

function typedName(ref: TypedRef): string | undefined {
  if (ref.ref === 'spell') return spells[ref.key]?.name
  if (ref.ref === 'magicItem') return magicItems[ref.key]?.name
  if (ref.ref === 'equipment') return equipment[ref.key]?.name
  const printing = printingsByMonster.get(ref.key)?.values().next().value
  return printing?.name
}

function typedExists(ref: TypedRef) {
  if (ref.ref === 'spell') return Object.hasOwn(spells, ref.key)
  if (ref.ref === 'magicItem') return Object.hasOwn(magicItems, ref.key)
  if (ref.ref === 'equipment') return Object.hasOwn(equipment, ref.key)
  return printingsByMonster.has(ref.key)
}

// ─── The index ─────────────────────────────────────────────────────────────────────────────────

type Index = {
  entries: readonly Entry[]
  byId: ReadonlyMap<string, Entry>
  /** Typed ref (`monster:goblin`) to the entries that show it. */
  byTyped: ReadonlyMap<string, Entry[]>
  byName: ReadonlyMap<string, Entry[]>
  longestName: number
}

let loadedIndex: Index | undefined

function catalogRecords(): CatalogRecord[] {
  return CATALOG_FILES.flatMap(
    (file) =>
      JSON.parse(
        readFileSync(new URL(`./published-library-catalog/${file}.json`, import.meta.url), 'utf8'),
      ) as CatalogRecord[],
  )
}

function buildIndex(): Index {
  const entries: Entry[] = []
  const covered = new Set<string>()
  for (const record of catalogRecords()) {
    const typed = record.printings.flatMap((printing) =>
      printing.typed ? [pointerRef(printing.typed)] : [],
    )
    for (const ref of typed) covered.add(refId(ref))
    entries.push({
      id: `${record.type}/${record.slug}`,
      name: record.name,
      type: record.type,
      groups: record.groups ?? [record.group],
      summary: record.summary,
      gmOnly: record.gmOnly === true,
      catalog: record,
      typed,
    })
  }
  for (const [key, spell] of Object.entries(spells))
    entries.push({
      id: `spells/${key}`,
      name: spell.name,
      type: 'spells',
      groups: [spellLevel(spell)],
      summary: `${spellLevel(spell)} ${spell.school}`,
      gmOnly: false,
      typed: [{ ref: 'spell', key }],
    })
  // Typed entries that no catalog entry shows yet are still findable by their ref.
  const orphans: [TypedRef, string, LibrarySearchType, string][] = [
    ...[...printingsByMonster].map(
      ([key, printings]): [TypedRef, string, LibrarySearchType, string] => {
        const printing = printings.values().next().value!
        return [{ ref: 'monster', key }, printing.name, 'monsters', printing.stats.type]
      },
    ),
    ...Object.entries(magicItems).map(
      ([key, item]): [TypedRef, string, LibrarySearchType, string] => [
        { ref: 'magicItem', key },
        item.name,
        'items',
        item.category,
      ],
    ),
    ...Object.entries(equipment).map(
      ([key, item]): [TypedRef, string, LibrarySearchType, string] => [
        { ref: 'equipment', key },
        item.name,
        'items',
        item.category,
      ],
    ),
  ]
  for (const [ref, name, type, group] of orphans) {
    if (covered.has(refId(ref))) continue
    entries.push({
      id: refId(ref),
      name,
      type,
      groups: [group],
      summary: '',
      gmOnly: true,
      typed: [ref],
    })
  }

  const byId = new Map(entries.map((entry) => [entry.id, entry]))
  const byTyped = new Map<string, Entry[]>()
  const byName = new Map<string, Entry[]>()
  let longestName = 1
  for (const entry of entries) {
    for (const ref of entry.typed)
      byTyped.set(refId(ref), [...(byTyped.get(refId(ref)) ?? []), entry])
    const name = wordsOf(entry.name).join(' ')
    byName.set(name, [...(byName.get(name) ?? []), entry])
    longestName = Math.max(longestName, name.split(' ').length)
  }
  return { entries, byId, byTyped, byName, longestName }
}

function libraryIndex(): Index {
  loadedIndex ??= buildIndex()
  return loadedIndex
}

let searchText: Map<string, string> | undefined

/** Every word an entry holds, printed text and typed rules included; built on the first search. */
function textOf(entry: Entry): string {
  searchText ??= new Map(
    libraryIndex().entries.map((candidate) => [candidate.id, normalize(entryWords(candidate))]),
  )
  return searchText.get(entry.id) ?? ''
}

function entryWords(entry: Entry): string {
  const parts = [entry.name, entry.summary, ...entry.groups]
  for (const printing of entry.catalog?.printings ?? [])
    for (const section of [...(printing.player ?? []), ...(printing.gm ?? [])])
      parts.push(section.title, ...section.lines)
  for (const ref of entry.typed) parts.push(typedWords(ref))
  return parts.join(' ')
}

function typedWords(ref: TypedRef): string {
  if (ref.ref === 'spell') {
    const spell = spells[ref.key]
    return spell ? [spell.school, ...spell.classes, contentText(spell.text)].join(' ') : ''
  }
  if (ref.ref === 'magicItem' || ref.ref === 'equipment') {
    const item = ref.ref === 'magicItem' ? magicItems[ref.key] : equipment[ref.key]
    return item ? [item.category, item.detail ?? '', contentText(item.text)].join(' ') : ''
  }
  return [...(printingsByMonster.get(ref.key)?.values() ?? [])]
    .flatMap((printing) => [
      printing.name,
      printing.stats.type,
      ...(printing.tags ?? []),
      ...(printing.habitats ?? []),
      ...allAbilities(printing.stats).map((ability) => ability.name),
      contentText(printing.appearance),
      contentText(printing.lore),
    ])
    .join(' ')
}

// ─── Facts search filters on ───────────────────────────────────────────────────────────────────

const CR_VALUES: Record<string, number> = { '0': 0, '1/8': 0.125, '1/4': 0.25, '1/2': 0.5 }

function crNumber(text: string): number | undefined {
  const value = CR_VALUES[text] ?? Number(text)
  return Number.isFinite(value) ? value : undefined
}

function printedLine(entry: Entry, label: string): string | undefined {
  for (const printing of entry.catalog?.printings ?? [])
    for (const section of [...(printing.gm ?? []), ...(printing.player ?? [])])
      for (const line of section.lines)
        if (line.startsWith(`${label} · `)) return line.slice(label.length + 3)
  return undefined
}

function monsterOf(ref: TypedRef): MonsterPrinting | undefined {
  return ref.ref === 'monster' ? printingsByMonster.get(ref.key)?.values().next().value : undefined
}

function challengeOf(entry: Entry): string | undefined {
  for (const ref of entry.typed) {
    const monster = monsterOf(ref)
    if (monster) return monster.stats.cr
  }
  return printedLine(entry, 'Challenge')?.split(/[\s(]/u)[0]
}

function rarityOf(entry: Entry): string | undefined {
  for (const ref of entry.typed) if (ref.ref === 'magicItem') return magicItems[ref.key]?.rarity
  return printedLine(entry, 'Rarity')?.toLowerCase()
}

function spellLevelOf(entry: Entry): number | undefined {
  const ref = entry.typed.find((typed) => typed.ref === 'spell')
  return ref ? spells[ref.key]?.level : undefined
}

function spellLevel(spell: Spell) {
  return spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`
}

/** "Goblin [monsters/goblin] Creatures · Humanoid · CR 1/4 · DM-only" */
function entryLine(entry: Entry): string {
  const challenge = entry.type === 'monsters' ? challengeOf(entry) : undefined
  const rarity = entry.type === 'items' ? rarityOf(entry) : undefined
  const typed =
    entry.typed.length > 0 ? `typed: ${[...new Set(entry.typed.map(refText))].join(', ')}` : ''
  const facts = [
    entry.type === 'spells' ? 'Spell' : libraryTypes[entry.type],
    entry.groups.join(', '),
    challenge ? `CR ${challenge}` : '',
    rarity ?? '',
    entry.catalog?.price ?? '',
    entry.gmOnly ? 'DM-only' : '',
    typed,
  ].filter(Boolean)
  return `${entry.name} [${entry.id}] ${facts.join(' · ')}${entry.summary && entry.type !== 'spells' ? `\n  ${entry.summary}` : ''}`
}

function refText(ref: TypedRef) {
  return `refs.${PLURAL[ref.ref]}.${ref.key}`
}

export type LibrarySearchOptions = {
  type?: LibrarySearchType
  group?: string
  crMin?: string
  crMax?: string
  spellLevel?: number
  rarity?: string
  limit?: number
}

/** Entries matching every word of a query and the filters, best name matches first. */
export function librarySearch(query: string, options: LibrarySearchOptions = {}): string {
  const { entries } = libraryIndex()
  const words = wordsOf(query)
  const term = words.join(' ')
  const crMin = options.crMin === undefined ? undefined : crNumber(options.crMin)
  const crMax = options.crMax === undefined ? undefined : crNumber(options.crMax)
  const group = options.group && normalize(options.group)
  const found = entries.filter((entry) => {
    if (options.type && entry.type !== options.type) return false
    if (group && !entry.groups.some((candidate) => normalize(candidate) === group)) return false
    if (crMin !== undefined || crMax !== undefined) {
      const challenge = challengeOf(entry)
      const value = challenge === undefined ? undefined : crNumber(challenge)
      if (value === undefined) return false
      if (crMin !== undefined && value < crMin) return false
      if (crMax !== undefined && value > crMax) return false
    }
    if (options.spellLevel !== undefined && spellLevelOf(entry) !== options.spellLevel) return false
    if (options.rarity && rarityOf(entry) !== normalize(options.rarity)) return false
    if (words.length === 0) return true
    const text = textOf(entry)
    return words.every((word) => text.includes(word))
  })
  const rank = (entry: Entry) => {
    const name = wordsOf(entry.name).join(' ')
    if (!term) return 0
    return name === term ? 0 : name.startsWith(term) ? 1 : name.includes(term) ? 2 : 3
  }
  const sorted = found.toSorted(
    (left, right) => rank(left) - rank(right) || left.name.localeCompare(right.name),
  )
  const limit = options.limit ?? 25
  const filters = Object.entries(options)
    .filter(([key, value]) => key !== 'limit' && value !== undefined)
    .map(([key, value]) => `${key} ${String(value)}`)
  return [
    `# ${found.length} library match(es) for "${query}"${filters.length ? ` (${filters.join(', ')})` : ''}`,
    ...sorted.slice(0, limit).map((entry) => `- ${entryLine(entry)}`),
    ...(found.length > limit
      ? [`…and ${found.length - limit} more. Narrow the query or raise limit.`]
      : []),
    ...(found.length > 0 ? ['', 'Read one with `library_get` and its id in brackets.'] : []),
  ].join('\n')
}

// ─── Resolving a query to an entry ───────────────────────────────────────────────────────────

const TYPED_KINDS: Readonly<Record<string, TypedRef['ref']>> = {
  monster: 'monster',
  monsters: 'monster',
  spell: 'spell',
  spells: 'spell',
  magicItem: 'magicItem',
  magicItems: 'magicItem',
  equipment: 'equipment',
}

/** A typed ref from `refs.monsters.goblin`, `monster:goblin` or `monsters.goblin`. */
function typedRefOf(query: string): TypedRef | undefined {
  const match = /^(?:refs\.)?([A-Za-z]+)[.:]([a-z0-9_]+)$/u.exec(query.trim())
  const kind = match && TYPED_KINDS[match[1]!]
  return kind ? { ref: kind, key: match[2]! } : undefined
}

type Resolved = { entry: Entry; typed?: TypedRef } | string

function resolveEntry(query: string): Resolved {
  const { byId, byTyped, byName } = libraryIndex()
  const trimmed = query.trim()
  const exact = byId.get(trimmed)
  if (exact) return { entry: exact }
  const typed = typedRefOf(trimmed)
  if (typed) {
    const showing = byTyped.get(refId(typed))?.[0]
    if (showing) return { entry: showing, typed }
    return `No library entry ${refText(typed)}.`
  }
  const named = byName.get(wordsOf(trimmed).join(' ')) ?? []
  if (named.length === 1) return { entry: named[0]! }
  if (named.length > 1)
    return [
      `"${query}" names ${named.length} library entries. Pick one by id:`,
      ...named.map((entry) => `- ${entryLine(entry)}`),
    ].join('\n')
  return `No library entry is named "${query}".\n\n${librarySearch(query, { limit: 10 })}`
}

// ─── Rendering ───────────────────────────────────────────────────────────────────────────────

const LIBRARY_KIND_SET: ReadonlySet<string> = new Set([
  'monster',
  'spell',
  'magicItem',
  'equipment',
  'publication',
])

/** Library and glossary `Content` as plain text; campaign refs keep their ref so they can be read. */
function contentText(content: unknown): string {
  if (content === undefined || content === null) return ''
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    const inline = content.every((part) => !Array.isArray(part))
    return content
      .map(contentText)
      .filter(Boolean)
      .join(inline ? '' : '\n')
  }
  if (typeof content !== 'object') return ''
  const value = content as {
    ref?: string
    key?: string
    type?: string
    label?: string
    url?: string
  }
  if (value.ref === 'rule' && value.key)
    return (rules as Readonly<Record<string, { name: string }>>)[value.key]?.name ?? value.key
  if (value.ref === 'publication' && value.key) return publications[value.key]?.name ?? value.key
  if (value.ref && value.key && LIBRARY_KIND_SET.has(value.ref))
    return typedName(value as TypedRef) ?? value.key
  if (value.ref && value.key) return `${value.key} (refs.${value.ref}s.${value.key})`
  if (value.type === 'link') return `${value.label} (${value.url})`
  return ''
}

function ruleName(key: string) {
  return (rules as Readonly<Record<string, { name: string }>>)[key]?.name ?? key
}

function allAbilities(stats: PrintedStatBlock): readonly Ability[] {
  return [...stats.abilities, ...(stats.legendary?.actions ?? []), ...(stats.lairActions ?? [])]
}

const ABILITY_SHORT = {
  str: 'STR',
  dex: 'DEX',
  con: 'CON',
  int: 'INT',
  wis: 'WIS',
  cha: 'CHA',
} as const

function abilityLine(
  ability: Ability,
  stats: PrintedStatBlock,
  derived: ReturnType<typeof deriveStatBlock>,
) {
  const limits = [
    ability.uses === undefined ? '' : `${ability.uses}/day`,
    ability.pool === undefined ? '' : `pool ${ability.pool}`,
    ability.recharge ?? '',
    ability.cost === undefined ? '' : `costs ${ability.cost}`,
  ].filter(Boolean)
  const summary = abilitySummary(ability, stats)
  const text = plainAbilityText(abilityTextSegments(ability.text, derived)).trim()
  const effects = (ability.effects ?? []).map(
    (effect) => `[effect ${effect.key}: ${effectText(effect)}]`,
  )
  return `- ${ability.name}${limits.length ? ` (${limits.join(', ')})` : ''}: ${sentences([
    summary ? plainStatParts(summary) : '',
    text,
  ])}${effects.length ? ` ${effects.join(' ')}` : ''}`
}

/** Parts joined into sentences, adding a full stop only where a part does not end with one. */
function sentences(parts: readonly string[]) {
  return parts
    .filter(Boolean)
    .map((part, index, all) =>
      index < all.length - 1 && !/[.!?:]$/u.test(part) ? `${part}.` : part,
    )
    .join(' ')
}

function effectText(effect: {
  key: string
  conditions?: readonly { key: string }[]
  lands?: { on: string }
}) {
  const conditions = effect.conditions?.map(({ key }) => ruleName(key)).join(', ')
  return [effect.lands?.on ? `on ${effect.lands.on}` : '', conditions ?? '']
    .filter(Boolean)
    .join(', ')
}

/** A printed stat block as text a DM can run from. */
export function statBlockText(printing: MonsterPrinting): string {
  const stats = printing.stats
  const derived = deriveStatBlock(stats)
  const list = (label: string, values?: readonly { key: string }[]) =>
    values?.length ? [`${label}: ${values.map(({ key }) => ruleName(key)).join(', ')}`] : []
  const saves = Object.entries({ ...stats.saves, ...stats.printed?.saves }).map(
    ([id]) =>
      `${ABILITY_SHORT[id as keyof typeof ABILITY_SHORT]} ${signed(derived.saves[id as 'str'])}`,
  )
  const nonmagical = [
    ...list('Resists from nonmagical attacks', stats.nonmagicalResistances),
    ...list('Immune to nonmagical attacks', stats.nonmagicalImmunities),
  ].map((line) => (stats.nonmagicalExcept ? `${line} (not ${stats.nonmagicalExcept})` : line))
  const groups: [string, readonly Ability[]][] = [
    ['Traits', stats.abilities.filter(({ timing }) => timing === 'trait')],
    ['Actions', stats.abilities.filter(({ timing }) => timing === 'action')],
    ['Bonus actions', stats.abilities.filter(({ timing }) => timing === 'bonus action')],
    ['Reactions', stats.abilities.filter(({ timing }) => timing === 'reaction')],
    [
      `Legendary actions (${stats.legendary?.uses ?? 0} per round${stats.legendary?.lairUses ? `, ${stats.legendary.lairUses} in its lair` : ''})`,
      stats.legendary?.actions ?? [],
    ],
    ['Lair actions (initiative 20)', stats.lairActions ?? []],
  ]
  return [
    `${ruleName(stats.size)} ${stats.swarmOf ? `swarm of ${ruleName(stats.swarmOf)} ` : ''}${ruleName(stats.type)}${printing.tags ? ` (${printing.tags.join(', ')})` : ''}${printing.alignment ? `, ${printing.alignment}` : ''}`,
    `CR ${stats.cr} (${derived.experience.toLocaleString('en')} XP), proficiency ${signed(derived.proficiencyBonus)}`,
    `AC ${stats.ac}${stats.armor ? ` (${stats.armor})` : ''} · HP ${derived.hitPoints} · Speed ${formatSpeed(stats.speed)} · Initiative ${signed(derived.initiative)}`,
    (Object.keys(ABILITY_SHORT) as (keyof typeof ABILITY_SHORT)[])
      .map((id) => `${ABILITY_SHORT[id]} ${stats.scores[id]} (${signed(derived.modifier[id])})`)
      .join(' · '),
    ...(saves.length ? [`Saves: ${saves.join(', ')}`] : []),
    ...(derived.skills.length
      ? [
          `Skills: ${derived.skills.map(({ label, bonus }) => `${label} ${signed(bonus)}`).join(', ')}`,
        ]
      : []),
    `Senses: ${[...derived.senses.map(({ sense, feet }) => `${ruleName(sense)} ${feet} ft.`), `passive Perception ${derived.passivePerception}`].join(', ')}`,
    ...(printing.languages ? [`Languages: ${printing.languages.join(', ') || 'none'}`] : []),
    ...list('Vulnerable', stats.damageVulnerabilities),
    ...list('Resists', stats.damageResistances),
    ...list('Immune', stats.damageImmunities),
    ...nonmagical,
    ...list('Condition immunities', stats.conditionImmunities),
    ...groups.flatMap(([label, abilities]) =>
      abilities.length
        ? ['', `${label}:`, ...abilities.map((ability) => abilityLine(ability, stats, derived))]
        : [],
    ),
    ...(printing.habitats ? ['', `Habitats: ${printing.habitats.join(', ')}`] : []),
    ...(printing.appearance ? ['', `Appearance: ${contentText(printing.appearance)}`] : []),
    ...(printing.lore ? ['', `Lore: ${contentText(printing.lore)}`] : []),
    ...(printing.tableNotes ? ['', `Table notes: ${contentText(printing.tableNotes)}`] : []),
  ].join('\n')
}

function effectsLine(effects?: readonly (SpellEffect | ItemEffect)[]) {
  if (effects === undefined) return []
  if (effects.length === 0) return ['Lasting effects: none']
  return [
    `Lasting effects: ${effects.map((effect) => `${effect.key} (${effectText(effect)})`).join('; ')}`,
  ]
}

function publicationName(ref: EntityRef<'publication'>) {
  return publications[ref.key]?.name ?? ref.key
}

function typedText(ref: TypedRef, publication?: EntityRef<'publication'>): string {
  if (ref.ref === 'spell') {
    const spell = spells[ref.key]!
    return [
      `${spellLevel(spell)} ${spell.school} · ${spell.classes.join(', ')}`,
      `Casting time: ${spell.castingTime} · Range: ${spell.range} · Components: ${spell.components} · Duration: ${spell.duration}`,
      `From: ${publicationName(spell.publication)}`,
      '',
      contentText(spell.text),
      ...effectsLine(spell.effects),
    ].join('\n')
  }
  if (ref.ref === 'magicItem') {
    const item = magicItems[ref.key]!
    const attunement =
      item.attunement === true
        ? 'requires attunement'
        : item.attunement
          ? `requires attunement ${item.attunement}`
          : ''
    return [
      [`${item.category}${item.detail ? ` (${item.detail})` : ''}`, item.rarity, attunement]
        .filter(Boolean)
        .join(', '),
      `From: ${publicationName(item.publication)}`,
      '',
      contentText(item.text),
      ...effectsLine(item.effects),
    ].join('\n')
  }
  if (ref.ref === 'equipment') {
    const item = equipment[ref.key]!
    return [
      [
        `${item.category}${item.detail ? ` (${item.detail})` : ''}`,
        item.price
          ? `${item.price.amount} ${item.price.coin}${item.priceEstimated ? ' (our estimate)' : ''}`
          : '',
        item.weight === undefined ? '' : `${item.weight} lb`,
      ]
        .filter(Boolean)
        .join(' · '),
      `From: ${publicationName(item.publication)}`,
      '',
      contentText(item.text),
      ...effectsLine(item.effects),
    ].join('\n')
  }
  const printings = printingsByMonster.get(ref.key)!
  const [heldBy, printing] =
    (publication &&
      ([...printings].find(
        ([key, candidate]) =>
          key === publication.key ||
          candidate.reprintedIn?.some(({ key: reprint }) => reprint === publication.key),
      ) as [string, MonsterPrinting] | undefined)) ??
    [...printings][0]!
  const others = [...printings.keys()].filter((key) => key !== heldBy)
  return [
    `From: ${publications[heldBy]?.name ?? heldBy}${printing.page ? `, p. ${printing.page}` : ''}${printing.reprintedIn ? `; reprinted unchanged in ${printing.reprintedIn.map(publicationName).join(', ')}` : ''}`,
    ...(others.length
      ? [`Other printings: ${others.map((key) => publications[key]?.name ?? key).join(', ')}`]
      : []),
    '',
    statBlockText(printing),
  ].join('\n')
}

function sectionsText(sections: readonly Section[] | undefined, label: string) {
  return (sections ?? []).flatMap((section) => [`### ${section.title}${label}`, ...section.lines])
}

/** One library entry in full: a catalog entry with a printing's text, or a typed entry. */
export function libraryGet(query: string, printingId?: string): string {
  const resolved = resolveEntry(query)
  if (typeof resolved === 'string') return resolved
  const { entry } = resolved
  const record = entry.catalog
  const out = [
    `# ${entry.name} [${entry.id}]`,
    entryLine(entry)
      .split('\n')[0]!
      .slice(entry.name.length + entry.id.length + 4),
  ]
  if (entry.summary && entry.type !== 'spells') out.push(entry.summary)
  if (entry.gmOnly) out.push('DM-only: players do not see this entry in the library.')
  if (!record) {
    out.push('', typedText(entry.typed[0]!))
    return out.join('\n')
  }
  const selected =
    (printingId && record.printings.find(({ id }) => id === printingId)) ||
    (resolved.typed &&
      record.printings.find(
        ({ typed }) => typed && refId(pointerRef(typed)) === refId(resolved.typed!),
      )) ||
    record.printings[0]!
  if (record.printings.length > 1)
    out.push(
      '',
      `Printings (${record.printings.length}; pass printing to read another):`,
      ...record.printings.map(
        (printing) =>
          `- ${printing.id}: ${printing.label}${printing.variantName ? ` · ${printing.variantName}` : ''}${printing.edition ? `, ${printing.edition}` : ''}${printing.typed ? ` (typed ${refText(pointerRef(printing.typed))})` : ''}${printing === selected ? ' ← shown' : ''}`,
      ),
    )
  out.push(
    '',
    `## ${selected.label}${selected.variantName ? ` · ${selected.variantName}` : ''}`,
    ...[selected.edition, selected.status, selected.source].filter(Boolean).map(String),
  )
  if (selected.typed) {
    const ref = pointerRef(selected.typed)
    out.push(
      `typed: ${refText(ref)}`,
      '',
      typedExists(ref)
        ? typedText(ref, selected.typed.publication)
        : 'The typed record is missing.',
    )
  }
  out.push(...sectionsText(selected.player, ''), ...sectionsText(selected.gm, ' [DM-only]'))
  return out.join('\n')
}

// ─── Following campaign pointers ───────────────────────────────────────────────────────────────

/** A few lines about an entry, for a campaign record or idea that points at it. */
function entrySheet(entry: Entry, typed?: TypedRef): string {
  const ref = typed ?? entry.typed[0]
  const lines = [`### ${entryLine(entry)}`]
  if (ref && typedExists(ref)) {
    if (ref.ref === 'monster') {
      const printing = monsterOf(ref)!
      const derived = deriveStatBlock(printing.stats)
      lines.push(
        `${ruleName(printing.stats.size)} ${ruleName(printing.stats.type)}, CR ${printing.stats.cr}, AC ${printing.stats.ac}, HP ${derived.hitPoints}, speed ${formatSpeed(printing.stats.speed)}`,
        `Abilities: ${allAbilities(printing.stats)
          .map(({ name }) => name)
          .join(', ')}`,
      )
    } else if (ref.ref === 'spell') {
      const spell = spells[ref.key]!
      lines.push(
        `${spellLevel(spell)} ${spell.school}; ${spell.castingTime}, ${spell.range}, ${spell.duration}`,
      )
    } else {
      const [head, , , ...body] = typedText(ref).split('\n')
      lines.push(head!, clip(body.join(' ')))
    }
  } else {
    // An untyped catalog entry: its first printed section says what it is.
    const section = entry.catalog?.printings
      .flatMap((printing) => [...(printing.player ?? []), ...(printing.gm ?? [])])
      .at(0)
    if (section) lines.push(clip(section.lines.join('; ')))
  }
  return lines.join('\n')
}

/** Short sheets for library refs that campaign records point at, by the record that points. */
export function librarySheets(refs: readonly EntityRef<LibraryKind>[]): string {
  const { byTyped } = libraryIndex()
  const seen = new Set<string>()
  const sheets = refs.flatMap((ref) => {
    if (ref.ref === 'publication') return []
    const typed = ref as TypedRef
    if (seen.has(refId(typed))) return []
    seen.add(refId(typed))
    const entry = byTyped.get(refId(typed))?.[0]
    return entry ? [entrySheet(entry, typed)] : [`### ${refText(typed)}: no such library entry`]
  })
  return sheets.length
    ? [
        '## Library entries it points to',
        ...sheets,
        '',
        'Read one in full with `library_get`.',
      ].join('\n')
    : ''
}

function clip(text: string, length = 400) {
  const trimmed = text.trim()
  return trimmed.length > length ? `${trimmed.slice(0, length).trimEnd()}…` : trimmed
}

const JOINERS = new Set(['of', 'the', 'and', 'a', 'an', 'in', 'on', 'to', 'de'])

/** The entry a name most likely means: a typed one first, so its numbers can be checked. */
function bestNamed(name: string): Entry | undefined {
  const words = wordsOf(name)
  const matches = libraryIndex().byName.get(words.join(' '))
  // The plain key (`fireball`) is the current printing; suffixed keys (`fireball_srd_5_1`) older.
  return (
    matches?.find((entry) => entry.typed.some(({ key }) => key === words.join('_'))) ??
    matches?.find((entry) => entry.typed.length > 0) ??
    matches?.[0]
  )
}

const capitalised = (word: string) => /^\p{Lu}|^\d/u.test(word)
const ARTICLES = new Set(['the', 'a', 'an'])

/**
 * Library entries an idea names in capitalised words, such as "a Shambling Mound" or "casts
 * Fireball". Lowercase words are left alone, so "a light breeze" does not find the Light spell.
 * A name must start its run of capitalised words, so "Onana Tempest" does not find the Tempest
 * spell: the run names someone else.
 */
export function libraryMentionsIn(text: string): Entry[] {
  const { longestName } = libraryIndex()
  const found = new Map<string, Entry>()
  for (const clause of text.split(/[.,;:!?()"“”[\]]+/u)) {
    const tokens = clause.split(/[^\p{L}\p{N}'’+-]+/u).filter(Boolean)
    let start = 0
    while (start < tokens.length) {
      if (!capitalised(tokens[start]!)) {
        start++
        continue
      }
      // The run: capitalised words, with joiners such as "of" between them.
      let end = start + 1
      while (
        end < tokens.length &&
        (capitalised(tokens[end]!) ||
          (JOINERS.has(tokens[end]!.toLowerCase()) && capitalised(tokens[end + 1] ?? '')))
      )
        end++
      const run = tokens.slice(start, end)
      if (run.length > 1 && ARTICLES.has(run[0]!.toLowerCase())) run.shift()
      let matched = 0
      for (let length = Math.min(longestName, run.length); length >= 1 && !matched; length--) {
        const best = bestNamed(run.slice(0, length).join(' '))
        if (best) {
          found.set(best.id, best)
          matched = length
        }
      }
      // After a match the rest of the run may name another entry ("Fireball Shambling Mound").
      start = matched ? end - run.length + matched : end
    }
  }
  return [...found.values()]
}

/**
 * The library side of a canon check: entries the idea names, entries the checked records point
 * at, and `involves` entries that are not campaign records.
 */
export function libraryCheck(
  idea: string,
  pointers: readonly EntityRef<LibraryKind>[],
  queries: readonly string[],
): string {
  const { byTyped } = libraryIndex()
  const entries = new Map<string, Entry>()
  for (const ref of pointers) {
    if (ref.ref === 'publication') continue
    const entry = byTyped.get(refId(ref as TypedRef))?.[0]
    if (entry) entries.set(entry.id, entry)
  }
  for (const entry of libraryMentionsIn(idea)) entries.set(entry.id, entry)
  const unresolved: string[] = []
  for (const query of queries) {
    const resolved = resolveEntry(query)
    const entry = typeof resolved === 'string' ? bestNamed(query) : resolved.entry
    if (entry) entries.set(entry.id, entry)
    else unresolved.push(`- ${query}: not a campaign record or a library entry`)
  }
  if (entries.size === 0 && unresolved.length === 0) return ''
  const sheets = [...entries.values()].slice(0, 12).map((entry) => entrySheet(entry))
  return [
    '## Library entries involved (rules reference, not campaign canon)',
    'A library entry is not something the party has met. Check the idea fits its numbers: a CR against the party, what a spell or item can do.',
    ...sheets,
    ...(entries.size > 12 ? [`…and ${entries.size - 12} more.`] : []),
    ...unresolved,
  ].join('\n')
}

export const LIBRARY_COUNTS = () => {
  const counts: Record<string, number> = {}
  for (const entry of libraryIndex().entries) counts[entry.type] = (counts[entry.type] ?? 0) + 1
  return counts
}

import type { LibraryAbilityDisplay, LibrarySection } from './published-library-data'
import { ABILITY_KEYS, rules } from './rules'
import type { AbilityKind } from './stat-block'

const vitalOrder = ['Armor class', 'Hit points', 'Initiative', 'Speed', 'Challenge']
const combatOrder = [
  'actions',
  'attacks',
  'bonus actions',
  'reactions',
  'legendary actions',
  'mythic actions',
  'spellcasting',
  'innate spellcasting',
  'traits',
]
export function isCreatureAbilitySection(title: string) {
  const key = title.toLowerCase()
  return combatOrder.includes(key) || key === 'lair actions' || key === 'regional effects'
}

const factTitles = new Set([
  'saving throws',
  'skills',
  'senses',
  'languages',
  'damage vulnerabilities',
  'damage resistances',
  'damage immunities',
  'condition immunities',
  'ability modifiers',
  'other statistics',
  'movement notes',
  'initiative details',
  'defenses',
  'defenses and senses',
])
const abilityNames = new Set(ABILITY_KEYS.flatMap((key) => [key, rules[key].name.toLowerCase()]))
const saveNames = new Map<string, { name: string; icon: string }>()
for (const key of ABILITY_KEYS) {
  const save = { name: rules[key].name, icon: key }
  saveNames.set(key, save)
  saveNames.set(save.name.toLowerCase(), save)
}
for (const [name, short, key] of [
  ['Fortitude', 'fort', 'con'],
  ['Reflex', 'ref', 'dex'],
  ['Will', 'will', 'wis'],
]) {
  const save = { name, icon: key }
  saveNames.set(name.toLowerCase(), save)
  saveNames.set(short, save)
}

type LibrarySave = { name: string; icon: string; modifier: number }

function printedSaves(lines: string[]) {
  const saves = new Map<string, LibrarySave>()
  for (const entry of lines.flatMap((line) => line.split(/[,;·\n]/))) {
    const match = /^([a-z]+)\s+([+−-]\d+)\.?$/i.exec(entry.trim())
    const save = match && saveNames.get(match[1].toLowerCase())
    if (!match || !save) return
    const modifier = Number(match[2].replace('−', '-'))
    const previous = saves.get(save.name)
    if (previous && previous.modifier !== modifier) return
    saves.set(save.name, { ...save, modifier })
  }
  return [...saves.values()]
}
const sectionOrder = (title: string) => {
  const position = combatOrder.indexOf(title.toLowerCase())
  return position === -1 ? combatOrder.length : position
}

export function publishedCreatureSheet(sections: readonly LibrarySection[]) {
  const rawStats = sections.find(({ title }) => title === 'Statistics')
  const classification = sections.find(({ title }) => title === 'Classification')
  const initiative = sections.find(
    ({ title, lines }) => title.toLowerCase() === 'initiative' && lines.length === 1,
  )
  const stats = (rawStats?.lines ?? []).map((line): [string, string] => {
    const [name, ...value] = line.split(' · ')
    return [name, value.join(' · ')]
  })
  const vitals = vitalOrder.flatMap((name): [string, string][] =>
    name === 'Initiative' && initiative
      ? [[name, initiative.lines[0]]]
      : stats.filter(([label]) => label === name),
  )
  const abilities = stats.filter(([name]) => abilityNames.has(name.toLowerCase()))
  const other = stats.filter(
    ([name]) => !vitalOrder.includes(name) && !abilityNames.has(name.toLowerCase()),
  )
  const detail = sections.filter(
    (section) => section !== classification && section !== rawStats && section !== initiative,
  )
  const facts = detail
    .filter(({ title }) => factTitles.has(title.toLowerCase()))
    .flatMap((section) =>
      section.title === 'Other statistics' ? splitStatisticSections(section) : [section],
    )
  const savingThrowSection = facts.find(({ title }) => title.toLowerCase() === 'saving throws')
  const savingThrows = savingThrowSection ? printedSaves([...savingThrowSection.lines]) : undefined
  const senses = facts.find(({ title }) => title === 'Senses')
  const passive = senses?.lines
    .join(' · ')
    .match(/(?:^|[;,]\s*)passive perception (\d+)(?:[.;,]|$)/iu)
  if (passive && !other.some(([label]) => label.toLowerCase() === 'passive perception'))
    other.push(['Passive Perception', passive[1]])
  const size = classification?.lines[0]?.match(
    /^(tiny|small|medium|large|huge|gargantuan)\b/iu,
  )?.[0]
  if (size && !other.some(([label]) => label.toLowerCase() === 'size'))
    other.splice(1, 0, ['Size', size])
  const rules = detail
    .filter(({ title }) => !factTitles.has(title.toLowerCase()))
    .toSorted((left, right) => sectionOrder(left.title) - sectionOrder(right.title))
  const defenses = facts
    .filter((fact) => !(fact === savingThrowSection && savingThrows?.length))
    .map((fact) =>
      fact === senses && passive
        ? {
            ...fact,
            lines: fact.lines
              .map((line) => line.replace(/(?:^|[;,]\s*)passive perception \d+\.?$/iu, '').trim())
              .filter(Boolean),
          }
        : fact,
    )
    .filter(({ lines }) => lines.length > 0)
  return {
    classification,
    vitals,
    abilities,
    otherStats: other,
    defenses,
    savingThrows: savingThrows ?? [],
    rules,
  }
}

function splitStatisticSections(section: LibrarySection) {
  const fields =
    /(?:^|\s)(Saving Throws|Skills|Senses|Languages|Damage Vulnerabilities|Damage Resistances|Damage Immunities|Condition Immunities)\s+/giu
  return section.lines.flatMap((line): LibrarySection[] => {
    const matches = [...line.matchAll(fields)]
    if (!matches.length || matches[0].index !== 0) return [{ ...section, lines: [line] }]
    return matches.map((match, index) => {
      const label = match[1].toLowerCase()
      return {
        title: label[0].toUpperCase() + label.slice(1),
        lines: [line.slice(match.index + match[0].length, matches[index + 1]?.index).trim()],
      }
    })
  })
}

export function explainHitDice(formula: string, hitPoints?: string) {
  const definition = "Hit dice determine a creature's hit points."
  const match = /^(\d+)d(\d+)(?:\s*([+−-])\s*(\d+))?$/i.exec(formula.trim())
  if (!match) return definition
  const [, count, sides, sign, bonus] = match
  const dice =
    Number(count) === 1 ? `one ${sides}-sided die` : `${count} dice with ${sides} sides each`
  const adjustment = bonus
    ? ` and ${sign === '+' ? 'add' : 'subtract'} ${bonus} ${sign === '+' ? 'to' : 'from'} the total`
    : ''
  const listed = hitPoints ? ` This printing lists ${hitPoints} HP.` : ''
  return `${definition} Roll ${dice}${adjustment}.${listed}`
}

const explicitRoll = String.raw`[A-Z][^.!?\n]{0,65}\.\s+(?:(?:Melee or Ranged|Melee|Ranged) (?:Weapon Attack|Spell Attack|Attack Roll)|(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw:)`
const plainSentence =
  /^(?:The|If|When|While|Each|Once|Only|After|Before|Until)\s|^Legendary Action Uses:/u

export function creatureRuleParagraphs(line: string, abilities: LibraryAbilityDisplay = {}) {
  const knownNames = Object.keys(abilities).map((name) =>
    name.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'),
  )
  const starts = knownNames.length
    ? String.raw`(?:${knownNames.join('|')})(?:\s+\([^)]*\))?\.\s+`
    : explicitRoll
  return line
    .split(new RegExp(String.raw`\n+|(?<=[.!?])\s+(?=${starts})`, 'u'))
    .map((paragraph) => {
      const namedRule = /^([A-Z][^.!?]{0,65}\.)(?:\s+)(.+)$/u.exec(paragraph)
      if (!namedRule || plainSentence.test(namedRule[1]))
        return { title: undefined, text: paragraph, presentation: undefined }
      const [, title, text] = namedRule
      const name = title.replace(/(?:\s*\([^)]*\))?\.$/u, '')
      return { title, text, presentation: abilities[name] }
    })
}

/** Use the printed instruction when a printing has no reviewed label for this ability. */
export function printedCreatureAbilityKind(title: string, text: string): AbilityKind | undefined {
  if (title === 'Multiattack.') return 'attack'
  const attack = /^(melee or ranged|melee|ranged)(?: weapon| spell)? attack\b/i.exec(text)
  if (attack) {
    const range = attack[1].toLowerCase()
    return range === 'melee' || range === 'ranged' ? range : 'attack'
  }
  if (
    /^(?:strength|dexterity|constitution|intelligence|wisdom|charisma) saving throw:/iu.test(text)
  )
    return 'save'
  if (
    /(?:\bmakes?|\bsucceed on|\bmust succeed on) a DC \d+ [a-z]+ sav(?:e|ing throw)\b/iu.test(text)
  )
    return 'save'
}

import ruleRecords from '#/data/rules/_index'
import type { EntityRef } from '#/definitions/kind'
import type { Rule, RuleText } from '#/definitions/rule'

/**
 * The rules glossary: every D&D term the app explains, keyed like `refs.rules`. Data and UI refer
 * to terms with `refs.rules.*`; this module resolves them and derives the term lists other schemas
 * and pickers need, so each term is defined exactly once in `src/data/rules/`.
 */
export const rules = ruleRecords

export type RuleKey = keyof typeof rules
export type RuleRef = EntityRef<'rule'>

type KeysOfCategory<C extends Rule['category']> = {
  [K in RuleKey]: (typeof rules)[K]['category'] extends C ? K : never
}[RuleKey]

export type Condition = KeysOfCategory<'condition'>
export type DamageType = KeysOfCategory<'damageType'>
export type AbilityId = KeysOfCategory<'ability'>
export type Skill = KeysOfCategory<'skill'>
export type Sense = KeysOfCategory<'sense'>
export type Size = KeysOfCategory<'size'>
export type CreatureType = KeysOfCategory<'creatureType'>

function keysOf<C extends Rule['category']>(category: C) {
  return (Object.keys(rules) as RuleKey[]).filter(
    (key) => rules[key].category === category,
  ) as KeysOfCategory<C>[]
}

/** Conditions in glossary order, for pickers and validation. */
export const CONDITION_KEYS = keysOf('condition') as [Condition, ...Condition[]]
export const DAMAGE_TYPE_KEYS = keysOf('damageType') as [DamageType, ...DamageType[]]
/** Strength to Charisma, in stat-block order. */
export const ABILITY_KEYS = keysOf('ability') as [AbilityId, ...AbilityId[]]
export const SKILL_KEYS = keysOf('skill') as [Skill, ...Skill[]]
export const SENSE_KEYS = keysOf('sense') as [Sense, ...Sense[]]
export const SIZE_KEYS = keysOf('size') as [Size, ...Size[]]
export const CREATURE_TYPE_KEYS = keysOf('creatureType') as [CreatureType, ...CreatureType[]]

/** The ability a skill uses, e.g. Stealth uses Dexterity. */
export function skillAbility(skill: Skill): AbilityId {
  const ability = rules[skill].ability
  if (!ability) throw new Error(`Skill without an ability: ${skill}`)
  return ability.key as AbilityId
}

export function ruleOf(ref: RuleRef): Rule {
  const rule = (rules as Readonly<Record<string, Rule>>)[ref.key]
  if (!rule) throw new Error(`Unknown rules term: ${ref.key}`)
  return rule
}

export function isRuleRef(value: unknown): value is RuleRef {
  return !!value && typeof value === 'object' && (value as { ref?: unknown }).ref === 'rule'
}

/** The ref for a typed glossary key, for places that store keys such as encounter state. */
export function ruleRef(key: RuleKey): RuleRef {
  return { ref: 'rule', key }
}

/** The full rule in the free official Basic Rules on D&D Beyond, when they cover it. */
export function ruleUrl(rule: Rule) {
  if (!rule.source) return undefined
  return `https://www.dndbeyond.com/sources/dnd/br-2024/${rule.source.page}#${rule.source.anchor}`
}

/**
 * How a term reads inside a sentence: its abbreviation when it has one, an action's name as
 * written, otherwise capitalized where a sentence starts and lowercase elsewhere, so "Its attacks have disadvantage" and "Disadvantage on checks" both read naturally.
 */
export function termLabel(rule: Rule, textBefore: string) {
  if (rule.short) return rule.short
  // Actions are named like proper nouns in the rules: "take the Dash action".
  if (rule.category === 'action') return rule.name
  const startsSentence = textBefore.trim() === '' || /[.!?:]\s*$/.test(textBefore)
  return startsSentence
    ? rule.name.charAt(0).toUpperCase() + rule.name.slice(1)
    : rule.name.toLowerCase()
}

export type RuleTextSegment =
  | { kind: 'text'; text: string }
  | { kind: 'rule'; rule: RuleRef; label: string }

/** A term's explanation with its references to other terms labelled for reading. */
export function ruleTextSegments(text: RuleText): RuleTextSegment[] {
  let before = ''
  return text.map((token) => {
    const segment: RuleTextSegment =
      typeof token === 'string'
        ? { kind: 'text', text: token }
        : { kind: 'rule', rule: token, label: termLabel(ruleOf(token), before) }
    before += segment.kind === 'text' ? segment.text : segment.label
    return segment
  })
}

/** A term's explanation as one string, for places that can only show plain text. */
export function plainRuleText(text: RuleText) {
  return ruleTextSegments(text)
    .map((segment) => (segment.kind === 'text' ? segment.text : segment.label))
    .join('')
}

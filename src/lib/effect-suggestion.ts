import type { Content } from '#/definitions/content'
import type { Spell } from '#/definitions/library'
import type { Ability } from '#/definitions/stat-block'

import { abilityTextSegments, plainAbilityText, type DerivedStatBlock } from './dm-ability-text'
import { EACH_TARGET, type AbilityId, type DurationChoice } from './encounter-combat'
import { ABILITY_KEYS, CONDITION_KEYS, rules, type Condition } from './rules'

/**
 * A first guess at what applying a spell or ability does, read from its rules: the conditions it
 * imposes, the rider, and how long it lasts. The DM checks and changes it before applying; nothing
 * here is applied on its own.
 */
export type EffectSuggestion = {
  /** Conditions the text imposes, picked to start with. */
  conditions: Condition[]
  /**
   * Conditions the text names without imposing them ("immune to being frightened", "not
   * incapacitated"), offered but not picked.
   */
  candidates: Condition[]
  text?: string
  duration: DurationChoice
  /** A spell the caster concentrates on. */
  concentration?: boolean
}

const isCondition = (key: string): key is Condition =>
  (CONDITION_KEYS as readonly string[]).includes(key)

const unique = <T>(values: readonly T[]) => [...new Set(values)]

const SAVE_ENDS =
  /repeats? the (save|saving throw|[a-z]+ saving throw)|makes? another [a-z ]*saving throw|makes? a [a-z ]*saving throw at the end of each|ending the (effect|spell|condition) on (it|itself) on a success/

/**
 * Turn-based wording: a save that ends it, or "until the end of its next turn". "Its next turn" is
 * each target's own turn; "the ogre's next turn" or "your next turn" is the source's.
 */
export function turnsFromText(
  text: string,
  {
    source,
    save,
  }: {
    /** The combatant the effect comes from, whose turns "your next turn" counts. */
    source: string | undefined
    save?: { dc: number; ability: AbilityId }
  },
): DurationChoice | undefined {
  const lower = text.toLowerCase()
  if (save && SAVE_ENDS.test(lower)) return { kind: 'save-ends', ...save }
  const turn = lower.match(
    /until the (end|start) of (its|the target[’']s|the [a-z -]+?[’']s|your) next turn/,
  )
  if (!turn) return undefined
  const kind = turn[1] === 'end' ? 'end-of-turn' : 'start-of-turn'
  const whose = turn[2]!
  const of = whose === 'its' || whose.startsWith('the target') ? EACH_TARGET : source
  return of ? { kind, of } : undefined
}

/**
 * A length in minutes or rounds, counted on each target's own turns so it still ends if the
 * source drops out of the fight. Hours and longer outlast a fight: until removed.
 */
export function lengthFromText(text: string): DurationChoice | undefined {
  const lower = text.toLowerCase()
  const minutes = lower.match(/\b(1|one|10|ten) minutes?\b/)
  if (minutes) {
    const count = minutes[1] === '1' || minutes[1] === 'one' ? 1 : 10
    return { kind: 'rounds', rounds: count * 10, of: EACH_TARGET }
  }
  const rounds = lower.match(/\b(\d+|one) rounds?\b/)
  if (rounds)
    return { kind: 'rounds', rounds: rounds[1] === 'one' ? 1 : Number(rounds[1]), of: EACH_TARGET }
  return undefined
}

/** How long, from the wording: turn-based wording first, then a length. */
export function durationFromText(
  text: string,
  options: { source: string | undefined; save?: { dc: number; ability: AbilityId } },
): DurationChoice {
  return turnsFromText(text, options) ?? lengthFromText(text) ?? { kind: 'until-removed' }
}

const DURATION_WORDING =
  /repeats? the sav(e|ing throw)|makes? another [a-z ]*saving throw|makes? a [a-z ]*saving throw at the end of each|ending the (effect|spell|condition) on (it|itself)|until the (end|start) of .*next turn/i

/** A sentence that names a condition without imposing it. */
const NOT_IMPOSED =
  /immun|\bneither\b|\bnor\b|can[’']t be|cannot be|\bnot\b|isn[’']t|aren[’']t|\bends? (the|its|an?|one|any|all)\b|\bend (the|its|an?|one|any|all)\b|advantage|benefit|remov|suppress/i

/** Sentences, each with the conditions it names. Condition terms are read by their ref. */
type Sentence = { text: string; conditions: Condition[] }

function sentencesOf(atoms: readonly (string | { key: string; label: string })[]): Sentence[] {
  const sentences: Sentence[] = []
  let current: Sentence = { text: '', conditions: [] }
  for (const atom of atoms) {
    if (typeof atom !== 'string') {
      current.text += atom.label
      if (isCondition(atom.key)) current.conditions.push(atom.key)
      continue
    }
    const parts = atom.split(/(?<=[.!?])\s+/)
    parts.forEach((part, index) => {
      current.text += part
      if (index < parts.length - 1) {
        sentences.push(current)
        current = { text: '', conditions: [] }
      }
    })
  }
  sentences.push(current)
  return sentences.filter((sentence) => sentence.text.trim())
}

/** Split named conditions into those imposed and those only mentioned. */
function sortConditions(sentences: readonly Sentence[], imposes: (sentence: string) => boolean) {
  const conditions: Condition[] = []
  const candidates: Condition[] = []
  for (const sentence of sentences)
    for (const condition of sentence.conditions)
      (imposes(sentence.text) ? conditions : candidates).push(condition)
  const picked = unique(conditions)
  return { conditions: picked, candidates: unique(candidates).filter((c) => !picked.includes(c)) }
}

/** The rider without the sentences the conditions and duration already say. */
function riderText(text: string, conditions: readonly Condition[]) {
  return (text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        !DURATION_WORDING.test(sentence) &&
        !(
          sentence.length < 80 &&
          !/\bDC\b|escape/i.test(sentence) &&
          conditions.some((condition) => sentence.toLowerCase().includes(condition))
        ),
    )
    .join(' ')
}

/**
 * Whether applying this ability can leave anything on anyone: an attack or a save, or an action
 * whose text names a condition. Traits like Pack Tactics or Keen Smell don't.
 */
export function abilityLeavesEffect(ability: Ability & { timing?: string }) {
  if (ability.attack || ability.save) return true
  if (ability.timing === 'trait') return false
  return ability.text.some(
    (token) => typeof token === 'object' && 'ref' in token && isCondition(token.key),
  )
}

/** What a combatant's ability does to whoever it hits or catches. */
export function suggestFromAbility(
  ability: Ability,
  block: DerivedStatBlock,
  source: string,
): EffectSuggestion {
  const { save } = ability
  const tokens = [...ability.text, ...(save?.onFail.also ?? [])]
  const segments = abilityTextSegments(tokens, block)
  const named = sortConditions(
    sentencesOf(
      segments.map((segment) =>
        segment.kind === 'rule'
          ? { key: segment.rule.key, label: segment.label }
          : plainAbilityText([segment]),
      ),
    ),
    (sentence) => !NOT_IMPOSED.test(sentence),
  )
  const failed = (save?.onFail.conditions ?? []).map((ref) => ref.key).filter(isCondition)
  const conditions = unique([...failed, ...named.conditions])
  const plain = (text: typeof tokens) => plainAbilityText(abilityTextSegments(text, block)).trim()
  // A save's rider is its `also`; an attack's is the text after the damage. Sentences that only
  // name a condition or say how long it lasts are already in the conditions and duration.
  const text = riderText(plain(save?.onFail.also ?? ability.text), conditions) || undefined
  const dc = save ? (save.printedDc ?? block.saveDc[save.dc]) : undefined
  const dcToken = tokens.find((token) => typeof token === 'object' && 'dc' in token)
  const fromToken =
    dcToken && typeof dcToken === 'object' && 'dc' in dcToken
      ? { dc: dcToken.printed ?? block.saveDc[dcToken.dc], ability: dcToken.save ?? dcToken.dc }
      : undefined
  const saveTerms =
    save && dc !== undefined
      ? { dc, ability: save.ability }
      : fromToken?.dc !== undefined
        ? { dc: fromToken.dc, ability: fromToken.ability }
        : undefined
  return {
    conditions,
    candidates: named.candidates.filter((condition) => !conditions.includes(condition)),
    text,
    duration: durationFromText(plain(tokens), { source, save: saveTerms }),
  }
}

/** A spell's paragraphs, leaving out what casting it with a higher-level slot changes. */
function castingParagraphs(spell: Spell) {
  return spell.text.filter((paragraph) => {
    const first = paragraph[0]
    return !(
      typeof first === 'string' && /^(Using a Higher-Level Spell Slot|At Higher Levels)/.test(first)
    )
  })
}

function atomsOf(paragraph: Content[number]) {
  return paragraph.flatMap((atom): (string | { key: string; label: string })[] => {
    if (typeof atom === 'string') return [atom]
    if ('ref' in atom && atom.ref === 'rule') {
      const rule = (rules as Readonly<Record<string, { name: string }>>)[atom.key]
      return [{ key: atom.key, label: rule?.name ?? atom.key }]
    }
    return 'label' in atom ? [atom.label] : []
  })
}

/** What a spell does to its targets, with the save DC the DM enters for the caster. */
export function suggestFromSpell(
  spell: Spell,
  { caster, dc }: { caster: string | undefined; dc: number },
): EffectSuggestion {
  const paragraphs = castingParagraphs(spell)
  const sentences = paragraphs.flatMap((paragraph) => sentencesOf(atomsOf(paragraph)))
  // A spell imposes a condition where the target fails a save or has it outright; elsewhere it
  // names one it protects against, ends, or only mentions.
  const { conditions, candidates } = sortConditions(
    sentences,
    (sentence) =>
      /saving throw|\bfail|\bor (have|has|be|is|fall)|\b(has|have) the [^.]*condition/i.test(
        sentence,
      ) && !NOT_IMPOSED.test(sentence),
  )
  const text = sentences.map((sentence) => sentence.text).join(' ')
  const saveName = text.match(
    /\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/,
  )?.[1]
  const ability = ABILITY_KEYS.find((key) => rules[key].name === saveName)
  // Turn wording comes from the text; a length only from the spell's own duration line.
  const duration = turnsFromText(text, {
    source: caster,
    save: ability ? { dc, ability } : undefined,
  }) ??
    lengthFromText(spell.duration) ?? { kind: 'until-removed' }
  return {
    conditions,
    candidates,
    duration,
    concentration: /^concentration/i.test(spell.duration),
  }
}

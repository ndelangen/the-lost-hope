import type { Content } from '#/definitions/content'
import type { ItemEffect, Spell, SpellEffect } from '#/definitions/library'
import type { Ability, AbilityEffect } from '#/definitions/stat-block'
import { EFFECT_SAVE_MOMENTS, stageOf } from '#/definitions/status-effect'

import {
  abilityTextSegments,
  describeAbilityEffect,
  plainAbilityText,
  type DerivedStatBlock,
} from './dm-ability-text'
import {
  EACH_TARGET,
  type AbilityId,
  type DurationChoice,
  type EffectStage,
  type OnDamage,
} from './encounter-combat'
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
  /** What taking damage does to it: the save comes again, or it ends. */
  onDamage?: OnDamage
  /** Successful repeat saves it takes to end, when one is not enough. */
  successes?: number
  /** What it becomes after failed repeat saves, with that stage's name for the DM. */
  becomes?: EffectStage
  /** It stays when the caster stops concentrating. */
  outlastsConcentration?: true
}

/** A later stage, as the tracker holds it until enough repeat saves fail. */
function stageFrom(
  becomes: { failures: number; key: string; name: string; outlastsConcentration?: true },
  suggestion: EffectSuggestion,
): EffectStage {
  return {
    failures: becomes.failures,
    effect: becomes.key,
    name: becomes.name,
    ...(becomes.outlastsConcentration ? { outlastsConcentration: true } : {}),
    conditions: suggestion.conditions,
    ...(suggestion.text ? { text: suggestion.text } : {}),
    duration: suggestion.duration,
    ...(suggestion.onDamage ? { onDamage: suggestion.onDamage } : {}),
  }
}

/** What counting the repeat saves adds to a suggestion: how many end it, and the next stage. */
function counted(
  effect: {
    ends?: { successes?: number }
    becomes?: { failures: number; key: string; name: string }
  },
  stage: () => EffectSuggestion,
) {
  return {
    ...(effect.ends?.successes ? { successes: effect.ends.successes } : {}),
    ...(effect.becomes ? { becomes: stageFrom(effect.becomes, stage()) } : {}),
  }
}

const TAKES_DAMAGE = /\b(takes?|taking|deals?) (any )?damage\b/i

/**
 * Whether damage brings the save back or ends the effect: from structured repeat-save moments,
 * or from the words of what ends it ("it takes any damage").
 */
export function onDamageOf({
  repeatSave,
  ending,
  save,
}: {
  repeatSave?: readonly string[]
  ending?: string
  save?: { dc: number | undefined; ability: AbilityId }
}): OnDamage | undefined {
  if (repeatSave?.includes('damaged') && save?.dc !== undefined)
    return { kind: 'save', dc: save.dc, ability: save.ability }
  if (ending && TAKES_DAMAGE.test(ending)) return { kind: 'ends' }
  return undefined
}

/** The same, read from rules text: "whenever it takes damage, it repeats the save". */
export function onDamageFromText(
  text: string,
  save: { dc: number | undefined; ability: AbilityId } | undefined,
): OnDamage | undefined {
  const sentences = text.split(/(?<=[.!?])\s+/)
  for (const sentence of sentences) {
    if (!TAKES_DAMAGE.test(sentence)) continue
    if (
      /repeat|another .*sav|can make .*sav|saving throw/i.test(sentence) &&
      save?.dc !== undefined
    )
      return { kind: 'save', dc: save.dc, ability: save.ability }
    if (/\bends?\b|\bwakes?\b|snaps? out|is freed/i.test(sentence)) return { kind: 'ends' }
  }
  return undefined
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
  const onDamage = onDamageFromText(plain(tokens), saveTerms)
  return {
    conditions,
    candidates: named.candidates.filter((condition) => !conditions.includes(condition)),
    text,
    duration: durationFromText(plain(tokens), { source, save: saveTerms }),
    ...(onDamage ? { onDamage } : {}),
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
  const onDamage = onDamageFromText(text, ability ? { dc, ability } : undefined)
  return {
    conditions,
    candidates,
    duration,
    concentration: /^concentration/i.test(spell.duration),
    ...(onDamage ? { onDamage } : {}),
  }
}

/**
 * What an effect the stat block defines does: no guessing, only turning its portable duration into
 * this fight's turns. Durations longer than a fight, and endings the tracker can't time, are said
 * in the text instead.
 */
export function suggestFromAbilityEffect(
  effect: AbilityEffect,
  ability: Pick<Ability, 'save'>,
  block: DerivedStatBlock,
  source: string,
): EffectSuggestion {
  const { howLong, rider, ending } = describeAbilityEffect(effect, ability, block)
  const save =
    effect.lands.on === 'save'
      ? { dc: effect.lands.printed ?? block.saveDc[effect.lands.dc], ability: effect.lands.save }
      : effect.lands.on === 'failed-save' && ability.save
        ? {
            dc: ability.save.printedDc ?? block.saveDc[ability.save.dc],
            ability: ability.save.ability,
          }
        : undefined
  const { lasts } = effect
  const turnly: DurationChoice | undefined =
    effect.ends?.repeatSave?.includes('end-of-turn') && save?.dc !== undefined
      ? { kind: 'save-ends', dc: save.dc, ability: save.ability }
      : lasts.kind === 'turn'
        ? {
            kind: lasts.boundary === 'end' ? 'end-of-turn' : 'start-of-turn',
            of: lasts.whose === 'target' ? EACH_TARGET : source,
          }
        : lasts.kind === 'time' && /^\d+$/.test(lasts.amount) && lasts.unit === 'round'
          ? { kind: 'rounds', rounds: Number(lasts.amount), of: EACH_TARGET }
          : lasts.kind === 'time' && /^\d+$/.test(lasts.amount) && lasts.unit === 'minute'
            ? { kind: 'rounds', rounds: Number(lasts.amount) * 10, of: EACH_TARGET }
            : undefined
  // What the turn order can't track goes in the rider, so nothing the book says is lost.
  const text = [rider, !turnly && howLong ? `Lasts ${howLong}.` : '', ending]
    .filter(Boolean)
    .join(' ')
  const onDamage = onDamageOf({
    repeatSave: effect.ends?.repeatSave,
    ending: [
      effect.ends?.cure ? plainAbilityText(abilityTextSegments(effect.ends.cure, block)) : '',
      lasts.kind === 'until' ? plainAbilityText(abilityTextSegments(lasts.text, block)) : '',
    ].join(' '),
    save,
  })
  return {
    conditions: (effect.conditions ?? []).map((ref) => ref.key).filter(isCondition),
    candidates: [],
    text: text || undefined,
    duration: turnly ?? { kind: 'until-removed' },
    ...(onDamage ? { onDamage } : {}),
    ...counted(effect, () => suggestFromAbilityEffect(stageOf(effect), ability, block, source)),
  }
}

const momentWords = (moments: readonly string[]) =>
  moments
    .map((moment) => EFFECT_SAVE_MOMENTS[moment as keyof typeof EFFECT_SAVE_MOMENTS])
    .join(' or ')

const spellTokens = (tokens: readonly (string | { ref: 'rule'; key: string })[]) =>
  tokens
    .map((token) =>
      typeof token === 'string'
        ? token
        : ((rules as Readonly<Record<string, { name: string }>>)[token.key]?.name ?? token.key),
    )
    .join('')

/**
 * What an effect a spell defines does, with the caster's save DC: its turn-based duration in this
 * fight's turns, and in the rider what the turn order can't track.
 */
export function suggestFromSpellEffect(
  effect: SpellEffect,
  spell: Pick<Spell, 'duration'>,
  { caster, dc }: { caster: string | undefined; dc: number },
): EffectSuggestion {
  const { lasts } = effect
  const save = effect.lands.on === 'failed-save' ? { dc, ability: effect.lands.save } : undefined
  const duration: DurationChoice | undefined =
    effect.ends?.repeatSave?.includes('end-of-turn') && save
      ? { kind: 'save-ends', ...save }
      : lasts.kind === 'turn' && (lasts.whose === 'target' || caster)
        ? {
            kind: lasts.boundary === 'end' ? 'end-of-turn' : 'start-of-turn',
            of: lasts.whose === 'target' ? EACH_TARGET : caster!,
          }
        : lasts.kind === 'time' &&
            /^\d+$/.test(lasts.amount) &&
            lasts.unit !== 'hour' &&
            lasts.unit !== 'day'
          ? {
              kind: 'rounds',
              rounds: Number(lasts.amount) * (lasts.unit === 'minute' ? 10 : 1),
              of: EACH_TARGET,
            }
          : undefined
  const howLong =
    lasts.kind === 'time'
      ? `${lasts.amount} ${lasts.unit}${lasts.amount === '1' ? '' : 's'}`
      : lasts.kind === 'until'
        ? `until ${spellTokens(lasts.text)}`
        : ''
  const onDamage = onDamageOf({
    repeatSave: effect.ends?.repeatSave,
    ending: [
      effect.ends?.cure ? spellTokens(effect.ends.cure) : '',
      lasts.kind === 'until' ? spellTokens(lasts.text) : '',
    ].join(' '),
    save,
  })
  const ends = [
    effect.ends?.repeatSave && save && !duration?.kind.startsWith('save')
      ? `A DC ${dc} ${rules[save.ability].name} save ${momentWords(effect.ends.repeatSave)} ends it.`
      : effect.ends?.repeatSave?.some((moment) => moment !== 'end-of-turn') && save
        ? `Also saves ${momentWords(effect.ends.repeatSave.filter((moment) => moment !== 'end-of-turn'))}.`
        : '',
    effect.ends?.escape ? `Escape: a check against DC ${dc}.` : '',
    effect.ends?.cure ? `Ends early: ${spellTokens(effect.ends.cure)}.` : '',
  ]
  return {
    conditions: (effect.conditions ?? []).map((ref) => ref.key).filter(isCondition),
    candidates: [],
    text:
      [
        effect.text ? spellTokens(effect.text) : '',
        !duration && howLong ? `Lasts ${howLong}.` : '',
        ...ends,
      ]
        .filter(Boolean)
        .join(' ') || undefined,
    duration: duration ?? { kind: 'until-removed' },
    concentration: /^concentration/i.test(spell.duration),
    ...(onDamage ? { onDamage } : {}),
    ...counted(effect, () => suggestFromSpellEffect(stageOf(effect), spell, { caster, dc })),
  }
}

/** What an effect a magic item defines does: like a spell's, with the DC the item prints. */
export function suggestFromItemEffect(
  effect: ItemEffect,
  { user }: { user: string | undefined },
): EffectSuggestion {
  const { lands, ends, becomes, ...rest } = effect
  // A DC worked out from the user's own numbers is not one the item states: the DM rolls it.
  const dc =
    lands.on === 'failed-save' && typeof lands.dc === 'number' ? lands.dc : (ends?.escape?.dc ?? 0)
  // The item prints its DC, which stands where a spell's would be the caster's.
  const spellEnds = (itemEnds: ItemEffect['ends']) =>
    itemEnds
      ? {
          ends: {
            ...(itemEnds.repeatSave ? { repeatSave: itemEnds.repeatSave } : {}),
            ...(itemEnds.successes ? { successes: itemEnds.successes } : {}),
            ...(itemEnds.cure ? { cure: itemEnds.cure } : {}),
            ...(itemEnds.escape ? { escape: { dc: 'spell' as const } } : {}),
          },
        }
      : {}
  const stageAsSpell = ({ ends: stageEnds, ...own }: NonNullable<ItemEffect['becomes']>) => ({
    ...own,
    ...spellEnds(stageEnds),
  })
  return {
    ...suggestFromSpellEffect(
      {
        ...rest,
        lands: lands.on === 'failed-save' ? { on: 'failed-save', save: lands.save } : lands,
        ...spellEnds(ends),
        ...(becomes ? { becomes: stageAsSpell(becomes) } : {}),
      },
      { duration: '' },
      { caster: user, dc },
    ),
    concentration: false,
  }
}

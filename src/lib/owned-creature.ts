import type { z } from 'zod'

import { CreatureAbility, type Ability, type PrintedStatBlock } from '#/definitions/stat-block'

import type { AbilityId } from './rules'
import { deriveStatBlock, modifier, proficiencyForLevel, withOptions } from './stat-block'

/** What a creature borrows from whoever summons or keeps it: a level, and the owner's numbers. */
export type Owner = {
  /** The spell slot it was summoned with, or the class level of the feature. */
  level: number
  proficiencyBonus: number
  spellAttack: number
  spellSaveDc: number
  modifiers: Record<AbilityId, number>
}

/** An owner's number a creature reads, so a page asks for those and no others. */
export type OwnerNumber = 'proficiencyBonus' | 'spellAttack' | 'spellSaveDc' | AbilityId

/**
 * How a creature's statistics follow its owner: a function from the printed stat block, the
 * owner and the options the DM picked to the stat block at that owner. What it does with the
 * owner is its own: work numbers out, or return the stat block the book prints at that level.
 */
export type OwnedCreature = {
  /** What the level is: a spell slot of `of` (`Summon Aberration`), or a level in the class `of`. */
  follows: { by: 'spell' | 'class'; of: string }
  /** The levels it has, e.g. spell slots 4 to 9. */
  levels: { min: number; max: number }
  stats: (printed: PrintedStatBlock, owner: Owner, picked: readonly string[]) => PrintedStatBlock
}

/**
 * The owner's numbers a creature's function looks at, found by running it at each of its levels
 * with an owner that notes each number read or checked for, so a page asks for those only.
 */
export function ownerNumbersRead(
  creature: OwnedCreature,
  printed: PrintedStatBlock,
  picked: readonly string[],
): OwnerNumber[] {
  const read = new Set<OwnerNumber>()
  const noting = <T extends object>(target: T, fields: readonly string[]) =>
    new Proxy(target, {
      get(object, field, receiver) {
        if (typeof field === 'string' && fields.includes(field)) read.add(field as OwnerNumber)
        return Reflect.get(object, field, receiver)
      },
      has(object, field) {
        if (typeof field === 'string' && fields.includes(field)) read.add(field as OwnerNumber)
        return Reflect.has(object, field)
      },
    })
  for (let level = creature.levels.min; level <= creature.levels.max; level++) {
    const owner = typicalOwner(creature, level)
    creature.stats(
      printed,
      noting({ ...owner, modifiers: noting(owner.modifiers, Object.keys(owner.modifiers)) }, [
        'proficiencyBonus',
        'spellAttack',
        'spellSaveDc',
      ]),
      picked,
    )
  }
  return OWNER_NUMBERS.filter((field) => read.has(field))
}

const OWNER_NUMBERS: readonly OwnerNumber[] = [
  'proficiencyBonus',
  'spellAttack',
  'spellSaveDc',
  'str',
  'dex',
  'con',
  'int',
  'wis',
  'cha',
]

/**
 * A creature at its owner: its function run at the owner's level, kept inside the levels it has,
 * with the options picked joined after. The library page and a PC's companion both use this.
 */
export function ownedStats(
  creature: OwnedCreature,
  printed: PrintedStatBlock,
  owner: Owner,
  picked: readonly string[],
): PrintedStatBlock {
  const { min, max } = creature.levels
  const level = Math.min(max, Math.max(min, owner.level))
  return withOptions(creature.stats(printed, { ...owner, level }, picked), picked)
}

/** Declares a creature's owner function, checked against the shape every page runs. */
export function ownedCreature(creature: OwnedCreature) {
  return creature
}

/**
 * A typical owner at a level: a caster who can cast the spell at that slot (or a character of
 * that class level) with a +3 in every ability, for the library to show a creature nobody owns.
 */
export function typicalOwner(creature: OwnedCreature, level: number): Owner {
  const characterLevel = creature.follows.by === 'spell' ? Math.min(20, level * 2 - 1) : level
  const pb = proficiencyForLevel(characterLevel)
  const modifiers = { str: 3, dex: 3, con: 3, int: 3, wis: 3, cha: 3 }
  return { level, proficiencyBonus: pb, spellAttack: pb + 3, spellSaveDc: 8 + pb + 3, modifiers }
}

/**
 * The stat block with its attacks and saves at the owner's numbers: `toHit` for every attack,
 * `damage` added to each damage roll that adds a modifier, `saveDc` for every save, and how many
 * attacks its Multiattack makes at this level beside the book's own rule.
 */
export function withOwnerNumbers(
  stats: PrintedStatBlock,
  numbers: { toHit?: number; damage?: number; saveDc?: number; attacks?: number },
): PrintedStatBlock {
  const { toHit, damage, saveDc, attacks } = numbers
  const at = <A extends Ability>(ability: A): A => ({
    ...ability,
    ...(ability.attack
      ? {
          attack: {
            ...ability.attack,
            ...(toHit !== undefined ? { printedBonus: toHit } : {}),
            damage: ability.attack.damage.map((roll) =>
              roll.addModifier && damage !== undefined ? { ...roll, printedBonus: damage } : roll,
            ),
          },
        }
      : {}),
    ...(ability.save && saveDc !== undefined
      ? { save: { ...ability.save, printedDc: saveDc } }
      : {}),
    text: [
      ...ability.text.map((token) =>
        typeof token === 'object' && 'dc' in token && saveDc !== undefined
          ? { ...token, printed: saveDc }
          : token,
      ),
      ...(ability.key === 'multiattack' && attacks !== undefined
        ? [` At this level: ${attacks} attacks.`]
        : []),
    ],
  })
  return {
    ...stats,
    abilities: stats.abilities.map(at),
    ...(stats.options
      ? {
          options: stats.options.map((option) => ({
            ...option,
            abilities: option.abilities.map(at),
          })),
        }
      : {}),
  }
}

/** What one level of a creature's own table changes, e.g. a sidekick's new feature at 3rd level. */
export type LevelStep = { level: number; change: (stats: PrintedStatBlock) => PrintedStatBlock }

/** Gains abilities; one with the key of an ability it has takes that one's place. */
export const gain = (...gained: z.input<typeof CreatureAbility>[]) => {
  const abilities = gained.map((ability) => CreatureAbility.parse(ability))
  return (stats: PrintedStatBlock): PrintedStatBlock => ({
    ...stats,
    // A replaced ability keeps its place; a new one joins at the end.
    abilities: [
      ...stats.abilities.map(
        (ability) => abilities.find(({ key }) => key === ability.key) ?? ability,
      ),
      ...abilities.filter(({ key }) => !stats.abilities.some((ability) => ability.key === key)),
    ],
  })
}

/** Raises ability scores, e.g. an Ability Score Improvement. */
export const raise =
  (by: Partial<Record<AbilityId, number>>) =>
  (stats: PrintedStatBlock): PrintedStatBlock => ({
    ...stats,
    scores: Object.fromEntries(
      Object.entries(stats.scores).map(([id, score]) => [id, score + (by[id as AbilityId] ?? 0)]),
    ) as PrintedStatBlock['scores'],
  })

/** Steps applied one after another, as one level's change. */
export const all =
  (...changes: LevelStep['change'][]) =>
  (stats: PrintedStatBlock): PrintedStatBlock =>
    changes.reduce((block, change) => change(block), stats)

/**
 * A creature at a level of its own table: the printed stat block (its lowest level) with every
 * step up to that level applied in order. A number the book prints that its scores do not give
 * (a to-hit with a +2 from a feature, a save it prints lower) keeps its difference from them.
 */
export function withLevels(
  printed: PrintedStatBlock,
  level: number,
  steps: readonly LevelStep[],
): PrintedStatBlock {
  const pb = (block: PrintedStatBlock) => block.printed?.proficiencyBonus ?? 2
  const stepped = steps
    .filter((step) => step.level <= level)
    .reduce((block, step) => step.change(block), printed)
  // The numbers its scores and proficiency give, before and after, without the book's own.
  const formula = (block: PrintedStatBlock) => {
    const derived = deriveStatBlock({
      ...block,
      printed: {
        proficiencyBonus: pb(block),
        ...(block.hitDice ? {} : { hitPoints: block.printed?.hitPoints ?? 1 }),
      },
    })
    const skills = Object.fromEntries(derived.skills.map(({ skill, bonus }) => [skill, bonus]))
    return { ...derived, skills }
  }
  const before = formula(printed)
  const after = formula(stepped)
  const book = stepped.printed
  const shift = (
    values: Partial<Record<string, number>> | undefined,
    from: Record<string, number>,
    to: Record<string, number>,
  ) =>
    values &&
    Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value! + to[key]! - from[key]!]),
    )
  return {
    ...stepped,
    ...(book
      ? {
          printed: {
            ...book,
            ...(book.saves ? { saves: shift(book.saves, before.saves, after.saves) } : {}),
            ...(book.skills ? { skills: shift(book.skills, before.skills, after.skills) } : {}),
            ...(book.passivePerception !== undefined
              ? {
                  passivePerception:
                    book.passivePerception + after.passivePerception - before.passivePerception,
                }
              : {}),
          },
        }
      : {}),
    abilities: stepped.abilities.map((ability) => {
      const attack = ability.attack
      const was = printed.abilities.find(({ key }) => key === ability.key)?.attack
      if (attack?.printedBonus === undefined || !was) return ability
      const gained =
        modifier(stepped.scores[attack.ability]) -
        modifier(printed.scores[attack.ability]) +
        pb(stepped) -
        pb(printed)
      return { ...ability, attack: { ...attack, printedBonus: was.printedBonus! + gained } }
    }),
  }
}

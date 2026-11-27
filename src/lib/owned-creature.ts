import type { Ability, PrintedStatBlock, Scaling } from '#/definitions/stat-block'

import type { AbilityId } from './rules'
import { proficiencyForLevel } from './stat-block'

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
  stats: (printed: PrintedStatBlock, owner: Owner, picked: readonly string[]) => PrintedStatBlock
}

/**
 * The owner's numbers a creature's function looks at, found by running it at each of its levels
 * with an owner that notes each number read or checked for, so a page asks for those only.
 */
export function ownerNumbersRead(
  creature: OwnedCreature,
  printed: PrintedStatBlock,
  scaling: Scaling,
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
  for (let level = scaling.min; level <= scaling.max; level++) {
    const owner = typicalOwner(scaling, level)
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

/** Declares a creature's owner function, checked against the shape every page runs. */
export function ownedCreature(creature: OwnedCreature) {
  return creature
}

/**
 * A typical owner at a level: a caster who can cast the spell at that slot (or a character of
 * that class level) with a +3 in every ability, for the library to show a creature nobody owns.
 */
export function typicalOwner(scaling: Scaling, level: number): Owner {
  const characterLevel = scaling.by === 'spell' ? Math.min(20, level * 2 - 1) : level
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

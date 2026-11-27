import type { Companion, PC } from '#/definitions/pc'
import type { PrintedStatBlock } from '#/definitions/stat-block'
import type { AbilityId } from '#/lib/rules'

import type { MonsterOwner } from './monster-printing'
import { ownedStats, type OwnedCreature, type Owner } from './owned-creature'
import { ownedCreatureOf } from './owned-creatures'
import { modifier, proficiencyForLevel, withOptions } from './stat-block'

/** The ability each class casts with, for a companion that uses its owner's spell attack. */
const CASTING_ABILITY: Record<string, AbilityId> = {
  artificer: 'int',
  bard: 'cha',
  cleric: 'wis',
  druid: 'wis',
  paladin: 'cha',
  ranger: 'wis',
  sorcerer: 'cha',
  warlock: 'cha',
  wizard: 'int',
}

/** The ability a PC casts with: the companion's own setting, or their class's. */
export function castingAbilityOf(pc: PC, companion: Companion): AbilityId {
  const ability = companion.castingAbility ?? CASTING_ABILITY[(pc.class ?? '').toLowerCase()]
  // A multiclass or subclass caster says which ability it uses: guessing would print wrong numbers.
  if (!ability) throw new Error(`${pc.name}'s ${companion.creature.key} needs a castingAbility`)
  return ability
}

/**
 * The numbers a companion borrows from its PC: the level it is kept or summoned at (its own
 * `level`, else the character level for a class feature, else the spell's lowest slot), the PC's
 * proficiency bonus, ability modifiers, and spell attack and save DC from their casting ability.
 * A PC without ability scores cannot keep one: there is nothing true to borrow.
 */
export function companionOwner(pc: PC, companion: Companion, creature: OwnedCreature): Owner {
  const characterLevel = pc.level ?? 1
  const { min, max } = creature.levels
  const level = Math.min(
    max,
    Math.max(min, companion.level ?? (creature.follows.by === 'class' ? characterLevel : min)),
  )
  const scores = pc.stats?.scores
  // A companion borrows its PC's real numbers: guessing them would print wrong ones.
  if (!scores)
    throw new Error(`${pc.name} needs ability scores to keep a ${companion.creature.key}`)
  const modifiers = Object.fromEntries(
    Object.entries(scores).map(([ability, score]) => [ability, modifier(score)]),
  ) as Record<AbilityId, number>
  const proficiencyBonus = proficiencyForLevel(characterLevel)
  const casting = castingAbilityOf(pc, companion)
  return {
    level,
    proficiencyBonus,
    spellAttack: proficiencyBonus + modifiers[casting],
    spellSaveDc: 8 + proficiencyBonus + modifiers[casting],
    modifiers,
  }
}

/**
 * A PC's companion as the stat block the table runs: worked out from the PC by its own function,
 * if it has one, with its options joined in.
 */
export function companionStats(
  pc: PC,
  companion: Companion,
  stats: PrintedStatBlock,
  owned: MonsterOwner | undefined,
) {
  const picked = companion.options ?? []
  const creature = owned && ownedCreatureOf(owned.publication, owned.monster)
  return creature
    ? ownedStats(creature, stats, companionOwner(pc, companion, creature), picked)
    : withOptions(stats, picked)
}

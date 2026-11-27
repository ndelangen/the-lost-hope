import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Homunculus Servant, worked out from its Artificer's level and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'class', of: 'Artificer' },
  levels: { min: 3, max: 20 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        hitDice: `${level}d4`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 1 + level + owner.modifiers.int,
        },
      },
      { toHit: owner.spellAttack, damage: owner.proficiencyBonus },
    )
  },
})

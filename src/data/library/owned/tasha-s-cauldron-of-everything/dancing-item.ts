import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Dancing Item, worked out from its Bard's level and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 10 + 5 * level,
          hitPointsOnly: true,
        },
      },
      { toHit: owner.spellAttack, damage: owner.proficiencyBonus },
    )
  },
})

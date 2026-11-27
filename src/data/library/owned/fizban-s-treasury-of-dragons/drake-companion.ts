import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Drake Companion, worked out from its Ranger's level and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 14 + owner.proficiencyBonus,
        hitDice: `${level}d10`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      { damage: owner.proficiencyBonus },
    )
  },
})

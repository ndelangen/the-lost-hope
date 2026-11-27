import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Deck Defender, worked out from its Level's level and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus'],
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        hitDice: `${level}d8`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      {},
    )
  },
})

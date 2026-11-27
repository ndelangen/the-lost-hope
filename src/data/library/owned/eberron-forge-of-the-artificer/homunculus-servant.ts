import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Homunculus Servant, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        hitDice: `${level}d4`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      { toHit: owner.spellAttack, damage: level },
    )
  },
})

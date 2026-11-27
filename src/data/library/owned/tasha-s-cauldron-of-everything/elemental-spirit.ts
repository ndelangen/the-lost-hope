import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Elemental Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack'],
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 50 + 10 * (level - 4),
          hitPointsOnly: true,
        },
      },
      { toHit: owner.spellAttack, damage: 4 + level, attacks: Math.floor(level / 2) },
    )
  },
})

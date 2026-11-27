import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Draconic Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'spellSaveDc'],
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 14 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 50 + 10 * (level - 5),
          hitPointsOnly: true,
        },
      },
      {
        toHit: owner.spellAttack,
        damage: 4 + level,
        saveDc: owner.spellSaveDc,
        attacks: Math.floor(level / 2),
      },
    )
  },
})

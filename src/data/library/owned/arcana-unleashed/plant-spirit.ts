import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Plant Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'spellSaveDc'],
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: picked.includes('tree') ? 13 + level : 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 50 + 10 * (level - 5),
          hitPointsOnly: true,
        },
      },
      {
        toHit: owner.spellAttack,
        damage: 3 + level,
        saveDc: owner.spellSaveDc,
        attacks: Math.floor(level / 2),
      },
    )
  },
})

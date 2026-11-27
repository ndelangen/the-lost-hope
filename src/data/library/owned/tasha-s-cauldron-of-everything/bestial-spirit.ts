import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Bestial Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'spellSaveDc'],
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: picked.includes('air') ? 20 + 5 * (level - 2) : 30 + 5 * (level - 2),
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

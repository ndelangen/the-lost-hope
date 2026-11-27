import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Fiendish Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'spellSaveDc'],
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 12 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: picked.includes('demon')
            ? 50 + 15 * (level - 6)
            : picked.includes('devil')
              ? 40 + 15 * (level - 6)
              : picked.includes('yugoloth')
                ? 60 + 15 * (level - 6)
                : 50 + 15 * (level - 6),
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

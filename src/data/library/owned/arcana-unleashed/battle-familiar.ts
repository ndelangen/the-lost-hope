import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Battle Familiar, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack'],
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: picked.includes('brute') ? 13 + level : 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: picked.includes('brute') ? 30 + 5 * (level - 2) : 20 + 5 * (level - 2),
          hitPointsOnly: true,
        },
      },
      { toHit: owner.spellAttack, damage: 3 + level, attacks: Math.floor(level / 2) },
    )
  },
})

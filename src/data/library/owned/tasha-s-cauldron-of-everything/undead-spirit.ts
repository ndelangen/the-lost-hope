import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Undead Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: picked.includes('skeletal') ? 20 + 10 * (level - 3) : 30 + 10 * (level - 3),
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

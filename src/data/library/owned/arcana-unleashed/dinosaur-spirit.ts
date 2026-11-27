import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Dinosaur Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: picked.includes('ankylosaur') ? 13 + level : 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 60 + 10 * (level - 6),
          hitPointsOnly: true,
        },
      },
      {
        toHit: owner.spellAttack,
        damage: 5 + level,
        saveDc: owner.spellSaveDc,
        attacks: Math.floor(level / 2),
      },
    )
  },
})

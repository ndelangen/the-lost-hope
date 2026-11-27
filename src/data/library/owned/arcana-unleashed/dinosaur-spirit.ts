import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Dinosaur Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Summon Dinosaur' },
  levels: { min: 6, max: 9 },
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

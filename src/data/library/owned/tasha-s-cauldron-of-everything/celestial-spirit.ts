import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Celestial Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Summon Celestial' },
  levels: { min: 5, max: 9 },
  stats: (printed, owner, picked) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: picked.includes('defender') ? 13 + level : 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 40 + 10 * (level - 5),
        },
      },
      {
        toHit: owner.spellAttack,
        damage: 2 + level,
        saveDc: owner.spellSaveDc,
        attacks: Math.floor(level / 2),
      },
    )
  },
})

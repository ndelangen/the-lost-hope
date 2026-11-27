import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Construct Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Summon Construct' },
  levels: { min: 4, max: 9 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 13 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 40 + 15 * (level - 4),
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

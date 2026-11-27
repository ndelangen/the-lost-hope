import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Shadow Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Summon Shadowspawn' },
  levels: { min: 3, max: 9 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 35 + 15 * (level - 3),
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

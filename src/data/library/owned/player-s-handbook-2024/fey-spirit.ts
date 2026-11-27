import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Fey Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Summon Fey' },
  levels: { min: 3, max: 9 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 12 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 30 + 10 * (level - 3),
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

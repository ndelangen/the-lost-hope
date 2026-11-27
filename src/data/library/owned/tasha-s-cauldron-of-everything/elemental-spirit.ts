import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Elemental Spirit, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Summon Elemental' },
  levels: { min: 4, max: 9 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 11 + level,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 50 + 10 * (level - 4),
        },
      },
      { toHit: owner.spellAttack, damage: 4 + level, attacks: Math.floor(level / 2) },
    )
  },
})

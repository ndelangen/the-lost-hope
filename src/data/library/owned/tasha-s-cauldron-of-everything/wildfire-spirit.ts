import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Wildfire Spirit, worked out from its Druid's level and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'class', of: 'Druid' },
  levels: { min: 2, max: 20 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      { toHit: owner.spellAttack, damage: owner.proficiencyBonus, saveDc: owner.spellSaveDc },
    )
  },
})

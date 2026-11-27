import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Wildfire Spirit, worked out from its Druid's level and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
          hitPointsOnly: true,
        },
      },
      { toHit: owner.spellAttack, damage: owner.proficiencyBonus, saveDc: owner.spellSaveDc },
    )
  },
})

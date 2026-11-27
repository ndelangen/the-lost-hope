import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Beast of the Sky, worked out from its Ranger's level and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 13 + owner.proficiencyBonus,
        hitDice: `${level}d6`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 4 + 4 * level,
        },
      },
      { toHit: owner.spellAttack, damage: 3 + owner.proficiencyBonus, saveDc: owner.spellSaveDc },
    )
  },
})

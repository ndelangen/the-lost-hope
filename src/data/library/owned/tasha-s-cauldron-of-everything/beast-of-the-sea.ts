import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Beast of the Sea, worked out from its Ranger's level and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 13 + owner.proficiencyBonus,
        hitDice: `${level}d8`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      { toHit: owner.spellAttack, damage: 2 + owner.proficiencyBonus, saveDc: owner.spellSaveDc },
    )
  },
})

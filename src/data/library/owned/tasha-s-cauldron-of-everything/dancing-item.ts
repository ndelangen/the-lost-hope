import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Dancing Item, worked out from its Bard's level and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'class', of: 'Bard' },
  levels: { min: 6, max: 20 },
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 10 + 5 * level,
        },
      },
      { toHit: owner.spellAttack, damage: owner.proficiencyBonus },
    )
  },
})

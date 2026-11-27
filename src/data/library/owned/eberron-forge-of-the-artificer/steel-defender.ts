import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Steel Defender, worked out from its Artificer's level and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'int'],
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 12 + owner.modifiers.int,
        hitDice: `${level}d8`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      { toHit: owner.spellAttack, damage: 2 + owner.modifiers.int },
    )
  },
})

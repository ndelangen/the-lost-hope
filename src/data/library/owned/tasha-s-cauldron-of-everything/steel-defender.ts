import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Steel Defender, worked out from its Artificer's level and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'int'],
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 15 + (level >= 15 ? 2 : 0),
        hitDice: `${level}d8`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 2 + 5 * level + owner.modifiers.int,
        },
      },
      { toHit: owner.spellAttack, damage: owner.proficiencyBonus },
    )
  },
})

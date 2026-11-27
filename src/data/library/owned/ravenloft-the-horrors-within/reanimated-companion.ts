import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Reanimated Companion, worked out from its Artificer's level and its owner's numbers. */
export default ownedCreature({
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 10 + owner.modifiers.int,
        hitDice: `${level}d8`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 5 * level,
        },
      },
      { toHit: owner.spellAttack, damage: owner.modifiers.int, saveDc: owner.spellSaveDc },
    )
  },
})

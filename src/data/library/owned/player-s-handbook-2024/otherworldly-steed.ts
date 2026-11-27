import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Otherworldly Steed, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack', 'spellSaveDc'],
  stats: (printed, owner) => {
    const level = owner.level
    return withOwnerNumbers(
      {
        ...printed,
        ac: 10 + level,
        hitDice: `${level}d10`,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: 5 + 10 * level,
        },
      },
      { toHit: owner.spellAttack, damage: level, saveDc: owner.spellSaveDc },
    )
  },
})

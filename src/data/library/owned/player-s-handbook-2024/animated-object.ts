import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Animated Object, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  reads: ['proficiencyBonus', 'spellAttack'],
  stats: (printed, owner, picked) => {
    return withOwnerNumbers(
      {
        ...printed,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: picked.includes('large') ? 20 : picked.includes('huge') ? 40 : 10,
          hitPointsOnly: true,
        },
      },
      { toHit: owner.spellAttack, damage: 3 },
    )
  },
})

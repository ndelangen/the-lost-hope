import { ownedCreature, withOwnerNumbers } from '#/lib/owned-creature'

/** Animated Object, worked out from the spell slot it is summoned with and its owner's numbers. */
export default ownedCreature({
  follows: { by: 'spell', of: 'Animate Objects' },
  levels: { min: 5, max: 9 },
  stats: (printed, owner, picked) => {
    return withOwnerNumbers(
      {
        ...printed,
        printed: {
          ...printed.printed,
          proficiencyBonus: owner.proficiencyBonus,
          hitPoints: picked.includes('large') ? 20 : picked.includes('huge') ? 40 : 10,
        },
      },
      { toHit: owner.spellAttack, damage: 3 },
    )
  },
})

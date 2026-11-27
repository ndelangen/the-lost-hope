import { ownedCreature } from '#/lib/owned-creature'

/** Deck Defender, worked out from its owner's character level and proficiency bonus. */
export default ownedCreature({
  stats: (printed, owner) => ({
    ...printed,
    hitDice: `${owner.level}d8`,
    printed: {
      ...printed.printed,
      proficiencyBonus: owner.proficiencyBonus,
      hitPoints: 5 + 5 * owner.level,
    },
  }),
})

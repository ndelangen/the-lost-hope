import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Wolfie-Tracking Ring',
  icon: 'fa/FaRing',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'An otherwise unnamed ring from ',
      refs.npcs.bob_the_merchant,
      ' that lets its wearer locate ',
      refs.beasts.wolfie,
      ' at any time. Attuning to it brings on ',
      refs.effects.werewolf_transformation,
      '.',
    ],
    [
      'Its card calls it the Ring of Hunger: rare, cursed, requires attunement. Once attuned it sinks into the wearer’s flesh and cannot be removed normally; Remove Curse suppresses it for 24 hours but does not destroy it. The wearer always feels hungry, which is roleplay only.',
    ],
    [
      'Feeding the Wolf: once per turn, when the wearer reduces a creature to 0 ',
      refs.rules.hit_points,
      ', they gain 1 Hunger, up to 3. Each Hunger adds +1 damage to the first melee weapon attack that hits each turn. At the end of a ',
      refs.rules.long_rest,
      ' the wearer loses 1 Hunger; after 3 days in a row at 0 Hunger they make a DC 13 Wisdom ',
      refs.rules.saving_throw,
      ' or gain a level of exhaustion as the ring whispers “Feed me.”',
    ],
    [
      'Blood Frenzy (bonus action, at 3 Hunger): for 1 minute, +10 ft. speed, ',
      refs.rules.advantage,
      ' on the first melee attack each turn, and +1d4 damage on melee attacks. Afterwards the wearer loses all Hunger and must succeed on a DC 13 Wisdom ',
      refs.rules.saving_throw,
      ' or be unable to willingly move away from the nearest wounded creature until the end of their next turn.',
    ],
  ],
})

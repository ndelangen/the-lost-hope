import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party rescues Roberto from a faceless shadow',
  day: 15,
  location: refs.locations.verdant_haven_forest,
  mark: { type: 'icon', name: 'gi/GiShadowFollower' },
  notes: [
    [
      'The next day, while exploring ',
      refs.locations.verdant_haven_forest,
      ', the party found ',
      refs.npcs.roberto,
      ' being stabbed by the hovering ',
      refs.npcs.faceless_shadow,
      '. The attacker had no face and fled when chased, leaving ',
      refs.items.cursed_shadow_sword,
      ' lodged in ',
      refs.npcs.roberto,
      '.',
    ],
    [
      'The party removed ',
      refs.items.cursed_shadow_sword,
      ' and stabilized ',
      refs.npcs.roberto,
      '.',
    ],
  ],
})

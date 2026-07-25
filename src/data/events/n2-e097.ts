import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party reunites with Bessy and trades equipment',
  day: 18,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'icon', name: 'gi/GiTeamUpgrade' },
  notes: [
    [
      'On their second morning aboard ',
      refs.locations.sylvias_flying_bazaar,
      ', the party found ',
      refs.npcs.bessy,
      ' operating from the ship’s crafting area and reunited with her.',
    ],
    [
      'They spent the morning comparing armour, shields, and weapons, buying and selling equipment with ',
      refs.npcs.bessy,
      '.',
    ],
    [
      refs.pcs.swift_starblade,
      ' negotiated a set of shiny light-red studded leather armour for 50 GP and sold an unused shortsword and shortbow.',
    ],
    [
      refs.npcs.bessy,
      ' did not want to buy ',
      refs.pcs.jim,
      "'s ",
      refs.items.dagger_of_passive_aggression,
      '.',
    ],
    [
      refs.npcs.bessy,
      ' also advised Swift that a balanced metal blade would be the right basis for a future modification to ',
      refs.items.demon_possessed_flying_broom,
      '.',
    ],
  ],
})

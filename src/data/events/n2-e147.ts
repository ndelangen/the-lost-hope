import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan seals the serpent behind a rockfall',
  day: 22,
  location: refs.locations.serpent_eclipse_far_landing,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      'Beyond the water crossing, the party spotted fragile rock that could block the passage. ',
      refs.pcs.devan,
      ' struck it with ',
      refs.items.steve_mace_of_returning,
      ', bringing down a barrier between the party and the still-living ',
      refs.beasts.serpent_eclipse_lake_serpent,
      '.',
    ],
    [
      'The collapse also cut off the way back, leaving the party to continue farther into the maze.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party arrives on Nimbus',
  day: 20,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiFloatingPlatforms' },
  notes: [
    [
      'Near the end of the afternoon, the party disembarked from ',
      refs.locations.sylvias_flying_bazaar,
      ' on ',
      refs.locations.nimbus,
      ' with ',
      refs.npcs.abraham,
      ', ',
      refs.npcs.crowy,
      ', ',
      refs.beasts.wolfie,
      ', and ',
      refs.beasts.sir_fabulous_divine_steed,
      '.',
    ],
  ],
})

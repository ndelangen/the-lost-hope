import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party takes a short rest beyond the serpent pool',
  day: 22,
  location: refs.locations.serpent_eclipse_rest_chamber,
  mark: { type: 'icon', name: 'gi/GiCampfire' },
  notes: [
    [
      'After ',
      refs.events.n2_e147,
      ', ',
      refs.organizations.beasts_and_dwarf,
      ' gathered around the campfire and took a short rest. The flag remained unfound and the maze trial unfinished.',
    ],
  ],
})

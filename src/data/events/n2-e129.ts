import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party returns to the Serpent Eclipse reception hall',
  day: 21,
  location: refs.locations.serpent_eclipse_reception_hall,
  mark: { type: 'icon', name: 'gi/GiDoorway' },
  notes: [
    [
      'After approximately six hours inside, the party returned to the ',
      refs.locations.serpent_eclipse_reception_hall,
      ' and asked the attendants about re-entry, passes, and somewhere to sleep.',
    ],
    [
      'The party then left the ',
      refs.locations.temple_of_the_serpent_eclipse,
      ' during the night.',
    ],
  ],
})

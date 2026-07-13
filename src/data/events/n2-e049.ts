import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The party examines Crowy's contract",
  day: 16,
  location: refs.locations.the_sullen_monk,
  mark: { type: 'icon', name: 'gi/GiContract' },
  notes: [
    [
      refs.pcs.jim,
      ' distrusted ',
      refs.npcs.crowy,
      ' and demanded paperwork. Crowy vomited up its contract, which ',
      refs.pcs.devan,
      ' examined.',
    ],
    [
      'The contract required basic care. The party cleaned the cage and kept Crowy alive before Jim cast Sleep on it and everyone retired to separate rooms.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The elevator opens into a slave mine',
  day: 16,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'icon', name: 'gi/GiMineWagon' },
  notes: [
    [
      'The party stepped from an elevator into a busy underground mining operation. Workers shoved them aside as they took in the slave pit, collars, and human overseers holding elves, orcs, and half-orcs captive.',
    ],
  ],
})

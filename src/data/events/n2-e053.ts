import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The controlling crystal is shattered',
  day: 17,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'icon', name: 'gi/GiShatter' },
  notes: [
    [
      refs.pcs.jim,
      ' concluded that freeing the enslaved workers was the party’s only viable escape. ',
      refs.pcs.cassian_veyl,
      ' sniped the crystal controlling the captives from afar, shattering it, releasing them, and throwing the mine into absolute chaos.',
    ],
    [
      'The concentration spell hiding ',
      refs.beasts.wolfie,
      ' and ',
      refs.beasts.sir_fabulous,
      ' ended during the fighting, exposing the theft in public.',
    ],
  ],
})

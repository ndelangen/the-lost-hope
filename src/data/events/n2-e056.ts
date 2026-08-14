import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim buys Abraham and makes him a promise',
  day: 17,
  location: refs.locations.shadowpeak,
  mark: { type: 'icon', name: 'gi/GiDonkey' },
  notes: [
    [
      refs.pcs.jim,
      ' bought ',
      refs.npcs.abraham,
      ' from ',
      refs.pcs.fix,
      ' for 55 GP from the party’s shared funds.',
    ],
    [
      refs.npcs.abraham,
      ' agreed only after ',
      refs.pcs.jim,
      ' promised to help him earn recognition from his peers. Who those peers are remains unclear, and the promise has no deadline.',
    ],
    [
      'If ',
      refs.pcs.jim,
      ' fails, ',
      refs.npcs.abraham,
      ' threatened to stampede him or bite off one of his fingers. ',
      refs.pcs.jim,
      ' intends to seek out ',
      refs.npcs.abraham,
      '’s peers and tell them stories of his heroic rescues.',
    ],
  ],
})

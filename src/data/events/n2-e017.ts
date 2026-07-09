import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Return phoenix to the dealer (animal 1/3)',
  date: new Date('2026-08-10T15:00'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiFeather' },
  notes: [
    [
      'The party brought the young ',
      refs.npcs.phoenix_chick,
      ' back to the ',
      refs.npcs.rare_animal_dealer,
      ' and returned it.',
    ],
    ['Recovered: 1 of 3 missing animals.'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

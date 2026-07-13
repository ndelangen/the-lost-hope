import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Return phoenix to the dealer (animal 1/3)',
  day: 2,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiNestBirds' },
  notes: [
    [
      'The party brought the young ',
      refs.beasts.phoenix_chick,
      ' back to the ',
      refs.npcs.rare_animal_dealer,
      ' and returned it.',
    ],
    ['Recovered: 1 of 3 missing animals.'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

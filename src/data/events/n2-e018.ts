import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Recover a displacer beast (animal 2/3)',
  day: 2,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiSaberToothedCatHead' },
  notes: [
    [
      'The party searched for the second missing animal. It turned out to be a ',
      refs.beasts.displacer_beast,
      '.',
    ],
    [
      'The party succeeded in taking in the displacer beast and returned it to the ',
      refs.npcs.rare_animal_dealer,
      '.',
    ],
    ['Recovered: 2 of 3 missing animals.'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

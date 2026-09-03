import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian understands Wolfie',
  day: 22,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      'As the party prepared to leave, ',
      refs.beasts.wolfie,
      ' asked whether he was coming too. ',
      refs.pcs.cassian_veyl,
      ' understood the question and could answer in wolf speech, while the others heard only animal sounds.',
    ],
    [
      refs.pcs.cassian_veyl,
      ' protested that he had wanted an obedient wolf, not to become one himself. ',
      refs.beasts.sir_fabulous_divine_steed,
      ' stayed in the stables because he was too large for the dungeon.',
    ],
  ],
})

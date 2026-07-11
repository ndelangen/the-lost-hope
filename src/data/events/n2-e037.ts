import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet Victor the lumberjack and Abraham the donkey',
  day: 10,
  location: refs.locations.badesh_forest,
  mark: { type: 'icon', name: 'gi/GiPineTree' },
  notes: [
    [
      'In the forest, the party met a human lumberjack, ',
      refs.pcs.victor_the_badesh_lumberjack,
      ', with a donkey named ',
      refs.npcs.abraham,
      '.',
    ],
    [refs.pcs.victor_the_badesh_lumberjack, ' joined the campaign as Ryan’s player character.'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.devan],
  ],
})

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
    [
      "Open: what was Victor's role here? Single-session ally, future recurring NPC, or PC in the longer campaign? Not stated.",
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.devan],
  ],
})

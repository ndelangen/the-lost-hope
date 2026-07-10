import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Hunted by a small group of dinos',
  day: 10,
  location: refs.locations.badesh_forest,
  mark: { type: 'icon', name: 'gi/GiCrossedSwords' },
  notes: [
    ['A small group of dinos spotted the party, and the party was hunted and chased.'],
    [
      refs.npcs.abraham,
      ' (',
      refs.pcs.victor_the_badesh_lumberjack,
      "'s donkey) hauled ass — the party piled into his cart and he raced them to safety.",
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.devan],
  ],
})

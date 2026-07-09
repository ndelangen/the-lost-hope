import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Giant spider guarding a young phoenix',
  date: new Date('2026-08-10T14:00'),
  location: refs.locations.fajanet_tunnels,
  mark: { type: 'icon', name: 'gi/GiCrossedSwords' },
  parts: [
    [
      'Deeper in the tunnel, the party found a young phoenix wrapped in a cocoon, guarded by a ',
      refs.npcs.giant_spider,
      '.',
    ],
    [refs.pcs.jim, ' freed the phoenix from the cocoon.'],
    [
      'The young ',
      refs.npcs.phoenix_chick,
      ' bonded with Jim narratively (DM was vague on mechanics).',
    ],
    'The party killed the giant spider.',
    [
      'Phoenix returned to the ',
      refs.npcs.rare_animal_dealer,
      '; Jim narratively wants to return to it.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

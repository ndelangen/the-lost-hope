import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Giant spider guarding a young phoenix',
  day: 2,
  location: refs.locations.fajanet_tunnel_phoenix_cocoon_chamber,
  mark: { type: 'icon', name: 'gi/GiSpiderWeb' },
  notes: [
    [
      'Deeper in the tunnel, the party found ',
      refs.beasts.phoenix_chick,
      ' wrapped in a cocoon, guarded by a ',
      refs.beasts.giant_spider,
      '.',
    ],
    [refs.pcs.jim, ' freed ', refs.beasts.phoenix_chick, ' from the cocoon.'],
    [
      'The young ',
      refs.beasts.phoenix_chick,
      ' bonded with ',
      refs.pcs.jim,
      ' narratively (DM was vague on mechanics).',
    ],
    ['The party killed the ', refs.beasts.giant_spider, '.'],
    [
      refs.beasts.phoenix_chick,
      ' returned to the ',
      refs.npcs.rare_animal_dealer,
      '; ',
      refs.pcs.jim,
      ' narratively wants to return to it.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

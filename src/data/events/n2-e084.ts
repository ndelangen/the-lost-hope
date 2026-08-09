import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party encounters Fix’s potion delivery',
  day: 16,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'icon', name: 'gi/GiFizzingFlask' },
  notes: [
    [
      'There the party encountered ',
      refs.pcs.fix,
      ' delivering a cart of potions to ',
      refs.npcs.lord_malachar,
      ' with ',
      refs.npcs.abraham,
      ' pulling the cart.',
    ],
    [
      refs.pcs.fix,
      ' was not accompanied by ',
      refs.npcs.hex,
      ' or ',
      refs.npcs.sneeve,
      '. The party did not learn whether they had become separated during the destruction of ',
      refs.locations.fairhaven,
      ' or what had happened to Lucky Palm.',
    ],
    [
      'Party: ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.fix,
      ', and ',
      refs.pcs.jim,
      '.',
    ],
  ],
})

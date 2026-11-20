import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan and Cassian ride to the crowded ferry landing',
  day: 24,
  location: refs.locations.skynet_sky_bridge_landing,
  mark: { type: 'icon', name: 'gi/GiDirewolf' },
  notes: [
    [
      'After feeling the pulse and seeing the attack on ',
      refs.locations.nimbus,
      ', ',
      refs.pcs.devan,
      ' and ',
      refs.pcs.cassian_veyl,
      ' left the ',
      refs.locations.stables_at_skynet_s_second_best_inn,
      '. ',
      refs.npcs.abraham,
      ' wandered away on ',
      refs.locations.skynet,
      ' and did not come with them.',
    ],
    [
      refs.pcs.devan,
      ' summoned ',
      refs.beasts.sir_fabulous_divine_steed,
      ' and carried ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.beasts.wolfie,
      ' through the panicked streets to the ferry landing. It was crowded with people, and the ferryman refused to leave after the other ferry was struck. ',
      refs.pcs.cassian_veyl,
      ' proposed compelling him to sail, but another way across arrived before that plan was resolved.',
    ],
  ],
})

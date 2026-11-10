import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party follows the smoke back to Nimbus',
  notes: [
    [
      'Before leaving ',
      refs.locations.skynet,
      ', ',
      refs.pcs.jim,
      ' returned the ',
      refs.items.bag_of_holding,
      ' to ',
      refs.pcs.cassian_veyl,
      ', who asked for it back.',
    ],
    [
      'The party postponed the unresolved favors owed to ',
      refs.npcs.esia,
      ' and the proposed conversation with ',
      refs.npcs.onana_tempest,
      '. They chose to follow ',
      refs.npcs.sarogarth,
      "'s black smoke toward ",
      refs.locations.nimbus,
      ' and crossed by ferry. The discussion treated the trail as urgent, with about a day remaining, rather than establishing a new deadline.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiSailboat' },
})

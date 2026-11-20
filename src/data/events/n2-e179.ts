import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party commissions an airship for gold and two favors',
  day: 24,
  location: refs.locations.skynet_airship_shipyard,
  mark: { type: 'icon', name: 'gi/GiShipWheel' },
  notes: [
    [
      'At the shipyard, ',
      refs.npcs.esia,
      ' helped the party choose the design of ',
      refs.items.little_purple,
      '. They chose crystal power over coal and requested a mast, discussing a place for the ',
      refs.items.obsidian_green_rod,
      ' at its highest point.',
    ],
    [
      'A roll selected a mermaid figurehead, but the party removed it while negotiating the price. The quote fell from 4,600 gold through several revisions to an agreement of 3,950 gold and two favors. Construction began.',
    ],
    [
      refs.pcs.cassian_veyl,
      ' paid the 3,950 gold. ',
      refs.items.little_purple,
      ' was built with the mast, and the ',
      refs.items.obsidian_green_rod,
      ' was installed at its top.',
    ],
  ],
  foretold: [
    {
      what: [[refs.items.little_purple, ' is finished.']],
      when: { type: 'within', span: { days: 3 } },
    },
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party commissions an airship for gold and two favors',
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiShipWheel' },
  notes: [
    [
      'At the shipyard, ',
      refs.npcs.esia,
      ' helped the party choose the design of ',
      refs.items.beasts_and_dwarf_s_airship,
      '. They chose crystal power over coal and requested a mast, discussing a place for the ',
      refs.items.obsidian_green_rod,
      ' at its highest point. Installation of the rod was not recorded.',
    ],
    [
      'A roll selected a mermaid figurehead, but the party removed it while negotiating the price. The quote fell from 4,600 gold through several revisions to an agreement of 3,950 gold and two favors. The individual contributions are unclear. Construction began, with completion expected within three days. It was not delivered during this session.',
    ],
  ],
})

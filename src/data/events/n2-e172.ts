import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Onana offers cheaper lodging and pays the inn bill',
  day: 24,
  location: refs.locations.onana_tempest_s_estate,
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      refs.npcs.onana_tempest,
      " agreed to cover the party's existing bill, quoted at 300 gold, and to find them cheaper lodging.",
    ],
    [
      'The party requested a building that would withstand ',
      refs.pcs.jim,
      "'s ",
      refs.effects.storm,
      ', plenty of meat, and no cheesecake.',
    ],
  ],
  foretold: [
    {
      what: [
        [
          refs.npcs.onana_tempest,
          ' arranges cheaper accommodation on ',
          refs.locations.skynet,
          ' in place of ',
          refs.locations.skynet_s_second_best_inn,
          '. The replacement inn was not named.',
        ],
      ],
    },
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Onana offers cheaper lodging and pays the inn bill',
  day: 24,
  location: refs.locations.tempest,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      refs.npcs.onana_tempest,
      " agreed to cover the party's existing bill, quoted at 300 gold, and arrange cheaper accommodation on ",
      refs.locations.skynet,
      ' in place of ',
      refs.locations.skynet_s_second_best_inn,
      '.',
    ],
    [
      'The party requested a building that would withstand ',
      refs.pcs.jim,
      "'s morning lightning, plenty of meat, and no cheesecake. The replacement inn was not named and the party did not check in during this session.",
    ],
  ],
})

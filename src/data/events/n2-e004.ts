import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet Bob the gate troll',
  day: 1,
  location: refs.locations.fajanet_city_gate,
  mark: { type: 'icon', name: 'gi/GiTroll' },
  notes: [
    [
      "At the city's gates, the party met ",
      refs.npcs.bob_the_gate_troll,
      ', a friendly troll gate guard. ',
      refs.npcs.bob_the_gate_troll,
      ' pointed them toward the ',
      refs.locations.fajanet_guildhall,
      '.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

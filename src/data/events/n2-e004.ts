import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet Bob the gate troll',
  date: new Date('2026-08-09T15:30'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaDoorOpen' },
  parts: [
    [
      "At the city's gates, the party met ",
      refs.npcs.bob_the_gate_troll,
      ', a friendly troll gate guard. Bob pointed them toward the ',
      refs.locations.fajanet_guildhall,
      '.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

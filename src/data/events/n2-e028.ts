import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Light instructs the party to use the trapdoor',
  day: 9,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiFloorHatch' },
  notes: [
    [
      refs.npcs.light_13th_marshal,
      ' instructed the party to take the ',
      refs.locations.trapdoor,
      ' (the same one they used to enter the tunnels) and lock it behind them.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
    ],
  ],
})

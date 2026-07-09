import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Light instructs the party to use the trapdoor',
  date: new Date('2026-08-17T09:00'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaDoorOpen' },
  parts: [
    [
      refs.npcs.third_marshal_light,
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

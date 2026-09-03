import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'A safety rope saves Swift when the vine breaks',
  day: 22,
  location: refs.locations.serpent_eclipse_waterfall_descent,
  mark: { type: 'icon', name: 'gi/GiRopeCoil' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' descended first beside the waterfall, choosing the middle of three hanging vines. He tied on a safety rope held by ',
      refs.pcs.devan,
      '. When the vine broke halfway down, the rope slowed his fall into the water and he escaped with only minor injury.',
    ],
    [
      refs.pcs.devan,
      ' used ',
      refs.items.steve_mace_of_returning,
      ' to hammer a spare warhammer into the rock as an anchor. The others followed down the secured rope.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party breaks the crystal and wakes Sarogarth',
  day: 22,
  location: refs.locations.serpent_eclipse_crystal_oasis,
  mark: { type: 'icon', name: 'gi/GiShatter' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.devan,
      ' helped batter the crystal until it broke with a burst of force. ',
      refs.npcs.sarogarth,
      ' fell out unconscious but breathing. He continued absorbing nearby magic.',
    ],
    [
      'The party used the last two drops of ',
      refs.items.lights_unidentified_drops,
      ' to wake ',
      refs.npcs.sarogarth,
      ". Thunder flashed in the wizard's eyes before he thanked the party.",
    ],
  ],
})

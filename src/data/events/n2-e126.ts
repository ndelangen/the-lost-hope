import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party crosses the silenced left-door passage',
  day: 21,
  location: refs.locations.serpent_eclipse_left_door_passage,
  mark: { type: 'icon', name: 'gi/GiShadowFollower' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' scouted the descending passage and triggered a magical silence that prevented him from speaking. When the others followed, a shadow resembling a smaller, bullied childhood version of ',
      refs.pcs.devan,
      ' appeared.',
    ],
    [
      refs.pcs.jim,
      ' destroyed the personal shadow with Light, allowing Devan to reclaim the memory rather than lose that part of himself.',
    ],
  ],
})

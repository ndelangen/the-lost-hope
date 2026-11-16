import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Swift’s Room at Skynet’s Second-Best Inn',
  illustration: '/assets/locations/swift-s-room-at-skynet-s-second-best-inn-illustration.png',
  icon: 'lucide/BedDouble',
  type: 'district',
  parent: refs.locations.skynet_s_second_best_inn,
  // Use the margin because the room’s floor and position are unknown.
  at: [1115, 922],
  map: {
    url: '/assets/maps/swift-s-room-at-skynet-s-second-best-inn.jpg',
    width: 1536,
    height: 1024,
  },
  notes: [[refs.pcs.swift_starblade, ' stayed in this room.']],
})

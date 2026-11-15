import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Jim’s Room at Skynet’s Second-Best Inn',
  illustration: '/assets/locations/jim-s-room-at-skynet-s-second-best-inn-illustration.png',
  icon: 'lucide/BedSingle',
  type: 'district',
  parent: refs.locations.skynet_s_second_best_inn,
  // Use the margin because the room’s floor and position are unknown.
  at: [768, 922],
  map: {
    url: '/assets/maps/jim-s-room-at-skynet-s-second-best-inn.jpg',
    width: 1536,
    height: 1024,
  },
  notes: [
    ['The room assigned to ', refs.pcs.jim, ' at ', refs.locations.skynet_s_second_best_inn, '.'],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Dining Room at Skynet’s Second-Best Inn',
  illustration: '/assets/locations/dining-room-at-skynet-s-second-best-inn-illustration.png',
  icon: 'lucide/Utensils',
  type: 'district',
  parent: refs.locations.skynet_s_second_best_inn,
  at: [207, 249],
  map: {
    url: '/assets/maps/dining-room-at-skynet-s-second-best-inn.jpg',
    width: 1536,
    height: 1024,
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Night Mothers’ Church',
  illustration: '/assets/locations/night-mothers-church-illustration.png',
  icon: 'lucide/MoonStar',
  type: 'building',
  parent: refs.locations.skynet,
  at: [1075, 328],
  map: { url: '/assets/maps/night-mothers-church.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A church associated with the Night Mothers. It stands beside the ',
      refs.locations.gruumsh_war_temple,
      '.',
    ],
  ],
})

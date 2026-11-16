import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Stables at Skynet’s Second-Best Inn',
  illustration: '/assets/locations/stables-at-skynet-s-second-best-inn-illustration.png',
  icon: 'fa/FaHorseHead',
  type: 'district',
  parent: refs.locations.skynet_s_second_best_inn,
  at: [430, 936],
  map: {
    url: '/assets/maps/stables-at-skynet-s-second-best-inn.jpg',
    width: 1536,
    height: 1024,
  },
})

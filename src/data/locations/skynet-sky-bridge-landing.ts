import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet Sky Bridge Landing',
  illustration: '/assets/locations/skynet-sky-bridge-landing-illustration.png',
  icon: 'gi/GiMooringBollard',
  type: 'landmark',
  parent: refs.locations.skynet,
  at: [750, 820],
  map: { url: '/assets/maps/skynet-sky-bridge-landing.jpg', width: 1536, height: 1024 },
  notes: [['The Sky Bridge ferry quay below the main gate, between the two blue banners.']],
})

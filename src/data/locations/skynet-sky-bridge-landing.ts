import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet Sky Bridge Landing',
  icon: 'gi/GiMooringBollard',
  type: 'landmark',
  parent: refs.locations.skynet,
  at: [750, 820],
  notes: [['The Sky Bridge ferry quay below the main gate, between the two blue banners.']],
})

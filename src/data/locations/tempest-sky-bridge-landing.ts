import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Tempest Sky Bridge Landing',
  icon: 'gi/GiShipBow',
  type: 'landmark',
  parent: refs.locations.tempest,
  publicMapLandmark: true,
  at: [1015, 732],
  notes: [['The Sky Bridge ferry landing on the lower road below the terraced hall.']],
})

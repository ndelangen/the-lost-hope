import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet Airship Shipyard',
  illustration: '/assets/locations/skynet-airship-shipyard-illustration.png',
  icon: 'gi/GiShipWheel',
  type: 'district',
  parent: refs.locations.skynet,
  at: [250, 658],
  map: { url: '/assets/maps/skynet-airship-shipyard.jpg', width: 1536, height: 1024 },
})

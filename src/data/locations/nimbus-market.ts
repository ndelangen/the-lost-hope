import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Nimbus Market',
  illustration: '/assets/locations/nimbus-market-illustration.png',
  icon: 'lucide/Store',
  type: 'district',
  parent: refs.locations.nimbus,
  at: [738, 701],
})

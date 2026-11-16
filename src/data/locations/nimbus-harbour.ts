import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Nimbus Harbour',
  illustration: '/assets/locations/nimbus-harbour-illustration.png',
  icon: 'lucide/Anchor',
  type: 'district',
  parent: refs.locations.nimbus,
  at: [270, 708],
  notes: [['Docks along Nimbus’s western edge.']],
})

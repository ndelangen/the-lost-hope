import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'ShadowPeak Residential District',
  icon: 'gi/GiFamilyHouse',
  type: 'district',
  parent: refs.locations.shadowpeak,
  at: [245, 440],
  notes: [['The residential area of ', refs.locations.shadowpeak, '.']],
})

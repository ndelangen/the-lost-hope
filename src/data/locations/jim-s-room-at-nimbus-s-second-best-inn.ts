import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Jim’s Room at Nimbus’s Second-Best Inn',
  icon: 'lucide/BedSingle',
  type: 'district',
  parent: refs.locations.nimbus_s_second_best_inn,
  at: [0, 0],
  notes: [
    ['The room assigned to ', refs.pcs.jim, ' at ', refs.locations.nimbus_s_second_best_inn, '.'],
  ],
})

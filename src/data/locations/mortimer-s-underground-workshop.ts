import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Mortimer’s Underground Workshop',
  icon: 'gi/GiApothecary',
  type: 'district',
  parent: refs.locations.mortimer_s_shop,
  at: [500, 350],
  notes: [['The underground workshop beneath ', refs.locations.mortimer_s_shop, '.']],
})

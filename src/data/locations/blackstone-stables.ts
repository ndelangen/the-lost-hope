import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Blackstone Stables',
  icon: 'gi/GiBarn',
  type: 'district',
  parent: refs.locations.the_blackstone,
  at: [500, 350],
  notes: [['The stables at ', refs.locations.the_blackstone, '.']],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Penelope’s Underground Workshop',
  icon: 'gi/GiCauldron',
  type: 'district',
  parent: refs.locations.penelope_s_alchemy_shop,
  at: [500, 350],
  notes: [['The clean underground workshop beneath ', refs.locations.penelope_s_alchemy_shop, '.']],
})

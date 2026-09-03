import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Harbor',
  icon: 'gi/GiHarborDock',
  type: 'district',
  parent: refs.locations.fairhaven,
  at: [1080, 400],
  notes: [
    ['The maritime district and principal departure point of ', refs.locations.fairhaven, '.'],
  ],
})

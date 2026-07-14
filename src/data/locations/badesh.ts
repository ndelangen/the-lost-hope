import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Badesh',
  icon: 'gi/GiHutsVillage',
  type: 'settlement',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [['A small forest town — hometown of ', refs.pcs.victor_dranzig, '.']],
  map: { url: '/assets/locations/badesh.png', width: 1200, height: 700 },
})

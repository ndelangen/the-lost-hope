import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Badesh',
  icon: 'gi/GiVillage',
  type: 'settlement',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [['A small forest town — hometown of ', refs.pcs.victor_the_badesh_lumberjack, '.']],
  map: { url: '/assets/locations/badesh.png', width: 1200, height: 700 },
})

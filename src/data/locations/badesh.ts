import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Badesh',
  type: 'settlement',
  parent: refs.locations.world,
  at: [0, 0],
  description: [['A small forest town — hometown of ', refs.pcs.victor_the_badesh_lumberjack, '.']],
  map: { url: '/assets/locations/badesh.png', width: 1200, height: 700 },
})

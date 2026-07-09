import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet',
  icon: 'gi/GiCastle',
  aliases: ['Citadel of Reve'],
  type: 'settlement',
  parent: refs.locations.world,
  at: [600, 0],
  description: ['A walled city.'],
  map: { url: '/assets/locations/fajanet.png', width: 1200, height: 700 },
})

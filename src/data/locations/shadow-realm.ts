import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Shadow Realm',
  icon: 'gi/GiSpectre',
  type: 'realm',
  parent: refs.locations.world,
  at: [0, 400],
  description: ['A disorienting realm of shadow where travelers lose their way.'],
})

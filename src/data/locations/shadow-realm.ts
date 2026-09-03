import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Shadow Realm',
  icon: 'gi/GiSpectre',
  type: 'realm',
  parent: refs.locations.world,
  at: [125, 610],
  notes: [['A disorienting realm of shadow where travelers lose their way.']],
})

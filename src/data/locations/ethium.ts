import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Ethium',
  icon: 'gi/GiEarthAmerica',
  type: 'realm',
  parent: refs.locations.world,
  at: [800, 0],
  notes: [['The continent where the party began its adventures.']],
})

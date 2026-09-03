import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Ethium',
  icon: 'fa/FaMap',
  type: 'realm',
  parent: refs.locations.world,
  at: [925, 90],
  notes: [['The continent where the party began its adventures.']],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: "Fairhaven Adventurers' Guildhall",
  icon: 'gi/GiMedievalBarracks',
  type: 'building',
  parent: refs.locations.fairhaven,
  at: [380, 230],
  notes: [
    ['A hall of the ', refs.organizations.adventurers_guild, ' in ', refs.locations.fairhaven, '.'],
  ],
})

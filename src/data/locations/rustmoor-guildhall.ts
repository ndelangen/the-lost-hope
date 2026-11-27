import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: "Rustmoor Adventurers' Guildhall",
  illustration: '/assets/locations/rustmoor-guildhall-illustration.png',
  type: 'building',
  parent: refs.locations.rustmoor,
  at: [525, 350],
  notes: [
    [
      'A hall of the ',
      refs.organizations.adventurers_guild,
      ' that is being established in ',
      refs.locations.rustmoor,
      '. It is not fully operational yet.',
    ],
  ],
})

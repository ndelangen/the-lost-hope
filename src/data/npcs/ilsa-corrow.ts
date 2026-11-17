import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Ilsa Corrow',
  species: 'Human',
  secretMemberships: [
    { organization: refs.organizations.the_eyeless_hand, status: 'active', rank: 'Finger' },
  ],
  motivations: [
    [
      'Hold ',
      refs.items.ride_the_lightning,
      ' for ',
      refs.npcs.the_father,
      ' and keep it firing on the ',
      refs.organizations.tempest_family,
      '. If she cannot keep the ship, nobody gets it.',
    ],
  ],
  background: [
    [
      'The Finger of ',
      refs.organizations.the_eyeless_hand,
      ' who holds the helm of ',
      refs.items.ride_the_lightning,
      '. She took the cruiser by feeding its crew Arcane Dust until they lost themselves, and now she steers them with her voice.',
    ],
  ],
  stats: refs.creatures.mage,
})

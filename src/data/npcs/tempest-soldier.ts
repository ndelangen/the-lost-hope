import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Tempest Soldier',
  avatar: '/assets/npcs/tempest-soldier-portrait.png',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Soldier' },
  ],
  notes: [
    [
      'A soldier of the ',
      refs.organizations.tempest_family,
      ' in storm-grey livery, drilling, loading supplies, and clearing the streets for the fleet.',
    ],
  ],
  stats: refs.creatures.guard,
})

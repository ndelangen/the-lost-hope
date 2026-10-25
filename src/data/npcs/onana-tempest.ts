import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Onana Tempest',
  species: 'Air Genasi',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'A merchant and dungeon owner who introduces himself as the youngest of his siblings. He prefers conducting business openly.',
    ],
  ],
})

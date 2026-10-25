import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Tempest Patriarch',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'The unnamed father at the head of the ',
      refs.organizations.tempest_family,
      ' and its trading business. The local gang regards him as too powerful to challenge.',
    ],
  ],
})

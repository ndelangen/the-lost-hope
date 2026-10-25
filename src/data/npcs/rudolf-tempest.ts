import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rudolf Tempest',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'An artificer whom the local gang calls the youngest sibling. Their account conflicts with ',
      refs.npcs.onana_tempest,
      "'s claim to be the youngest.",
    ],
  ],
})

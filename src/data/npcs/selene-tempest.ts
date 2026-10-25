import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Selene Tempest',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'An opera singer and older sister of ',
      refs.npcs.celeste_tempest,
      ', according to the local gang.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Celeste Tempest',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    ['A noblewoman whom ', refs.npcs.esia, ' describes as having a polished public reputation.'],
  ],
})

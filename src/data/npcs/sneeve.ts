import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sneeve',
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.lucky_palm,
      status: 'active',
      rank: 'Member',
    },
  ],
})

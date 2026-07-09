import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Angel of the Mountain',
  avatar: '/assets/npcs/angel-of-the-mountain.png',
  location: refs.locations.mountain_top,
  species: 'Angel',
  notes: [p],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'former',
      rank: 'Member',
    },
  ],
})

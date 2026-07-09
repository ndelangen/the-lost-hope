import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Father',
  avatar: '/assets/npcs/the-father.png',
  location: refs.locations.fajanet,
  role: 'Leader of The Eyeless Hand',
  species: 'unknown',
  summary: ['The secret leader of ', refs.organizations.the_eyeless_hand, '.'],
  memberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Leader',
    },
  ],
  notes: ['His true identity is a closely guarded secret.'],
})

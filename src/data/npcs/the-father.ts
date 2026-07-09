import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Father',
  avatar: '/assets/npcs/the-father.png',
  summary: [
    'The secret leader of ',
    refs.organizations.the_eyeless_hand,
    '; his true identity is a closely guarded secret.',
  ],
  memberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Leader',
    },
  ],
})

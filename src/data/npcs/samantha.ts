import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Samantha',
  avatar: '/assets/npcs/tavern-owner.png',
  location: refs.locations.the_nest,
  role: 'Proprietor of The Nest',
  species: 'unknown',
  summary: 'Trades in illegal and semi-illegal substances.',
  memberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Dealer',
    },
  ],
})

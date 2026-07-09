import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Third Marshal Light',
  avatar: '/assets/npcs/light.png',
  location: refs.locations.fajanet_guildhall,
  species: 'unknown',
  summary: [
    [
      'Leader of the ',
      refs.organizations.adventurers_guild,
      ' in ',
      refs.locations.fajanet,
      "; the party's main quest-giver.",
    ],
    ['The price of the one favor he grants each new recruit is unstated.'],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Guildmaster',
    },
  ],
})

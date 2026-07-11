import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Light 13th Marshal',
  avatar: '/assets/npcs/light.png',
  location: refs.locations.fajanet_guildhall,
  species: 'unknown',
  notes: [
    [
      'Leader of the ',
      refs.organizations.adventurers_guild,
      ' in ',
      refs.locations.fajanet,
      "; the party's main quest-giver.",
    ],
    ['The price of the one favor he grants each new recruit is unstated.'],
    ['He is one of the thirteen world governors and holds the formal rank of 13th Marshal.'],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Guildmaster',
    },
    {
      organization: refs.organizations.marshals_court,
      status: 'active',
      rank: '13th Marshal',
    },
  ],
})

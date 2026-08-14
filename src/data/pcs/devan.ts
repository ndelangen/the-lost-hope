import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Devan',
  player: 'Niek',
  url: '',
  avatar: '/assets/pcs/devan.jpg',
  status: 'active',
  species: 'Half-Orc',
  class: 'Paladin',
  level: 5,
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.church_of_gruumsh,
      status: 'active',
      rank: 'Member',
    },
  ],
  notes: [
    [
      'Identified from the D&D Beyond roster (player Balenorblighthammer, Half-Orc Paladin); the session-4 notes\' "orc paladin" is almost certainly him.',
    ],
    ['Paladin oath/subclass not yet established.'],
    ['A heroic-minded adventurer who likes paperwork and is a poor swimmer.'],
  ],
})

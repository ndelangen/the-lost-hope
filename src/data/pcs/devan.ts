import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Devan',
  player: 'Niek',
  url: '',
  avatar: '/assets/pcs/placeholder.svg',
  status: 'active',
  species: 'Half-Orc',
  class: 'Paladin',
  level: 4,
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
  ],
  notes: [
    [
      'Identified from the D&D Beyond roster (player Balenorblighthammer, Half-Orc Paladin 4); the session-4 notes\' "orc paladin" is almost certainly him.',
    ],
    ['Paladin oath/subclass not yet established.'],
    [
      'A heroic-minded adventurer who likes paperwork, is a poor swimmer, and follows a religion requiring weekly donations.',
    ],
  ],
})

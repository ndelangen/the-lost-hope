import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Cassian Veyl',
  player: 'Jareign',
  url: '',
  avatar: '/assets/pcs/cassian.jpg',
  status: 'active',
  species: 'Sheep-like humanoid',
  class: 'Warlock',
  subclass: 'Great Old One Patron',
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
      'Cassian remains lactose-intolerant; ',
      refs.npcs.light_13th_marshal,
      ' has not yet cured the condition.',
    ],
    [
      'A new adventurer who had only just met ',
      refs.npcs.light_13th_marshal,
      ' before signing a contract to watch over ',
      refs.organizations.beasts_and_dwarf,
      ' and prevent further deaths.',
    ],
  ],
})

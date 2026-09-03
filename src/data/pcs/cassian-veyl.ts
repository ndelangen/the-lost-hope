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
  level: 5,
  languages: ['Sylvan', 'Undercommon'],
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
      'Can understand and answer ',
      refs.beasts.wolfie,
      ' in wolf speech. Other party members hear animal sounds rather than the words he hears.',
    ],
    [
      'Cassian asked ',
      refs.npcs.light_13th_marshal,
      ' to use his guild favor to cure his lactose intolerance and believed the favor had been fulfilled. The condition remains; Light has not yet delivered the cure.',
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

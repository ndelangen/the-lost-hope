import { refs } from '#/data/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'William Greenhoove',
  player: 'Neelisroos',
  url: '',
  avatar: '/assets/pcs/william.png',
  status: 'retired',
  species: 'Minotaur',
  class: 'Warlock',
  subclass: 'The Great Old One',
  level: 3,
  summary: 'A warlock with a taste for taverns and substances.',
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
  ],
})

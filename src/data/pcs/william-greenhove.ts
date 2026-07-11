import { refs } from '#/data/generated/refs.ts'
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
  notes: [
    ['A warlock with a taste for taverns and substances.'],
    ['He reads, likes fireworks, and is reluctant to put himself in danger.'],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
  ],
})

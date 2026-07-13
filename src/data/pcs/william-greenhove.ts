import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'William Greenhoove',
  player: 'Neelisroos',
  url: 'https://www.dndbeyond.com/characters/126541696',
  avatar: '/assets/pcs/william.jpg',
  status: 'retired',
  species: 'Minotaur',
  class: 'Warlock',
  subclass: 'The Great Old One',
  level: 3,
  languages: ['Common', 'Minotaur', 'Sylvan'],
  notes: [
    [
      'As a boy, William and his family were captured by a clan of goliaths who hunted them for sport. After his parents died, William was released into an ancient forest and made a pact with an elder being for the strength to escape.',
    ],
    [
      'His greatest regret is leaving his younger sister behind. After years in seclusion, he set out to search for her.',
    ],
    ['A warlock with a taste for taverns and substances.'],
    ['He reads, likes fireworks, and is reluctant to put himself in danger.'],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'former',
      rank: 'Founder',
    },
  ],
})

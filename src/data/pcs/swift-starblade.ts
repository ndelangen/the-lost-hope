import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Swift Starblade',
  player: 'SuperJohan4k',
  url: '',
  avatar: '/assets/pcs/swift.jpg',
  status: 'active',
  species: 'Half-Elf',
  class: 'Rogue',
  subclass: 'Arcane Trickster',
  level: 4,
  memberships: [
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'active',
      rank: 'Member',
    },
  ],
  notes: [
    ['A rogue who formerly went by the name Rhys Greenleaf.'],
    [
      'Session notes called him "a human-elf pirate" before his name was confirmed as Swift Starblade on D&D Beyond.',
    ],
    ['Building a large fanbase is one of his primary ambitions.'],
    [
      'He comes from a multigenerational pirate family associated with the ',
      refs.locations.sea_of_unknown,
      '. According to ',
      refs.npcs.sylvia,
      ', the family broke the pirate code, began an unsanctioned war for power, lost, and retaliated by burning the pirate king’s wife and children rather than accepting defeat.',
    ],
    [
      'Swift later became a well-known pirate at sea by plundering widely, but his reputation barely extends onto land. He is building a fanbase partly to recruit a crew for a ship.',
    ],
    [
      refs.npcs.sylvia,
      ' claims that Swift took her father’s ship and abducted her mother. She also says his relatives are scattered among islands near ',
      refs.locations.continent_of_the_dead,
      ', but their names and exact locations remain unknown.',
    ],
    [
      refs.npcs.alberto,
      ' warned that Swift would need at least a small army to return safely to the ',
      refs.locations.sea_of_unknown,
      '. Swift remains uncertain whether he wants to return.',
    ],
    ['When and why his name changed from Rhys Greenleaf in-fiction remains unknown.'],
  ],
})

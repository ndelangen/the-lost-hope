import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Swift Starblade',
  player: 'SuperJohan4k',
  url: 'https://www.dndbeyond.com/characters/164067115',
  avatar: '/assets/pcs/swift.jpg',
  status: 'active',
  species: 'Half-Elf',
  class: 'Rogue',
  subclass: 'Arcane Trickster',
  level: 5,
  combat: { ac: 15, maxHp: 28, passivePerception: 14, spellSaveDc: 11 },
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
  background: [
    ['From the player’s own backstory. The other players do not know it.'],
    [
      'Rhys was born in ',
      refs.locations.rhys_s_home_village,
      '. As a half-elf he always stood with one foot in each world, but in his youth it never felt like a burden. That changed with the Second Great War between the dwarves and the elves.',
    ],
    [
      'As the war neared its end it became clear the elves would lose. Tension rose in the region, trade stopped, and poverty struck. ',
      refs.npcs.rhys_s_parents,
      ' saw no way out and, in despair and to survive, sold their son to ',
      refs.npcs.the_merchant_skipper,
      '. It was an act of necessity, not cruelty. Rhys was still young when he was taken to work as a hand on ',
      refs.locations.the_merchant_ship_that_bought_rhys,
      '.',
    ],
    [
      'For a year he knew only life at sea: hard labour, little rest, and learning to read people in order to survive. It ended when pirates raided the ship. The crew was slaughtered or thrown overboard, and Rhys was taken as loot. Aboard ',
      refs.locations.blackthorn_s_ship,
      ' he left his old name behind and became known as Swift.',
    ],
    [
      'He grew up under ',
      refs.npcs.captain_blackthorn,
      '. His sharp tongue, quick mind, and natural charm kept him alive and even earned him respect. He learned to fight, lie, negotiate, and judge when silence was stronger than words. During a mutiny he challenged the captain to a duel and won, and the captain granted him his freedom.',
    ],
    [
      'He escaped to ',
      refs.locations.the_port_where_swift_went_free,
      '. There he heard what had become of his home village: nobody he had ever known survived. That knowledge broke something in him.',
    ],
    [
      'Since then he has spent his days in taverns and harbours, drinking his memories away and working for the highest bidder. He rarely speaks of his past, but the fire in his eyes shows the pain still burns. Perhaps he is waiting for a chance at revenge on the war, the world, or himself. Or perhaps, deep down, he hopes there is still a reason to do more than survive.',
    ],
    [
      'Open for the DM: ',
      refs.npcs.sylvia,
      ' describes a multigenerational Starblade pirate family, which does not match this backstory. The family may be ',
      refs.npcs.captain_blackthorn,
      '’s crew, or she may be wrong or lying. The village, the parents, the skipper, both ships, and the port are unnamed, and their map positions are guesses.',
    ],
  ],
})

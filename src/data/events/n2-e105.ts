import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

const deckUrl = 'https://dnd5e.wikidot.com/wondrous-items:deck-of-many-more-things'
const cardLink = (label: string) => ({ type: 'link' as const, label, url: deckUrl })

export default createEvent({
  name: 'The party plays three rounds with the Fiddler',
  day: 20,
  location: refs.locations.gambling_deck,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' joined ',
      refs.npcs.the_fiddler,
      ' at his table. Before they introduced themselves, the Fiddler greeted all four by name and said it was great to meet them “again.” He initially called their party “Beasts and Elves,” then asked what the party was called “this time” when they corrected him.',
    ],
    [
      'The Fiddler chose the game: three rounds using a ',
      cardLink('Deck of Many More Things'),
      '. Cassian had wanted to gamble his shield.',
    ],
    [
      'Cassian permanently gained one point of Dexterity and 25,000 GP, immediately gave 5,000 GP to ',
      refs.npcs.sylvia,
      ', and gained two languages that he has not yet identified. His final draw was ',
      cardLink('Donjon'),
      ', which imprisoned him in a void sphere and left his possessions at the table.',
    ],
    [
      'Devan drew ',
      cardLink('Prisoner'),
      ' and was temporarily bound by ghostly chains. He also gained protections against death and felt that an unidentified part of himself had gone missing or fallen asleep.',
    ],
    [
      'Jim loved the game despite being left in excruciating pain with a permanent one-point penalty to everything. A lightning storm will chase him for thirty days, striking him every morning or at random intervals. The pain and penalty require a Wish or divine intervention to remove.',
    ],
    [
      'Swift drew ',
      cardLink('Talons'),
      ', causing his carried magical items to disintegrate. The ',
      refs.items.demon_possessed_flying_broom,
      ' survived as an artifact but disappeared to an unknown location. Swift also gained the ',
      refs.items.swifts_silver_container,
      ', while ',
      cardLink('Rogue'),
      ' made an unidentified NPC permanently hostile to him.',
    ],
    [
      'Before the party left, the Fiddler asked Jim whether he still had his own ship or airship and whether he was already “the new father.” Jim answered “not anymore” to the ship questions and said he was not a new father to the best of his knowledge.',
    ],
    [
      'The Fiddler asked Devan whether he was already “the high priest of war.” Devan said not yet but that he was working on it. The Fiddler described the future position as an orc-lord role with divine benefits, flying robes, and command of an alliance of roughly ten thousand orcs.',
    ],
    [
      'The Fiddler then asked how long the party had been “visitors.” Jim estimated thirty days, and Devan checked his journal and answered thirty-two days and six hours. The Fiddler rejected this with “not three years.” When Jim asked the purpose of the questions, the Fiddler gave an opaque answer that referred to something having happened before.',
    ],
    [
      'The Fiddler also warned the party not to enter Nimbus’s third dungeon on their second day there. The transcript preserves no distinct post-game question addressed specifically to Cassian or Swift.',
    ],
  ],
})

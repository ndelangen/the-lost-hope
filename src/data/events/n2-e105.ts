import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

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
      ' at his table. The Fiddler seemed to recognize them before their introduction and spoke as though he knew their future and alternate versions of them.',
    ],
    [
      'The Fiddler chose the game: three rounds using a Deck of Many More Things. Cassian had wanted to gamble his shield.',
    ],
    [
      'Cassian permanently gained one point of Dexterity and 25,000 GP, immediately gave 5,000 GP to ',
      refs.npcs.sylvia,
      ', and gained two languages that he has not yet identified. His final draw imprisoned him in a void sphere and left his possessions at the table.',
    ],
    [
      'Devan was temporarily bound by ghostly chains, gained protections against death, and felt that an unidentified part of himself had gone missing or fallen asleep.',
    ],
    [
      'Jim loved the game despite being left in excruciating pain with a permanent one-point penalty to everything. A lightning storm will chase him for thirty days, striking him every morning or at random intervals. The pain and penalty require a Wish or divine intervention to remove.',
    ],
    [
      'Swift’s carried magical items disintegrated. The ',
      refs.items.demon_possessed_flying_broom,
      ' survived as an artifact but disappeared to an unknown location. Swift also gained the ',
      refs.items.swifts_silver_container,
      ', while an unidentified NPC became permanently hostile to him.',
    ],
  ],
})

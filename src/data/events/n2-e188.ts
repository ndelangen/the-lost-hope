import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party stakes another game with the Fiddler',
  notes: [
    [
      'At a table in the VIP room, ',
      refs.npcs.the_fiddler,
      ' offered another game with the ',
      refs.items.deck_of_many_more_things,
      '. The group selected the full deck. ',
      refs.pcs.jim,
      ' wagered the ',
      refs.items.jaded_amulet,
      ', ',
      refs.pcs.swift_starblade,
      ' wagered his fame, and ',
      refs.pcs.cassian_veyl,
      ' agreed to risk his humanity. ',
      refs.npcs.sarogarth,
      ' also joined, putting his companions at stake.',
    ],
    [
      'The party chose how many cards ',
      refs.npcs.sarogarth,
      ' would draw. ',
      refs.pcs.devan,
      ' refused to gamble, valuing his possessions and wanting to earn his own glory.',
    ],
    [
      refs.npcs.the_fiddler,
      ' asked whether ',
      refs.beasts.wolfie,
      ' was already walking on two legs, then suggested he might be confusing timelines. He warned ',
      refs.pcs.devan,
      ' that drugs after his recent blood ritual could provoke a killing spree whose glory would not go to ',
      refs.npcs.grimgor_the_bloody,
      '. ',
      refs.pcs.devan,
      ' chose coffee.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiScales' },
})

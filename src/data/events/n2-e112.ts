import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party pays the Fiddler to release Cassian',
  day: 20,
  location: refs.locations.gambling_deck,
  mark: { type: 'icon', name: 'gi/GiPrisoner' },
  notes: [
    [
      'The party paid ',
      refs.npcs.the_fiddler,
      ' 10,000 GP to release ',
      refs.pcs.cassian_veyl,
      ' from the void sphere. ',
      refs.pcs.cassian_veyl,
      ' reappeared somewhere aboard ',
      refs.locations.sylvias_flying_bazaar,
      ' without the possessions left at the table.',
    ],
    [
      'Before they parted, ',
      refs.npcs.the_fiddler,
      ' warned the party not to enter the third dungeon on their second day among the ',
      refs.locations.three_sky_kingdoms,
      '. He also promised that every future meeting would feature a different game.',
    ],
  ],
})

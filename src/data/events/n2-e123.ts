import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party presents the dungeon pass at the Serpent Eclipse entrance',
  day: 21,
  location: refs.locations.serpent_eclipse_dungeon_entrance,
  mark: { type: 'icon', name: 'gi/GiPassport' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' used the ',
      refs.items.nimbus_dungeon_stamp_card,
      ' sponsored by ',
      refs.npcs.sylvia,
      ' to enter the ',
      refs.locations.temple_of_the_serpent_eclipse,
      '. ',
      refs.beasts.wolfie,
      ' accompanied them, while the other animals remained outside.',
    ],
    [
      refs.pcs.devan,
      ' presented a binder of paperwork at the ',
      refs.locations.serpent_eclipse_dungeon_entrance,
      ', and the attendants accepted the party’s authorization.',
    ],
  ],
})

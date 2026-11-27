import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  hammock_of_worlds: {
    name: 'Hammock of Worlds',
    category: 'Wondrous Item',
    rarity: 'legendary',
    text: [
      [
        'The Hammock of Worlds is a colorful hammock woven with traditional Ataguan designs. It can be used only by a member of the order known as the Green Doctors.',
      ],
      [
        "You can use an action to unfold and place the Hammock of Worlds on a solid surface, whereupon it creates a two-way portal to the Ghost Orchid Tepui in the Feywild or to the Drought Elder in the Far Realm (the user's choice). You can use an action to close an open portal by taking hold of the edges of the cloth and folding it up. Once Hammock of Worlds has opened a portal, it can't do so again for 1d8 hours.",
      ],
    ],
    publication: refs.publications.journeys_through_the_radiant_citadel,
  },
  lesser_hammock_of_worlds: {
    name: 'Lesser Hammock of Worlds',
    category: 'Wondrous Item',
    rarity: 'legendary',
    text: [
      ['The Hammock of Worlds is a colorful hammock woven with traditional Ataguan designs.'],
      [
        "You can use an action to unfold and place the lesser version of the Hammock of Worlds on a solid surface, whereupon it creates a two-way portal to another world or plane of existence. Each time the item opens a portal, the DM decides where it leads or the user can cause it to always reliably connect to the Ghost Orchid Tepui. You can use an action to close an open portal by taking hold of the edges of the cloth and folding it up. Once the lesser version of the Hammock of Worlds has opened a portal, it can't do so again for 1d8 hours.",
      ],
    ],
    publication: refs.publications.journeys_through_the_radiant_citadel,
  },
})

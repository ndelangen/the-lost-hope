import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift retrieves Jim’s pages and weapons',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'avatar', of: refs.pcs.swift_starblade },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' removed ',
      refs.items.robertos_map_pages,
      ' from the ',
      refs.items.pocket_holy_text_of_grimgor,
      ' and threw the book off the island. ',
      refs.npcs.crowy,
      ' retrieved it and returned it to him.',
    ],
    [
      refs.pcs.swift_starblade,
      ' collected the ',
      refs.items.shadow_sword,
      ' and the separate ',
      refs.items.dagger_of_passive_aggression,
      '. When he approached the ',
      refs.items.dagger_of_the_zodiac_signs,
      ', he felt that touching it would kill him and left it on the ground.',
    ],
    [refs.pcs.swift_starblade, ' also gathered ', refs.pcs.jim, '’s ordinary bard’s equipment.'],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party prepares for its first dungeon',
  day: 21,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'icon', name: 'gi/GiPathDistance' },
  notes: [
    [
      'With the ',
      refs.items.nimbus_dungeon_stamp_card,
      ' in their possession, the party selected a dungeon option and agreed to set out. They had not yet entered the dungeon when the session ended.',
    ],
  ],
})

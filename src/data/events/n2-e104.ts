import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sylvia sponsors the party’s first dungeon',
  day: 20,
  location: refs.locations.sylvia_s_quarters,
  mark: { type: 'icon', name: 'gi/GiPassport' },
  notes: [
    [
      refs.npcs.sylvia,
      ' gave ',
      refs.organizations.beasts_and_dwarf,
      ' one ',
      refs.items.nimbus_dungeon_stamp_card,
      ' as sponsorship for the party’s first dungeon.',
    ],
    [
      'She had intended to sponsor two dungeon entrances, but reduced her sponsorship to the first after ',
      refs.events.n2_e101,
      '.',
    ],
  ],
})

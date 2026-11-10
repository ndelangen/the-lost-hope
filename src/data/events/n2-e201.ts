import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Cassian funds Devan's new armour from Bessy",
  notes: [
    [
      'At her stall, ',
      refs.npcs.bessy,
      ' thanked the party for distributing her flyers. A large order from the ',
      refs.organizations.tempest_family,
      ' had made her enough money to buy a permanent shop, though she preferred travelling to learn her craft. She had studied with dwarves and also gambled with ',
      refs.npcs.the_fiddler,
      ', gaining languages.',
    ],
    [
      refs.pcs.cassian_veyl,
      ' paid ',
      refs.npcs.bessy,
      ' 4,500 gold for ',
      refs.items.devan_s_plate_armour,
      ', upgrading the discussion from ordinary plate to +1 plate. It was not collected during this session. They discussed ',
      refs.pcs.devan,
      ' returning to work with ',
      refs.npcs.bessy,
      ' that night.',
    ],
    [
      'She could not supply the Rod of the Pact Keeper ',
      refs.pcs.cassian_veyl,
      ' wanted. ',
      refs.pcs.devan,
      " described the dungeon's death as removing its heart, without this conversation explicitly naming the ",
      refs.items.dagger_of_the_zodiac_signs,
      '.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiGavel' },
})

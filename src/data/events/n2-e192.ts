import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian loses his magic items and wins a treasure chest',
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' drew Talons. The ',
      refs.items.ring_of_spell_storing,
      ', ',
      refs.items.cloak_of_protection,
      ', and original ',
      refs.items.bag_of_holding,
      ' were lost, along with everything inside the bag. All stored contents were gone, including ordinary supplies as well as magic items: meat, fruit, provisions, bedding, the tent, and valuable drink. The list is not exhaustive. The DM distinguished destroyed magic items from artifacts, which vanish elsewhere without being destroyed.',
    ],
    [
      'The ',
      refs.items.wolfie_tracking_ring,
      ' vanished too. The DM later confirmed it still existed somewhere in the world and remained bound to ',
      refs.pcs.cassian_veyl,
      '. Its disappearance did not establish a cure for his transformation or hunger.',
    ],
    [
      'His next draw, Treasure, produced ',
      refs.items.cassian_s_treasure_chest,
      ' containing 10,000 platinum pieces. Only ',
      refs.pcs.cassian_veyl,
      ' could open it, and it could not move more than 100 feet from its appearance point. The table corrected the conversion to 100,000 gold before a withdrawal toll. The 3,000 gold won at roulette had remained outside the lost bag.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian buys a protective cloak and a spell-storing ring',
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      'At a magical-artifact shop, ',
      refs.pcs.cassian_veyl,
      ' bought the ',
      refs.items.cloak_of_protection,
      ' for 2,000 gold and the ',
      refs.items.ring_of_spell_storing,
      ' at a quoted price of 4,500 gold.',
    ],
    [
      'The party also discussed an Amulet of Health, a Wand of the War Mage, a Pact Keeper focus, and armour for ',
      refs.beasts.wolfie,
      ', but no further purchase was confirmed.',
    ],
  ],
})

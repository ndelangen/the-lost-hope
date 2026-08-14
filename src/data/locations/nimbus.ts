import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Nimbus',
  icon: 'lucide/Cloud',
  type: 'settlement',
  parent: refs.locations.sky_islands,
  at: [0, 0],
  notes: [
    [
      'The first inhabited ',
      refs.locations.sky_islands,
      ' destination and their main arrival, screening, and trading hub. Visitors transfer onward by small flying ferries, while apprentices, crafters, alchemists, and blacksmiths work throughout the settlement.',
    ],
    [
      'Nimbus has two known dungeons. A goblin-run transport company handles travel around the island.',
    ],
    [
      'Its three known churches are the ',
      refs.locations.gruumsh_war_temple,
      ', ',
      refs.locations.night_mothers_church,
      ', and the ',
      refs.locations.temple_of_the_watchers,
      '.',
    ],
    ['No dwarves were present when the party arrived.'],
  ],
})

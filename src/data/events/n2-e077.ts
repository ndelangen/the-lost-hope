import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Light sends Cassian to watch over the party',
  day: 15,
  location: refs.locations.verdant_haven,
  mark: { type: 'icon', name: 'gi/GiSheep' },
  notes: [
    [
      'The party decided to seek the nearest ',
      refs.organizations.adventurers_guild,
      ' hall and prepared bags of camping equipment, including a magical tent for eight people.',
    ],
    [
      'Before they left, the sheep-like ',
      refs.pcs.cassian_veyl,
      ' approached with a clear ',
      refs.organizations.adventurers_guild,
      ' mark on his chest. He said the party had lost four members over roughly nine sessions, including two recent departures, and could not afford more losses.',
    ],
    [
      refs.npcs.light_13th_marshal,
      ' had sent ',
      refs.pcs.cassian_veyl,
      ' as a watcher. ',
      refs.pcs.cassian_veyl,
      ' had only just met ',
      refs.npcs.light_13th_marshal,
      ' and was new to the wider situation, but had signed a contract requiring him to do everything he could to prevent more deaths.',
    ],
    [
      refs.pcs.cassian_veyl,
      ' joined the party as they headed into the ',
      refs.locations.snowy_mountains,
      ' toward ',
      refs.locations.shadowpeak,
      '.',
    ],
  ],
})

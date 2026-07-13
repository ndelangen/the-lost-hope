import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Verdant Haven houses the Fairhaven survivors',
  day: 14,
  location: refs.locations.verdant_haven,
  mark: { type: 'icon', name: 'gi/GiChurch' },
  notes: [
    [
      'The ship reached ',
      refs.locations.verdant_haven,
      ' or its outskirts, and the party disembarked beside ',
      refs.locations.verdant_haven_forest,
      '.',
    ],
    [
      'The community included gnomes, the ',
      refs.npcs.verdant_haven_rangers,
      ', and a talking goat named ',
      refs.npcs.bernard,
      '. The settlement lived closely alongside nature while maintaining a comfortable way of life. Its mayor was ',
      refs.npcs.gridswald,
      '.',
    ],
    [
      'Everyone shared dinner. Housing all the survivors was an enormous request and they were only cautiously welcomed, but the community agreed to manage. The survivors were fed and housed in ',
      refs.locations.verdant_haven_church,
      '.',
    ],
    [
      'The party was warned that ',
      refs.beasts.ent_guardians,
      ' roamed and protected the forest at night, making nocturnal travel dangerous.',
    ],
  ],
})

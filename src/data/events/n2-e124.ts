import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The Serpent Eclipse attendants brief the party',
  day: 21,
  location: refs.locations.serpent_eclipse_reception_hall,
  mark: { type: 'icon', name: 'gi/GiChecklist' },
  notes: [
    [
      'At the ',
      refs.locations.serpent_eclipse_reception_hall,
      ', the attendants warned that the dungeon accepted no responsibility for death, reanimation, necromancy, explosions, or physical alteration.',
    ],
    [
      'The party also learned that the dungeon’s operators retained ten percent of recovered treasure and that anyone who died inside could have their essence claimed and returned as one of the dungeon’s assassins.',
    ],
  ],
})

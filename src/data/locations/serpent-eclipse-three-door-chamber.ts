import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Three-Door Chamber',
  icon: 'gi/GiTripleGate',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  at: [525, 350],
  connections: [
    {
      id: 'door-i',
      type: 'door',
      label: 'Door I',
      destination: refs.locations.serpent_eclipse_left_door_passage,
      at: [1056, 725],
    },
    {
      id: 'door-ii',
      type: 'door',
      label: 'Door II',
      destination: refs.locations.serpent_eclipse_maze,
      at: [768, 825],
    },
  ],
  map: {
    url: '/assets/maps/serpent-eclipse-three-door-chamber.jpg',
    width: 1536,
    height: 1024,
  },
  notes: [
    [
      'A chamber in the ',
      refs.locations.temple_of_the_serpent_eclipse,
      ' containing a blood-fed altar and three identical iron doors. Each door leads to a separate challenge.',
    ],
  ],
})

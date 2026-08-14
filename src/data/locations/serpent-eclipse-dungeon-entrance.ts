import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Dungeon Entrance',
  icon: 'gi/GiDungeonGate',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  at: [120, 350],
  notes: [
    [
      'The guarded threshold of the ',
      refs.locations.temple_of_the_serpent_eclipse,
      ', where entrants present their authorization before entering the dungeon proper.',
    ],
  ],
})

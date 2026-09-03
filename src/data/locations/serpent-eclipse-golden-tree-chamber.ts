import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Golden-Tree Chamber',
  icon: 'gi/GiFruitTree',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [1280, 190],
  notes: [
    [
      'The entrance chamber contains an ancient tree bearing golden apples above a platform of roots, with fairies nearby and three paths leading away. Eating its fruit can compel someone to keep eating.',
    ],
  ],
})

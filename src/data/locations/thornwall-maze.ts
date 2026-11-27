import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Thornwall Maze',
  icon: 'gi/GiThornyVine',
  type: 'wilderness',
  parent: refs.locations.the_old_battlefield,
  at: [620, 380],
  map: { url: '/assets/maps/thornwall-maze.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A maze of thorn walls fifteen feet high, grown through the wrecks of ',
      refs.locations.the_old_battlefield,
      '. Fungus grows thick in its paths, and at its heart the moonlight seems brighter than anywhere else on the field.',
    ],
  ],
  background: [
    [
      'The elves grew it in the Second Great War as a living barricade against the dwarven war machines. The machines that charged it are still inside, swallowed by the thorns.',
    ],
    [
      'Old Arcane Dust from their burst engines settled on everything that grows here. The fungus thrives on it and glitters silver.',
    ],
  ],
})

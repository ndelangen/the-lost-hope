import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Shadow Arena',
  icon: 'gi/GiShadowGrasp',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  // Schematic placement within the temple.
  at: [895, 500],
  connections: [
    {
      id: 'return-portal',
      type: 'portal',
      label: 'Return portal',
      destination: refs.locations.serpent_eclipse_three_door_chamber,
      // Schematic marker, not a surveyed portal position.
      at: [525, 350],
    },
  ],
  notes: [['A combat chamber where blood gathers in a central pool and can form hostile shadows.']],
})

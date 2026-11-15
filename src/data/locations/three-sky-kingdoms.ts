import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Three Sky Kingdoms',
  illustration: '/assets/locations/three-sky-kingdoms-illustration.png',
  icon: 'gi/GiIsland',
  type: 'region',
  parent: refs.locations.world,
  at: [765, 90],
  map: {
    url: '/assets/maps/three-sky-kingdoms.jpg',
    width: 1536,
    height: 1024,
    schematicPositions: true,
  },
  notes: [
    [
      'A group of exactly three floating islands, each an inhabited kingdom, lying along an aerial route toward ',
      refs.locations.feywild,
      '.',
    ],
    [
      'The route reaches ',
      refs.locations.nimbus,
      ' first, followed by ',
      refs.locations.skynet,
      ' and finally ',
      refs.locations.tempest,
      '.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The boat to Fajanet: Celesta',
  icon: 'gi/GiCaravel',
  type: 'route',
  parent: refs.locations.world,
  at: [285, 90],
  notes: [
    [
      'The vessel Celesta, which carried ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', and ',
      refs.pcs.revin_grumblefist,
      ' to ',
      refs.locations.fajanet,
      '.',
    ],
  ],
  map: { url: '/assets/locations/the-boat.png', width: 1200, height: 800 },
})

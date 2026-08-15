import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Three Sky Kingdoms',
  icon: 'gi/GiIsland',
  type: 'region',
  parent: refs.locations.world,
  at: [740, 90],
  notes: [
    [
      'Three inhabited island kingdoms in the sky, lying along an aerial route toward ',
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

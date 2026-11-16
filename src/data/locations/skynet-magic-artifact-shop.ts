import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet Magic Artifact Shop',
  illustration: '/assets/locations/skynet-magic-artifact-shop-illustration.png',
  icon: 'gi/GiCrystalShine',
  type: 'building',
  parent: refs.locations.skynet,
  at: [1338, 232],
})

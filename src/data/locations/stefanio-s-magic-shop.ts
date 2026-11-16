import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Stefanio’s Magic Shop',
  illustration: '/assets/locations/stefanio-s-magic-shop-illustration.png',
  icon: 'gi/GiMagicSwirl',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [458, 462],
  notes: [['A magic-item shop run by ', refs.npcs.stefanio, '.']],
})

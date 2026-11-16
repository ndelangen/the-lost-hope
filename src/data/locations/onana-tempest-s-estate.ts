import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Onana Tempest’s Estate',
  illustration: '/assets/locations/onana-tempest-s-estate-illustration.png',
  icon: 'gi/GiIndianPalace',
  type: 'building',
  parent: refs.locations.tempest,
  at: [1053, 237],
  notes: [['A castle estate with gardens where ', refs.npcs.onana_tempest, ' receives guests.']],
})

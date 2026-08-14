import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Rare-Animal Dealer’s Premises',
  icon: 'fa/FaStoreAlt',
  type: 'building',
  parent: refs.locations.fajanet,
  at: [850, 180],
  notes: [['The premises of the ', refs.npcs.rare_animal_dealer, '.']],
})

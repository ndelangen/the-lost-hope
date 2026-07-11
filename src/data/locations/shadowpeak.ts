import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'ShadowPeak',
  icon: 'gi/GiVillage',
  type: 'settlement',
  parent: refs.locations.world,
  at: [600, 600],
  notes: [['A town ruled by ', refs.npcs.lord_malachar, '. Its residents fear their lord.']],
})

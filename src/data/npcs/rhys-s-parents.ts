import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rhys’s Parents',
  location: refs.locations.greenhollow,
  notes: [['The unnamed parents of ', refs.pcs.swift_starblade, '.']],
  stats: refs.creatures.commoner,
})

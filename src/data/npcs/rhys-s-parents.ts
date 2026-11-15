import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rhys’s Parents',
  location: refs.locations.rhys_s_home_village,
  notes: [['The unnamed parents of ', refs.pcs.swift_starblade, '.']],
  stats: refs.creatures.commoner,
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Merchant Skipper',
  location: refs.locations.the_patient_heron,
  notes: [['The skipper of a trading ship. His name is not recorded.']],
  stats: refs.creatures.commoner,
})

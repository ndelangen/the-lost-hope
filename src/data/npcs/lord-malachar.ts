import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Lord Malachar',
  location: refs.locations.the_blackstone,
  species: 'unknown',
  notes: [['The feared ruler of ', refs.locations.shadowpeak, '.']],
})

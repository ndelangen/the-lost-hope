import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Barbara',
  location: refs.locations.nimbus,
  notes: [
    [
      'An elderly widow whom the local dealers describe as a formidable customer with an unusually high tolerance for drugs and alcohol.',
    ],
  ],
})

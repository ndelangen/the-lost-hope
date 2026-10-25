import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Barbara',
  notes: [
    [
      'An elderly widow living near the edge of ',
      refs.locations.nimbus,
      '. The local dealers describe her as a formidable customer with an unusually high tolerance for drugs and alcohol.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: "Throne Figure in Jim's Vision",
  notes: [
    [
      'An unidentified being that wears the face of one of ',
      refs.pcs.jim,
      "'s murdered childhood friends. Its identity and relationship to ",
      refs.npcs.the_father,
      ' remain unknown.',
    ],
  ],
})

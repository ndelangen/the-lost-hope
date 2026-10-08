import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: "Find Grimgor's Bones",
  icon: 'gi/GiCryptEntrance',
  type: 'mission',
  notes: [
    [
      refs.pcs.devan,
      ' accepted ',
      refs.npcs.grimgor_the_bloody,
      "'s invitation to find his bones.",
    ],
  ],
  clues: [
    [
      refs.events.n2_e157,
      " records the task. The bones' location and how to reach them remain unknown.",
    ],
  ],
  status: 'open',
})

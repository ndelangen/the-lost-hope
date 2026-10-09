import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: "Find Grimgor's Bones",
  icon: 'gi/GiCryptEntrance',
  type: 'mission',
  notes: [['Find the bones of ', refs.npcs.grimgor_the_bloody, '.']],
  clues: [
    [
      refs.events.n2_e157,
      ' records ',
      refs.pcs.devan,
      ' accepting the invitation to find the bones. Their location and how to reach them remain unknown.',
    ],
  ],
  status: 'open',
})

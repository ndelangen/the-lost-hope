import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: "Recover Swift's Flying Broom",
  icon: 'gi/GiWitchFlight',
  type: 'mission',
  notes: [
    [
      'Recover ',
      refs.pcs.swift_starblade,
      "'s missing ",
      refs.items.demon_possessed_flying_broom,
      '.',
    ],
  ],
  clues: [
    [refs.events.n2_e105, " records the loss of the broom during the Fiddler's game."],
    [
      refs.events.n2_e163,
      ' provides a possible route through a ritual at a crossroads on solid ground. ',
      refs.npcs.sarogarth,
      ' supplied instructions but warned against carrying them out.',
    ],
  ],
  status: 'open',
})

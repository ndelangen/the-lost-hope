import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Who Became Swift Starblade’s Enemy?',
  icon: 'gi/GiHoodedAssassin',
  type: 'mystery',
  notes: [[refs.pcs.swift_starblade, ' has an unidentified enemy who will act against him.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e105,
      ' — the Rogue card from the Fiddler’s Deck made an NPC chosen by the DM permanently hostile to ',
      refs.pcs.swift_starblade,
      '.',
    ],
    [
      'The NPC’s identity is intentionally hidden until revealed during play. It is also unknown how or when the hostility will manifest.',
    ],
  ],
  conclusion: [],
})

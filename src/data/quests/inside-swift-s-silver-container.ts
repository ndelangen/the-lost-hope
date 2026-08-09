import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Inside Swift’s Silver Container',
  icon: 'gi/GiLockedBox',
  type: 'mystery',
  notes: [[refs.pcs.swift_starblade, ' must open his sealed silver container under a full moon.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e105,
      ' — ',
      refs.pcs.swift_starblade,
      ' gained ',
      refs.items.swifts_silver_container,
      ' during the Fiddler’s game.',
    ],
    [
      refs.items.swifts_silver_container,
      ' can only be opened under a full moon and was said to contain a valuable item. Its contents and any further opening conditions or consequences remain unknown.',
    ],
  ],
  conclusion: [],
})

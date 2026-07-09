import { refs } from '#/data/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Mystery Girl',
  notes: [['The Mystery Girl']],
  status: 'open',
  clues: [
    [
      refs.pcs.william_greenhove,
      ' had an experience in the bathroom relating to a ',
      refs.npcs.mystery_girl,
      ' from his background story.',
    ],
    ['The ', refs.npcs.mystery_girl, " is part of William's personal history."],
  ],
  conclusion: [],
})

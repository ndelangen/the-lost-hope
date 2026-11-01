import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Mystery Girl',
  icon: 'gi/GiHoodedFigure',
  type: 'mystery',
  notes: [['Identify the child rescued near ', refs.locations.fairhaven, '.']],
  status: 'resolved',
  clues: [
    [
      refs.events.n2_e121,
      ' records the rescue of ',
      refs.npcs.celeste,
      ' from among her zombified parents.',
    ],
  ],
  conclusion: [
    [
      'The child is ',
      refs.npcs.celeste,
      ', unrelated to the personal histories of the party. The party brought her to safety and left her in ',
      refs.locations.verdant_haven,
      '.',
    ],
  ],
})

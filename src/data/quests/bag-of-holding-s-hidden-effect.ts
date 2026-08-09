import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Bag of Holding’s Hidden Effect',
  icon: 'gi/GiRollingDiceCup',
  type: 'mystery',
  notes: [[refs.items.bag_of_holding, ' has an additional random effect that remains unrevealed.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e115,
      ' — ',
      refs.pcs.cassian_veyl,
      ' bought the ',
      refs.items.bag_of_holding,
      ' from ',
      refs.npcs.bob_the_merchant,
      ' for 5,000 GP.',
    ],
    [
      refs.npcs.bob_the_merchant,
      ' said the bag has an additional random effect that would be determined later. The effect, its trigger, and whether it is beneficial, harmful, or mixed remain unknown.',
    ],
  ],
  conclusion: [],
})

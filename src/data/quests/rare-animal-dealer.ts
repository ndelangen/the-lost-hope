import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Help the Rare-Animal Dealer',
  icon: 'gi/GiPawPrint',
  notes: [['Help the Rare-Animal Dealer']],
  status: 'resolved',
  clues: [
    [
      'The ',
      refs.npcs.rare_animal_dealer,
      ' is an "exotic animal dealer" who was missing 3 animals.',
    ],
    [
      'Animal #1 (Phoenix): party found a phoenix feather in an offshoot tunnel, then a young phoenix wrapped in a cocoon, guarded by a ',
      refs.beasts.giant_spider,
      '. ',
      refs.pcs.jim,
      ' freed the phoenix. It bonded with ',
      refs.pcs.jim,
      '. Returned to ',
      refs.npcs.rare_animal_dealer,
      '.',
    ],
    [
      'Animal #2 (Displacer Beast): party succeeded in capturing the ',
      refs.beasts.displacer_beast,
      ' and returning it.',
    ],
    ['Animal #3: unidentified. The party ran out of time and did NOT bring back the third animal.'],
  ],
  conclusion: [],
})

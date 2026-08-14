import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Help the Rare-Animal Dealer',
  icon: 'gi/GiPawPrint',
  type: 'mission',
  notes: [['Help ', refs.npcs.rare_animal_dealer, '.']],
  status: 'resolved',
  clues: [
    [refs.npcs.rare_animal_dealer, ' was missing 3 animals.'],
    [
      'Animal #1 (',
      refs.beasts.phoenix_chick,
      '): party found the ',
      refs.items.phoenix_feather,
      ' in an offshoot tunnel, then found ',
      refs.beasts.phoenix_chick,
      ' wrapped in a cocoon, guarded by a ',
      refs.beasts.giant_spider,
      '. ',
      refs.pcs.jim,
      ' freed ',
      refs.beasts.phoenix_chick,
      ', who bonded with ',
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

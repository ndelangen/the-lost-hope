import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Bring Swift’s Sister to Sylvia',
  icon: 'gi/GiEngagementRing',
  type: 'mission',
  notes: [
    [
      'A private quest from ',
      refs.npcs.sylvia,
      ', known only to ',
      refs.pcs.jim,
      ' and ',
      refs.pcs.cassian_veyl,
      ': find ',
      refs.npcs.swift_starblade_s_younger_sister,
      ' and bring her alive to ',
      refs.npcs.sylvia,
      ' to marry one of her brothers.',
    ],
  ],
  status: 'open',
  clues: [
    [
      refs.events.n2_e099,
      ' — ',
      refs.npcs.sylvia,
      ' said the marriage would settle the dispute between her family and the ',
      refs.organizations.starblade_family,
      '.',
    ],
    [
      'The sister’s name and exact whereabouts, and which of Sylvia’s brothers she is intended to marry, remain unknown.',
    ],
  ],
  conclusion: [],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Bring Swift’s Sister to Sylvia',
  icon: 'gi/GiEngagementRing',
  notes: [
    [
      'A private quest from ',
      refs.npcs.sylvia,
      ', known only to ',
      refs.pcs.jim,
      ' and ',
      refs.pcs.cassian_veyl,
      ': find ',
      refs.pcs.swift_starblade,
      '’s younger sister and bring her alive to Sylvia to marry one of Sylvia’s brothers.',
    ],
  ],
  status: 'open',
  clues: [
    [
      refs.events.n2_e099,
      ' — Sylvia said the marriage would settle the dispute between her family and the Starblade family.',
    ],
    [
      'The sister’s name and exact whereabouts, and which of Sylvia’s brothers she is intended to marry, remain unknown.',
    ],
  ],
  conclusion: [],
})

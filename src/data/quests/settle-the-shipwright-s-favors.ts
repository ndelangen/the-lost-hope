import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: "Settle the Shipwright's Favors",
  icon: 'gi/GiScrollQuill',
  type: 'mission',
  notes: [
    [
      'Fulfill the two favors owed to ',
      refs.npcs.esia,
      ' as part of the price of ',
      refs.items.little_purple,
      '.',
    ],
  ],
  clues: [
    [
      refs.events.n2_e213,
      ' records early delivery of ',
      refs.items.little_purple,
      '. In ',
      refs.events.n2_e220,
      ', ',
      refs.npcs.onana_tempest,
      ' dismissed the favors during the war; ',
      refs.npcs.esia,
      ' has not confirmed releasing the party.',
    ],
    [refs.events.n2_e179, ' records the agreement.'],
    [
      refs.events.n2_e181,
      ' identifies grievances against ',
      refs.npcs.celeste_tempest,
      ' and ',
      refs.npcs.brend_tempest,
      ', but leaves the precise obligations unsettled.',
    ],
    [
      refs.events.n2_e182,
      ' records a proposed approach to ',
      refs.npcs.onana_tempest,
      ', not an accepted job.',
    ],
  ],
  status: 'open',
})

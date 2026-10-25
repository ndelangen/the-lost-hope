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
      refs.items.beasts_and_dwarf_s_airship,
      '.',
    ],
  ],
  clues: [
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

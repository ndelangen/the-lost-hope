import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Mountain Holy Site — whose faith, deity, form?',
  notes: [['Mountain Holy Site — whose faith, deity, form?']],
  status: 'open',
  clues: [
    [
      'Session 4: ',
      refs.events.n2_e031,
      ' — the party passed through ',
      refs.locations.holy_site,
      ' and continued upwards into the mountains.',
    ],
    [
      'The site sits between ',
      refs.locations.mountain_cliff,
      ' and the ',
      refs.locations.puzzle_room,
      '.',
    ],
    [
      'Whose holy site this is, what faith it represents, and what deity or form it takes are unknown.',
    ],
  ],
  conclusion: [],
})

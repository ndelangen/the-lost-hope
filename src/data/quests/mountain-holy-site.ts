import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Mountain Holy Site — whose faith, deity, form?',
  icon: 'gi/GiHolySymbol',
  type: 'mystery',
  notes: [['Whose domain does ', refs.locations.holy_site, ' represent, and what is its purpose?']],
  status: 'resolved',
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
  ],
  conclusion: [
    [
      refs.locations.holy_site,
      ' represents the domain of ',
      refs.npcs.misha,
      ', who created it as a safe haven for his ',
      refs.beasts.dragon_children,
      '.',
    ],
  ],
})

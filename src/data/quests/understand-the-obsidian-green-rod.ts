import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Understand the Obsidian Green Rod',
  icon: 'gi/GiBoltShield',
  type: 'mystery',
  notes: [
    ['Find out what the ', refs.items.obsidian_green_rod, ' does and what limits its protection.'],
  ],
  clues: [
    [refs.events.n2_e155, ' records its appearance on the dungeon altar.'],
    [
      refs.events.n2_e160,
      ' shows a morning lightning strike leaving ',
      refs.pcs.jim,
      ' unharmed while his bed still burned. This supports protection from lightning, but does not establish immunity in other circumstances.',
    ],
  ],
  status: 'open',
})

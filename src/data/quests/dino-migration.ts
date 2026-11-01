import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Dinosaur Migration',
  icon: 'gi/GiVelociraptorTracks',
  type: 'mystery',
  notes: [['The Dinosaur Migration']],
  status: 'resolved',
  clues: [
    [
      refs.events.n2_e038,
      ' — a large group of ridden dinosaurs was moving toward ',
      refs.locations.fairhaven,
      '.',
    ],
    [
      refs.events.n2_e039,
      ' — a smaller group chased the party; ',
      refs.npcs.abraham,
      ' (',
      refs.pcs.victor_dranzig,
      "'s donkey) carried them to safety.",
    ],
    [refs.events.n2_e040, ' — the chase ended at ', refs.locations.badesh, '.'],
  ],
  conclusion: [
    [
      refs.events.n2_e038,
      ' establishes that the dinosaurs sensed danger and were migrating to a safer place.',
    ],
  ],
})

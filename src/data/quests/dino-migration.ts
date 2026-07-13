import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Dinosaur Migration',
  notes: [['The Dinosaur Migration']],
  status: 'open',
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
    [
      refs.events.n2_e040,
      ' — the chase ended at ',
      refs.locations.badesh,
      ', but the reason for the migration remains unknown.',
    ],
    [
      'Why are they heading to ',
      refs.locations.fairhaven,
      '? The party was told to reach Fairhaven by ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
  ],
  conclusion: [],
})

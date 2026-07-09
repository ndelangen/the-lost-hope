import { refs } from '#/data/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Dinosaur Migration',
  description: 'The Dinosaur Migration',
  status: 'open',
  clues: [
    ['A large group of dinosaurs (with riders) was moving toward ', refs.locations.fairhaven, '.'],
    'A small group of dinosaurs spotted the party and hunted them.',
    [
      'The party escaped thanks to ',
      refs.npcs.abraham,
      ' (',
      refs.pcs.victor_the_badesh_lumberjack,
      "'s donkey). The dinosaurs lost interest.",
    ],
    'It is unclear if the dinosaurs were even hostile, or just heading somewhere.',
    [
      'Why are they heading to ',
      refs.locations.fairhaven,
      '? The party was told to reach Fairhaven by ',
      refs.npcs.third_marshal_light,
      '.',
    ],
  ],
  conclusion: [],
})

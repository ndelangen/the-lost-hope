import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Cursed Sword',
  icon: 'gi/GiBottledShadow',
  type: 'mystery',
  notes: [
    ['What is the curse on ', refs.items.cursed_shadow_sword, ', and what shadow is bound to it?'],
  ],
  status: 'open',
  clues: [
    [
      refs.events.n2_e073,
      ' — the ',
      refs.npcs.faceless_shadow,
      ' left ',
      refs.items.cursed_shadow_sword,
      ' lodged in ',
      refs.npcs.roberto,
      '.',
    ],
    [
      refs.events.n2_e088,
      ' — ',
      refs.items.cursed_shadow_sword,
      ' caused decay in ',
      refs.locations.verdant_haven_forest,
      ' and attracted the ',
      refs.beasts.ent_guardians,
      '.',
    ],
    [
      refs.events.n2_e074,
      ' — carrying ',
      refs.items.cursed_shadow_sword,
      ' into ',
      refs.locations.verdant_haven,
      ' broke its map-hiding ward. ',
      refs.npcs.bessy,
      ' made a permanent sheath to contain it.',
    ],
    [
      refs.events.n2_e078,
      ' — when ',
      refs.pcs.jim,
      ' drew ',
      refs.items.cursed_shadow_sword,
      ', a shadow killed a wolf instantly and then nearly killed ',
      refs.pcs.jim,
      '.',
    ],
  ],
  conclusion: [],
})

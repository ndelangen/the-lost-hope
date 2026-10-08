import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan becomes a wandering priest and meets Grimgor',
  day: 22,
  location: refs.locations.gruumsh_temple_main_hall,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      refs.pcs.devan,
      ' reported the destruction of the dungeon to the ',
      refs.npcs.gruumsh_high_priest,
      '. A statue confirmed his claim and produced a golden star. The high priest performed a violent anointing ritual.',
    ],
    [
      'Presenting the ',
      refs.items.grimgor_s_sacred_necklace,
      ' caused the high priest to faint repeatedly. He ordered it sent to the cathedral and called a war party. ',
      refs.pcs.devan,
      ' then presented the ',
      refs.items.grimgor_s_bloodied_bandages,
      ' to the gathered worshippers, prompting another ritual.',
    ],
    [
      'In a divine vision, ',
      refs.pcs.devan,
      ' stood before Gruumsh and met ',
      refs.npcs.grimgor_the_bloody,
      ', who approved of him and invited him to find his bones. ',
      refs.npcs.grimgor_the_bloody,
      ' also gave him a rude but affectionate message for ',
      refs.npcs.sarogarth,
      '.',
    ],
    [
      'The high priest recognized ',
      refs.pcs.devan,
      ' as a wandering priest and gave him the ',
      refs.items.devan_s_wandering_priest_robe,
      '. Afterward, ',
      refs.pcs.devan,
      ' recorded the vision and relayed the message to ',
      refs.npcs.sarogarth,
      ', who was moved by hearing from his old friend.',
    ],
  ],
})

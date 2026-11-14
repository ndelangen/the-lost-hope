import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Abraham’s promise',
  direction: [
    [
      'Where does ',
      refs.npcs.abraham,
      ' belong, and can ',
      refs.pcs.jim,
      ' keep his promise to him?',
    ],
  ],
  quests: [refs.quests.make_abraham_known_among_his_peers],
  plots: [
    {
      name: 'A donkey in Badesh forest',
      status: 'closed',
      npcs: [refs.npcs.abraham],
      events: [refs.events.n2_e037, refs.events.n2_e038, refs.events.n2_e039],
    },
    {
      name: 'Rescued from the guildhall stables',
      status: 'closed',
      npcs: [refs.npcs.abraham],
      events: [refs.events.n2_e068],
    },
    {
      name: 'Abraham’s cart and Jim’s promise',
      status: 'closed',
      npcs: [refs.npcs.abraham],
      events: [refs.events.n2_e054, refs.events.n2_e056],
    },
    {
      name: 'Abraham among his peers',
      hook: [
        [
          '',
          refs.pcs.jim,
          ' promised to make ',
          refs.npcs.abraham,
          ' known. Where could a donkey earn a name?',
        ],
      ],
      npcs: [refs.npcs.abraham],
    },
  ],
})

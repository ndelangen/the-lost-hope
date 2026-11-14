import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Swift’s demon broom',
  direction: [
    [
      'Can ',
      refs.pcs.swift_starblade,
      ' get the ',
      refs.items.demon_possessed_flying_broom,
      ' back, and at what price?',
    ],
  ],
  quests: [refs.quests.recover_swift_s_flying_broom],
  plots: [
    {
      name: 'Taming the demon broom',
      status: 'closed',
      npcs: [refs.npcs.mr_bumblefoot],
      events: [refs.events.n2_e046, refs.events.n2_e064, refs.events.n2_e067],
    },
    {
      name: 'The broom at the Fiddler’s table',
      status: 'closed',
      npcs: [refs.npcs.the_fiddler],
      events: [refs.events.n2_e105],
    },
    {
      name: 'A crossroads ritual',
      status: 'closed',
      npcs: [refs.npcs.sarogarth],
      events: [refs.events.n2_e163, refs.events.n2_e167],
    },
    {
      name: 'The heart of an innocent',
      hook: [
        [
          'The ritual asks for the heart of an innocent. Who would the party accept, and who would stop them?',
        ],
      ],
    },
  ],
})

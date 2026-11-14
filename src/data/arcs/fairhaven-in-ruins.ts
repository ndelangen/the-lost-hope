import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Fairhaven in ruins',
  direction: [
    [
      'Who destroyed Fairhaven, and what part did ',
      refs.npcs.giggles,
      ' and ',
      refs.npcs.mortimer_mafioso,
      ' play?',
    ],
  ],
  quests: [
    refs.quests.who_is_giggles,
    refs.quests.the_fairhaven_invasion,
    refs.quests.mystery_girl,
  ],
  plots: [
    {
      name: 'Giggles and the rival alchemist',
      status: 'closed',
      npcs: [refs.npcs.giggles, refs.npcs.mortimer_mafioso, refs.npcs.penelope],
      events: [
        refs.events.n2_e043,
        refs.events.n2_e044,
        refs.events.n2_e060,
        refs.events.n2_e086,
        refs.events.n2_e087,
        refs.events.n2_e061,
        refs.events.n2_e062,
      ],
    },
    {
      name: 'Celeste from the shore',
      status: 'closed',
      npcs: [refs.npcs.celeste],
      events: [refs.events.n2_e121],
    },
    {
      name: 'The Festival of the Heroes',
      status: 'closed',
      npcs: [refs.npcs.mayor_of_fairhaven],
      events: [refs.events.n2_e063, refs.events.n2_e065],
    },
    {
      name: 'The city falls',
      status: 'closed',
      events: [refs.events.n2_e066, refs.events.n2_e069, refs.events.n2_e070],
    },
    {
      name: 'Survivors in Verdant Haven',
      status: 'closed',
      npcs: [refs.npcs.bernard, refs.npcs.gridswald],
      events: [refs.events.n2_e072],
    },
    {
      name: 'Who summoned the monsters',
      hook: [
        [
          'The wizards who destroyed Fairhaven are still unnamed. Who sent them, and is ',
          refs.npcs.giggles,
          ' one of them?',
        ],
      ],
      npcs: [refs.npcs.giggles],
    },
  ],
})

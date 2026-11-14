import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The cursed shadow sword',
  icon: 'gi/GiRelicBlade',
  direction: [
    [
      'What is bound to the ',
      refs.items.cursed_shadow_sword,
      ', and what does it want from ',
      refs.pcs.jim,
      '?',
    ],
  ],
  quests: [refs.quests.the_cursed_sword],
  plots: [
    {
      name: 'The faceless shadow',
      status: 'closed',
      npcs: [refs.npcs.faceless_shadow, refs.npcs.roberto],
      events: [refs.events.n2_e073],
    },
    {
      name: 'The sword poisons Verdant Haven',
      status: 'closed',
      events: [refs.events.n2_e088, refs.events.n2_e074],
    },
    {
      name: 'The shadow nearly kills Jim',
      status: 'closed',
      events: [refs.events.n2_e078],
    },
    {
      name: 'Cleansed at the Gruumsh temple',
      status: 'closed',
      npcs: [refs.npcs.gruumsh_high_priest],
      events: [refs.events.n2_e132],
    },
    {
      name: 'Jim takes the sword back',
      status: 'closed',
      events: [refs.events.n2_e162],
    },
    {
      name: 'What the sword still holds',
      hook: [['The sword was cleansed, not destroyed. What wakes in it next?']],
    },
  ],
})

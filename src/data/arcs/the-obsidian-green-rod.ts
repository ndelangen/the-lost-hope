import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The obsidian green rod',
  direction: [
    ['What is the ', refs.items.obsidian_green_rod, ' the party took from the dying dungeon?'],
  ],
  quests: [refs.quests.understand_the_obsidian_green_rod],
  plots: [
    {
      name: 'Taken from the dungeon',
      status: 'closed',
      events: [refs.events.n2_e155],
    },
    {
      name: 'Protection from the lightning',
      status: 'closed',
      events: [refs.events.n2_e160],
    },
    {
      name: 'The rod and the airship',
      status: 'closed',
      npcs: [refs.npcs.esia],
      events: [refs.events.n2_e179],
    },
  ],
})

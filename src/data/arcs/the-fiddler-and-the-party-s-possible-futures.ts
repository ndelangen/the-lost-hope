import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Fiddler and the party’s possible futures',
  direction: [['Explore how the dealer knows the party.']],
  quests: [refs.quests.find_the_fiddler],
  plots: [
    {
      name: 'Another game in the Nimbus casino',
      npcs: [refs.npcs.the_fiddler],
      scene: refs.scenes.the_fiddler_s_next_game,
      events: [refs.events.n2_e188],
    },
  ],
})

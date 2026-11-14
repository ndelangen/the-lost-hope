import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The mountain crossing',
  icon: 'gi/GiMountainCave',
  direction: [['The road from Fajanet over the holy mountain to Badesh.']],
  quests: [refs.quests.mountain_holy_site, refs.quests.dino_migration],
  plots: [
    {
      name: 'The holy site',
      status: 'closed',
      events: [refs.events.n2_e030, refs.events.n2_e031, refs.events.n2_e032],
    },
    {
      name: 'The angel and the dragon',
      status: 'closed',
      npcs: [refs.npcs.misha, refs.npcs.dragon_of_the_mountain],
      events: [refs.events.n2_e033, refs.events.n2_e034, refs.events.n2_e035],
    },
    {
      name: 'Through Badesh forest',
      status: 'closed',
      events: [
        refs.events.n2_e036,
        refs.events.n2_e037,
        refs.events.n2_e038,
        refs.events.n2_e039,
        refs.events.n2_e040,
        refs.events.n2_e102,
      ],
    },
  ],
})

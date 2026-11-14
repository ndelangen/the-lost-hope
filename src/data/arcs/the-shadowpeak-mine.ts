import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The ShadowPeak mine',
  icon: 'gi/GiMiner',
  direction: [['The slave mine under ShadowPeak and the people the party freed from it.']],
  plots: [
    {
      name: 'Crowy’s contract',
      status: 'closed',
      npcs: [refs.npcs.borris, refs.npcs.crowy],
      events: [refs.events.n2_e048, refs.events.n2_e049, refs.events.n2_e055],
    },
    {
      name: 'Stolen pups',
      status: 'closed',
      npcs: [refs.npcs.lord_malachar],
      events: [refs.events.n2_e050, refs.events.n2_e051],
    },
    {
      name: 'The slave mine',
      status: 'closed',
      npcs: [refs.npcs.lord_malachar],
      events: [
        refs.events.n2_e047,
        refs.events.n2_e084,
        refs.events.n2_e085,
        refs.events.n2_e052,
        refs.events.n2_e053,
        refs.events.n2_e057,
      ],
    },
    {
      name: 'Crowy becomes the Bird of Gluttony',
      status: 'closed',
      npcs: [refs.npcs.crowy],
      events: [refs.events.n2_e119],
    },
  ],
})

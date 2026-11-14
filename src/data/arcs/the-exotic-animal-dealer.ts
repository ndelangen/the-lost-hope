import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The exotic animal dealer',
  icon: 'gi/GiHawkEmblem',
  direction: [['Recover the escaped animals for the ', refs.npcs.rare_animal_dealer, '.']],
  quests: [refs.quests.rare_animal_dealer],
  plots: [
    {
      name: 'Three escaped animals',
      status: 'closed',
      npcs: [refs.npcs.rare_animal_dealer],
      events: [
        refs.events.n2_e012,
        refs.events.n2_e013,
        refs.events.n2_e014,
        refs.events.n2_e015,
        refs.events.n2_e016,
        refs.events.n2_e017,
        refs.events.n2_e018,
        refs.events.n2_e019,
      ],
    },
  ],
})

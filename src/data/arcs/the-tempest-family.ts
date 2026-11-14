import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Tempest family',
  icon: 'gi/GiBoltEye',
  direction: [['Who rules Tempest, who owes them, and where does the party stand?']],
  quests: [refs.quests.settle_the_shipwright_s_favors],
  plots: [
    {
      name: 'Summoned to Tempest',
      status: 'closed',
      npcs: [refs.npcs.onana_tempest],
      events: [
        refs.events.n2_e168,
        refs.events.n2_e169,
        refs.events.n2_e170,
        refs.events.n2_e171,
        refs.events.n2_e172,
        refs.events.n2_e173,
      ],
    },
    {
      name: 'The airship and the shipwright',
      status: 'closed',
      npcs: [refs.npcs.esia],
      events: [refs.events.n2_e179, refs.events.n2_e180, refs.events.n2_e181, refs.events.n2_e182],
    },
    {
      name: 'The gang’s stories',
      status: 'closed',
      npcs: [refs.npcs.skynet_gang_leader, refs.npcs.barbara],
      events: [refs.events.n2_e183, refs.events.n2_e184],
    },
    {
      name: 'The shipwright’s favours',
      hook: [
        ['', refs.npcs.esia, ' is owed two favours. Which Tempest does the first one point at?'],
      ],
      npcs: [refs.npcs.esia, refs.npcs.charles_tempest],
    },
  ],
})

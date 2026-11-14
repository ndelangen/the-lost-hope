import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Fiddler and the party’s possible futures',
  direction: [
    [
      'How does ',
      refs.npcs.the_fiddler,
      ' know the party, and what does he want with their futures?',
    ],
  ],
  quests: [refs.quests.find_the_fiddler, refs.quests.what_did_devan_lose_to_the_fiddler],
  plots: [
    {
      name: 'Three rounds on the gambling deck',
      status: 'closed',
      npcs: [refs.npcs.the_fiddler, refs.npcs.sylvia],
      events: [refs.events.n2_e105, refs.events.n2_e112, refs.events.n2_e113, refs.events.n2_e114],
    },
    {
      name: 'Connecting his questions',
      status: 'closed',
      npcs: [refs.npcs.sarogarth],
      events: [refs.events.n2_e177, refs.events.n2_e178],
    },
    {
      name: 'Into the VIP room',
      status: 'closed',
      npcs: [refs.npcs.borris],
      events: [refs.events.n2_e185, refs.events.n2_e186, refs.events.n2_e187],
    },
    {
      name: 'The second game',
      status: 'closed',
      npcs: [refs.npcs.the_fiddler, refs.npcs.the_fiddler_s_knight],
      events: [
        refs.events.n2_e188,
        refs.events.n2_e189,
        refs.events.n2_e190,
        refs.events.n2_e191,
        refs.events.n2_e192,
        refs.events.n2_e194,
        refs.events.n2_e195,
        refs.events.n2_e196,
        refs.events.n2_e197,
        refs.events.n2_e198,
      ],
    },
    {
      name: 'Another game in the Nimbus casino',
      hook: [
        [
          '',
          refs.npcs.the_fiddler,
          ' left hints about ',
          refs.pcs.jim,
          '’s future. He will want another game.',
        ],
      ],
      npcs: [refs.npcs.the_fiddler],
      scene: refs.scenes.the_fiddler_s_next_game,
    },
    {
      name: 'What Devan lost',
      hook: [
        [
          '',
          refs.pcs.devan,
          ' lost something at the first game. When does the party find out what?',
        ],
      ],
      npcs: [refs.npcs.the_fiddler],
    },
  ],
})

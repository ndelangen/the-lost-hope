import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Tentacles and the shadow realm',
  direction: [
    ['What takes people at night in Fajanet, and how does it connect to the shadow realm?'],
  ],
  quests: [refs.quests.fajanet_tunnels_shadow_realm, refs.quests.the_tentacle_night],
  plots: [
    {
      name: 'The tentacle night',
      status: 'closed',
      npcs: [refs.npcs.samantha],
      events: [refs.events.n2_e007, refs.events.n2_e008],
    },
    {
      name: 'A festival without tentacles',
      status: 'closed',
      events: [refs.events.n2_e025],
    },
    {
      name: 'Lost in the shadow realm',
      status: 'closed',
      events: [refs.events.n2_e028, refs.events.n2_e029, refs.events.n2_e081],
    },
    {
      name: 'Who took the dwarf',
      hook: [
        ['Nobody has explained the tentacles or the children’s laughter. Who in Fajanet knows?'],
      ],
    },
  ],
})

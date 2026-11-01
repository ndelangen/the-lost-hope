import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Do the Fajanet Tunnels connect to the Shadow Realm?',
  icon: 'gi/GiMagicPortal',
  type: 'mystery',
  notes: [['Do the Fajanet Tunnels connect to the Shadow Realm?']],
  status: 'resolved',
  clues: [
    [
      'Session 2: ',
      refs.events.n2_e014,
      ' — the party entered ',
      refs.locations.fajanet_tunnels,
      ' via ',
      refs.locations.trapdoor,
      '.',
    ],
    [
      'Session 4: ',
      refs.events.n2_e028,
      ' — ',
      refs.npcs.light_13th_marshal,
      ' sent the party through the same ',
      refs.locations.trapdoor,
      ' toward the mountain.',
    ],
    [
      'Session 4: ',
      refs.events.n2_e029,
      ' — during a chase the party got lost in ',
      refs.locations.shadow_realm,
      '.',
    ],
  ],
  conclusion: [
    [
      refs.events.n2_e028,
      ' records a secret exit through the city walls. The escape route was not evidence of a connection between ',
      refs.locations.fajanet_tunnels,
      ' and ',
      refs.locations.shadow_realm,
      '.',
    ],
  ],
})

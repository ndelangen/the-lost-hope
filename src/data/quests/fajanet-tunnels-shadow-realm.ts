import { refs } from '#/data/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Do the Fajanet Tunnels connect to the Shadow Realm?',
  description: 'Do the Fajanet Tunnels connect to the Shadow Realm?',
  status: 'open',
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
      refs.npcs.third_marshal_light,
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
    'Both underground spaces were reached via a trapdoor; whether they are the same network is unknown.',
  ],
  conclusion: [],
})

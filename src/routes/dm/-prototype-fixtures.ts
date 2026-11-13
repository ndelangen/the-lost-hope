// PROTOTYPE ONLY: sample prep for comparing DM dashboard layouts. Not campaign canon.
import { refs } from '#/data/generated/refs'
import type { Content } from '#/definitions/content'
import type { EntityRef } from '#/definitions/kind'

export type PrototypeScene = {
  key: string
  name: string
  location: EntityRef
  present: EntityRef[]
  npcs: EntityRef[]
  arc: string
  plot: string
  pinned: boolean
  setup: Content
  outcomes: { when: string; response: string }[]
}

export type PartyGroup = { location: EntityRef; members: EntityRef[] }

export const PARTY_GROUPS: PartyGroup[] = [
  {
    location: refs.locations.skynet_s_second_best_inn,
    members: [refs.pcs.devan, refs.pcs.cassian_veyl, refs.beasts.wolfie],
  },
  { location: refs.locations.nimbus, members: [refs.pcs.jim, refs.pcs.swift_starblade] },
]

export const SCENES: PrototypeScene[] = [
  {
    key: 'wolfie_wants_solid_ground',
    name: 'Wolfie wants solid ground',
    location: refs.locations.skynet_s_second_best_inn,
    present: [refs.pcs.devan, refs.pcs.cassian_veyl, refs.beasts.wolfie],
    npcs: [refs.npcs.abraham],
    arc: 'Wolfie after the ring',
    plot: 'What Wolfie has become',
    pinned: false,
    setup: [
      [
        refs.beasts.wolfie,
        ' paces the stables, restless at the altitude. ',
        refs.npcs.abraham,
        ' refuses to leave the stall.',
      ],
    ],
    outcomes: [
      { when: 'They bring meat and a blanket', response: 'Wolfie opens up about the night the ring vanished.' },
      { when: 'They try to fly him down', response: 'Wolfie panics; a stable hand offers a cheaper ferry.' },
    ],
  },
  {
    key: 'steal_a_ship',
    name: 'Stealing a ship from the harbour',
    location: refs.locations.nimbus,
    present: [refs.pcs.jim, refs.pcs.swift_starblade],
    npcs: [],
    arc: 'The flying fortress',
    plot: 'Reaching the fortress',
    pinned: false,
    setup: [['A skiff is moored at the end of the harbour, its owner asleep on the deck.']],
    outcomes: [
      { when: 'They sneak aboard', response: 'Stealth check; the owner wakes halfway across.' },
      { when: 'They bargain', response: 'The owner wants a favour on the fortress, not coin.' },
    ],
  },
  {
    key: 'the_fortress_approaches',
    name: 'The flying fortress approaches',
    location: refs.locations.nimbus,
    present: [refs.pcs.jim, refs.pcs.swift_starblade],
    npcs: [],
    arc: 'The flying fortress',
    plot: 'Why the smoke points here',
    pinned: true,
    setup: [['The second smoke trail ends at the fortress as it drifts into view.']],
    outcomes: [
      { when: 'Anyone watches it closely', response: 'They see banners they recognise from Fajanet.' },
    ],
  },
  {
    key: 'the_fiddlers_next_game',
    name: "The Fiddler's next game",
    location: refs.locations.nimbus,
    present: [],
    npcs: [refs.npcs.the_fiddler],
    arc: 'The Fiddler and the party’s possible futures',
    plot: 'Another game in the Nimbus casino',
    pinned: true,
    setup: [['', refs.npcs.the_fiddler, ' offers another game, with stakes nobody has named yet.']],
    outcomes: [
      { when: 'A player takes the wager', response: 'Agree on the stakes before the first card.' },
      { when: 'Everyone declines', response: 'The Fiddler leaves a card behind with tomorrow’s date.' },
    ],
  },
]

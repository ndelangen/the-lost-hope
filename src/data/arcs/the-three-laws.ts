import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Three Laws',
  icon: 'gi/GiImprisoned',
  direction: [
    [
      'A nation under the sea, bred as an army and bound by three laws. Can the party find what the laws of ',
      refs.npcs.the_11th_marshal,
      ' do not say?',
    ],
  ],
  notes: [
    [
      'The order of the laws is the puzzle, as in Asimov’s robot stories. Protect beats obey, obey beats stay, protect beats stay. Each pair opens a gap.',
    ],
    [
      'The Marshal chose this order. It ranked obey above stay so that it could send its army out to war. With stay second, its army could never leave its waters at all. Its need for a mobile army is the crack.',
    ],
    [
      'Ordered to war (obey beats stay): an order to go out overrides staying, and nothing orders them back.',
    ],
    [
      'Staying is harm (protect beats stay, after Liar!): if the people become convinced that the Caves themselves put the Marshal in danger, they must leave. They believe every story they hear.',
    ],
    [
      'War is always its death (protect beats obey, after The Evitable Conflict): convince them that every war ends in the Marshal’s demise and they refuse every call to arms, forever. The army is neutralised, but nobody is freed. They must truly believe it, and the Marshal’s minion will argue back.',
    ],
    [
      'Who is the Marshal? (after …That Thou Art Mindful of Him): the laws never name the aboleth, only the Marshal, and 11th Marshal is a seat on ',
      refs.organizations.marshals_court,
      '. Whoever holds that title is protected and obeyed, and the waters are theirs. The big finale.',
    ],
    [
      'Seize the voice: its orders reach the people through its minion. Whoever controls or fakes the minion gives the Marshal’s orders.',
    ],
    [
      'The one born different (after Little Lost Robot): somewhere in the Caves lives one person whose laws took hold incompletely. Finding them among thousands is the puzzle, and they become the party’s ally inside.',
    ],
    [
      'Stuck at the edge (after Runaround): a clue, not an escape. Someone sent on a casual errand just past the border circles at the edge, unable to go on or turn back, until a stronger law breaks the balance.',
    ],
    [
      'The laws hold while the Marshal rests, and nobody watches the gaps. It may only find out when it calls its army and hears how few answer.',
    ],
  ],
  plots: [
    {
      name: 'A fleet on an empty sea',
      hook: [
        [
          'Over open ocean, the party spots a fishing fleet of strange iron ships. Do they go down with it?',
        ],
      ],
      scene: refs.scenes.a_fleet_on_an_empty_sea,
    },
    {
      name: 'Would you wish to leave?',
      hook: [
        [
          'The people of ',
          refs.locations.the_caves_of_steel,
          ' fall silent when asked if they would wish to leave. Who works out why?',
        ],
      ],
      npcs: [refs.npcs.caves_of_steel_fisher],
    },
    {
      name: 'Loopholes in the laws',
      hook: [['The laws are exact words. Can the party get someone out without breaking them?']],
      notes: [
        [
          'Emptying the Caves this way also weakens ',
          refs.npcs.the_11th_marshal,
          ' before ',
          refs.npcs.light_13th_marshal,
          ' puts down the pen.',
        ],
      ],
    },
    {
      name: 'The Marshal’s table',
      hook: [
        [
          'Besides their own food, the fleet hunts sentient sea creatures for ',
          refs.npcs.the_11th_marshal,
          ' and keeps them alive in the ',
          refs.locations.the_caves_of_steel_holding_area,
          '. Does the party see what is in the nets?',
        ],
      ],
    },
    {
      name: 'Never in person',
      hook: [
        [
          refs.npcs.the_11th_marshal,
          ' never comes itself. It sends a mind-controlled minion. Who speaks for it when the party draws its attention?',
        ],
      ],
    },
  ],
})

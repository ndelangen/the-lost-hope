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
      'The order of the laws is the puzzle, as in Asimov’s robot stories: a higher law beats a lower one.',
    ],
    [
      'Protect beats obey: the people refuse any order they believe would endanger the Marshal. Convince them that every war ends in the Marshal’s demise and they refuse every call to arms, forever. The army is neutralised, though nobody is freed. They must truly believe it.',
    ],
    [
      'Protect beats stay: if the people believe their staying puts the Marshal in danger, leaving is protecting it, and through inaction they would allow it harm. They must leave, and nothing calls them back. It frees only those who truly believe it, so people leave in waves. One possible argument: the Caves, full of Dust-burning ships and machines, are a beacon that leads the Marshal’s enemies to it.',
    ],
    [
      'The laws hold while the Marshal rests, and nobody watches the gaps. It would never know its people had been turned until it called them to war and nobody came.',
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

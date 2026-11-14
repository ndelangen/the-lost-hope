import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The Hand comes for Jim',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.cloaked_snatcher],
  references: [
    refs.pcs.jim,
    refs.pcs.swift_starblade,
    refs.organizations.the_eyeless_hand,
    refs.npcs.the_father,
    refs.npcs.light_13th_marshal,
  ],
  setup: [
    [
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.jim,
      ' walk towards the docks. A voice speaks from just behind ',
      refs.pcs.swift_starblade,
      ':',
    ],
    [
      '“Do not get involved, Starblade. We’re not here for you. If you step away now, you won’t be harmed. We’re here for Jim only. It’s time he comes home.”',
    ],
    [
      refs.pcs.jim,
      ' is overcome by voices from his past and stumbles. Thirteen men in cloaks close in around the two of them.',
    ],
  ],
  outcomes: [
    {
      when: [['', refs.pcs.swift_starblade, ' steps away.']],
      response: [
        [
          'The cloaked men keep their word and let her go. Every one of them turns on ',
          refs.pcs.jim,
          '.',
        ],
      ],
    },
    {
      when: [['', refs.pcs.swift_starblade, ' fights.']],
      response: [
        [
          'Combat. Four men hold her off while the rest go for ',
          refs.pcs.jim,
          '. Run the encounter from this scene.',
        ],
      ],
    },
    {
      when: [['The men try to grapple ', refs.pcs.jim, '.']],
      response: [['He tears free and flees towards the docks.']],
    },
    {
      when: [['', refs.pcs.jim, ' comes within sight of the flying fortress.']],
      response: [
        [
          'A bright green beam locks onto him, then scatters and strikes thousands of people across the three sky islands. ',
          refs.pcs.jim,
          '’s last words, the only ones ',
          refs.pcs.swift_starblade,
          ' hears:',
        ],
        ['“I’m so sorry. I hope you all make it. Don’t trust Light.”'],
        ['Cut to the group on Skynet.'],
      ],
    },
  ],
  combat: {
    tactics: [
      [
        'They want ',
        refs.pcs.jim,
        ' alive and ',
        refs.pcs.swift_starblade,
        ' out of the way. Four pin her down with saps and grabs; nine grapple ',
        refs.pcs.jim,
        ' and try to drag him off. Saps knock out rather than kill.',
      ],
    ],
    morale: [
      [
        'They break off and melt into the crowd the moment ',
        refs.pcs.jim,
        ' is gone or the green beam strikes.',
      ],
    ],
    terrain: [
      [
        'A narrow street opening onto the docks: crates, mooring posts, a crowd waiting for the ferry, and open sky past the pier edge.',
      ],
    ],
    exits: [
      ['The docks for ', refs.pcs.jim, '; the side alleys and rooftops for the cloaked men.'],
    ],
  },
})

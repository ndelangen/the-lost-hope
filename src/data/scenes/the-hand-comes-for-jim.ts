import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The Hand comes for Jim',
  illustration: '/assets/scenes/the-hand-comes-for-jim.png',
  location: refs.locations.nimbus_sky_bridge_landing,
  alternateLocations: [refs.locations.nimbus_harbour_ferry_quay],
  battleMaps: [refs.locations.nimbus_sky_bridge_landing, refs.locations.nimbus_harbour_ferry_quay],
  npcs: [refs.npcs.silas_wren, refs.npcs.cloaked_snatcher, refs.npcs.crowy],
  setup: [
    [
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.jim,
      ' walk towards the docks, with ',
      refs.npcs.crowy,
      ' along.',
    ],
  ],
  beats: [
    {
      title: 'The voice behind Swift',
      lines: [
        {
          do: [[refs.npcs.silas_wren, ' speaks from just behind ', refs.pcs.swift_starblade, '.']],
        },
        {
          speaker: refs.npcs.silas_wren,
          say: [
            [
              'Do not get involved, Starblade. We’re not here for you. If you step away now, you won’t be harmed. We’re here for Jim only. It’s time he comes home.',
            ],
          ],
        },
        {
          do: [
            [
              refs.pcs.jim,
              ' is overcome by voices from his past and stumbles. Cloaked agents of ',
              refs.organizations.the_eyeless_hand,
              ' close in around the two of them.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['', refs.pcs.swift_starblade, ' steps away.']],
          response: [
            [
              'The cloaked men keep their word and let him go. Every one of them turns on ',
              refs.pcs.jim,
              '.',
            ],
          ],
        },
        {
          when: [['', refs.pcs.swift_starblade, ' fights.']],
          response: [
            [
              'Combat. Four men hold him off while the rest go for ',
              refs.pcs.jim,
              '. Run the encounter from this scene.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The run to the docks',
      lines: [
        {
          do: [
            [
              'The men try to grapple ',
              refs.pcs.jim,
              '. He tears free and flees towards the docks.',
            ],
          ],
        },
        {
          note: [
            [
              refs.npcs.crowy,
              ' can warn them that they are being followed, and urges them to run. Running takes them towards the docks, and into sight of the flying fortress.',
            ],
          ],
        },
        {
          do: [
            [
              'When ',
              refs.pcs.jim,
              ' comes within sight of the flying fortress, stop here. Run ',
              refs.scenes.the_green_pulse_over_the_sky_islands,
              ' with the whole table.',
            ],
          ],
        },
      ],
    },
  ],
  opponents: [
    { creature: refs.npcs.silas_wren, count: 1 },
    { creature: refs.npcs.cloaked_snatcher, count: 12 },
  ],
  combat: {
    tactics: [
      [
        'They want ',
        refs.pcs.jim,
        ' alive and ',
        refs.pcs.swift_starblade,
        ' out of the way. Four pin him down with saps and grabs; the rest grapple ',
        refs.pcs.jim,
        ' and try to drag him off. Saps knock out rather than kill.',
      ],
    ],
    morale: [
      [
        'They break off and melt into the crowd the moment ',
        refs.pcs.jim,
        ' is gone or the green beam strikes. They knew the beam was coming.',
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

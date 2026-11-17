import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The party reunites on the docks',
  location: refs.locations.nimbus_harbour,
  alternateLocations: [refs.locations.nimbus_sky_bridge_landing],
  battleMaps: [refs.locations.nimbus_harbour],
  npcs: [refs.npcs.crowy, refs.npcs.captain_garran],
  setup: [
    [
      'The whole party stands on the docks of ',
      refs.locations.nimbus,
      ' while ',
      refs.items.master_of_puppets,
      ' loads supplies. ',
      refs.pcs.auren,
      ' takes up the swords ',
      refs.pcs.jim,
      ' left behind, and there may be time to remember him.',
    ],
  ],
  beats: [
    {
      title: 'Back together',
      lines: [
        {
          do: [
            [
              'The party is in one place again for the first time since it split (',
              refs.events.n2_e203,
              '). ',
              refs.pcs.auren,
              ' and ',
              refs.pcs.swift_starblade,
              ' have not met: let their players introduce them.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Auren and the swords',
      lines: [
        {
          do: [
            [
              refs.pcs.swift_starblade,
              ' has the gear that fell when ',
              refs.pcs.jim,
              ' vanished. ',
              refs.pcs.auren,
              ' takes up ',
              refs.items.shadow_sword,
              ' and ',
              refs.items.dagger_of_the_zodiac_signs,
              ', and merges with them.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Remembering Jim',
      onlyIf: [
        [
          'There is time and the players want it. The letter can also be decoded and read between sessions.',
        ],
      ],
      lines: [
        { do: [['Give them room to reflect on losing ', refs.pcs.jim, '.']] },
        {
          do: [
            [
              refs.pcs.swift_starblade,
              '’s player reads out what he has decoded of the letter from ',
              refs.pcs.jim,
              '. The shared part needs all four words, and now everyone who has one is here, ',
              refs.npcs.crowy,
              ' included.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['They would rather have the outcome than the puzzle.']],
          response: [['Hand them the whole letter decoded.']],
        },
      ],
    },
    {
      title: 'Called back aboard',
      lines: [
        {
          do: [
            [
              refs.npcs.captain_garran,
              ' comes for all of them: ',
              refs.npcs.onana_tempest,
              ' will see them now. Run ',
              refs.scenes.onana_calls_the_party_to_war,
              '.',
            ],
          ],
        },
      ],
    },
  ],
})

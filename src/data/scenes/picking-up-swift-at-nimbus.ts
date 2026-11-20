import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Picking up Swift at Nimbus',
  illustrations: ['/assets/scenes/picking-up-swift-at-nimbus.png'],
  location: refs.locations.nimbus_harbour,
  alternateLocations: [refs.locations.nimbus_sky_bridge_landing],
  battleMaps: [refs.locations.master_of_puppets_main_deck, refs.locations.nimbus_harbour],
  npcs: [refs.npcs.captain_garran, refs.npcs.tempest_soldier],
  setup: [
    [
      refs.items.master_of_puppets,
      ' carries ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ' and ',
      refs.pcs.auren,
      ' to the docks of ',
      refs.locations.nimbus,
      ', where the soldiers look at what the beam did and the party goes to find ',
      refs.pcs.swift_starblade,
      '.',
    ],
  ],
  beats: [
    {
      title: 'The crossing',
      lines: [
        {
          do: [
            [
              'The party stands on the top deck of ',
              refs.items.master_of_puppets,
              ', with their own vessel in tow behind it. They can see the damage done to ',
              refs.locations.nimbus,
              ' closer now: destruction in many parts of the island, including the harbour.',
            ],
            ['Depending on ', refs.pcs.swift_starblade, ', they can see him waving already.'],
          ],
        },
        {
          note: [
            [
              'The damage and the dead are in ',
              refs.scenes.the_green_beam_over_the_sky_islands,
              '.',
            ],
          ],
        },
      ],
    },
    {
      title: 'On the docks',
      lines: [
        {
          do: [
            [
              'The cruiser docks on the west side, close to the impact crater. ',
              refs.npcs.captain_garran,
              ' sends soldiers out to find out what struck here.',
            ],
            [
              'He sends ',
              refs.pcs.cassian_veyl,
              ' and ',
              refs.pcs.devan,
              ' off to find the rest of their party and return as soon as possible. Their vessel stays impounded for now.',
            ],
          ],
        },
        {
          speaker: refs.npcs.captain_garran,
          say: [['There isn’t much time, don’t go fuck around.']],
        },
        { do: [['He looks at ', refs.pcs.auren, '.']] },
        {
          speaker: refs.npcs.captain_garran,
          say: [['I guess you’re with them now?'], ['Go on, hurry the fuck up then.']],
        },
        {
          note: [['Finding the others is for the players to do.']],
        },
      ],
    },
    {
      title: 'Finding Swift',
      lines: [
        {
          do: [
            [
              refs.pcs.swift_starblade,
              ' is where ',
              refs.scenes.the_green_beam_over_the_sky_islands,
              ' left him. Ask his player what the others see when they find him.',
            ],
          ],
        },
        {
          note: [
            [
              'Who still remembers ',
              refs.pcs.jim,
              ' was decided by the saves in ',
              refs.scenes.the_green_pulse_over_the_sky_islands,
              '.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiShakingHands',
          when: [['The party is together again.']],
          response: [['Run ', refs.scenes.the_party_reunites_on_the_docks, '.']],
        },
      ],
    },
  ],
})

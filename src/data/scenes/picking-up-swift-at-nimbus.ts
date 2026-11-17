import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Picking up Swift at Nimbus',
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
      ', to look at what the beam did there and to collect ',
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
              'The party crosses on the deck of ',
              refs.items.master_of_puppets,
              ', among the soldiers, with their own vessel in tow behind it.',
            ],
            [
              'The docks of ',
              refs.locations.nimbus,
              ' come into view, and with them what the beam did. The damage and the dead are in ',
              refs.scenes.the_hand_comes_for_jim,
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
              'He orders ',
              refs.organizations.beasts_and_dwarf,
              ' to find the rest of their party immediately and then report back to him. Their vessel stays impounded for now.',
            ],
            ['He stresses it again: there is not much time, so they should hurry.'],
          ],
        },
        {
          note: [
            [
              'Finding the others is for the players to do: ',
              refs.pcs.cassian_veyl,
              ' and ',
              refs.pcs.devan,
              ' know who they are looking for.',
            ],
          ],
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
              refs.scenes.the_hand_comes_for_jim,
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
              refs.scenes.the_green_beam_over_the_sky_islands,
              '.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['The party is together again.']],
          response: [['Run ', refs.scenes.the_party_reunites_on_the_docks, '.']],
        },
      ],
    },
  ],
})

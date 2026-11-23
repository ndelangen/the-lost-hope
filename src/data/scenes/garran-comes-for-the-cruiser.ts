import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Garran comes for the cruiser',
  illustrations: ['/assets/scenes/garran-comes-for-the-cruiser.png'],
  location: refs.locations.ride_the_lightning_main_deck,
  battleMaps: [
    refs.locations.ride_the_lightning_main_deck,
    refs.locations.ride_the_lightning_gun_deck,
  ],
  npcs: [refs.npcs.captain_garran, refs.npcs.tempest_soldier],
  setup: [
    [
      'The party holds the helm of ',
      refs.items.ride_the_lightning,
      ', and the guns are quiet. ',
      refs.items.master_of_puppets,
      ' pulls alongside, and boarding planks swing out.',
    ],
  ],
  beats: [
    {
      title: 'Garran at the rail',
      lines: [
        { speaker: refs.npcs.captain_garran, say: [['Fine work. We’ll take her from here.']] },
        {
          do: [
            [
              'Letting him aboard means losing control of the ship. Will they let him, fight, or run?',
            ],
          ],
        },
        {
          note: [
            [
              'Whoever is at the wheel decides first. Give the players a moment to talk it over, but ',
              refs.npcs.captain_garran,
              ' does not wait long: his first soldiers step onto the planks while they argue.',
            ],
            [
              'Any ',
              refs.npcs.tempest_soldier,
              's the party freed from the Barracks are still aboard: see the Barracks in ',
              refs.scenes.taking_back_a_battle_cruiser,
              '.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiOpenGate',
          when: [['They let him board.']],
          response: [
            [
              'His soldiers take the helm and the guns, and the party loses control of the ship. ',
              refs.npcs.captain_garran,
              ' looks over the wreckage: “I’ve seen worse.” ',
              refs.items.ride_the_lightning,
              ' rejoins the line of ',
              refs.npcs.onana_tempest,
              ', and he keeps his promise: run ',
              refs.scenes.onana_sends_the_party_on,
              '.',
            ],
          ],
        },
        {
          icon: 'gi/GiCrossedSwords',
          when: [['They refuse and fight the boarders.']],
          response: [
            [
              '“Do not fight. You will lose. The outcome will be the same, just bloodier.” Use the combat notes.',
            ],
          ],
        },
        {
          icon: 'gi/GiRun',
          when: [['They run with the cruiser.']],
          response: [
            [
              'Run the three rounds of ',
              refs.scenes.running_from_the_battle_cruiser,
              ', with ',
              refs.items.ride_the_lightning,
              ' as their vessel and ',
              refs.items.master_of_puppets,
              ' casting the hooks. Now ',
              refs.items.master_of_puppets,
              ' is the one firing at them.',
            ],
          ],
          followUps: [
            {
              icon: 'gi/GiAirZigzag',
              when: [['They break away.']],
              response: [
                [
                  'They have broken their promise to ',
                  refs.npcs.onana_tempest,
                  ' and stolen a warship of the ',
                  refs.organizations.tempest_family,
                  '. The whole fleet will remember it. Once they are clear, run ',
                  refs.scenes.crowy_brings_up_onana_s_letter,
                  ', then ',
                  refs.scenes.a_fleet_on_an_empty_sea,
                  '.',
                ],
                [
                  'They need to find their bearings: they spent some time aboard the ship, and it moved and turned a lot. They will likely not spot the smoke trail from ',
                  refs.events.n2_e203,
                  ', because they have to make a run from the forces of the ',
                  refs.organizations.tempest_family,
                  '.',
                ],
                [
                  'The smoke tracks ',
                  refs.npcs.the_fiddler,
                  ', and he is no longer aboard the fortress. The trail does not lead there any more.',
                ],
              ],
            },
            {
              icon: 'gi/GiRopeCoil',
              when: [['A line still holds.']],
              response: [
                [
                  refs.npcs.captain_garran,
                  ' boards anyway. Run the outcome where they fight, or let them give up now with no grudge held.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
  opponents: [
    { creature: refs.npcs.captain_garran, count: 1 },
    { creature: refs.npcs.tempest_soldier, count: 6 },
  ],
  combat: {
    tactics: [
      [
        'The soldiers fight as in ',
        refs.scenes.boarded_by_the_battle_cruiser,
        ': to subdue, not to kill. ',
        refs.npcs.captain_garran,
        ' goes straight for the helm.',
      ],
    ],
    morale: [['They accept a surrender at any moment and hold no grudge about it.']],
    reinforcements: [
      [
        'The same endless tide as in ',
        refs.scenes.boarded_by_the_battle_cruiser,
        ': two more soldiers cross every round.',
      ],
    ],
    exits: [
      [
        'The wheel: a ship under way is harder to board. Or ',
        refs.items.little_purple,
        ', if it is still alongside.',
      ],
    ],
  },
})

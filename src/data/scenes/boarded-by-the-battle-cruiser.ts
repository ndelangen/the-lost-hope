import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Boarded by the battle-cruiser',
  illustration: '/assets/scenes/boarded-by-the-battle-cruiser.png',
  location: refs.locations.beasts_and_dwarf_s_airship_decks,
  alternateLocations: [refs.locations.sky_bridge_ferry],
  battleMaps: [
    refs.locations.beasts_and_dwarf_s_airship_decks,
    refs.locations.sky_bridge_ferry,
    refs.locations.master_of_puppets_main_deck,
    refs.locations.skynet_airship_shipyard,
  ],
  npcs: [refs.npcs.captain_garran, refs.npcs.tempest_soldier],
  setup: [
    [
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ' and ',
      refs.pcs.auren,
      ' are the ones on the ship. ',
      refs.items.master_of_puppets,
      ' has caught it. ',
      refs.npcs.captain_garran,
      ' impounds the vessel, questions them where they stand, and takes them aboard.',
    ],
  ],
  beats: [
    {
      title: 'The cruiser comes alongside',
      lines: [
        {
          do: [
            [
              'Wherever the chase ended, in the air on ',
              refs.items.beasts_and_dwarf_s_airship,
              ', on the ferry, or with the ship still on the slip at the shipyard, ',
              refs.items.master_of_puppets,
              ', a battle-cruiser of the ',
              refs.organizations.tempest_family,
              ', lies alongside and blots out the sky. Boarding planks slam down, and soldiers drop onto the deck. At least forty more stand at the cruiser’s rail.',
            ],
          ],
        },
        {
          speaker: refs.npcs.captain_garran,
          say: [
            [
              'This vessel is impounded for use in the war, by the authority of ',
              refs.npcs.onana_tempest,
              '.',
            ],
          ],
        },
        { do: [['Then he sees who he is talking to.']] },
        {
          speaker: refs.npcs.captain_garran,
          say: [
            [
              'Oh hey, it’s ',
              refs.organizations.beasts_and_dwarf,
              '! We brought you to ',
              refs.npcs.onana_tempest,
              ' before, remember us?',
            ],
          ],
        },
        {
          note: [
            [
              refs.npcs.captain_garran,
              ' led the escort in ',
              refs.events.n2_e168,
              '. He is friendly, and he does not negotiate. Everyone aboard comes along, and the vessel is taken in tow.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['They argue that the ship is theirs.']],
          response: [['“Orders of ', refs.npcs.onana_tempest, '.” He changes nothing.']],
        },
      ],
    },
    {
      title: 'The captain’s questions',
      lines: [
        {
          speaker: refs.npcs.captain_garran,
          say: [['Where is the rest of your party?']],
        },
        {
          note: [
            [
              'He wants the rest of the party found, and he does not know where they are. ',
              refs.pcs.cassian_veyl,
              ' and ',
              refs.pcs.devan,
              ' do: on ',
              refs.locations.nimbus,
              '. This is the clear sign that the party has to be whole again, so let the players push to meet up.',
            ],
            ['It suits him: his people want to look at the place where the beam struck anyway.'],
          ],
        },
      ],
    },
    {
      title: 'Course for Nimbus',
      lines: [
        { do: [['He shouts up to the cruiser.']] },
        {
          speaker: refs.npcs.captain_garran,
          say: [
            [
              'Set immediate course to ',
              refs.locations.nimbus,
              ' docks west! We’ll investigate the impact site, assist where we can, and ',
              refs.organizations.beasts_and_dwarf,
              ' will search for their missing party members.',
            ],
          ],
        },
        { do: [['Then, to the party.']] },
        {
          speaker: refs.npcs.captain_garran,
          say: [['Get on board, we’ll haul your vessel in, we do not have much time!']],
        },
        {
          note: [
            [
              'He names ',
              refs.npcs.onana_tempest,
              ' only as the authority behind his orders. Nobody says that ',
              refs.npcs.onana_tempest,
              ' is aboard, and no meeting is announced: that is a reveal for later.',
            ],
            [
              'Mini-mystery, no answer needed: from the airship or the cruiser, looking down, one perfectly round patch of ocean lies completely flat and still among the waves.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['They hesitate.']],
          response: [['“Sorry, not a request, I’m afraid. Come with us now.”']],
        },
        {
          when: [['They go along.']],
          response: [
            [
              'A boarding plank takes them across to the cruiser, and it turns for ',
              refs.locations.nimbus,
              ' with their vessel in tow. Run ',
              refs.scenes.picking_up_swift_at_nimbus,
              '.',
            ],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      when: [['They try to break away again.']],
      response: [
        [
          'The chase is over. The lines hold, and the cruiser is faster than anything they can fly.',
        ],
      ],
    },
    {
      when: [['They fight.']],
      response: [
        [
          'They can, but it cannot be won: more soldiers keep jumping across. Use the combat notes.',
        ],
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
        'The soldiers fight to subdue: they pin, disarm, and surround. ',
        refs.npcs.captain_garran,
        ' stays in front and keeps offering a way out.',
      ],
    ],
    morale: [
      ['They do not break. They accept a surrender at any moment and hold no grudge about it.'],
    ],
    terrain: [
      [
        'The deck of whatever vessel the party is on, crossed by grappling lines, with a long drop to the ocean on every side.',
      ],
    ],
    reinforcements: [
      [
        'They keep coming: two more soldiers jump across at the end of every round, with no end to them. Put two tokens on the table each round so the players see the tide rising. Forty or more still stand on the cruiser’s deck.',
      ],
    ],
    exits: [['None worth taking: over the side is the ocean, far below.']],
  },
})

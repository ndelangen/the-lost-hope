import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The ents hold the shipyard',
  illustration: '/assets/scenes/the-ents-hold-the-shipyard.png',
  location: refs.locations.skynet_airship_shipyard,
  battleMaps: [refs.locations.beasts_and_dwarf_s_airship_decks],
  npcs: [refs.npcs.esia, refs.npcs.shipyard_ent, refs.npcs.corwin_hale],
  references: [
    refs.pcs.auren,
    refs.items.beasts_and_dwarf_s_airship,
    refs.npcs.tempest_soldier,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.locations.nimbus,
  ],
  setup: [
    [
      'A crowd presses against the shipyard gate, hoping for a hull off the island. Six ',
      refs.npcs.shipyard_ent,
      's stand shoulder to shoulder across it and push people back. The soldiers have not reached the yard yet.',
    ],
    [
      'On the slip sits ',
      refs.items.beasts_and_dwarf_s_airship,
      ', nearly finished. The crystal is not fully charged and the cannons are not installed.',
    ],
    [
      refs.npcs.esia,
      '’s test pilot and technician, ',
      refs.pcs.auren,
      ', a warforged in runic plating, is up on the slip working on the ship’s crystal. If he did not already join the party at the ferry landing, this is where the new player joins.',
    ],
    [
      'Start a real-life timer once the party is inside the yard. The soldiers are moments away, and the players only have until it runs out to decide what to do.',
    ],
  ],
  notes: [
    [
      'Mini-mystery, no answer needed: every ent at the shipyard has rows of carved notches on one arm. As the party departs, each of them carves one more.',
    ],
    [
      'To pilot the unfinished ship, the players must say how. A good argument, such as having sailed a ship before, earns a roll. No argument, no roll.',
    ],
    [
      'The half-charged crystal is enough to lift off and cross to ',
      refs.locations.nimbus,
      ', not to travel further. Without cannons the ship cannot fight.',
    ],
  ],
  outcomes: [
    {
      when: [['They say they are paying customers.']],
      response: [
        ['The ents part for them, and ', refs.npcs.esia, ' waves them through to the slip.'],
      ],
    },
    {
      when: [['They sneak in.']],
      response: [
        [
          'A group ',
          refs.rules.stealth,
          ' check against the ents’ passive ',
          refs.rules.perception,
          '. On a failure an ent lifts them up and sets them down outside the gate, unless they speak up as customers.',
        ],
      ],
    },
    {
      when: [['They fight the ents.']],
      response: [
        [
          'The ents shove before they strike. ',
          refs.npcs.esia,
          ' stops the fight the moment she recognises her customers.',
        ],
      ],
    },
    {
      when: [['They ask ', refs.npcs.esia, ' for the ship early.']],
      response: [
        [
          'She agrees: better with them than impounded. She warns them about the crystal and the cannons. She cannot spare anyone from the yard, except ',
          refs.pcs.auren,
          ', who has flown every test of this hull. She sends him with the ship, so he has a job aboard for the whole journey.',
        ],
      ],
    },
    {
      when: [['They try to fly it themselves.']],
      response: [
        [
          'Each argued approach earns one DC 15 check. One success lurches the ship off the slip in a wobbling climb. On a failure nothing moves, and the timer keeps running. ',
          refs.pcs.auren,
          ' has flown this hull before, so he needs no argument: at the helm he makes the check with advantage.',
        ],
      ],
    },
    {
      when: [['They look for help, or the timer is nearly out.']],
      response: [
        [
          refs.npcs.corwin_hale,
          ' calls out from the crowd at the gate and offers to fly the ship for free. The ents let him through on the party’s word.',
        ],
      ],
    },
    {
      when: [['The ship takes off.']],
      response: [
        [
          'Halfway across, the battle-cruiser bears down on them. Run ',
          refs.scenes.running_from_the_battle_cruiser,
          '.',
        ],
      ],
    },
    {
      when: [['The timer runs out with the ship still on the slip.']],
      response: [
        [
          'The battle-cruiser arrives over the yard. Run ',
          refs.scenes.boarded_by_the_battle_cruiser,
          '.',
        ],
      ],
    },
  ],
  combat: {
    tactics: [
      [
        'The ents use Bar the Way to push people back from the gate. They only Slam someone who has hurt one of them.',
      ],
    ],
    morale: [['They stop the moment ', refs.npcs.esia, ' calls them off. They do not chase.']],
    terrain: [
      [
        'The yard gate, stacks of timber, slips with half-built hulls, and the open drop at the island’s edge.',
      ],
    ],
    reinforcements: [
      ['The ', refs.npcs.tempest_soldier, 's arrive when the timer runs out and end any fight.'],
    ],
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The ents hold the shipyard',
  illustrations: ['/assets/scenes/the-ents-hold-the-shipyard.png'],
  location: refs.locations.skynet_airship_shipyard,
  battleMaps: [refs.locations.little_purple_decks],
  npcs: [refs.npcs.esia, refs.npcs.hollin_slowbough, refs.npcs.shipyard_ent],
  setup: [
    [
      'A crowd presses against the shipyard gate, hoping for a hull off the island. A line of ',
      refs.npcs.shipyard_ent,
      's stand shoulder to shoulder across it and push people back. The soldiers have not reached the yard yet.',
    ],
  ],
  beats: [
    {
      title: 'The gate',
      lines: [
        {
          do: [
            [
              'One of them is ',
              refs.npcs.hollin_slowbough,
              '. He recognises the party from their last visit and slowly says their names.',
            ],
          ],
        },
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
      ],
    },
    {
      title: 'The slip',
      lines: [
        {
          do: [
            [
              'On the slip sits ',
              refs.items.little_purple,
              ', nearly finished. The crystal is not fully charged and the cannons are not installed.',
            ],
            [
              refs.npcs.esia,
              '’s test pilot and technician, ',
              refs.pcs.auren,
              ', a warforged in runic plating, is up on the slip working on the ship’s crystal. If he did not already join the party at the ferry landing, this is where the new player joins.',
            ],
          ],
        },
        {
          do: [
            [
              'Start a real-life timer once the party is inside the yard. The soldiers are moments away, and the players only have until it runs out to decide what to do.',
            ],
          ],
        },
        {
          note: [
            [
              'The half-charged crystal is enough to lift off and cross to ',
              refs.locations.nimbus,
              ', not to travel further. Without cannons the ship cannot fight.',
            ],
            [
              'To pilot the unfinished ship, the players must say how. A good argument, such as having sailed a ship before, earns a roll. No argument, no roll.',
            ],
          ],
        },
      ],
      outcomes: [
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
              refs.npcs.esia,
              ' shouts for ',
              refs.pcs.auren,
              ' if he is not at the helm already: he has flown every test of this hull. There is nobody else in the yard to spare.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Leaving the yard',
      lines: [
        {
          note: [
            [
              'Mini-mystery, no answer needed: every ent at the shipyard has rows of carved notches on one arm. As the party departs, each of them carves one more.',
            ],
          ],
        },
      ],
      outcomes: [
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
    },
  ],
  opponents: [
    { creature: refs.npcs.hollin_slowbough },
    { creature: refs.npcs.shipyard_ent, count: 5 },
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

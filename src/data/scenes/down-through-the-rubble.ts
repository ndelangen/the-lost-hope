import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

const party = [refs.pcs.cassian_veyl, refs.pcs.devan, refs.pcs.swift_starblade, refs.pcs.auren]

export default createScene({
  name: 'Down through the rubble',
  location: refs.locations.the_old_battlefield,
  illustrations: ['/assets/scenes/down-through-the-rubble.png'],
  alternateLocations: [refs.locations.rustmoor_guildhall],
  npcs: [refs.npcs.hex, refs.npcs.rustmoor_scavenger, refs.npcs.buried_war_machine],
  setup: [
    [
      'The booth of the ',
      refs.locations.rustmoor_guildhall,
      ' has no connection to ',
      refs.locations.fajanet,
      ' yet, and after ',
      refs.scenes.hex_loses_patience,
      ' the party wants to speed that up. This crawl is one way. If the players come up with a better one, let it work.',
    ],
    [
      refs.locations.the_old_battlefield,
      ' lies in layers on top of layers of destruction. On top is what the marshals left when they fought each other. Under it lies the Second Great War, the war of the marshals against the elves. Going down is going back in time.',
    ],
    [
      'If they go down on the night of ',
      refs.scenes.hex_loses_patience,
      ', the full moon is still up over the top layer.',
    ],
    [
      'This crawl is a draft: the missing part, the layers and every number are proposals to change.',
    ],
  ],
  beats: [
    {
      title: 'What the booth is waiting for',
      lines: [
        {
          note: [
            [
              'The fitters are waiting for a ship’s crystal, the kind that sits at the centre of a flying warship. The one they ordered is days away.',
            ],
          ],
        },
        {
          speaker: refs.npcs.hex,
          say: [
            ['There is one out there, you know.'],
            [
              'A warship came down in the field with its crystal still in it. Everyone here knows the wreck. Nobody works it.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The top layer: mines',
      lines: [
        {
          do: [
            [
              'The first stretch is the youngest layer: machines of the marshals, wrecked fighting each other, and the mines they left between them.',
            ],
          ],
        },
        {
          note: [
            [
              'Run it as a skill scene, not a fight. Ask each player how their character helps the group across, and call for one check that fits, DC 13.',
            ],
            [
              'Each failed check sets off a mine. Everyone makes the save below: caught in the blast is 3d6 ',
              refs.rules.fire,
              ' damage, dived clear is half.',
            ],
          ],
        },
      ],
      groupSave: {
        title: [['A mine goes off']],
        ability: 'dex',
        dc: 13,
        rollers: party,
        passed: 'Dived clear',
        failed: 'Caught in the blast',
      },
      outcomes: [
        {
          icon: 'gi/GiTakeMyMoney',
          when: [['They hire a ', refs.npcs.rustmoor_scavenger, ' as a guide.']],
          response: [
            [
              'The guide knows the safe line through the mines, so nobody rolls. It costs coin or a share of what they bring back, and the guide stops where the wreck comes into view.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The second layer: the crew at the wreck',
      lines: [
        {
          do: [
            [
              'A scavenger crew has camped at the hull of the crashed warship: four of them around a fire.',
            ],
          ],
        },
        {
          speaker: refs.npcs.rustmoor_scavenger,
          say: [['Wreck’s ours. Claimed and marked.']],
        },
      ],
      fight: {
        opponents: [{ creature: refs.npcs.rustmoor_scavenger, count: 4 }],
        tactics: [
          [
            'Only if the party attacks them. They are no match and they know it: they run when the first one drops.',
          ],
        ],
      },
      outcomes: [
        {
          icon: 'gi/GiConversation',
          when: [['They talk to the crew.']],
          response: [['The crew lets them in for a share of the salvage.']],
        },
        {
          icon: 'gi/GiPointing',
          when: [['They show their guild tattoos and claim the wreck for the guild.']],
          response: [
            [
              'It works. The tattoo of the ',
              refs.organizations.adventurers_guild,
              ' counts as papers here too, and the guildhall is the newest customer in town.',
            ],
          ],
        },
        {
          icon: 'gi/GiCrossedSwords',
          when: [['They attack the crew.']],
          response: [
            [
              'The crew runs, and ',
              refs.locations.rustmoor,
              ' hears of it before the party is back.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The ship on its side',
      lines: [
        {
          do: [
            [
              'The warship lies on its side. Decks are walls, doors are pits, and the corridor to the crystal room is a shaft going down.',
            ],
          ],
        },
        {
          note: [
            [
              'Climbing down is a DC 12 Strength (',
              refs.rules.athletics,
              ') or Dexterity (',
              refs.rules.acrobatics,
              ') check, with ',
              refs.rules.advantage,
              ' on a rope. A fall is 2d6 ',
              refs.rules.bludgeoning,
              ' damage and ends in the engine spaces.',
            ],
          ],
        },
        {
          do: [
            [
              'The crystal room is torn open at the bottom. The cradle is empty: the crystal fell through the hull into the layer below.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The bottom layer: the guardian',
      lines: [
        {
          do: [
            [
              'Under the ship lies an older field: the war of the marshals against the elves. The crystal lies in the open hand of a ',
              refs.npcs.buried_war_machine,
              '.',
            ],
          ],
        },
        {
          note: [
            [
              'It still obeys its last order: hold this ground. It does nothing while nobody attacks it or takes what lies within its reach.',
            ],
            [
              'This layer is the war ',
              refs.pcs.auren,
              ' was built for, and the machine is dwarven work like him. Describe it to his player first, and let him say what ',
              refs.pcs.auren,
              ' recognises.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.npcs.buried_war_machine }],
        tactics: [
          [
            'It was built to fight elves, so it goes for ',
            refs.pcs.swift_starblade,
            ' first. It cannot move, so stepping back out of reach is always possible. Tearing out its fuel line weakens it.',
          ],
        ],
      },
      outcomes: [
        {
          icon: 'gi/GiHand',
          when: [['Someone lifts the crystal out of its hand without waking it.']],
          response: [
            [
              'A DC 15 Dexterity (',
              refs.rules.sleight_of_hand,
              ') check. On a success they walk out with it. On a failure the hand closes and the fight starts.',
            ],
          ],
        },
        {
          icon: 'gi/GiCrossedSwords',
          when: [['They fight it.']],
          response: [
            ['Once it stops moving, the crystal is theirs, and so is whatever else it held on to.'],
          ],
        },
        {
          icon: 'gi/GiRun',
          when: [['They grab the crystal and run.']],
          response: [
            [
              'It gets its attacks on whoever is within reach as they leave, and then it cannot follow.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['Someone gives it a new order, or tells it the war is over.']],
          response: [
            [
              'It listens. It has waited a long time for someone to say so. Whether it obeys is your call at the table.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The booth wakes up',
      lines: [
        {
          do: [
            [
              'Back in the guildhall the fitters set the crystal in the booth. It hums, and the connection to ',
              refs.locations.fajanet,
              ' stands.',
            ],
          ],
        },
        {
          note: [['Now play “At the booth” in ', refs.scenes.hex_loses_patience, '.']],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiPuzzle',
      when: [['The players find another way to speed the connection up.']],
      response: [
        [
          'If it is clever, let it work, and go straight to “At the booth” in ',
          refs.scenes.hex_loses_patience,
          '.',
        ],
      ],
    },
    {
      icon: 'gi/GiHourglass',
      when: [['They wait it out.']],
      response: [
        [
          'A few days pass in ',
          refs.locations.rustmoor,
          '. The ordered crystal arrives and the fitters finish on their own.',
        ],
      ],
    },
  ],
  combat: {
    terrain: [
      [
        'The chamber under the ship is dark and uneven. Wreckage gives ',
        refs.rules.cover,
        ' everywhere, and anything more than 15 ft. from the machine is out of reach of its fists.',
      ],
    ],
    exits: [['The torn hull above is the only way out: the same climb, upwards.']],
  },
})

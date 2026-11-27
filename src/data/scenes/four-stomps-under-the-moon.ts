import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Four stomps under the moon',
  location: refs.locations.thornwall_maze,
  alternateLocations: [refs.locations.the_old_battlefield],
  battleMaps: [refs.locations.thornwall_maze],
  setup: [
    [
      'The quest ',
      refs.npcs.bob_the_merchant,
      ' offers in ',
      refs.scenes.bob_returns_cassian_s_ring,
      ': follow to where the moon shines brightest, stomp four times, and kill whatever comes. At night a silver glow hangs over one spot of ',
      refs.locations.the_old_battlefield,
      ', and following it brings the party to the thorn walls of the ',
      refs.locations.thornwall_maze,
      '.',
    ],
    [
      'The players map the maze by hand. You keep the map of the ',
      refs.locations.thornwall_maze,
      ' hidden and describe only what they can see. Each pin on the map is a beat below, in the same order from the entrance inwards; play a beat when the party reaches its pin. Paths without a pin are empty: loops and dead ends.',
    ],
    [
      'Ask one player to be the mapper, with squared paper. One square is 10 ft. and every path is two squares wide. Describe the way ahead in plain steps: “The path runs 40 ft. north. On your right, after 20 ft., there is an opening. At the end it turns west.” Let them draw it. Do not correct their map; if it is wrong, that is part of the fun.',
    ],
    [
      'The silver glow over the centre can always be seen above the walls, so the party always knows which direction the centre lies in, just not the way there.',
    ],
    [
      'The walls are 15 ft. of thorn grown through old wrecks. Climbing up for a look is a DC 13 Strength (',
      refs.rules.athletics,
      ') check and costs 1d6 piercing damage. From the top they see the glow and the next turning or two, nothing more: the tops are a tangle. Cutting through a wall takes 10 minutes per square and is loud. The thorns are damp with Dust and only smoulder when burned, which is also loud.',
    ],
    [
      'Noise brings the ',
      refs.beasts.shambling_mound,
      '. Each time a ',
      refs.beasts.shrieker_fungus,
      ' shrieks, the party fights, or they cut or burn a wall, roll a d6. On a 1 or 2 it is coming: play the last beat, “The mound hears you”.',
    ],
    [
      'Pitched for a party of level 6 with ',
      refs.beasts.wolfie,
      '. The fights in the maze are small on purpose: the real fight is at the centre. This whole scene is a draft, and every number is a proposal.',
    ],
  ],
  beats: [
    {
      title: 'The gap',
      lines: [
        {
          do: [
            [
              'The way in is a gap where a dwarven war machine once broke through the wall. Its rusted legs still stand on either side. Three tall pale mushrooms grow on them. Inside, the path runs left and right along the wall. Both ends look like dead ends. The left one is: plain thorns. The right one ends at a ledge: the ground drops away 30 ft. into a path of the maze below.',
            ],
          ],
        },
        {
          note: [
            [
              'The mushrooms are shriekers. They scream as soon as anyone comes within 30 ft. with a light, or at all. This is the lesson of the maze: noise has a price. Roll for the mound right away.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiFalling',
          when: [['Someone goes over the ledge, on purpose or not.']],
          response: [
            [
              'A 30 ft. drop onto the path below: 3d6 bludgeoning damage. It is a way into the maze that skips the tree, but not a way back.',
            ],
          ],
        },
        {
          icon: 'gi/GiRopeCoil',
          when: [['Someone below tries to climb back up to the entrance corridor.']],
          response: [
            [
              'It is sheer, crumbling earth: climbing it does not work. Getting up takes something creative, such as a rope tied off at the top, a spell or a very good idea, and you decide whether it works.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.shrieker_fungus, count: 3 }],
        tactics: [['They do nothing but scream. They die easily; it is quiet again once they do.']],
      },
    },
    {
      title: 'The tree in the way',
      lines: [
        {
          do: [
            [
              'Straight ahead from the gap, a short opening in the wall ends at one old, gnarled tree grown into the thorns. It looks like every other dead end in this corridor.',
            ],
          ],
        },
        {
          note: [
            [
              'It is the ',
              refs.beasts.thornwall_gate_tree,
              '. Anyone who looks closely notices fresh scrapes in the ground in front of it, as if it has moved: a DC 14 Intelligence (',
              refs.rules.investigation,
              ') check, or automatic for whoever touches the bark. Poking it, cutting it or searching it wakes it.',
            ],
            [
              'It speaks Elvish and nothing else. Awake, it rumbles a question in Elvish: who goes there, and in whose name? To anyone who does not speak Elvish, it is just a creaking groan.',
            ],
            [
              'This is a moment for ',
              refs.pcs.swift_starblade,
              ': if his player has him answer in Elvish, he can talk the tree aside without a fight. Let the player decide what he says; anything respectful works.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.thornwall_gate_tree, count: 1 }],
        tactics: [
          [
            'Only if they attack it or nobody can answer it. It blocks the whole path and slams whoever is closest. It does not leave its place in the wall.',
          ],
        ],
      },
      outcomes: [
        {
          icon: 'gi/GiConversation',
          when: [[refs.pcs.swift_starblade, ' answers it in Elvish.']],
          response: [
            [
              'It creaks aside and lets them into the maze. Behind them it settles back into the wall, and it lets them out again the same way.',
            ],
          ],
        },
        {
          icon: 'gi/GiCrossedSwords',
          when: [['They fight it.']],
          response: [['Once it stops moving, the way into the maze is open.']],
        },
      ],
    },
    {
      title: 'The swallowed machine',
      lines: [
        {
          do: [
            [
              'A dead end. A dwarven war machine lies on its side here, half swallowed by the wall, thorns growing through its plating. Purple mushrooms sprout from the cracks in it.',
            ],
          ],
        },
        {
          note: [
            [
              'The purple mushrooms are violet fungi and lash out as soon as someone is within 10 ft.',
            ],
            [
              'Describe the machine to ',
              refs.pcs.auren,
              '’s player first: it is the same dwarven work as he is, from the same war. Let the player say what Auren recognises. ',
              refs.pcs.swift_starblade,
              ' may know the thorn walls as elven work.',
            ],
            ['Inside the hatch is a dwarven field kit with two potions of healing.'],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.violet_fungus, count: 4 }],
        tactics: [
          ['They cannot chase anyone. Whoever steps back more than 10 ft. is safe from them.'],
        ],
      },
    },
    {
      title: 'Living walls',
      lines: [
        {
          do: [
            [
              'A long straight path along the outer wall. Halfway along, the thorns on both sides rustle, though there is no wind.',
            ],
          ],
        },
        {
          note: [
            [
              'Three thorn creepers hide in the walls. Whoever passes the middle first is grabbed. A DC 14 Wisdom (',
              refs.rules.perception,
              ') check spots them before that.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.thorn_creeper, count: 3 }],
        tactics: [
          ['They pull one victim at a time into the wall and stay there. Fire hurts them badly.'],
        ],
      },
    },
    {
      title: 'Silver spores',
      lines: [
        {
          do: [
            [
              'The long path along the far side of the maze, and the air glitters. Puffballs the size of a head drift slowly at head height, catching the moonlight.',
            ],
          ],
        },
        {
          note: [
            [
              'Four silverspore puffballs drift toward the warmest creature. A failed save makes the mapper forget the last two turns of the map: the player rubs them out. Play it as a joke, not a punishment.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.silverspore_puffball, count: 4 }],
        tactics: [
          [
            'Each one bursts once and is gone. Killing them from range is the smart answer; let the players find it.',
          ],
        ],
      },
    },
    {
      title: 'The lost map',
      lines: [
        {
          do: [
            [
              'A small loop around a block of thorns. A ',
              refs.npcs.rustmoor_scavenger,
              ' sits against the wall, long dead, a stick of charcoal in his hand and a scrap of paper in his lap.',
            ],
          ],
        },
        {
          note: [
            [
              'The paper is a map of the half of the maze nearest the entrance, drawn in a shaky hand, with the rest torn off. Give it to the mapper, or let them copy it onto their own map.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The mound’s hollow',
      lines: [
        {
          do: [
            [
              'A round clearing, smaller than the glow at the centre, the ground trampled flat and slick with rotting leaves. It smells of compost.',
            ],
          ],
        },
        {
          note: [
            [
              'This is where the ',
              refs.beasts.shambling_mound,
              ' rests. If it has not come for them yet, it is here, lying still like a heap of leaves.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The elven standard',
      lines: [
        {
          do: [
            [
              'A dead end on the west side. A tall banner pole stands here, its cloth long rotted. The thorns grow around it in a perfect circle and do not touch it.',
            ],
          ],
        },
        {
          note: [
            [
              'An elven standard from the Second Great War: the heart from which the walls were grown. Whoever touches it hears, for a moment, a single elven voice singing. ',
              refs.pcs.swift_starblade,
              ' understands one line: a song to make the walls hold.',
            ],
            [
              'This is a reward for explorers, not a clue they need. If ',
              refs.pcs.auren,
              ' touches it, the singing stops.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Where the moon shines brightest',
      lines: [
        {
          do: [
            [
              'The path opens onto a round clearing under the open sky. In the middle rises a low mound of moss and mushrooms, thirty feet across, glittering silver. The moonlight on it is brighter than anywhere on the field.',
            ],
          ],
        },
        {
          note: [
            [
              'The mound is the back of ',
              refs.beasts.the_mossback,
              ', asleep. Let them look around; it does not wake for footsteps. It wakes on the fourth stomp.',
            ],
            [
              'On the fourth stomp the mound shudders and heaves up under whoever is standing on it. They make the save below as it rises, then roll initiative.',
            ],
          ],
        },
      ],
      groupSave: {
        title: [['The mound rises']],
        ability: 'dex',
        dc: 15,
        rollers: [
          refs.pcs.cassian_veyl,
          refs.pcs.devan,
          refs.pcs.swift_starblade,
          refs.pcs.auren,
          refs.beasts.wolfie,
        ],
        passed: 'Jumped clear',
        failed: 'Knocked prone',
      },
      fight: {
        opponents: [{ creature: refs.beasts.the_mossback, count: 1 }],
        tactics: [
          [
            'It bites whoever is closest, and dives underground when it is hurt. When it is underground, tell the players the ground is trembling: stomping four times pulls it up under the stomper, which is their way to make it come back out.',
          ],
          [
            'It does not flee. Once its garden breaks loose at half hit points, the two violet fungi are a distraction, not a second fight.',
          ],
        ],
      },
      outcomes: [
        {
          icon: 'gi/GiCrossedSwords',
          when: [['They kill it.']],
          response: [
            [
              'The clearing goes quiet and the silver glow fades. The quest is done; ',
              refs.npcs.bob_the_merchant,
              ' knows it before they tell him.',
            ],
          ],
        },
        {
          icon: 'gi/GiRun',
          when: [['They run for it.']],
          response: [
            [
              'It follows them into the maze for one round, then dives back down. Next time they stomp, it remembers them.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The mound hears you',
      onlyIf: [['The noise roll came up 1 or 2, or the party walks into the mound’s hollow.']],
      lines: [
        {
          do: [
            [
              'Something big is moving behind the walls, getting closer: a wet dragging sound and snapping thorns.',
            ],
          ],
        },
        {
          note: [
            [
              'It arrives two rounds later, from the way they came. It is a real threat at their level, and they can run. It is slow to turn in the narrow paths: if they break line of sight and keep quiet for a minute, it loses them.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.shambling_mound, count: 1 }],
        tactics: [
          [
            'It grabs one creature and tries to swallow it. Lightning heals it, so warn a caster if they reach for it twice.',
          ],
        ],
      },
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiPuzzle',
      when: [
        [
          'The players find another way to the centre, such as flying over or cutting a straight line.',
        ],
      ],
      response: [
        [
          'Let it work, and charge for it in noise rolls and thorn damage. The maze is there for fun, not to stop them.',
        ],
      ],
    },
    {
      icon: 'gi/GiNightSleep',
      when: [['Afterwards the party goes to bed at the tavern.']],
      response: [
        [
          refs.pcs.auren,
          ' does not sleep. ',
          refs.npcs.hex,
          ' comes for him in the night: run ',
          refs.scenes.light_walks_auren_through_fajanet,
          '.',
        ],
      ],
    },
  ],
  combat: {
    terrain: [
      [
        'The clearing is a round open space 120 ft. across, ringed by thorn walls. Paths lead in from the south, the west and the north-east. The moonlight makes it dim light everywhere. Anyone thrown against the walls takes 1d6 piercing damage.',
      ],
    ],
    exits: [['The path they came in by, and any other paths their map shows.']],
  },
})

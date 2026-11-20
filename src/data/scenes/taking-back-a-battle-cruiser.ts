import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Taking back a battle-cruiser',
  illustration: '/assets/scenes/taking-back-a-battle-cruiser.png',
  location: refs.locations.ride_the_lightning_main_deck,
  battleMaps: [
    refs.locations.ride_the_lightning_main_deck,
    refs.locations.ride_the_lightning_gun_deck,
  ],
  npcs: [
    refs.npcs.ilsa_corrow,
    refs.npcs.silas_wren,
    refs.npcs.korrag_stonevow,
    refs.npcs.durgan_ashfang,
    refs.npcs.hand_breaker,
    refs.npcs.hand_spellbinder,
    refs.npcs.dust_lost_sailor,
    refs.npcs.cloaked_snatcher,
    refs.npcs.tempest_soldier,
    refs.npcs.onana_tempest,
    refs.npcs.captain_garran,
  ],
  setup: [
    [
      'Above the islands the fleet is turning on itself: cruisers in the colours of the ',
      refs.organizations.tempest_family,
      ' fire on each other. ',
      refs.npcs.onana_tempest,
      ' points out the nearest one shooting at its own side: ',
      refs.items.ride_the_lightning,
      '.',
    ],
    [
      'The party comes aboard at the bow (',
      refs.scenes.boarding_ride_the_lightning,
      '). Whoever holds the helm holds the ship, and ',
      refs.npcs.onana_tempest,
      ' wants it back.',
    ],
  ],
  beats: [
    {
      title: 'Before they land',
      lines: [
        {
          do: [
            [
              'The fight goes in steps, room by room. Every room is closed by default. You can have a door open at any time, by chance or because someone opens it on purpose.',
            ],
            [
              'Run it as one encounter in the tracker, played as a string of short fights. The players keep the initiative they rolled for boarding for the whole ship. Between rooms, drop out of turns and let them move and talk freely.',
            ],
            [
              'The encounter lists every room. When a door opens, bring that room in there, and its enemies join the roster. They roll initiative then, once for each group (the ',
              refs.npcs.cloaked_snatcher,
              's, the ',
              refs.npcs.dust_lost_sailor,
              's, and one each for ',
              refs.npcs.ilsa_corrow,
              ', ',
              refs.npcs.silas_wren,
              ' and ',
              refs.npcs.korrag_stonevow,
              '), so you only track a few turns.',
            ],
            [
              'Put ',
              refs.npcs.ilsa_corrow,
              ' and her group on the map from the start, but they only move once someone reaches the helm or she is attacked.',
            ],
          ],
        },
        {
          note: [
            ['It starts easy and tightens room by room.'],
            [
              'The enemies aboard are softer than a ',
              refs.npcs.tempest_soldier,
              ': they are drugged up, and less emotionally invested.',
            ],
            [
              'The curve is deliberate. The bow and the batteries are easy slaughters: let the players enjoy them, and describe every kill big. After that every room hits hard: the ',
              refs.npcs.hand_breaker,
              's and ',
              refs.npcs.korrag_stonevow,
              ' are there to drop ',
              refs.pcs.devan,
              ' at least once before the bridge, so that he and the party arrive there worn down.',
            ],
            [
              'This is meant to be a High-difficulty fight, close to deadly. ',
              refs.npcs.ilsa_corrow,
              '’s Fireball can drop ',
              refs.pcs.swift_starblade,
              ' in one go, so spread her attacks around. Easier: have her cast only one Fireball. Harder: she joins the fight on round one.',
            ],
            [
              'The doors are the dial you can turn in the middle of the fight. Shut, each fight stays in its own room. Open one, and the next room joins in.',
            ],
          ],
        },
        {
          note: [
            [
              refs.npcs.crowy,
              ' can scout the deck before they land and warn them about the helm, or carry a message to ',
              refs.items.master_of_puppets,
              '.',
            ],
            [
              refs.pcs.fix,
              ' is not aboard the cruiser of ',
              refs.npcs.onana_tempest,
              ', but may show up again on the cruiser the party boards.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The cannons',
      lines: [
        {
          do: [
            [
              'The loyal cruisers keep firing at ',
              refs.items.ride_the_lightning,
              ' while the party fights aboard it. That is colour, not a rule: now and then, describe a cannonball slamming into the hull, the deck shuddering underfoot, smoke drifting through a hatch. Nobody is hurt by it and nothing is tracked.',
            ],
          ],
        },
        {
          note: [
            [
              'Escape pods: the room board shows which rooms have them. Climbing in and launching costs an action, and that character is out of the fight.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The bow',
      fight: {
        where: [{ deck: refs.locations.ride_the_lightning_main_deck, slice: 1 }],
        opponents: [{ creature: refs.npcs.cloaked_snatcher, count: 4 }],
        tactics: [['They work in pairs and gang up on whoever stands alone.']],
      },
      lines: [
        {
          do: [
            [
              'The bow: the ',
              refs.npcs.cloaked_snatcher,
              's here come forward to meet them, and go down fast. Half of them stand in each bow sector.',
            ],
            [
              'If the party investigates the front compartments, they can find the passage to the lower deck.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The batteries',
      fight: {
        where: [{ deck: refs.locations.ride_the_lightning_main_deck, slice: 2 }],
        opponents: [{ creature: refs.npcs.cloaked_snatcher, count: 4 }],
        tactics: [['They fight like the ones at the bow.']],
      },
      lines: [
        {
          do: [
            [
              'The batteries: more of them guard the guns, another quick win. Half of them stand on each side.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The next door',
      fight: {
        opponents: [
          { creature: refs.npcs.hand_breaker, count: 2 },
          { creature: refs.npcs.cloaked_snatcher, count: 2 },
        ],
        tactics: [
          [
            'Both ',
            refs.npcs.hand_breaker,
            's go for ',
            refs.pcs.devan,
            ': one bashes him ',
            refs.rules.prone,
            ', the other hits him with ',
            refs.rules.advantage,
            '. They knock him out rather than kill him. The ',
            refs.npcs.cloaked_snatcher,
            's keep ',
            refs.pcs.swift_starblade,
            ' and ',
            refs.pcs.cassian_veyl,
            ' busy, and drag one of them through a door if they can.',
          ],
        ],
      },
      lines: [
        {
          do: [
            [
              'The first room they open after the batteries, on whichever side. The ',
              refs.npcs.hand_breaker,
              's were waiting for them: this is where the ship stops being easy.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The lower deck',
      fight: {
        where: [{ deck: refs.locations.ride_the_lightning_gun_deck }],
        opponents: [{ creature: refs.npcs.cloaked_snatcher, count: 4 }],
        tactics: [
          [
            'Only one group at a time: the rest keep working the guns. A new group turns on the party only if the party attacks again. If the players walk through without engaging anyone, let them.',
          ],
        ],
      },
      onlyIf: [
        ['They find the passage and go below instead of fighting their way along the top level.'],
      ],
      lines: [
        {
          do: [
            [
              'Down on ',
              refs.locations.ride_the_lightning_gun_deck,
              ' there are about sixty ',
              refs.npcs.cloaked_snatcher,
              's. They are busy reloading and firing the cannons, and that keeps them distracted.',
            ],
            ['Its map is with the battlemaps of this scene: put it on the player screen.'],
            [
              'If the party engages them, they attack one group at a time. Bring a group into the encounter each time one turns on the party.',
            ],
            [
              'This can be the easy way: by the lower deck the party skips the top level and goes straight to the bridge section.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The Barracks',
      fight: {
        where: [{ deck: refs.locations.ride_the_lightning_main_deck, slice: 3, side: 'port' }],
        opponents: [
          { creature: refs.npcs.hand_breaker, count: 1 },
          { creature: refs.npcs.cloaked_snatcher, count: 2 },
        ],
        allies: [{ creature: refs.npcs.tempest_soldier, count: 4 }],
        tactics: [
          [
            'The guards hold the Barracks. The ',
            refs.npcs.hand_breaker,
            ' goes for ',
            refs.pcs.devan,
            '.',
          ],
          [
            'Cutting one soldier loose takes an action, and they stay ',
            refs.rules.unconscious,
            ' until someone heals them: any healing, such as a Potion of Healing or Lay on Hands, gets one up with that many hit points. Roll initiative once for all who are up.',
          ],
        ],
      },
      onlyIf: [['They go into the Barracks.']],
      lines: [
        {
          do: [
            [
              'The Barracks are guarded. The ',
              refs.npcs.tempest_soldier,
              's lie on the floor among the bunks, tied up and ',
              refs.rules.unconscious,
              '. They look like bodies, but they are not dead. They clearly wear the uniform of the ',
              refs.organizations.tempest_family,
              ', so the party can work out that they are likely allies.',
            ],
            [
              'Anyone who takes a close look sees them breathing. From a distance, or in the middle of the fight, a DC 10 ',
              refs.rules.medicine,
              ' check tells.',
            ],
            [
              'Freeing them costs the party something: each soldier needs healing before they can fight, so it is the party’s own potions or Lay on Hands that get them up. The party may decide not to bother, and that is fine. Bring the ones they wake into the encounter then.',
            ],
          ],
        },
        {
          note: [
            [
              'Freed soldiers are still aboard when the fight is over, and they serve ',
              refs.npcs.onana_tempest,
              '. That makes keeping the ship for themselves a lot less easy for the party (',
              refs.scenes.garran_comes_for_the_cruiser,
              '). Do not solve that for them: present the problem, and let the players work out how to handle it.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Korrag, just before the bridge',
      fight: {
        opponents: [
          { creature: refs.npcs.korrag_stonevow, count: 1 },
          { creature: refs.npcs.durgan_ashfang, count: 1 },
          { creature: refs.npcs.hand_spellbinder, count: 1 },
        ],
        tactics: [
          [
            refs.npcs.korrag_stonevow,
            ' opens with Conquering Presence, then casts Hold Person on ',
            refs.pcs.devan,
            '. While ',
            refs.pcs.devan,
            ' is held, ',
            refs.npcs.durgan_ashfang,
            ' and ',
            refs.npcs.korrag_stonevow,
            ' hit him from 5 ft., where every hit is a critical hit. A held creature cannot drink a potion: his friends have to break it.',
          ],
          [
            'The ',
            refs.npcs.hand_spellbinder,
            ' stays behind the orcs and goes around ',
            refs.pcs.auren,
            '’s armour: Hold Person on him first, then Command if that fails. Fireball only when ',
            refs.pcs.swift_starblade,
            ' and ',
            refs.pcs.cassian_veyl,
            ' stand together. Misty Step away from anyone who reaches it.',
          ],
          [
            refs.npcs.durgan_ashfang,
            ' fights as ',
            refs.pcs.devan,
            ' would: shield up, smiting, covering any ally beside him.',
          ],
          [
            'Your dial: if ',
            refs.pcs.devan,
            ' already went down and drank his bottle in an earlier room, leave ',
            refs.npcs.durgan_ashfang,
            ' out.',
          ],
        ],
      },
      lines: [
        {
          do: [
            [
              refs.npcs.korrag_stonevow,
              ' is not tied to a room. He meets the party wherever they are, just before they enter the bridge. For example, he comes down the stairs as they want to go up.',
            ],
          ],
        },
        { do: [['When ', refs.pcs.devan, ' first sees them, read:']] },
        {
          say: [
            [
              'The orc coming down the stairs is Korrag, your old commander, the one who taught you to fight. Behind him walks Durgan, your best mate in the old squad. Durgan’s eyes are veined with grey, and they pass over you like you are a stranger. Korrag’s do not. He knows you.',
            ],
          ],
        },
        { speaker: refs.npcs.korrag_stonevow, say: [['Stand down, soldier.']] },
        {
          do: [
            [
              refs.npcs.korrag_stonevow,
              ' is sober and can talk. What drives him is in his motivations.',
            ],
          ],
        },
        {
          do: [
            [
              'Reaching ',
              refs.npcs.durgan_ashfang,
              ': on his turn, ',
              refs.pcs.devan,
              ' can spend his action on a shared memory, an old squad call, or his name. Roll ',
              refs.rules.persuasion,
              ', DC 15. Each success breaks through for a moment: ',
              refs.npcs.durgan_ashfang,
              ' loses his next turn. After three successes he remembers. Other characters can help with a good line, which gives ',
              refs.pcs.devan,
              ' ',
              refs.rules.advantage,
              '.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [[refs.pcs.devan, ' reaches ', refs.npcs.durgan_ashfang, '.']],
          response: [
            [
              refs.npcs.durgan_ashfang,
              ' remembers, in pieces. He drops his warhammer, or turns it on ',
              refs.npcs.korrag_stonevow,
              '. He still craves the dust, and he will need help.',
            ],
          ],
        },
        {
          when: [['They kill ', refs.npcs.durgan_ashfang, '.']],
          response: [
            [
              'As he falls, the grey leaves his eyes for one breath, and he says ',
              refs.pcs.devan,
              '’s name.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The crystal room',
      onlyIf: [['They go in to the crystal itself.']],
      lines: [
        {
          do: [
            [
              'The crystal sits in a room of its own at the centre of the ship. It is cramped, there are no enemies in it, and the cannonballs never reach it.',
            ],
          ],
        },
        { say: [['The moment you step in, you feel strange.']] },
        {
          do: [
            [
              'There is not much room: they have to squeeze around the crystal one by one. Each of them rolls ',
              refs.rules.athletics,
              ', and the roll sets how long the crossing takes them: the lower, the longer.',
            ],
            [
              'Then describe each crossing as the others see it from where they stand. The closer someone gets to the crystal, the faster they move, so the one who struggled longest was round it in a blink.',
            ],
            [
              'While they are in here, the constant boom of the cannons outside slows down, then stops. Let that be noticeable.',
            ],
          ],
        },
        {
          note: [
            [
              'What is going on is in the background of ',
              refs.items.ride_the_lightning,
              '. Do not explain it. The clues are not obvious on purpose: the players have to investigate, and work out the rest for themselves.',
            ],
          ],
        },
        {
          note: [
            [
              'Sabotaging the crystal: an action and a DC 15 ',
              refs.rules.arcana,
              ' check, or 20 damage to the crystal (AC 13).',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['They work it out and take a ', refs.rules.long_rest, ' in the room.']],
          response: [
            [
              'They get the full rest, and outside it is as if no time has passed at all. When they come out, the cannons boom at full pace again.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The Helm',
      fight: {
        where: [{ deck: refs.locations.ride_the_lightning_main_deck, slice: 4, side: 'starboard' }],
        opponents: [
          { creature: refs.npcs.ilsa_corrow, count: 1 },
          { creature: refs.npcs.silas_wren, count: 1 },
          { creature: refs.npcs.dust_lost_sailor, count: 2 },
        ],
        tactics: [
          [
            refs.npcs.ilsa_corrow,
            ' fights from the wheel at range, with her sailors as a wall: Fireball on a cluster, then Arcane Burst on whoever is hurt. The ',
            refs.npcs.dust_lost_sailor,
            's charge the nearest target and never take cover.',
          ],
          [
            refs.npcs.silas_wren,
            ' takes people out of the fight without blood: Hold Person on whoever hits hardest, and his blade knocks out instead of killing. He keeps ',
            refs.npcs.ilsa_corrow,
            ' on her feet with Healing Word. He has Spirit Guardians up by the time the party reaches the stairs.',
          ],
          [
            refs.npcs.ilsa_corrow,
            ' keeps Shield for a hit that would hurt, Counterspell for a heal or a big spell, and Misty Step to get away from melee.',
          ],
          [
            refs.npcs.silas_wren,
            ' leaving is your dial: once the fight starts to turn against them, he turns himself invisible with his Invisibility spell and bails.',
          ],
        ],
      },
      lines: [
        {
          do: [
            [
              'The Helm, the hardest fight: ',
              refs.npcs.ilsa_corrow,
              ', the Finger of ',
              refs.organizations.the_eyeless_hand,
              ', holds the wheel with the ',
              refs.npcs.dust_lost_sailor,
              's. She hears the fight start and keeps the guns firing.',
            ],
            [
              refs.npcs.silas_wren,
              ' is on the bridge with her. Where they stand: the ',
              refs.npcs.dust_lost_sailor,
              's hold the stairs, she is at the wheel, and he stands beside her.',
            ],
          ],
        },
        {
          do: [
            [
              refs.npcs.silas_wren,
              ' does not stay to the end. He bails the moment he thinks they might lose: not too early, but always before he is in serious danger of dying. He jumps out of a window. As he leaves, he says to ',
              refs.npcs.ilsa_corrow,
              ':',
            ],
          ],
        },
        {
          speaker: refs.npcs.silas_wren,
          say: [
            [
              'See you on the other side, my dear! Until next time, ',
              refs.organizations.beasts_and_dwarf,
              '!',
            ],
          ],
        },
        { do: [['He waves.']] },
        {
          do: [
            [refs.npcs.ilsa_corrow, ' does not bail. She goes down with the ship, and says why:'],
          ],
        },
        {
          speaker: refs.npcs.ilsa_corrow,
          say: [
            [
              refs.npcs.the_father,
              ' will just pull me back from death, like he did to so many others.',
            ],
          ],
        },
        {
          note: [
            [
              'Her last trick: when ',
              refs.npcs.ilsa_corrow,
              ' drops below half her ',
              refs.rules.hit_points,
              ', she runs for the crystal room to overload it. If she spends a full turn there, the crystal fails: see the outcomes. Say plainly where she is going, so the players can race her.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [
            [
              'They take the helm: ',
              refs.npcs.ilsa_corrow,
              ' is down, ',
              refs.npcs.silas_wren,
              ' is down or gone, and one of them holds the wheel.',
            ],
          ],
          response: [
            [
              'The guns fall silent and the loyal cruisers stop firing. The ',
              refs.npcs.dust_lost_sailor,
              's drop their weapons and stand there, lost.',
            ],
            ['Run ', refs.scenes.garran_comes_for_the_cruiser, '.'],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      when: [['The fight goes badly, or a player signals for supplies.']],
      response: [
        [
          'Supplies in the middle of the fight: ',
          refs.npcs.captain_garran,
          ' can fire a boarding torpedo packed with supplies into whatever part of the ship the party holds. It opens like the others, with Potions of Healing inside. This is your call, not something they can count on: watch how they are doing, and send it when the fight is going badly and they would rather go on than bail out through the escape pods. A player can also think to signal for it. ',
          refs.npcs.crowy,
          ' can carry the request across.',
        ],
      ],
    },
    {
      when: [['The crystal fails, by their hand or hers.']],
      response: [
        [
          'The ship loses its lift and starts to fall. Everyone aboard has three rounds to reach an escape pod or ',
          refs.items.beasts_and_dwarf_s_airship,
          '. ',
          refs.items.ride_the_lightning,
          ' is lost, but ',
          refs.organizations.the_eyeless_hand,
          ' loses it too.',
        ],
      ],
    },
    {
      when: [['They bail out in the escape pods.']],
      response: [
        [
          'The pods drift down to the sea, and ',
          refs.items.master_of_puppets,
          ' collects them. The cruiser keeps fighting until it breaks up.',
        ],
      ],
    },
    {
      when: [['They all go down.']],
      response: [
        [
          'The ',
          refs.npcs.cloaked_snatcher,
          's knock them out rather than kill them, and they wake tied up in the Stern hold. ',
          refs.npcs.captain_garran,
          '’s boarders find them there, and the cruiser keeps firing on the ships of the ',
          refs.organizations.tempest_family,
          ' until he takes it.',
        ],
      ],
    },
  ],
  combat: {
    morale: [
      [
        'The Hand does not surrender. The ',
        refs.npcs.dust_lost_sailor,
        's fight until ',
        refs.npcs.ilsa_corrow,
        ' falls, then stop. Below half her hit points, she runs for the crystal room (see the Helm in the script). ',
        refs.npcs.silas_wren,
        ' does not stay to the end (see the Helm in the script).',
      ],
    ],
    terrain: [
      [
        'Closed rooms under a roof: there is a deck above, with nothing on it. The ship tilts whenever it is hit. The helm stands aft and raised, with stairs on both sides.',
      ],
    ],
    exits: [
      [
        refs.items.beasts_and_dwarf_s_airship,
        ' alongside, the escape pods in the sectors of ',
        refs.items.ride_the_lightning,
        ' that have them, or bringing the ship down by its crystal.',
      ],
    ],
  },
  aboard: refs.items.ride_the_lightning,
})

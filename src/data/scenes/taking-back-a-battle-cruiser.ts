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
              'Running it: roll initiative once for each group (the ',
              refs.npcs.cloaked_snatcher,
              's, the ',
              refs.npcs.dust_lost_sailor,
              's, and one each for ',
              refs.npcs.ilsa_corrow,
              ', ',
              refs.npcs.silas_wren,
              ' and ',
              refs.npcs.korrag_stonevow,
              '), so you only track a few turns. Start the clock the moment the first player hits. Put ',
              refs.npcs.ilsa_corrow,
              ' and her group on the map from the start, but they only move once someone reaches the helm or she is attacked.',
            ],
          ],
        },
        {
          note: [
            ['It starts easy and tightens room by room.'],
            [
              'The curve is deliberate. The bow and the batteries are easy slaughters: let the players enjoy them, and describe every kill big. The tension starts at ',
              refs.npcs.korrag_stonevow,
              ' and peaks at the Helm.',
            ],
            [
              'This is meant to be a High-difficulty fight, close to deadly. ',
              refs.npcs.ilsa_corrow,
              '’s Fireball can drop ',
              refs.pcs.swift_starblade,
              ' in one go, so spread her attacks around. Easier: take two ',
              refs.npcs.dust_lost_sailor,
              's off the map, or have her cast only one Fireball. Harder: a bigger damage die on the clock, or she joins the fight on round one.',
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
      title: 'The ship-damage clock',
      lines: [
        {
          do: [
            [
              'The ship-damage clock: the loyal cruisers keep firing back at ',
              refs.items.ride_the_lightning,
              ' while the party fights aboard it. The clock on this page times the hits and rolls the slice of the ship, counted from the bow. You choose whether the port or the starboard sector of that slice is hit.',
            ],
            [
              'The clock runs in real time, and it does not stop while the players debate or take long over their actions. It is the ticking clock that puts the encounter under pressure.',
            ],
            [
              'The choice of side is yours, to make it more or less dangerous. You can always hit the side the party is not in, unless that side is already destroyed: then the hit lands on the side that is left.',
            ],
            [
              'If both sectors of one slice are destroyed, the ship is cut in two and lost. The clock shows which sectors have escape pods.',
            ],
            [
              'Torpedoes hurt the ship too. The first torpedo to hit a sector deals 1 damage to that sector; later ones into the same sector do not. That goes for the boarding torpedoes and for a supply torpedo alike. Add it to that sector by hand.',
            ],
          ],
        },
        {
          note: [
            [
              'For a faster clock, pick a bigger damage die in the tracker. You can change the die in the middle of the fight, for example when the scene drags.',
            ],
            [
              'When a sector is destroyed, everyone in it makes a DC 13 ',
              refs.rules.dex,
              ' ',
              refs.rules.saving_throw,
              '. On a success they scramble into a neighbouring sector. On a failure they go down with the wreckage and are out of the fight: in an escape pod if the sector has them, otherwise in the sea, taking 6d6 bludgeoning damage before a skiff from ',
              refs.items.master_of_puppets,
              ' picks them up. Crew of ',
              refs.organizations.the_eyeless_hand,
              ' caught in a destroyed sector are gone.',
            ],
            [
              'A destroyed sector stays on the map as difficult terrain: torn, burning deck. Track damage from the player-screen dock while a deck map is showing, and the map shows it to the players.',
            ],
            ['The DC of the save and the fall damage are first choices, so change them freely.'],
            [
              'No hits land while the party is in the crystal room: pause the clock for as long as you play out time in there. The beat of that room says why.',
            ],
          ],
        },
        {
          note: [
            [
              'When the players see the cruiser is about to be destroyed, they should bail out in the escape pods. Make the warnings loud: describe every hit, and once a slice holds by one side only, let it groan and sag in plain sight.',
            ],
            [
              'An escape pod: it costs an action to climb in and launch. That character is out of the fight.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The bow',
      lines: [
        {
          do: [
            [
              'The bow: four ',
              refs.npcs.cloaked_snatcher,
              's come forward to meet them, and go down fast.',
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
      lines: [{ do: [['The batteries: four more guard the guns, another quick win.']] }],
    },
    {
      title: 'The lower deck',
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
              'If the party engages them, they attack in groups of four. Add each group to the encounter as it turns on the party.',
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
      onlyIf: [['They go into the Barracks.']],
      lines: [
        {
          do: [
            [
              'In the Barracks the party finds ',
              refs.npcs.tempest_soldier,
              's, tied up. If the party releases them, they help in the fight. Add them to the encounter then.',
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
      lines: [
        {
          do: [
            [
              refs.npcs.korrag_stonevow,
              ' is not tied to a room. He meets the party wherever they are, just before they enter the bridge. For example, he comes down the stairs as they want to go up. He is alone, and this is where it gets tense.',
            ],
          ],
        },
        { do: [['When ', refs.pcs.devan, ' first sees ', refs.npcs.korrag_stonevow, ', read:']] },
        {
          say: [
            [
              'The orc at the Finger’s side wears a shield you painted yourself, a lifetime ago. Korrag. Your best mate in the old squad. His eyes are veined with grey, and they pass over you like you are a stranger.',
            ],
          ],
        },
        {
          do: [
            [
              'Reaching ',
              refs.npcs.korrag_stonevow,
              ': on his turn, ',
              refs.pcs.devan,
              ' can spend his action on a shared memory, an old squad call, or his name. Roll ',
              refs.rules.persuasion,
              ', DC 15. Each success breaks through for a moment: ',
              refs.npcs.korrag_stonevow,
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
          when: [[refs.pcs.devan, ' reaches ', refs.npcs.korrag_stonevow, '.']],
          response: [
            [
              refs.npcs.korrag_stonevow,
              ' remembers, in pieces. He drops his warhammer, or turns it on ',
              refs.npcs.ilsa_corrow,
              '. He still craves the dust, and he will need help.',
            ],
          ],
        },
        {
          when: [['They kill ', refs.npcs.korrag_stonevow, '.']],
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
              'The crystal sits in a room of its own at the centre of the ship. It is cramped, there are no enemies in it, and the hits on the hull never reach it.',
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
              'While they are in here, no explosions shake the hull. Let that be noticeable: the hits that kept coming have simply stopped. Pause the clock while you play out what happens in this room.',
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
              'They get the full rest, and outside it is as if no time has passed at all. When they come out, start the clock again from where it stood.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The Helm',
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
            [refs.npcs.silas_wren, ' is on the bridge with her.'],
          ],
        },
        {
          do: [
            [
              'When ',
              refs.npcs.silas_wren,
              ' is the only one of them left, he bails: he jumps out of a window. On his way out:',
            ],
          ],
        },
        {
          speaker: refs.npcs.silas_wren,
          say: [['We’ll meet again, ', refs.organizations.beasts_and_dwarf, '!']],
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
              'The guns fall silent and the loyal cruisers stop firing: stop the clock. The ',
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
          ' can fire a boarding torpedo packed with supplies into whatever part of the ship the party holds. It opens like the others, with Potions of Healing inside. If it is the first torpedo into that sector, it damages the sector like any other. This is your call, not something they can count on: watch how they are doing, and send it when the fight is going badly and they would rather go on than bail out through the escape pods. A player can also think to signal for it. ',
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
      when: [['The ship is cut in two.']],
      response: [
        [
          'Both halves go down. Everyone still aboard has one round to reach an escape pod. ',
          refs.items.ride_the_lightning,
          ' is lost, and ',
          refs.npcs.onana_tempest,
          ' is one cruiser short.',
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
  opponents: [
    { creature: refs.npcs.ilsa_corrow, count: 1 },
    { creature: refs.npcs.silas_wren, count: 1 },
    { creature: refs.npcs.korrag_stonevow, count: 1 },
    { creature: refs.npcs.dust_lost_sailor, count: 2 },
    { creature: refs.npcs.cloaked_snatcher, count: 8 },
  ],
  combat: {
    tactics: [
      [
        'The ',
        refs.npcs.cloaked_snatcher,
        's work in pairs and gang up on whoever stands alone. The ',
        refs.npcs.dust_lost_sailor,
        's charge the nearest target and never take cover.',
      ],
      [
        refs.npcs.ilsa_corrow,
        ' fights from the Helm at range, with her sailors as a wall: Fireball on a cluster, then Arcane Burst on whoever is hurt. ',
        refs.npcs.korrag_stonevow,
        ' fights as ',
        refs.pcs.devan,
        ' would: shield up, smiting, covering any ally beside him.',
      ],
    ],
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
        'An open deck with rigging and gun ports, tilting whenever the ship is hit. A fall goes all the way to the ocean. The helm stands aft and raised, with stairs on both sides.',
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
  shipDamage: {
    vessel: refs.items.ride_the_lightning,
    everySeconds: 180,
    damageDie: 1,
  },
})

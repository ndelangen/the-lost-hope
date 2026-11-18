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
    refs.npcs.korrag_stonevow,
    refs.npcs.dust_lost_sailor,
    refs.npcs.cloaked_snatcher,
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
              'Running it: roll initiative once for each group (the ',
              refs.npcs.cloaked_snatcher,
              's, the ',
              refs.npcs.dust_lost_sailor,
              's, and one each for ',
              refs.npcs.ilsa_corrow,
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
              'The clock runs in real time, every three minutes, and it does not stop while the players debate or take long over their actions. It is the ticking clock that puts the encounter under pressure.',
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
          ],
        },
      ],
    },
    {
      title: 'The batteries',
      lines: [{ do: [['The batteries: four more guard the guns, another quick win.']] }],
    },
    {
      title: 'The Crystal chamber',
      lines: [
        {
          do: [
            [
              'The Crystal chamber, the room before the Helm: ',
              refs.npcs.korrag_stonevow,
              ' guards the only way through, alone, and this is where it gets tense.',
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
        {
          note: [
            [
              'Sabotaging the crystal: in the Crystal chamber, an action and a DC 15 ',
              refs.rules.arcana,
              ' check, or 20 damage to the crystal (AC 13).',
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
          ],
        },
        {
          note: [
            [
              'Her last trick: when ',
              refs.npcs.ilsa_corrow,
              ' drops below half her ',
              refs.rules.hit_points,
              ', she runs for the Crystal chamber to overload it. If she spends a full turn there, the crystal fails: see the outcomes. Say plainly where she is going, so the players can race her.',
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
              ' is down and one of them holds the wheel.',
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
        ' holds the Crystal chamber and fights there as ',
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
        ' falls, then stop. Below half her hit points, she runs for the Crystal chamber (see the Helm in the script).',
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

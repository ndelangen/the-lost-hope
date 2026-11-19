import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Boarding Ride the Lightning',
  illustration: '/assets/scenes/boarding-ride-the-lightning.png',
  location: refs.locations.master_of_puppets_gun_deck,
  battleMaps: [
    refs.locations.master_of_puppets_gun_deck,
    refs.locations.master_of_puppets_main_deck,
    refs.locations.beasts_and_dwarf_s_airship_decks,
    refs.locations.ride_the_lightning_main_deck,
    refs.locations.ride_the_lightning_gun_deck,
  ],
  npcs: [refs.npcs.onana_tempest, refs.npcs.captain_garran],
  setup: [
    [
      refs.items.ride_the_lightning,
      ' is firing on its own side, and its guns cover every approach. The party has to get aboard. However they do it, they come in at the bow, on the port or the starboard side.',
    ],
  ],
  beats: [
    {
      title: 'The boarding torpedo',
      lines: [
        {
          do: [
            [
              refs.npcs.captain_garran,
              ' shows them an experimental boarding torpedo: a narrow iron shell fired from the gun deck of ',
              refs.items.master_of_puppets,
              ' that punches through a ship’s bow and opens like a flower. It holds one person, and the launcher fires one at a time.',
            ],
          ],
        },
        { do: [['He looks at ', refs.pcs.devan, '.']] },
        { speaker: refs.npcs.captain_garran, say: [['It’ll be a squeeze.']] },
        {
          do: [
            [
              'He lets them see the layout of ',
              refs.items.ride_the_lightning,
              '. Put ',
              refs.locations.ride_the_lightning_main_deck,
              ' or ',
              refs.locations.ride_the_lightning_gun_deck,
              ' on the player screen, from the battle maps of this scene.',
            ],
          ],
        },
        {
          speaker: refs.npcs.captain_garran,
          say: [
            [
              'Starboard bow or port bow? And in which order? It’s experimental, and it fires one of you at a time.',
            ],
          ],
        },
        { say: [['Roll for ', refs.rules.initiative, '!']] },
        {
          do: [
            [
              'Ask the players how they want to get aboard. The torpedo is one way, not the only one.',
            ],
          ],
        },
      ],
    },
    {
      title: 'By torpedo',
      onlyIf: [['They take the torpedo.']],
      lines: [
        {
          do: [
            [
              'The boarding is round one of the fight, so run it in the encounter of ',
              refs.scenes.taking_back_a_battle_cruiser,
              ', not of this scene: open that one before the first launch and keep it for the rest of the fight. It has the enemies and the ship’s rooms.',
            ],
            ['The enemies in the sectors about to be hit roll ', refs.rules.initiative, ' too.'],
            [
              'For this round, skip every enemy who rolled higher than the best roll of a player. They were just wandering about, perhaps looking out of a window: rolling too high costs them their first turn.',
            ],
            [
              'Then go down the order. On a player’s turn, ',
              refs.npcs.captain_garran,
              ' asks them which side to aim for.',
            ],
          ],
        },
        { speaker: refs.npcs.captain_garran, say: [['Port or starboard?']] },
        {
          do: [
            [
              'That player picks their own side, and the torpedo launches and hits. Spreading out or landing together is the party’s choice, for their own reasons. A natural 1 on their ',
              refs.rules.initiative,
              ' roll: it misses and hits the other side.',
            ],
            ['Just as the first torpedo launches, he adds one more thing.'],
          ],
        },
        {
          speaker: refs.npcs.captain_garran,
          say: [
            [
              'Oh, you might want to get out at once, and stand aside. The next torpedo might be behind you.',
            ],
          ],
        },
        {
          do: [
            [
              'The hit: the torpedo blasts a 15-foot ',
              refs.rules.cone,
              ' into the room from the breach. Every creature in it takes 2d6 ',
              refs.rules.bludgeoning,
              ' damage and is knocked back 10 feet. That softens up the first room so the party can land on its feet.',
            ],
            [
              'The blast does not spare friends: a party member who landed on that side and did not stand aside takes the same.',
            ],
            [
              'Then that player takes their turn: an action, then their movement, then a ',
              refs.rules.bonus_action,
              '. Getting out of the torpedo is the Disembark action. It is very advisable, but it is their choice. While still strapped in they cannot move.',
            ],
            ['By the end of round one the whole party is aboard.'],
          ],
        },
        {
          do: [
            [
              'Each landing is a DC 13 ',
              refs.rules.dex,
              ' ',
              refs.rules.saving_throw,
              ': on a failure the rider lands ',
              refs.rules.prone,
              ' and takes 2d6 bludgeoning damage.',
            ],
            [
              'A Large rider is crammed in: for one round after landing it has ',
              refs.rules.disadvantage,
              ' on everything. ',
              refs.pcs.devan,
              ' in his armour counts as Large here.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Another way in',
      onlyIf: [['They find a way of their own.']],
      lines: [
        {
          do: [
            [
              'Another way in: ',
              refs.items.beasts_and_dwarf_s_airship,
              ' can run in under the guns to the bow. The pilot makes a DC 15 ',
              refs.rules.dex,
              ' check; on a failure the airship takes a hit on the way, but they still reach the bow. ',
              refs.pcs.auren,
              ' is a test pilot, so give him ',
              refs.rules.advantage,
              '. ',
              refs.npcs.crowy,
              ' can carry a line across, and a good spell or plan from the players simply works.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Aboard',
      lines: [{ do: [['Run ', refs.scenes.taking_back_a_battle_cruiser, ' from the bow.']] }],
    },
  ],
  outcomes: [
    {
      when: [['They refuse to go.']],
      response: [
        [
          refs.npcs.onana_tempest,
          ' reminds them of their promise. If they still refuse, ',
          refs.npcs.captain_garran,
          ' sends his own boarders, and ',
          refs.items.ride_the_lightning,
          ' tears them apart.',
        ],
      ],
    },
  ],
})

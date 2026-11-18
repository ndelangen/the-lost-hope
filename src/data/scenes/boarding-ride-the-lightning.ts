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
              'The torpedo: one launch per round. Each party member picks their own bow, port or starboard, so the party may split over the two. Have everyone roll ',
              refs.rules.initiative,
              ' now: that roll is the order they go into the torpedo. Whoever lands first is alone at their bow until the next one arrives there.',
            ],
            [
              'A natural 1 on that roll: the torpedo of that rider hits the other bow, not the one they picked.',
            ],
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

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
  ],
  npcs: [refs.npcs.onana_tempest, refs.npcs.captain_garran],
  setup: [
    [
      refs.items.ride_the_lightning,
      ' is firing on its own side, and its guns cover every approach. The party has to get aboard. However they do it, they come in at the bow.',
    ],
    [
      refs.npcs.captain_garran,
      ' shows them the way his crew does it: a boarding torpedo, a narrow iron shell fired from the gun deck of ',
      refs.items.master_of_puppets,
      ' that punches through a ship’s bow and opens like a flower. It holds one person, and the launcher fires one at a time.',
    ],
    ['He looks at ', refs.pcs.devan, ': “It’ll be a squeeze.”'],
    ['Ask the players how they want to get aboard. The torpedo is one way, not the only one.'],
  ],
  notes: [
    [
      'The torpedo: one launch per round, and the players choose who goes first. Whoever lands first is alone at the bow until the next one arrives, which makes the order a real choice.',
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
  outcomes: [
    {
      when: [['They are aboard.']],
      response: [['Run ', refs.scenes.taking_back_a_battle_cruiser, ' from the bow.']],
    },
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

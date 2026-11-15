import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Taking back a battle-cruiser',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.cloaked_snatcher, refs.npcs.onana_tempest],
  references: [
    refs.organizations.the_eyeless_hand,
    refs.organizations.tempest_family,
    refs.organizations.beasts_and_dwarf,
    refs.pcs.swift_starblade,
    refs.pcs.fix,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.items.beasts_and_dwarf_s_airship,
    refs.items.master_of_puppets,
    refs.items.ride_the_lightning,
  ],
  setup: [
    [
      refs.items.master_of_puppets,
      ' sets down at the wrecked docks of ',
      refs.locations.nimbus,
      ' just long enough to collect ',
      refs.pcs.swift_starblade,
      '. The party is whole again.',
    ],
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
      'The party boards it and has to kill every member of ',
      refs.organizations.the_eyeless_hand,
      ' in its crew to hand the ship back to ',
      refs.npcs.onana_tempest,
      '.',
    ],
  ],
  notes: [
    [
      refs.pcs.fix,
      ' is not aboard the cruiser of ',
      refs.npcs.onana_tempest,
      ', but may show up again on the cruiser the party boards.',
    ],
    [
      'First draft. The numbers and the deck map still need to be prepared once the plan for the battle is settled.',
    ],
  ],
  outcomes: [
    {
      when: [['They clear the deck.']],
      response: [
        [
          'The cruiser stops firing on its own side and rejoins the line of ',
          refs.npcs.onana_tempest,
          '.',
        ],
      ],
    },
    {
      when: [['They withdraw or lose.']],
      response: [['The cruiser keeps firing on the Tempest line.']],
    },
  ],
  combat: {
    tactics: [
      [
        'The crew of ',
        refs.organizations.the_eyeless_hand,
        ' wears Tempest livery. They hold the helm and the guns, and they fight as ',
        refs.npcs.cloaked_snatcher,
        's do.',
      ],
    ],
    morale: [['They do not surrender.']],
    terrain: [
      [
        'An open deck with rigging and gun ports, tilting whenever the ship is hit. A fall goes all the way to the ocean.',
      ],
    ],
    exits: [['The boarding lines back to their own vessel.']],
  },
})

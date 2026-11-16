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
      'If ',
      refs.pcs.swift_starblade,
      ' is not with the party yet, ',
      refs.items.master_of_puppets,
      ' sets down at the wrecked docks of ',
      refs.locations.nimbus,
      ' just long enough to collect him. The party is whole again.',
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
    [
      'The ship-damage clock: the loyal cruisers keep firing back at ',
      refs.items.ride_the_lightning,
      ' while the party fights aboard it. Start a 3-minute timer on repeat. Each time it runs out, roll a d4 for the slice of the ship, counted from the bow, and choose whether the port or the starboard sector of that slice is hit. That sector takes 1 damage. At 5 damage it is destroyed.',
    ],
    [
      'The choice of side is yours, to make it more or less dangerous. You can always hit the side the party is not in, unless that side is already destroyed: then the hit lands on the side that is left.',
    ],
    [
      'If both sectors of one slice are destroyed, the ship is cut in two and lost. Every sector has escape pods, except the crystal chamber and the helm.',
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
      'When the players see the cruiser is about to be destroyed, they should bail out in the escape pods. Make the warnings loud: describe every hit, and once a slice holds by one side only, let it groan and sag in plain sight.',
    ],
    [
      'The clock deals 1 damage per hit, which breaks the ship after roughly 85 minutes of play. For a faster clock, pick a damage die in the tracker: with a d2 the ship breaks after about 55 minutes, with a d3 after about 40, with a d4 after about 35, and with a d6 after about 20. You can change the die in the middle of the fight, for example to a bigger one when the scene drags.',
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
      'The sector names, the two sectors without escape pods, the DC of the save and the fall damage are first choices, so change them freely. The enemy numbers still need to be prepared.',
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
    exits: [
      [
        'The boarding lines back to their own vessel, and the escape pods in every sector except the crystal chamber and the helm.',
      ],
    ],
  },
  shipDamage: {
    vessel: refs.items.ride_the_lightning,
    everySeconds: 180,
    damageDie: 1,
    sectorHitPoints: 5,
    port: [
      { name: 'Port bow', escapePods: true },
      { name: 'Port battery', escapePods: true },
      { name: 'Crystal chamber', escapePods: false },
      { name: 'Helm', escapePods: false },
    ],
    starboard: [
      { name: 'Starboard bow', escapePods: true },
      { name: 'Starboard battery', escapePods: true },
      { name: 'Barracks', escapePods: true },
      { name: 'Stern hold', escapePods: true },
    ],
  },
})

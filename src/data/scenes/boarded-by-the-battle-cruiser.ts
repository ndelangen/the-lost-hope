import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Boarded by the battle-cruiser',
  location: refs.locations.skynet,
  npcs: [refs.npcs.captain_garran, refs.npcs.tempest_soldier],
  references: [
    refs.npcs.onana_tempest,
    refs.organizations.beasts_and_dwarf,
    refs.organizations.tempest_family,
    refs.items.beasts_and_dwarf_s_airship,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
  ],
  setup: [
    [
      'Wherever the party is, in the air on ',
      refs.items.beasts_and_dwarf_s_airship,
      ', still on the slip at the shipyard, or on the ferry, a battle-cruiser of the ',
      refs.organizations.tempest_family,
      ' slides alongside and blots out the sky. Grappling lines thump into the hull, and soldiers drop onto the deck. At least forty more stand at the cruiser’s rail.',
    ],
    [
      refs.npcs.captain_garran,
      ': “This vessel is impounded for use in the war, by the authority of ',
      refs.npcs.onana_tempest,
      '.”',
    ],
    [
      'Then he sees who he is talking to: “Oh hey, it’s ',
      refs.organizations.beasts_and_dwarf,
      '! We brought you to ',
      refs.npcs.onana_tempest,
      ' before, remember us?”',
    ],
    ['“Here, follow us. I’m sure ', refs.npcs.onana_tempest, ' would like a word.”'],
    ['If they hesitate: “Sorry, not a request, I’m afraid. Come with us now.”'],
  ],
  notes: [
    [
      'Mini-mystery, no answer needed: from the airship or the cruiser, looking down, one perfectly round patch of ocean lies completely flat and still among the waves.',
    ],
    [
      refs.npcs.captain_garran,
      ' led the escort in ',
      refs.events.n2_e168,
      '. He is friendly, and he does not negotiate. Everyone aboard comes along, and the vessel is taken in tow.',
    ],
  ],
  outcomes: [
    {
      when: [['They go along.']],
      response: [
        [
          'A boarding plank takes them across to the cruiser. Run “',
          refs.npcs.onana_tempest,
          ' calls the party to war”.',
        ],
      ],
    },
    {
      when: [['They argue that the ship is theirs.']],
      response: [['“Take it up with ', refs.npcs.onana_tempest, '.” He changes nothing.']],
    },
    {
      when: [['They try to outrun the cruiser.']],
      response: [
        ['The cruiser is faster. It puts a warning shot across their bow and grapples on again.'],
      ],
    },
    {
      when: [['They fight.']],
      response: [
        [
          'They can, but it cannot be won: more soldiers keep jumping across. Use the combat notes.',
        ],
      ],
    },
  ],
  combat: {
    tactics: [
      [
        'The soldiers fight to subdue: they pin, disarm, and surround. ',
        refs.npcs.captain_garran,
        ' stays in front and keeps offering a way out.',
      ],
    ],
    morale: [
      ['They do not break. They accept a surrender at any moment and hold no grudge about it.'],
    ],
    terrain: [
      [
        'The deck of whatever vessel the party is on, crossed by grappling lines, with a long drop to the ocean on every side.',
      ],
    ],
    reinforcements: [
      [
        'Six more soldiers jump across at the end of every round. The party can see forty or more on the cruiser’s deck.',
      ],
    ],
    exits: [['None worth taking: over the side is the ocean, far below.']],
  },
})

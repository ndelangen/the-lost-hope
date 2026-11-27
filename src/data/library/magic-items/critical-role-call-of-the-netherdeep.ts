import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  earring_of_message: {
    name: 'Earring of Message',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'The blue crystal of this earring is wrapped with delicate copper wire. The earring has 5 charges. While wearing it, you can use an action to expend 1 charge and cast the message spell. The earring regains 1d4 + 1 expended charges daily at dawn.',
      ],
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  jewel_of_three_prayers_dormant: {
    name: 'Jewel of Three Prayers (Dormant)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'The Jewel of Three Prayers is a Vestige of Divergence (see the "Vestiges of Divergence" sidebar). In ancient times, Alyxian the Apotheon bore this amulet as a symbol of his covenant with three Prime Deities: Sehanine the Moon Weaver, Avandra the Change Bringer, and Corellon the Arch Heart. When the jewel is found, only Sehanine\'s power thrums within its dormant heart. The power of the other two deities waits to be reawakened by a hero—or heroes—who can follow in Alyxian\'s footsteps.',
      ],
      [
        'Dormant State. In this state, the Jewel of Three Prayers is a glittering golden disk attached to a fine golden chain. The chain magically resizes to function as a necklace for the creature that wears it.',
      ],
      ['In its Dormant State, the jewel has the following properties:'],
      ['You gain a +1 bonus to AC while wearing the jewel.'],
      [
        'While wearing or holding the jewel, you can use an action to cause it to shed bright light in a 15-foot radius and dim light for an additional 15 feet. The light lasts until you extinguish it (no action required).',
      ],
      [
        'The jewel has 3 charges and regains all its expended charges daily at dawn. While holding the jewel, you can expend 1 charge from it to cast the invisibility spell.',
      ],
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_muscle: {
    name: 'Medal of Muscle',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "You can squeeze this medal tightly in the palm of your hand as an action. Doing so gives you advantage on Strength checks and Strength saving throws for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
    ],
    effects: [
      {
        key: 'muscle',
        name: 'Medal of Muscle',
        lands: { on: 'use' },
        text: [
          'Doing so gives you advantage on Strength checks and Strength saving throws for 1 hour.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_the_conch: {
    name: 'Medal of the Conch',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When you use an action to rub this medal, you gain a swimming speed equal to your walking speed for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
    ],
    effects: [
      {
        key: 'conch',
        name: 'Medal of the Conch',
        lands: { on: 'use' },
        text: ['you gain a swimming speed equal to your walking speed for 1 hour.'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_the_horizonback: {
    name: 'Medal of the Horizonback',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When you would be hit by an attack, you can use your reaction to increase your AC by 5 until the start of your next turn, including against the triggering attack. You must be wearing the medal and able to see the creature that made the triggering attack to use this property. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
    ],
    effects: [
      {
        key: 'horizonback',
        name: 'Medal of the Horizonback',
        lands: { on: 'use' },
        text: [
          'you can use your reaction to increase your AC by 5 until the start of your next turn, including against the triggering attack.',
        ],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_the_maze: {
    name: 'Medal of the Maze',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When you use an action to trace the maze inscribed on this medal, you gain advantage on Wisdom checks and know the quickest route to the end of any nonmagical path or maze for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
    ],
    effects: [
      {
        key: 'maze',
        name: 'Medal of the Maze',
        lands: { on: 'use' },
        text: [
          'you gain advantage on Wisdom checks and know the quickest route to the end of any nonmagical path or maze for 1 hour.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_the_meat_pie: {
    name: 'Medal of the Meat Pie',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "You gain 2d4 + 2 temporary hit points when you use an action to press this medal to your mouth. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
      [
        "While magical, this medal is slightly warm to the touch (as if it's fresh from the oven) and smells faintly of baked pie crust.",
      ],
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_the_wetlands: {
    name: 'Medal of the Wetlands',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When you use an action to trace the edge of this medal, difficult terrain doesn't cost you extra movement for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
    ],
    effects: [
      {
        key: 'wetlands',
        name: 'Medal of the Wetlands',
        lands: { on: 'use' },
        text: ["difficult terrain doesn't cost you extra movement for 1 hour."],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  medal_of_wit: {
    name: 'Medal of Wit',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "You can press this medal to your temple as an action. Doing so gives you advantage on Intelligence checks and Intelligence saving throws for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
      ],
    ],
    effects: [
      {
        key: 'wit',
        name: 'Medal of Wit',
        lands: { on: 'use' },
        text: [
          'Doing so gives you advantage on Intelligence checks and Intelligence saving throws for 1 hour.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  ring_of_red_fury: {
    name: 'Ring of Red Fury',
    category: 'Ring',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'This ring has a stripe of ruidium running through it. While wearing the ring, you gain the following benefits:',
      ],
      ['You can breathe water.'],
      ['You gain a swimming speed equal to your walking speed.'],
      [
        'Ruidium Rage. As a bonus action, you can use the ring to gain the following benefits, which last for 1 minute or until you are ',
        rules.incapacitated,
        ':',
      ],
      ['You have advantage on Strength checks and Strength saving throws.'],
      ['When you hit with an attack, you can add your proficiency bonus to the damage roll.'],
      [
        "Difficult terrain doesn't cost you extra movement, and you are immune to the ",
        rules.paralyzed,
        ' and ',
        rules.restrained,
        ' conditions.',
      ],
      ["You can't use this property of the ring again until you finish a long rest."],
      [
        'Ruidium Corruption. When you use the Ruidium Rage property of the ring, you must make a DC 20 Charisma saving throw. On a failed save, you gain 1 level of ',
        rules.exhaustion,
        '. If you are not already suffering from ruidium corruption, you become corrupted when you fail this save.',
      ],
      [
        'If Ruidium Is Destroyed. If the Apotheon is killed or redeemed, all the ruidium in Exandria is destroyed instantly, and the ring of red fury becomes a ring of free action.',
      ],
    ],
    effects: [
      {
        key: 'ruidium-rage',
        name: 'Ruidium Rage',
        lands: { on: 'use' },
        text: [
          'You have advantage on Strength checks and Strength saving throws. ',
          'When you hit with an attack, you can add your proficiency bonus to the damage roll. ',
          "Difficult terrain doesn't cost you extra movement, and you are immune to the ",
          rules.paralyzed,
          ' and ',
          rules.restrained,
          ' conditions.',
        ],
        lasts: { kind: 'until', text: ['1 minute or until you are ', rules.incapacitated] },
      },
      {
        key: 'ruidium-exhaustion',
        name: 'Ruidium exhaustion',
        lands: { on: 'failed-save', save: 'cha', dc: 20 },
        text: [
          'On a failed save, you gain 1 level of ',
          rules.exhaustion,
          '. ',
          'If you are not already suffering from ruidium corruption, you become corrupted when you fail this save.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  ruidium_shield: {
    name: 'Ruidium Shield',
    category: 'Shield',
    detail: 'Shield',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'Tendrils of ruidium extend across the metal surface of this shield. While this shield is on your person, you gain the following benefits:',
      ],
      ['You have resistance to psychic damage.'],
      ['You can breathe water.'],
      ['You gain a swimming speed equal to your walking speed.'],
      [
        'Psychic Reflection. When you take psychic damage while holding the shield, you can use your reaction to choose another creature you can see within 30 feet of you. That creature takes the psychic damage you would have taken.',
      ],
      [
        "Ruidium Corruption. When you use the shield's Psychic Reflection property, you must make a DC 20 Charisma saving throw. On a failed save, you gain 1 level of ",
        rules.exhaustion,
        '. If you are not already suffering from ruidium corruption, you become corrupted when you fail this save.',
      ],
      [
        'If Ruidium Is Destroyed. If the Apotheon is killed or redeemed, all the ruidium in Exandria is destroyed instantly, and a ruidium shield becomes a +2 shield.',
      ],
    ],
    effects: [
      {
        key: 'ruidium-exhaustion',
        name: 'Ruidium exhaustion',
        lands: { on: 'failed-save', save: 'cha', dc: 20 },
        text: [
          'On a failed save, you gain 1 level of ',
          rules.exhaustion,
          '. ',
          'If you are not already suffering from ruidium corruption, you become corrupted when you fail this save.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
  teleportation_tablet: {
    name: 'Teleportation Tablet',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "This clay tablet is eight inches long, four inches wide, and half an inch thick. Inscribed on it is the sigil sequence for a permanent teleportation circle. A creature that studies the sequence for 10 minutes can make a DC 21 Intelligence (Arcana) check, learning the circle's destination on a success.",
      ],
      [
        'You can use an action to break the tablet in half, turning it to dust. If the tablet is broken while it is on the same plane of existence as the teleportation circle whose sigil sequence was engraved on it, a 10-foot-diameter teleportation circle of glowing blue light appears on the ground in an unoccupied space you choose within 30 feet of you. This teleportation circle has the characteristics of one created using the teleportation circle spell, except that it connects to the teleportation circle whose sigil sequence appears on the tablet.',
      ],
      ['The teleportation circle created by the tablet disappears at the end of your next turn.'],
    ],
    publication: refs.publications.critical_role_call_of_the_netherdeep,
  },
})

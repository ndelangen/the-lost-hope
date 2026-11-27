import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  amethyst_lodestone: {
    name: 'Amethyst Lodestone',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        "This fist-sized chunk of amethyst is infused with an amethyst dragon's ability to bend gravitational forces. While you are carrying the lodestone, you have advantage on Strength saving throws.",
      ],
      [
        'The lodestone has 6 charges for the following properties, which you can use while you are holding the stone. The stone regains 1d6 expended charges daily at dawn.',
      ],
      [
        'Flight. As a bonus action, you can expend 1 charge to gain the power of flight for 10 minutes. For the duration, you gain a flying speed equal to your walking speed, and you can hover.',
      ],
      [
        'Gravitational Thrust. As an action, you can expend 1 charge to focus gravity around a creature you can see within 60 feet of you. The target must succeed on a DC 18 Strength saving throw or be pushed up to 20 feet in a direction of your choice.',
      ],
      [
        'Reverse Gravity. As an action, you can expend 3 charges to cast reverse gravity from the stone (save DC 18).',
      ],
    ],
    effects: [
      {
        key: 'flight',
        name: 'Flight',
        lands: { on: 'use' },
        text: ['you gain a flying speed equal to your walking speed, and you can hover.'],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  ascendant_dragon_touched_focus: {
    name: 'Ascendant Dragon-Touched Focus',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a spellcaster',
    text: [
      [
        "This wondrous item can be a scepter, an orb, an amulet, a crystal, or another finely crafted object. It typically incorporates imagery of dragons' wings, claws, teeth, or scales.",
      ],
      [
        'You have advantage on initiative rolls. While you are holding the focus, it can function as a spellcasting focus for all your spells.',
      ],
      [
        'The focus gains an additional property determined by the family of the dragon in whose hoard it became Stirring:',
      ],
      [
        "Chromatic. Whenever you use a spell slot to cast a spell that deals acid, cold, fire, lightning, or poison damage, roll a d6, and you gain a bonus equal to the number rolled to one of the spell's damage rolls.",
      ],
      [
        'Gem. Whenever you use a spell slot to cast a spell, you can immediately teleport to an unoccupied space you can see within 15 feet of you.',
      ],
      [
        'Metallic. When a creature you can see within 30 feet of you makes a saving throw, you can use your reaction to give that creature advantage on the saving throw.',
      ],
      [
        "While you are holding a Wakened focus, you can use it to cast certain spells. Once the item is used to cast a given spell, it can't be used to cast that spell again until the next dawn. The spells are determined by the family of the dragon in whose hoard it became Wakened.",
      ],
      ["Chromatic. Hold monster, Rime's binding ice"],
      ["Gem. Rary's telepathic bond, Raulothim's psychic lance"],
      ["Metallic. Fizban's platinum shield, legend lore"],
      [
        "When you cast a spell of 1st level or higher while holding this focus, you can treat the spell as if it were cast using a 9th-level spell slot. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  ascendant_dragon_vessel: {
    name: 'Ascendant Dragon Vessel',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This vessel can be a potion bottle, drinking horn, or other container meant to hold a liquid.',
      ],
      [
        "As a bonus action, if the vessel is empty, you can speak the command word to fill the vessel with one of the following (your choice): ale, olive oil, mead, wine, whiskey, a potion of healing, a potion of greater healing, a potion of superior healing, a potion of supreme healing, a potion of climbing, a potion of fire breath, a potion of flying, or a potion of dragon's majesty. Once this property is used, it can't be used until the next dawn. A potion you create in this way loses its magical properties if it isn't imbibed within 24 hours.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  ascendant_scaled_ornament: {
    name: 'Ascendant Scaled Ornament',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "This ornament can be jewelry, a cloak, or another wearable accessory. It appears to be fashioned from a dragon's scale, tooth, or claw, or it incorporates images in those shapes.",
      ],
      [
        "You gain a +1 bonus to AC, and you can't be ",
        rules.charmed,
        ' or ',
        rules.frightened,
        '. Moreover, each creature of your choice within 30 feet of you has advantage on saving throws it makes to avoid being ',
        rules.charmed,
        ' or ',
        rules.frightened,
        ' or to end those conditions on itself.',
      ],
      [
        "When you would take damage of the type dealt by the breath of the dragon in whose hoard the ornament became Wakened, you can use your reaction to take no damage instead, and you regain hit points equal to the damage you would have taken. Once this property is used, it can't be used again until the next dawn.",
      ],
      [
        'While you are wearing the ornament, you gain a flying speed equal to your walking speed and can hover. While you are flying using this speed, spectral dragon wings appear on your back.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  emerald_pen: {
    name: 'Emerald Pen',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'This pen is tipped with an emerald nib and requires no ink to write. While holding this pen, you can cast illusory script at will, requiring no material components.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  flail_of_tiamat: {
    name: 'Flail of Tiamat',
    category: 'Weapon',
    detail: 'Flail',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'This magic flail is made in the image of Tiamat, with five jagged heads shaped like the heads of five different chromatic dragons. You gain a +3 bonus to attack and damage rolls made with this flail. When you hit with an attack roll using it, the target takes an extra 5d4 damage of your choice of one of the following damage types: acid, cold, fire, lightning, or poison.',
      ],
      [
        "While holding the flail, you can use an action and speak a command word to cause the heads to breathe multicolored flames in a 90-foot cone. Each creature in that area must make a DC 18 Dexterity saving throw. On a failed save, it takes 14d6 damage of one of the following damage types (your choice): acid, cold, fire, lightning, or poison. On a successful save, it takes half as much damage. Once this action is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  gold_canary_figurine_of_wondrous_power: {
    name: 'Gold Canary Figurine of Wondrous Power',
    category: 'Wondrous Item',
    rarity: 'legendary',
    text: [
      [
        "This gold statuette is carved in the likeness of a canary and is small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature in one of two forms (you choose). If there isn't enough space for the creature where it would appear, the figurine doesn't become a creature. The two forms are as follows:",
      ],
      [
        "Giant Canary Form. The figurine becomes a giant canary for up to 8 hours and can be ridden as a mount. Once the figurine has become a giant canary, it can't be used this way again until the next dawn.",
      ],
      [
        "Gold Dragon Form. While you are missing half or more of your hit points, you can speak a different command word and the figurine becomes an adult gold dragon (see its stat block in the Monster Manual) for up to 1 hour. The dragon can't use any legendary actions or lair actions. Once the figurine has become an adult gold dragon, it can't be used this way again until 1 year has passed.",
      ],
      [
        'In either form, the creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.',
      ],
      [
        "The creature exists for a duration specific to each form. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the description.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  platinum_scarf: {
    name: 'Platinum Scarf',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['This scarf is made of sturdy cloth and covered in platinum-colored scales.'],
      [
        'As an action, you can pull a scale from the scarf and speak a command word. When you do so, choose one of the following effects:',
      ],
      [
        'Breath of Life. The scale disappears, and you or a creature you touch regains 10d4 hit points.',
      ],
      [
        'Platinum Shield. For 1 hour or until you dismiss it (no action required), the scale becomes a +1 shield, which you or another creature can use. A creature wielding the shield has immunity to radiant damage.',
      ],
      [
        'Radiant Hammer. For 1 hour or until you dismiss it (no action required), the scale becomes a magic light hammer, which you or another creature can use. The weapon deals 2d4 radiant damage, instead of the bludgeoning damage normal for a light hammer. It deals an extra 2d4 radiant damage to chromatic dragons.',
      ],
      [
        "Once three scales have been pulled from the scarf, no more scales can be removed until the next dawn, when all the missing scales grow back. If you pull off a scale but don't speak a command word, it disappears after 1 minute.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  plus_1_dragonhide_belt: {
    name: '+1 Dragonhide Belt',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a monk',
    text: [
      [
        "This finely detailed belt is made of dragonhide. While wearing it, you gain a +1 bonus to the saving throw DCs of your ki features. In addition, you can use an action to regain ki points equal to a roll of your Martial Arts die. You can't use this action again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  plus_2_dragonhide_belt: {
    name: '+2 Dragonhide Belt',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a monk',
    text: [
      [
        "This finely detailed belt is made of dragonhide. While wearing it, you gain a +2 bonus to the saving throw DCs of your ki features. In addition, you can use an action to regain ki points equal to a roll of your Martial Arts die. You can't use this action again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  plus_3_dragonhide_belt: {
    name: '+3 Dragonhide Belt',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a monk',
    text: [
      [
        "This finely detailed belt is made of dragonhide. While wearing it, you gain a +3 bonus to the saving throw DCs of your ki features. In addition, you can use an action to regain ki points equal to a roll of your Martial Arts die. You can't use this action again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  potion_of_dragons_majesty: {
    name: "Potion of Dragon's Majesty",
    category: 'Potion',
    rarity: 'legendary',
    text: [
      [
        "This potion looks like liquid gold, with a single scale from a chromatic, gem, or metallic dragon suspended in it. When you drink this potion, you transform into an adult dragon of the same kind as the dragon the scale came from. The transformation lasts for 1 hour. Any equipment you are wearing or carrying melds into your new form or falls to the ground (your choice). For the duration, you use the game statistics of the adult dragon instead of your own, but you retain your languages, personality, and memories. You can't use a dragon's Change Shape or its legendary or lair actions.",
      ],
    ],
    effects: [
      {
        key: 'dragon-form',
        name: 'Dragon form',
        lands: { on: 'use' },
        text: [
          'When you drink this potion, you transform into an adult dragon of the same kind as the dragon the scale came from. ',
          "For the duration, you use the game statistics of the adult dragon instead of your own, but you retain your languages, personality, and memories. You can't use a dragon's Change Shape or its legendary or lair actions.",
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  ruby_weave_gem: {
    name: 'Ruby Weave Gem',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a spellcaster',
    text: [
      ['While you are holding this gem, you can use it as a spellcasting focus for your spells.'],
      [
        "The gem has 3 charges and regains all expended charges daily at dawn. When you cast a spell while holding this gem, you can expend up to 3 charges to ignore the spell's material components with a gold piece cost, up to 500 gp per charge expended.",
      ],
      [
        'When you finish a long rest, choose a spell from any class list. The spell you choose must be of a level you can cast. You know the chosen spell and can cast it with your spell slots of the appropriate level until the end of your next long rest.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  sapphire_buckler: {
    name: 'Sapphire Buckler',
    category: 'Shield',
    detail: 'Shield',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        "This crystalline blue shield is fashioned from a sapphire dragon's scale and is created to aid in rooting out the influence of Aberrations. While wielding the shield, you have resistance to psychic and thunder damage. Also, when you take damage from a creature that is within 5 feet of you, you can use your reaction to deal 2d6 thunder damage to that creature.",
      ],
      [
        "As an action, you can use the shield to help you locate Aberrations until the end of your next turn. If any Aberrations are within 1 mile of you, the shield emits a low humming tone for a moment, and you know the direction of all Aberrations within that range. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  slumbering_dragon_touched_focus: {
    name: 'Slumbering Dragon-Touched Focus',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "This wondrous item can be a scepter, an orb, an amulet, a crystal, or another finely crafted object. It typically incorporates imagery of dragons' wings, claws, teeth, or scales.",
      ],
      [
        'You have advantage on initiative rolls. While you are holding the focus, it can function as a spellcasting focus for all your spells.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  slumbering_dragon_vessel: {
    name: 'Slumbering Dragon Vessel',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'This vessel can be a potion bottle, drinking horn, or other container meant to hold a liquid.',
      ],
      [
        "As a bonus action, if the vessel is empty, you can speak the command word to fill the vessel with one of the following (your choice): ale, olive oil, a potion of healing, or a potion of climbing. Once this property is used, it can't be used until the next dawn. A potion you create in this way loses its magical properties if it isn't imbibed within 24 hours.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  slumbering_scaled_ornament: {
    name: 'Slumbering Scaled Ornament',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ornament can be jewelry, a cloak, or another wearable accessory. It appears to be fashioned from a dragon's scale, tooth, or claw, or it incorporates images in those shapes.",
      ],
      [
        'You have advantage on saving throws you make to avoid being ',
        rules.charmed,
        ' or ',
        rules.frightened,
        ' or to end those conditions on you.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  stirring_dragon_touched_focus: {
    name: 'Stirring Dragon-Touched Focus',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a spellcaster',
    text: [
      [
        "This wondrous item can be a scepter, an orb, an amulet, a crystal, or another finely crafted object. It typically incorporates imagery of dragons' wings, claws, teeth, or scales.",
      ],
      [
        'You have advantage on initiative rolls. While you are holding the focus, it can function as a spellcasting focus for all your spells.',
      ],
      [
        'The focus gains an additional property determined by the family of the dragon in whose hoard it became Stirring:',
      ],
      [
        "Chromatic. Whenever you use a spell slot to cast a spell that deals acid, cold, fire, lightning, or poison damage, roll a d6, and you gain a bonus equal to the number rolled to one of the spell's damage rolls.",
      ],
      [
        'Gem. Whenever you use a spell slot to cast a spell, you can immediately teleport to an unoccupied space you can see within 15 feet of you.',
      ],
      [
        'Metallic. When a creature you can see within 30 feet of you makes a saving throw, you can use your reaction to give that creature advantage on the saving throw.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  stirring_dragon_vessel: {
    name: 'Stirring Dragon Vessel',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This vessel can be a potion bottle, drinking horn, or other container meant to hold a liquid.',
      ],
      [
        "As a bonus action, if the vessel is empty, you can speak the command word to fill the vessel with one of the following (your choice): ale, olive oil, mead, a potion of healing, a potion of greater healing, a potion of climbing, or a potion of fire breath. Once this property is used, it can't be used until the next dawn. A potion you create in this way loses its magical properties if it isn't imbibed within 24 hours.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  stirring_scaled_ornament: {
    name: 'Stirring Scaled Ornament',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        "This ornament can be jewelry, a cloak, or another wearable accessory. It appears to be fashioned from a dragon's scale, tooth, or claw, or it incorporates images in those shapes.",
      ],
      [
        "You gain a +1 bonus to AC, and you can't be ",
        rules.charmed,
        ' or ',
        rules.frightened,
        '. Moreover, each creature of your choice within 30 feet of you has advantage on saving throws it makes to avoid being ',
        rules.charmed,
        ' or ',
        rules.frightened,
        ' or to end those conditions on itself.',
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  topaz_annihilator: {
    name: 'Topaz Annihilator',
    category: 'Weapon',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This magic ranged weapon resembles a musket, but in lieu of any ammunition, it holds a glowing yellow scale from a topaz dragon in its heart.',
      ],
      [
        'The weapon has a normal range of 100 feet and a long range of 300 feet, and it has the two-handed property. It deals 2d6 necrotic damage on a hit. If this damage reduces a creature or object to 0 hit points, the target is reduced to dust. A creature reduced to dust can be restored to life only by a true resurrection or wish spell.',
      ],
      [
        "While the weapon is on your person, you can use an action to cast the disintegrate spell (save DC 18). Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  wakened_dragon_touched_focus: {
    name: 'Wakened Dragon-Touched Focus',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a spellcaster',
    text: [
      [
        "This wondrous item can be a scepter, an orb, an amulet, a crystal, or another finely crafted object. It typically incorporates imagery of dragons' wings, claws, teeth, or scales.",
      ],
      [
        'You have advantage on initiative rolls. While you are holding the focus, it can function as a spellcasting focus for all your spells.',
      ],
      [
        'The focus gains an additional property determined by the family of the dragon in whose hoard it became Stirring:',
      ],
      [
        "Chromatic. Whenever you use a spell slot to cast a spell that deals acid, cold, fire, lightning, or poison damage, roll a d6, and you gain a bonus equal to the number rolled to one of the spell's damage rolls.",
      ],
      [
        'Gem. Whenever you use a spell slot to cast a spell, you can immediately teleport to an unoccupied space you can see within 15 feet of you.',
      ],
      [
        'Metallic. When a creature you can see within 30 feet of you makes a saving throw, you can use your reaction to give that creature advantage on the saving throw.',
      ],
      [
        "While you are holding a Wakened focus, you can use it to cast certain spells. Once the item is used to cast a given spell, it can't be used to cast that spell again until the next dawn. The spells are determined by the family of the dragon in whose hoard it became Wakened.",
      ],
      ["Chromatic. Hold monster, Rime's binding ice"],
      ["Gem. Rary's telepathic bond, Raulothim's psychic lance"],
      ["Metallic. Fizban's platinum shield, legend lore"],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  wakened_dragon_vessel: {
    name: 'Wakened Dragon Vessel',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'This vessel can be a potion bottle, drinking horn, or other container meant to hold a liquid.',
      ],
      [
        "As a bonus action, if the vessel is empty, you can speak the command word to fill the vessel with one of the following (your choice): ale, olive oil, mead, wine, a potion of healing, a potion of greater healing, a potion of superior healing, a potion of climbing, a potion of fire breath, or a potion of flying. Once this property is used, it can't be used until the next dawn. A potion you create in this way loses its magical properties if it isn't imbibed within 24 hours.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
  wakened_scaled_ornament: {
    name: 'Wakened Scaled Ornament',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        "This ornament can be jewelry, a cloak, or another wearable accessory. It appears to be fashioned from a dragon's scale, tooth, or claw, or it incorporates images in those shapes.",
      ],
      [
        "You gain a +1 bonus to AC, and you can't be ",
        rules.charmed,
        ' or ',
        rules.frightened,
        '. Moreover, each creature of your choice within 30 feet of you has advantage on saving throws it makes to avoid being ',
        rules.charmed,
        ' or ',
        rules.frightened,
        ' or to end those conditions on itself.',
      ],
      [
        "When you would take damage of the type dealt by the breath of the dragon in whose hoard the ornament became Wakened, you can use your reaction to take no damage instead, and you regain hit points equal to the damage you would have taken. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.fizban_s_treasury_of_dragons,
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  blood_spear: {
    name: 'Blood Spear',
    category: 'Weapon',
    detail: 'Spear',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'Kavan was a ruthless chieftain whose tribe lived in the Balinok Mountains centuries before the arrival of Strahd von Zarovich. Although he was very much alive, Kavan had some traits in common with vampires: he slept during the day and hunted at night, he drank the blood of his prey, and he lived underground. In battle, he wielded a spear stained with blood. His was the first blood spear, a weapon that drains life from those it kills and transfers that life to its wielder, imbuing that individual with the stamina to keep fighting.',
      ],
      [
        'When you hit with a melee attack using this magic spear and reduce the target to 0 hit points, you gain 2d6 temporary hit points.',
      ],
      [
        'Any creature can wield the spear, but only the character chosen by Kavan to wield it gains a +2 bonus to attack and damage rolls made with this magic weapon.',
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  crusaders_shortsword: {
    name: "Crusader's Shortsword",
    category: 'Weapon',
    detail: 'Shortsword',
    rarity: 'unknown',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        "The Crusader's Shortsword is a sentient lawful good +1 shortsword (Intelligence 11, Wisdom 13, Charisma 13). It has hearing and normal vision out to a range of 120 feet. It communicates by transmitting emotion to the creature carrying or wielding it.",
      ],
      ["The sword's purpose is to fight evil. The sword has the following additional properties:"],
      [
        'The sword continually sheds bright light in a 15-foot radius and dim light for an additional 15 feet. Only by destroying the sword can this light be extinguished.',
      ],
      ['A lawful good creature can attune itself to the sword in 1 minute.'],
      [
        "While attuned to the weapon, the sword's wielder can use the sword to cast the crusader's mantle spell. Once used, this property of the sword can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  green_copper_ewer: {
    name: 'Green Copper Ewer',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        "Any poisonous liquid poured into the ewer is instantly transformed into an equal amount of sweet wine. Furthermore, a creature that grasps the ewer's handle can command the ewer to fill with 1 gallon of wine, and it can't produce more wine until the next dawn.",
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  gulthias_staff: {
    name: 'Gulthias Staff',
    category: 'Staff',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'Made from the branch of a Gulthias tree (see the blights entry of the Monster Manual), a Gulthias staff is a spongy, black length of wood. Its evil makes beasts visibly uncomfortable while within 30 feet of it. The staff has 10 charges and regains 1d6 + 4 of its expended charges daily at dusk.',
      ],
      [
        'If the staff is broken or burned to ashes, its wood releases a terrible, inhuman scream that can be heard out to a range of 300 feet. All blights that can hear the scream immediately wither and die.',
      ],
      [
        'Vampiric Strike. The staff can be wielded as a magic quarterstaff. On a hit, it deals damage as a normal quarterstaff, and you can expend 1 charge to regain a number of hit points equal to the damage dealt by the weapon. Each time a charge is spent, red blood oozes from the staff\'s pores, and you must succeed on a DC 12 Wisdom saving throw or be afflicted with short term madness (see "Madness" in chapter 8 of the Dungeon Master\'s Guide).',
      ],
      [
        "Blight Bane. While you are attuned to the staff, blights and other evil plant creatures don't regard you as hostile unless you harm them.",
      ],
    ],
    effects: [
      {
        key: 'short-term-madness',
        name: 'Short-term madness',
        lands: { on: 'failed-save', save: 'wis', dc: 12 },
        text: [
          'you must succeed on a DC 12 Wisdom saving throw or be afflicted with short term madness (see "Madness" in chapter 8 of the Dungeon Master\'s Guide).',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.curse_of_strahd,
  },
  holy_symbol_of_ravenkind: {
    name: 'Holy Symbol of Ravenkind',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a cleric or paladin of good alignment',
    text: [
      [
        "The Holy Symbol of Ravenkind is a unique holy symbol sacred to the good-hearted faithful of Barovia. It predates the establishment of any church in Barovia. According to legend, it was delivered to a paladin named Lugdana by a giant raven—or an angel in the form of a giant raven. Lugdana used the holy symbol to root out and destroy nests of vampires until her death. The high priests of Ravenloft kept and wore the holy symbol after Lugdana's passing.",
      ],
      [
        'The holy symbol is a platinum amulet shaped like the sun, with a large crystal embedded in its center.',
      ],
      [
        'The holy symbol has 10 charges for the following properties. It regains 1d6 + 4 charges daily at dawn.',
      ],
      [
        'Hold Vampires. As an action, you can expend 1 charge and present the holy symbol to make it flare with holy power. Vampires and vampire spawn within 30 feet of the holy symbol when it flares must make a DC 15 Wisdom saving throw. On a failed save, a target is ',
        rules.paralyzed,
        ' for 1 minute. It can repeat the saving throw at the end of its turns to end the effect on itself.',
      ],
      [
        'Turn Undead. If you have the Turn Undead or the Turn the Unholy feature, you can expend 3 charges when you present the holy symbol while using that feature. When you do so, undead have disadvantage on their saving throws against the effect.',
      ],
      [
        'Sunlight. As an action, you can expend 5 charges while presenting the holy symbol to make it shed bright light in a 30-foot radius and dim light for an additional 30 feet. The light is sunlight and lasts for 10 minutes or until you end the effect (no action required).',
      ],
    ],
    effects: [
      {
        key: 'held-vampire',
        name: 'Hold Vampires',
        lands: { on: 'failed-save', save: 'wis', dc: 15 },
        conditions: [rules.paralyzed],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.curse_of_strahd,
  },
  icon_of_ravenloft: {
    name: 'Icon of Ravenloft',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a creature of good alignment',
    text: [
      ['Weight · 10 lb'],
      [
        'The Icon of Ravenloft is a 12-inch tall statuette made of the purest silver, weighing 10 pounds. It depicts a cleric kneeling in supplication.',
      ],
      [
        'The icon was given to Strahd by the archpriest Ciril Romulich, an old family friend, to consecrate the castle and its chapel.',
      ],
      [
        'While within 30 feet of the icon, a creature is under the effect of a protection from evil and good spell against fiends and undead. Only a creature attuned to the icon can use its other properties.',
      ],
      [
        "Augury. You can use an action to cast an augury spell from the icon, with no material components required. Once used, this property can't be used again until the next dawn.",
      ],
      [
        'Bane of the Undead. You can use the icon as a holy symbol while using the Turn Undead or Turn the Unholy feature. If you do so, increase the save DC by 2.',
      ],
      [
        "Cure Wounds. While holding the icon, you can take an action to heal one creature that you can see within 30 feet of you. The target regains 3d8 + 3 hit points, unless it is an undead, a construct, or a fiend. Once used, this property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  saint_markovias_thighbone: {
    name: "Saint Markovia's Thighbone",
    category: 'Weapon',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        "Saint Markovia's thighbone has the properties of a mace of disruption. If it scores one or more hits against a vampire or a vampire spawn in the course of a single battle, the thighbone crumbles into dust once the battle concludes.",
      ],
      [
        'As a youth, Markovia followed her heart and became a priest of the Morninglord soon after her eighteenth birthday. She proved to be a charismatic proselytizer and, before the age of thirty, had gained a reputation for allowing no evil to stand before her.',
      ],
      [
        'Markovia had long considered Strahd a mad tyrant, but only after his transformation into a vampire did she dare to challenge him. As she rallied her followers and prepared to march on Castle Ravenloft, Strahd sent a group of vampire spawn to her abbey. They confronted Markovia and were destroyed to a one.',
      ],
      [
        'Suffused with confidence born of a righteous victory, Markovia advanced on Castle Ravenloft. A great battle raged from the catacombs to the parapets. In the end, Markovia never returned to Barovia, and Strahd long afterward walked with a limp and a grimace of pain. It is said that he trapped Markovia in a crypt beneath his castle, and her remains linger there yet.',
      ],
      [
        "The essence of Markovia's saintliness passed partly into her bones as the rest of her body decomposed. Her remaining thighbone is imbued with power that inflicts grievous injury on the undead.",
      ],
      [
        'Mace of Disruption. When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes ',
        rules.frightened,
        ' of you until the end of your next turn.',
      ],
      [
        'While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.',
      ],
    ],
    effects: [
      {
        key: 'frightened',
        name: 'Frightened',
        lands: { on: 'hit' },
        conditions: [rules.frightened],
        text: [
          'On a successful save, the creature becomes ',
          rules.frightened,
          ' of you until the end of your next turn.',
        ],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.curse_of_strahd,
  },
  shield_of_the_silver_dragon: {
    name: 'Shield of the Silver Dragon',
    category: 'Shield',
    rarity: 'rare',
    text: [
      ['Weight · 6 lb'],
      [
        "While holding this shield, you have a +2 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
      ],
      [
        "The shield is emblazoned with a stylized silver dragon that is the emblem of the Order of the Silver Dragon (see Curse of Strahd, chapter 7). The shield whispers warnings to its bearer, granting a +2 bonus to initiative if the bearer isn't ",
        rules.incapacitated,
        '.',
      ],
      [
        'A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time.',
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  statuette_of_saint_markovia: {
    name: 'Statuette of Saint Markovia',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'This golden statuette grants any good-aligned creature that carries it a +1 bonus to saving throws.',
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  sunsword: {
    name: 'Sunsword',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        "The Sunsword is a unique blade once possessed by Strahd's brother, Sergei von Zarovich. In its original form, it had a platinum hilt and guard, and a thin crystal blade as strong as steel.",
      ],
      [
        "Strahd employed a powerful wizard named Khazan to destroy the weapon after Sergei's death. The first part of the process required the hilt and the blade to be separated, which Khazan accomplished. While Khazan was busying himself destroying the blade, his apprentice stole the hilt and fled. Khazan later located his apprentice's mutilated corpse in the Svalich Woods, but the hilt was nowhere to be found. To avoid the vampire's wrath, Khazan told Strahd that the entire weapon had been destroyed.",
      ],
      [
        'The hilt, which is sentient, knows that it can never be reunited with its original crystal blade. It has, however, gained the properties of a sun blade:',
      ],
      [
        'While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the Sunsword.',
      ],
      [
        'You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.',
      ],
      [
        "The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
      ],
      [
        'Sentience. The Sunsword is a sentient chaotic good weapon with an Intelligence of 11, a Wisdom of 17, and a Charisma of 16. It has hearing and normal vision out to a range of 60 feet. The weapon communicates by transmitting emotions to the creature carrying it or wielding it.',
      ],
      [
        "Personality. The Sunsword's special purpose is to destroy Strahd, not so much because it wants to free the land of Barovia from evil but because it wants revenge for the loss of its crystal blade. The weapon secretly fears its own destruction.",
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
  yester_hill_axe: {
    name: 'Yester Hill Axe',
    category: 'Weapon',
    detail: 'Battleaxe',
    rarity: 'unknown',
    text: [
      ['Weight · 2 lb'],
      [
        "The axe's handle is carved with leaves and vines, and it weighs half as much as a normal battleaxe. When the axe hits a plant, whether an ordinary plant or a plant creature, the target takes an extra 1d8 slashing damage. When a creature of non-good alignment wields the axe, it sprouts thorns whenever its wielder makes an attack with it. These thorns prick the wielder for 1 piercing damage after the attack is made, and this damage is considered magical.",
      ],
    ],
    publication: refs.publications.curse_of_strahd,
  },
})

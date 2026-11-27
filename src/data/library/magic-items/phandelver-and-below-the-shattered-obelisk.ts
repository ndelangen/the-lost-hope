import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  bracers_of_celerity: {
    name: 'Bracers of Celerity',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This pair of lightweight bronze bracers is lined with soft, purple velvet and engraved with swirling designs.',
      ],
      [
        "While you're wearing these bracers, all your speeds increase by 10 feet, and you have advantage on saving throws you make to avoid or end the paralyzed or restrained condition on yourself.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  cape_of_enlargement: {
    name: 'Cape of Enlargement',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Ancient runes are stitched in silver thread along the hem of this grayish-purple cape.'],
      [
        'The cape has 3 charges. As a bonus action while wearing the cape, you can expend 1 of its charges to enlarge yourself, granting yourself the following benefits:',
      ],
      [
        "Your size increases by one category—from Medium to Large, for example. If there isn't enough room for your size to increase by one category, you instead become the maximum possible size in the space available.",
      ],
      ['You have advantage on Strength checks and Strength saving throws.'],
      [
        "When you hit with an attack roll using a weapon or an unarmed strike, you can add your proficiency bonus to the attack's damage.",
      ],
      [
        'These benefits last for 10 minutes or until you use another bonus action to dismiss them. The cape regains 1d3 expended charges daily at dawn.',
      ],
    ],
    effects: [
      {
        key: 'enlarged',
        name: 'Enlarged',
        lands: { on: 'use' },
        text: [
          'Your size increases by one category—from Medium to Large, for example.',
          ' You have advantage on Strength checks and Strength saving throws.',
          " When you hit with an attack roll using a weapon or an unarmed strike, you can add your proficiency bonus to the attack's damage.",
        ],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  dragonguard_phandelver_and_below_the_shattered_obelisk: {
    name: 'Dragonguard',
    category: 'Armor',
    detail: 'Breastplate',
    rarity: 'rare',
    text: [
      ['Weight · 20 lb'],
      ['You have a +1 bonus to AC while wearing this armor.'],
      [
        'This breastplate has a gold dragon motif worked into its design. Created for a human hero of old Neverwinter named Tergon, it grants its wearer advantage on saving throws against the breath weapons of Dragons.',
      ],
      [
        "This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good protection for the wearer's vital organs while leaving the wearer relatively unencumbered.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  flayer_slayer: {
    name: 'Flayer Slayer',
    category: 'Weapon',
    detail: 'Greataxe',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 7 lb'],
      [
        "Carvings of decapitated mind flayers adorn this greataxe's metal blade. You gain a +1 bonus to attack and damage rolls made with this greataxe.",
      ],
      [
        'An Aberration hit with this greataxe takes an extra 1d12 slashing damage. If the Aberration is currently grappling a creature, the Aberration must succeed on a DC 15 Strength saving throw or release each creature it is grappling.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  hew_phandelver_and_below_the_shattered_obelisk: {
    name: 'Hew',
    category: 'Weapon',
    detail: 'Battleaxe',
    rarity: 'uncommon',
    text: [
      ['Weight · 4 lb'],
      ['You have a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "Hew is a +1 battleaxe that deals maximum damage when the wielder attacks a Plant creature or an object made of wood. The axe's creator used it for protection in the forest while he cut firewood.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  lightbringer_phandelver_and_below_the_shattered_obelisk: {
    name: 'Lightbringer',
    category: 'Weapon',
    detail: 'Mace',
    rarity: 'uncommon',
    text: [
      ['Weight · 4 lb'],
      ['You have a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        'This weapon, known as Lightbringer, was made for a cleric of Lathander, the god of dawn. The head of the mace is shaped like a sunburst and is made of solid brass. The mace glows as bright as a torch when its wielder commands. While glowing, the mace deals an extra 1d6 radiant damage to Undead creatures.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  luminous_war_pick: {
    name: 'Luminous War Pick',
    category: 'Weapon',
    detail: 'War Pick',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'The haft of this war pick is inlaid with crushed pearlescent stones that imbue the weapon with a faint luminescence. You gain a +1 bonus to attack and damage rolls made with this war pick.',
      ],
      [
        "While wielding the war pick, you can use a bonus action to cast the daylight spell, choosing a point on the war pick. Once you use this bonus action, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_careful: {
    name: 'Mind Crystal (Careful)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      [
        'Modify Spell. Choose up to three creatures affected by the spell. The chosen creatures automatically succeed on their saving throws against the spell.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_distant: {
    name: 'Mind Crystal (Distant)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      [
        "Modify Spell. If the spell has a range of 5 feet or more and doesn't have a range of self, the spell's range increases by 100 feet. If the spell has a range of touch, its range becomes 30 feet.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_empowered: {
    name: 'Mind Crystal (Empowered)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      [
        'Modify Spell. When you roll damage for the spell, you can reroll up to three damage dice. You must use the new rolls.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_extended: {
    name: 'Mind Crystal (Extended)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      [
        "Modify Spell. If the spell has a duration of 1 minute or longer, double the spell's duration, to a maximum duration of 24 hours.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_heightened: {
    name: 'Mind Crystal (Heightened)',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      [
        'Modify Spell. Choose one creature affected by the spell. That creature has disadvantage on the first saving throw it makes against the spell.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_quickened: {
    name: 'Mind Crystal (Quickened)',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      ["Modify Spell. You change the spell's casting time to 1 bonus action for this casting."],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mind_crystal_subtle: {
    name: 'Mind Crystal (Subtle)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['This gemstone contains a crystallized bit of spellcasting magic.'],
      [
        "When you cast a spell that has a casting time of 1 action while holding the mind crystal, you can modify the spell in the way described below. You can use only a single mind crystal to modify the spell, and you can't use a mind crystal and a Metamagic option on the same spell. Once you use the mind crystal, it becomes a nonmagical gem worth 50 gp.",
      ],
      [
        'Modify Spell. You cast the spell without any somatic or verbal components for this casting.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mindblasting_cap: {
    name: 'Mindblasting Cap',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['This soft, violet cap bears stitching in the pattern of folds on a brain.'],
      [
        'As a bonus action while wearing the cap, you can project psychic energy in a 60-foot cone. Each creature in that area must make a DC 15 Intelligence saving throw. On a failed save, a creature takes 5d8 psychic damage and has the stunned condition for 1 minute. On a successful save, the creature takes half as much damage only. At the end of each of its turns, a stunned creature can repeat the saving throw, ending the stunned condition on itself on a success.',
      ],
      ["Once this bonus action is used, it can't be used again until the next dawn."],
    ],
    effects: [
      {
        key: 'stunned',
        name: 'Stunned',
        lands: { on: 'failed-save', save: 'int', dc: 15 },
        conditions: [rules.stunned],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mindguard_crown: {
    name: 'Mindguard Crown',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'While you wear this adamantine crown, you have advantage on Intelligence, Wisdom, and Charisma saving throws, and you have resistance to psychic damage.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  mudslick_tower: {
    name: 'Mudslick Tower',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'You can use an action to place this 1-inch-diameter granite sphere on the ground and speak its command word, which is "petrification" in Terran. The sphere rapidly grows into a stout tower that remains until you use an action to touch the tower and speak the command word again, whereupon the tower shrinks back to a 1-inch-diameter granite sphere. The tower must be empty to shrink in this way. The tower bristles with muddy knobs that constantly extrude and retract across its surface, as though the tower were breathing through a coating of thick mud.',
      ],
      [
        "Each creature in the area where the tower appears must make a DC 15 Dexterity saving throw, taking 10d10 bludgeoning damage on a failed save, or half as much damage on a successful one. In either case, the creature is pushed to an unoccupied space outside but next to the tower. Objects in the area that aren't being worn or carried take this damage and are pushed automatically.",
      ],
      [
        'Whenever it expands, the mudslick tower merges with any natural stone it touches, awkwardly tipping and wedging itself to touch as much natural stone as it can.',
      ],
      [
        'The tower is 20 feet on a side and 30 feet high, with arrow slits on all sides and a battlement atop it. Its interior is divided into two floors, with a ladder running along one wall to connect them. The ladder ends at a trapdoor leading to the roof. When activated, the tower has a small door on the side facing you. The door opens only at your command, which you can speak as a bonus action. It is immune to the knock spell and similar magic, such as that of a chime of opening.',
      ],
      [
        'Although it looks like stone, the tower is made of adamantine, and its magic prevents creatures from tipping it over. The roof, the door, and the walls each have 100 hit points, immunity to damage from nonmagical weapons excluding siege weapons, and resistance to all other damage. While merged with natural stone, the mudslick tower has immunity to all damage. Only a wish spell can repair the tower (this use of the spell counts as replicating a spell of 8th level or lower). Each casting of wish causes the roof, the door, or one wall to regain 50 hit points.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  netherese_ring_of_protection: {
    name: 'Netherese Ring of Protection',
    category: 'Ring',
    rarity: 'rare',
    attunement: true,
    text: [
      ['You gain a +1 bonus to AC and saving throws while wearing this ring.'],
      [
        "The ring is made from a single piece of mystical green glass that's stronger than steel. It has the added property of making the wearer less likely to drop or lose anything held in the hand the ring is on. The wearer receives a +4 bonus to saving throws or checks made to avoid dropping or being disarmed of any item held in that hand.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  potion_of_psionic_fortitude: {
    name: 'Potion of Psionic Fortitude',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        'When you drink this potion, you have advantage for 1 hour on saving throws you make to avoid or end the charmed or stunned condition on yourself.',
      ],
      ['This black potion swirls with shimmering flecks of pink and purple.'],
    ],
    effects: [
      {
        key: 'psionic-fortitude',
        name: 'Psionic fortitude',
        lands: { on: 'use' },
        text: [
          'When you drink this potion, you have advantage for 1 hour on saving throws you make to avoid or end the charmed or stunned condition on yourself.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  ring_of_the_orator: {
    name: 'Ring of the Orator',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring has 6 charges. While you wear it, you can expend 1 of its charges to project your voice to be heard clearly by all creatures within 1 mile of yourself, regardless of intervening noise, for 1 minute. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks this projection. If you project your voice while speaking a language the listening creatures don't understand, you can make the creatures understand what you're saying. You must be able to see the creatures to make them understand. The ring regains 1d6 expended charges daily at dawn.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  spider_staff_phandelver_and_below_the_shattered_obelisk: {
    name: 'Spider Staff',
    category: 'Staff',
    rarity: 'rare',
    attunement: 'by a bard, sorcerer, warlock, or wizard',
    text: [
      ['Weight · 4 lb'],
      [
        'The top of this magic quarterstaff is shaped like a spider. It deals an extra 1d6 poison damage on a hit when used to make a weapon attack.',
      ],
      [
        'Spells. The staff has 10 charges. While holding it, you can expend the requisite number of charges to cast one of the following spells from the staff: spider climb (1 charge) or web (2 charges; spell save DC 15).',
      ],
      [
        "The staff regains 1d6 + 4 expended charges daily at dusk. If you expend the staff's last charge, roll a d20. On a 1, the staff crumbles to dust and is destroyed.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  staff_of_defense_phandelver_and_below_the_shattered_obelisk: {
    name: 'Staff of Defense',
    category: 'Staff',
    rarity: 'rare',
    attunement: 'by a bard, sorcerer, warlock, or wizard',
    text: [
      ['Weight · 3 lb'],
      [
        'This slender, hollow staff is made of glass yet is as strong as oak. It weighs 3 pounds. While holding the staff, you have a +1 bonus to your Armor Class.',
      ],
      [
        'Spells. The staff has 10 charges. While holding it, you can expend the requisite number of charges to cast one of the following spells from the staff: mage armor (1 charge) or shield (2 charges).',
      ],
      [
        "The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the staff's last charge, roll a d20. On a 1, the staff shatters and is destroyed.",
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
  statuette_of_augury: {
    name: 'Statuette of Augury',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'This gold statuette of an elf is worth 100 gp, and is imbued with divination magic. A non-evil creature grasping the statue can ask it a question and receive a telepathic response, as though the creature had cast augury. Once a creature has asked its question and received a response, it can never activate the statuette again.',
      ],
    ],
    publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createSpells } from '#/definitions/library.ts'

const { rules } = campaignRefs

/** Spells from Spells That Don't Suck (Somanyrobots), via Open5e. */
export default createSpells({
  adaptation: {
    name: 'Adaptation',
    level: 2,
    school: 'transmutation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S',
    duration: '1 hour',
    text: [
      [
        'You touch a creature, modifying it for a specific environment. The target chooses one of the following options for the duration. It can end one option as an action to gain the benefits of a different one. The spell ends if you cast it again or dismiss it as an action.',
      ],
      [
        '• The creature grows gills and webbing between its digits. It can breathe underwater and gains a swimming speed equal to its walking speed.',
      ],
      [
        '• The creature grows a membrane between its limbs. When the creature falls, it can use its reaction to subtract up to 100 feet from the fall when calculating falling damage and can glide horizontally a number of feet equal to its walking speed.',
      ],
      [
        '• The creature grows a prehensile tail. The tail has a 5-foot reach and can lift a number of pounds equal to five times the creature’s Strength score. It can grasp, lift, drop, hold, push, or pull an object or a creature, open or close a door or a container, grapple someone, or make an unarmed strike.',
      ],
      [
        '• The creature’s appearance changes. For the duration, it can use an action to change its height, weight, facial features, voice, hair length and coloration, and distinguishing characteristics. It cannot change its size or number of limbs.',
      ],
      [
        '• The creature grows a natural weapon. Unarmed strikes with the weapon deal 1d6 bludgeoning, piercing, or slashing damage as appropriate. The natural weapon is magical and has a +1 bonus to its attack and damage rolls.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the natural weapon’s bonus increases to +2. When you use a spell slot of 6th level or higher, the natural weapon’s bonus increases to +3. Additionally, the target can select one additional option for every two slot levels above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  alter_weather: {
    name: 'Alter Weather',
    level: 6,
    school: 'transmutation',
    classes: ['Cleric', 'Druid', 'Wizard'],
    castingTime: 'Action',
    range: 'Self (1-mile radius)',
    components: 'V, S, M (a silver dish and a glass tube filled with quicksilver)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You seize the air currents above you, taking control of the local weather. You must have clear sight of the sky to cast this spell, and the spell ends early if you end your turn unable to see it.',
      ],
      [
        'When you cast the spell, you can choose to shift the precipitation, temperature, and wind each by one stage on the charts below. It takes 30 minutes for the conditions to change, after which you can change them again. The charts suggest weather effects, and your GM may determine any additional effects resulting from the change in weather. Your GM may rule that fire or cold resistance, hot or cold weather gear, or other measures partly or completely protect a creature against the effects. After the spell ends, the weather returns to its original state, changing at the same rate. The spell ends if you cast it again or dismiss it as an action.',
      ],
      ['Precipitation'],
      [
        'Higher stages include all the effects of lower stages. <table> <thead><tr> <th>Stage</th> <th>Condition</th> <th>Effects</th> </tr></thead> <tbody> <tr> <td>1</td> <td>Clear</td> <td>—</td> </tr> <tr> <td>2</td> <td>Light clouds</td> <td>—</td> </tr> <tr> <td>3</td> <td>Overcast or ground fog</td> <td>The area lacks sunlight, for effects or traits dependent on it.</td> </tr> <tr> <td>4</td> <td>Rain, hail, or snow</td> <td>Objects and creatures are lightly obscured more than 60 feet away.</td> </tr> <tr> <td>5</td> <td>Torrential rain, driving hail, or blizzard</td> <td>Objects and creatures are heavily obscured more than 30 feet away, and all terrain is difficult terrain.</td> </tr> </tbody> </table> <h5>Temperature</h5> Stage 1 includes the effects of stage 2, and stage 7 includes the effects of stage 6. <table> <thead><tr> <th>Stage</th> <th>Condition</th> <th>Effects</th> </tr></thead> <tbody> <tr> <td>1</td> <td>Unbearable heat</td> <td>All creatures must make a DC 10 Constitution saving throw every hour or suffer one level of exhaustion.</td> </tr> <tr> <td>2</td> <td>Hot</td> <td>All creatures suffer disadvantage on all Constitution saves except against weather effects.</td> </tr> <tr> <td>3</td> <td>Warm</td> <td>—</td> </tr> <tr> <td>4</td> <td>Pleasant</td> <td>—</td> </tr> <tr> <td>5</td> <td>Cool</td> <td>—</td> </tr> <tr> <td>6</td> <td>Cold</td> <td>All creatures suffer disadvantage on Dexterity checks.</td> </tr> <tr> <td>7</td> <td>Bitter cold</td> <td>All creatures must make a DC 10 Constitution saving throw every hour or suffer one level of exhaustion.</td> </tr> </tbody> </table> <h5>Wind</h5> Higher stages include all the effects of lower stages. <table> <thead><tr> <th>Stage</th> <th>Condition</th> <th>Effects</th> </tr></thead> <tbody> <tr> <td>1</td> <td>Calm</td> <td>—</td> </tr> <tr> <td>2</td> <td>Moderate wind</td> <td>—</td> </tr> <tr> <td>3</td> <td>Strong wind</td> <td>Ranged attacks are made at disadvantage.</td> </tr> <tr> <td>4</td> <td>Gale</td> <td>All creatures have resistance to damage from ranged attacks.</td> </tr> <tr> <td>5</td> <td>Hurricane</td> <td>Ranged attacks are impossible, and all movement against the wind costs twice as much.</td> </tr> </tbody> </table> <em><strong>At Higher Levels.</strong></em> When you cast this spell using a spell slot of 7th level, the duration is 8 hours, and the area increases to a 5-mile radius. When you cast this spell using a spell slot of 8th level, the duration is 24 hours, and the area increases to a 10-mile radius. When you cast this spell using a spell slot of 9th level, the duration is 7 days, and the area increases to a 25-mile radius.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  animal_ally: {
    name: 'Animal Ally',
    level: 2,
    school: 'enchantment',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S, M (a biscuit baked out of meat and grain)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You connect your mind to that of a friendly beast within range. You can use your action to use its senses instead of your own until the start of your next turn. While the beast is within 120 feet of you, you and the beast can communicate telepathically, and the beast gains the following benefits:',
      ],
      ['• The beast can add your proficiency bonus to all of its ability checks.'],
      ['• The beast deals an extra 1d6 damage to a target whenever it hits with an attack'],
      [
        '• The beast has advantage on attack rolls against any creature you have attacked since the start of your last turn.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the spell’s duration increases to 8 hours. When you cast this spell using a spell slot of 6th level or higher, the spell’s duration increases to 24 hours.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  animal_transformation: {
    name: 'Animal Transformation',
    level: 4,
    school: 'transmutation',
    classes: ['Bard', 'Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a lump of clay)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You gesture at a creature you can see within range, magically molding them into a new form. The spell has no effect on a creature with 0 hit points. An unwilling creature must make a Charisma saving throw or be transformed. At the end of each of its turns, an affected target can repeat the save, ending the spell on a success.',
      ],
      [
        'The transformation lasts for the duration, or until the target drops to 0 hit points. The new form can be any beast whose challenge rating is equal to or less than the target’s challenge rating or level, but no greater than 4. The target’s game statistics are replaced by the statistics of the chosen beast. It retains its alignment, personality, allegiances, and broad plan of action.',
      ],
      [
        'The target assumes the hit points of its new form. When it reverts to its normal form, the creature returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form.',
      ],
      [
        'The creature is limited in the actions it can perform by the nature of its new form, and it can’t speak, cast spells, or take any other action that requires hands or speech. Its items meld into the new form, and the creature can’t activate, use, wield, or otherwise benefit from any of it.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the new form’s maximum challenge rating increases by 1 for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'beast-form',
        name: 'Beast form',
        lands: { on: 'failed-save', save: 'cha' },
        text: [
          'The target’s game statistics are replaced by the statistics of the chosen beast. ',
          'The creature is limited in the actions it can perform by the nature of its new form, and it can’t speak, cast spells, or take any other action that requires hands or speech.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  arcane_shelter: {
    name: 'Arcane Shelter',
    level: 3,
    school: 'abjuration',
    classes: ['Bard', 'Wizard'],
    castingTime: '1 minute or Ritual',
    range: 'Self (10-foot dome)',
    components: 'V, S, M (a flake of tortoise shell)',
    duration: '8 hours',
    text: [
      [
        'You construct a 10-foot radius dome of arcane energy, centered on yourself. The dome is stationary and disappears if you exit its area. If you cast it in a location without enough space to accommodate it, the spell fails.',
      ],
      [
        'Ten Medium creatures can fit inside the dome; a Large creature takes as much space as four Medium creatures. You can designate up to ten creatures when you cast the spell who can freely pass in and out of the dome, spending 25 feet of movement to move through the dome. Other creatures cannot pass through.',
      ],
      [
        'The dome is translucent, with only vague shapes visible through it. Projectiles that touch the dome are slowed to a stop, and spells and other magical effects can’t pass through the dome or be cast through it.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  arcane_wall: {
    name: 'Arcane Wall',
    level: 5,
    school: 'evocation',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a pinch of powdered gemstone)',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'An invisible wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick. It lasts for the duration. If the wall cuts through a creature’s space when it appears, the creature is pushed to one side of the wall (your choice which side).',
      ],
      [
        'Nothing can physically pass through the wall. Each panel has AC 15 and 100 hit points. The wall can’t be dispelled by dispel magic, and is immune to psychic and nonmagical bludgeoning, piercing, and slashing damage. A disintegrate spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane, blocking ethereal travel through the wall.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  arcanists_sword: {
    name: "Arcanist's Sword",
    level: 7,
    school: 'conjuration',
    classes: ['Bard', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components:
      'V, S, M (a miniature platinum sword with a grip and pommel of copper and zinc, worth 250 gp)',
    duration: '1 minute',
    text: [
      [
        'You create a glowing sword-shaped plane of force that hovers within range for the duration. When the sword appears and as a bonus action on subsequent turns, you can give the sword one of the following commands.',
      ],
      [
        '• Attack. The sword moves up to 20 feet toward a creature and makes a melee spell attack against it. On a hit, the target takes force damage equal to 3d10 + your spellcasting ability modifier.',
      ],
      [
        '• Guard. The sword moves up to 20 feet into a creature’s space and grants the creature half cover as it attempts to deflect incoming attacks. The first time a hostile creature comes within 5 feet of the sword, the sword makes a melee spell attack against that creature. On a hit, the target takes force damage equal to 3d10 + your spellcasting ability modifier. The sword cannot attack again until you command it again.',
      ],
      [
        '• Whirl. The sword moves up to 20 feet toward a point and then begins to spin in a deadly whirl. A creature that starts in the sword’s space or passes within 5 feet of the sword on its turn must succeed on a Dexterity saving throw or take 3d10 force damage.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  arctic_breath: {
    name: 'Arctic Breath',
    level: 1,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'A line of freezing arctic wind 30 feet long and 5 feet wide blasts out from you in a direction of your choice. Each creature in the line must make a Dexterity saving throw.',
      ],
      [
        'On a failure, a creature takes 2d8 cold damage and its speed is reduced by 10 feet until the end of its next turn. On a success, a creature takes half as much damage and isn’t slowed.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  assemble: {
    name: 'Assemble',
    level: 4,
    school: 'transmutation',
    classes: ['Wizard'],
    castingTime: '1 minute',
    range: '120 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You magically assemble unfinished materials you can see within range that are not being worn or carried into products. With enough unfinished material, you can assemble up to eight nonmagical objects. A Large object (contained within a 10-foot cube, or eight connected 5-foot cubes) counts as eight, a Medium or Small object as one, and a Tiny object as one-eighth. The object cannot be securely attached to a surface or a larger object, and if you are working with metal or stone, the assembled object can be no larger than Medium. Unfinished materials can be raw (freshly felled trees or mined ores) or partlyworked (wooden boards or metal ingots), but cannot be finished goods (a constructed building or suit of armor). Examples include:',
      ],
      ['• Metals and alloys (such as bronze, iron, or silver)'],
      ['• Organic byproducts (such as canvas, silk, or wool)'],
      ['• Plant matter (such as flax, hemp, or oak)'],
      ['• Stone (such as granite, marble, or sandstone)'],
      [
        'You cannot affect creatures or magic items, and you must have proficiency in the appropriate set of artisan’s tools to create items of commensurate craftsmanship. For this type of artisanal crafting, the spell completes the equivalent of eight hours’ work, which can be part of a longer-term project.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  aura_of_concealment: {
    name: 'Aura of Concealment',
    level: 2,
    school: 'abjuration',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a pinch of ash and a cotton bud)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You radiate concealing magic in an aura with a 30-foot radius, making you and your allies more difficult to detect. Until the spell ends, whenever you or a creature you choose within 30 feet of you must make a Dexterity (Stealth) check, the creature may add a +5 bonus. A chosen creature leaves no trace of its passage and cannot be tracked except by magical means.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  aura_of_truth: {
    name: 'Aura of Truth',
    level: 2,
    school: 'enchantment',
    classes: ['Bard', 'Cleric', 'Paladin'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You radiate a compulsion for honesty in an aura with a 15-foot radius. Until the spell ends, the aura moves with you, centered on you. The first time a creature ends its turn within the area, it must make a Charisma saving throw. On a failed save, it cannot intentionally lie while in the aura. A creature can choose to fail its save, and you know if a creature succeeds or fails. An affected creature is aware of the spell and can answer evasively.',
      ],
      [
        'As an action, you can focus the spell to compel answers. You may ask up to two yes-or-no questions, each directed at an affected creature, who must answer truthfully. The spell then ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the aura’s radius increases by 5 feet for each slot level above 2nd. Additionally, the number of compelled questions you can ask increases by 1 for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'truthful',
        name: 'Compelled honesty',
        lands: { on: 'failed-save', save: 'cha' },
        text: ['it cannot intentionally lie while in the aura'],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  beast_perception: {
    name: 'Beast Perception',
    level: 2,
    school: 'divination',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: 'Self',
    components: 'S, M (a tuft of fur, feathers, or dried skin of the beast the spell mimics))',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.',
      ],
      ['• Darkvision. You gain darkvision out to 30 feet.'],
      [
        '• Echolocation. You gain blindsight out to 10 feet, but only if you continuously make high-pitched sounds, preventing you from speaking normally while you do. Your squeaking can be heard from up to 60 feet away.',
      ],
      ['• Keen Hearing. You have advantage on Wisdom (Perception) checks that rely on hearing.'],
      ['• Keen Sight. You have advantage on Wisdom (Perception) checks that rely on sight.'],
      ['• Keen Smell. You have advantage on Wisdom (Perception) checks that rely on smell.'],
      ['• Tremorsense. You gain tremorsense out to 30 feet.'],
      [
        '• Websense. While in contact with a web, you know the exact location of any other creature in contact with the same web.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  befriend: {
    name: 'Befriend',
    level: 0,
    school: 'enchantment',
    classes: ['Bard', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: '1 minute',
    range: '30 ft',
    components: 'S, M (1 copper piece, which the spell consumes)',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You ensorcel one creature you can see within range, compelling them to like and trust you. For the duration, you have advantage on Charisma (Persuasion) or Charisma (Deception) checks to interact with the target. Afterward, the target is aware you magically influenced it, and becomes hostile toward you. A violent creature might attack you, while others might spread word of your treachery, summon the authorities, or otherwise attempt to thwart you.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  befriend_beast: {
    name: 'Befriend Beast',
    level: 1,
    school: 'enchantment',
    classes: ['Bard', 'Druid', 'Ranger'],
    castingTime: 'Action or Ritual',
    range: '30 ft',
    components: 'V, S, M (a biscuit baked out of meat and grain)',
    duration: '1 hour',
    text: [
      [
        'You magically persuade a beast that you are a trusted ally. Choose a beast that you can see within range, which must be able to see and hear you. The beast must succeed on a Wisdom saving throw or be charmed by you for the spell’s duration. Beasts with Intelligence 4 or higher automatically succeed. If you or one of your companions harms the target, the spell ends.',
      ],
      [
        'While charmed in this way, the beast is willing to perform simple tasks on your behalf, including scouting locations, finding things, or delivering objects. If asked to deliver a message, it can understand locations and a general description of a target, though it cannot reliably find an individual. A beast delivering a message typically covers 1 mile per hour walking, or 2 miles per hour if it can fly.',
      ],
      [
        'At Higher Levels. If you cast this spell using a spell slot of 2nd level, the duration of the spell increases to 24 hours. If you use a spell slot of 3rd level or higher, you can either increase the duration by another 24 hours for each slot level above 2nd or affect one additional beast for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'charmed',
        name: 'Charmed',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.charmed],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  benediction_spells_that_dont_suck: {
    name: 'Benediction',
    level: 0,
    school: 'divination',
    classes: ['Cleric', 'Druid'],
    castingTime: '1 minute',
    range: '30 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'Magic enhances your words as you advise one creature that can see and understand you within range. Once before the spell ends, the target can roll a 1d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.',
      ],
      [
        'A creature with 4 Intelligence or higher that perceives your spellcasting is aware of its magical influence and responds accordingly.',
      ],
      [
        'Stacking bonus-die buffs can easily break skill checks. The following house rule is strongly recommended: Only one bonus-die effect (the largest) can be applied to any given d20 roll.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  bewilder: {
    name: 'Bewilder',
    level: 4,
    school: 'enchantment',
    classes: ['Bard', 'Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S, M (a sprig of wormwood)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You distort and confuse your enemies’ senses, driving them to inexplicable action. Each creature in a 20-foot radius sphere centered on a point you choose within range must succeed on a Wisdom saving throw when you cast this spell or be affected by it.',
      ],
      [
        'An affected target can’t take reactions. At the start of each of its turns, it must spend half of its movement to move in a random horizontal direction. To determine the direction, roll a d8 and assign a direction to each die face. It then must roll a d4 to determine its actions.',
      ],
      ['d4 · Behavior'],
      ['1 · The creature is ', rules.stunned, ' until the start of its next turn.'],
      [
        '2 · The creature treats every other creature as its enemy until the start of its next turn, fighting them with its typical tactics.',
      ],
      [
        '3 · The creature becomes frightened of every other creature it can see until the start of its next turn.',
      ],
      [
        "4 · The creature drops any weapons or items it is holding, and doesn't move or take actions this turn.",
      ],
      [
        'At the end of each of its turns, an affected target can repeat its saving throw, ending the effect on itself on a success. A creature can also repeat its saving throw any time it takes damage.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the radius of the sphere increases by 5 feet for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'bewildered',
        name: 'Bewildered',
        lands: { on: 'failed-save', save: 'wis' },
        text: [
          'An affected target can’t take reactions. At the start of each of its turns, it must spend half of its movement to move in a random horizontal direction',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn', 'damaged'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  black_ice: {
    name: 'Black Ice',
    level: 0,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You cause a patch of nearly transparent ice to form on ground that you can see within range. Until the spell ends, the magic ice fills a 5-foot square. Any creature on the ice’s space when you cast the spell must succeed on a Dexterity saving throw or take 1d6 cold damage. If the creature is Medium or smaller, it also falls prone on a failed save.',
      ],
      [
        'A creature must also make the saving throw when it moves onto the ice’s space for the first time on a turn or ends its turn atop it.',
      ],
      [
        'This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  blade_burst: {
    name: 'Blade Burst',
    level: 0,
    school: 'conjuration',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You conjure a ring of blades to slash or stab at your foes. All other creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 slashing or piercing damage (your choice).',
      ],
      [
        "This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  blazing_blade: {
    name: 'Blazing Blade',
    level: 5,
    school: 'transmutation',
    classes: ['Cleric', 'Paladin'],
    castingTime: 'Bonus Action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You touch a weapon and enhance it with brilliant flame. For the duration, the weapon deals 1d6 extra fire and 1d6 extra radiant damage on a hit, and its base damage is changed to your choice of fire or radiant.',
      ],
      [
        "Sunfire Swipe. As a bonus action, the wielder can create an arc of burning light, ending the spell. Each creature within a 30-foot cone must make a Dexterity saving throw. Undead and fiends attempt this save with disadvantage. On a failure, a creature takes 3d6 fire and 3d6 radiant damage, and it is afflicted with holy fire for 1 minute. Any attack roll against an affected creature has advantage if the attacker can see it, and the affected creature can't benefit from being ",
        rules.invisible,
        '. On a success, a creature takes half as much damage and is not affected. At the end of each of its turns, an affected creature can make a Wisdom saving throw, ending the effect on itself on a success.',
      ],
      [
        'The imbued weapon and any creature afflicted with holy fire emits bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
    ],
    effects: [
      {
        key: 'holy-fire',
        name: 'Holy fire',
        lands: { on: 'failed-save', save: 'dex' },
        text: [
          "Any attack roll against an affected creature has advantage if the attacker can see it, and the affected creature can't benefit from being ",
          rules.invisible,
          '.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  brilliance: {
    name: 'Brilliance',
    level: 3,
    school: 'evocation',
    classes: ['Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: '1 hour',
    text: [
      [
        'A 60-foot radius sphere of light spreads out from a point you choose within range. The sphere is bright light and sheds dim light for an additional 60 feet. This light isn’t sunlight.',
      ],
      [
        'If you target a point on an object you are holding or one that isn’t being worn or carried, the light shines from the object and moves with it. Completely covering the affected object with an opaque object, such as a bowl or a helm, blocks the light.',
      ],
      [
        'If any of this spell’s area overlaps with an area of darkness created by a spell of its own level or lower, or an equivalent magical effect, the spell or effect that created the darkness is dispelled.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  burst_of_flame: {
    name: 'Burst of Flame',
    level: 2,
    school: 'conjuration',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You summon up a fiery explosion, creating light, heat, or smoke. You may conjure the explosion at any point within 60 feet, but it will have added effect if you conjure it atop an existing nonmagical flame (extinguishing up to a 5-foot cube of flame). Choose one of the following effects.',
      ],
      [
        '• Light. You create a shower of sparks, blinding onlookers. Each creature in a 10-foot radius must make a Constitution saving throw or be ',
        rules.blinded,
        ' until the end of your next turn. If you target an existing flame, the radius increases to 20 feet.',
      ],
      [
        '• Heat. You conjure a blast of intense heat. Each creature in a 10-foot radius must make a Constitution saving throw. On a failed save, a creature takes 3d6 fire damage, or half as much on a successful save. If you target an existing flame, the damage increases to 4d6.',
      ],
      [
        '• Smoke. You create a 15-foot radius cloud of thick, oily smoke. It spreads around corners, and its area is heavily obscured. If you target an existing flame, the radius is 30 feet. The cloud lasts for 1 minute or until dispersed by a strong breeze.',
      ],
    ],
    effects: [
      {
        key: 'light',
        name: 'Light',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.blinded],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  call_for_aid: {
    name: 'Call for Aid',
    level: 6,
    school: 'conjuration',
    classes: ['Cleric'],
    castingTime: '1 minute',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You seek assistance from a mighty extraplanar being — a god, archdevil, or other legendary and powerful creature. It sends one of its loyal servants to aid you, which appears in an unoccupied space within range.',
      ],
      [
        'When the creature appears, it is friendly but under no obligation to help you. It speaks at least one language you speak. It typically demands payment for its aid, in a form appropriate to the creature (for example, tithes for a celestial or sacrifices for a fiend). When payment has monetary value, it usually is 50 gp per minute, 500 gp per hour, or 5,000 gp per day. It may be decreased or increased as much as 50% depending on whether the extraplanar being endorses the task, or on the danger of the task. The cost usually increases when repeatedly summoning the same extraplanar being and may be free the first time if the being favors you.',
      ],
      [
        'Services can be anything appropriate to the creature summoned. Creatures will rarely agree to tasks that are suicidal, impossible, abhorrent, or especially lengthy. After the creature completes the task, or you are unable to satisfy its payment, it returns to its home plane.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  captivate: {
    name: 'Captivate',
    level: 2,
    school: 'enchantment',
    classes: ['Bard', 'Warlock'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: '1 minute',
    text: [
      [
        'You enact a performance laced with subtle magic, your gestures and voice causing others to focus on you to the exclusion of all else. Creatures you choose within range must succeed on a Wisdom saving throw or be charmed by you. If you or your companions are fighting a creature, it has advantage on the save. While charmed by you in this way, a creature has disadvantage on initiative rolls as well as Wisdom (Perception) checks made to perceive any creature other than you until the spell ends, or until the target can no longer see or hear you.',
      ],
      [
        'Additionally, if a creature rolls initiative while affected by this spell, its speed is reduced by 10 feet and it can’t take reactions until after its first turn ends. The spell ends if you are incapacitated or can no longer speak. A creature that fails its saving throw doesn’t realize that you used magic to influence it, even if it witnessed the spell being cast.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the duration increases by 1 minute and the radius increases by 10 feet for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'charmed',
        name: 'Charmed',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.charmed],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  caustic_quarrel: {
    name: 'Caustic Quarrel',
    level: 2,
    school: 'conjuration',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: "V, S, M (a bit of fool's gold, sulfur, and water)",
    duration: 'Instantaneous',
    text: [
      [
        'You conjure an arrow of acid and send it streaking towards a target within range. Make a ranged spell attack. On a hit, the target takes 6d4 acid damage and is coated in acid. An acid-coated target can use its action to wipe the acid off. If not, then at the end of its next turn, it takes an additional 4d4 acid damage.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, both instances of damage increase by 1d4 for each slot level above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  circle_of_protection: {
    name: 'Circle of Protection',
    level: 3,
    school: 'abjuration',
    classes: ['Cleric', 'Paladin', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '15 ft',
    components:
      'V, S, M (a mixture of salt and silver powder worth at least 100gp, which the spell consumes)',
    duration: '1 hour',
    text: [
      [
        'You draw a 10-foot radius circular glyph upon the ground, which projects upward into a luminous 30-foot tall cylinder. Select one of the following creature types when you draw the glyph: aberrations, celestials, elementals, fey, fiends, or undead. A challenge rating 5 or lower creature of the chosen type can’t willingly move across the cylinder’s boundary. When the creature attempts to make an attack, cast a spell, use teleportation or interplanar travel, or cause any other effect across the boundary, it must first succeed on a Charisma saving throw.',
      ],
      [
        'Whenever you start casting the spell, you can modify it so that it doesn’t require concentration. If you do so, the spell’s casting time becomes 10 minutes for that casting.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the maximum challenge rating of affected creatures increases by 3 for each slot level above 3rd. When you cast this spell using a spell slot of 5th or 6th level, the duration is concentration, up to 12 hours. When cast using a spell slot of 7th or 8th level, the duration is concentration, up to 24 hours. When cast using a 9th-level spell slot, the spell lasts until dispelled, and there is no challenge rating limit on affected creatures.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  cold_snap: {
    name: 'Cold Snap',
    level: 2,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'With a snap of your fingers, a swirling burst of freezing wind erupts at a point you choose within range. Each creature in a 5-foot radius sphere must make a Constitution saving throw. On a failure, a creature takes 3d8 cold damage and becomes coated in ice, reducing its speed by 10 feet until the start of your next turn. On a success, it takes half as much damage and is not slowed.',
      ],
      [
        'The ground in the area is covered with slick ice and snow, making it difficult terrain until the start of your next turn.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  command_beast: {
    name: 'Command Beast',
    level: 3,
    school: 'enchantment',
    classes: ['Druid', 'Ranger', 'Sorcerer'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You attempt to take control of a beast you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. A beast of challenge rating 4 or higher automatically succeeds on this saving throw. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.',
      ],
      [
        'While the beast is ',
        rules.charmed,
        ', you can issue telepathic commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as “Attack that creature,” “Run over there,” or “Fetch that object.” If the creature completes the order and doesn’t receive further direction from you, it defends and preserves itself to the best of its ability.',
      ],
      [
        'As an action, you can take full control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn’t do anything that you don’t allow it to do. During this time, any reactions the creature takes require you to use your reaction as well.',
      ],
      [
        'Each time the target takes damage, it makes a new Wisdom saving throw against the spell. If the saving throw succeeds, the spell ends.',
      ],
      [
        'At Higher Levels. When you cast this spell with a spell slot of 4th level or higher, there is no challenge rating limit to the target creature.',
      ],
    ],
    effects: [
      {
        key: 'charmed',
        name: 'Charmed',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.charmed],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['damaged'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  command_objects: {
    name: 'Command Objects',
    level: 5,
    school: 'transmutation',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: '1 minute',
    text: [
      [
        'You magically animate nearby objects, bending them to your will. Choose up to six nonmagical objects within range that are not being worn or carried. All objects must be the same size, and you can animate six Tiny, four Small, three Medium, two Large, or one Huge object(s). Each object animates until spell ends or until reduced to 0 hit points; when an object drops to 0 hit points, any remaining damage carries over to its original object form.',
      ],
      ['Command Objects Statistics'],
      [
        '<table> <thead><tr> <th>Size</th> <th>HP</th> <th>AC</th> <th>Str</th> <th>Dex</th> <th>Damage</th> <th>Speed</th> </tr></thead> <tbody> <tr> <td>Tiny</td> <td>5</td> <td>19</td> <td>12</td> <td>28</td> <td>1d4 + 1 damage</td> <td>fly 30 (hover)</td> </tr> <tr> <td>Small</td> <td>10</td> <td>18</td> <td>16</td> <td>24</td> <td>1d6 + 3 damage</td> <td>fly 30</td> </tr> <tr> <td>Medium</td> <td>20</td> <td>17</td> <td>20</td> <td>20</td> <td>1d10 + 5 damage</td> <td>30</td> </tr> <tr> <td>Large</td> <td>30</td> <td>16</td> <td>24</td> <td>16</td> <td>2d10 + 7 damage</td> <td>25</td> </tr> <tr> <td>Huge</td> <td>60</td> <td>15</td> <td>28</td> <td>12</td> <td>5d12 + 9 damage</td> <td>20</td> </tr> </tbody> </table> An animated object has blindsight with a radius of 30 feet and statistics as shown in the table above. The GM might rule an object has immunities, resistances, and vulnerabilities to specific damage types based on its form. If an object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. In combat, an object shares your initiative count, but takes its turn immediately after yours. As a bonus action, you can issue one command to any number of objects within the spell’s range. That command can be to attack, or some other action. Otherwise, the only action an object takes on its turn is the Dodge action. An object may also be commanded to attempt an action available to all creatures, such as grapple or shove, if its form permits it to do so. If commanded to attack, an object makes one melee attack against a target you specify within 5 feet of it. Its attack bonus is equal to your spell attack modifier. An object usually deals bludgeoning damage, but the GM might rule it deals slashing or piercing damage based on its form.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  cone_of_flame: {
    name: 'Cone of Flame',
    level: 1,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'Flames shoot forth from your fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failure, or half as much damage on a success.',
      ],
      ['The flames ignite any flammable objects in the area that aren’t being worn or carried.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 and the range of the cone increases by 5 feet for each slot level above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  confinement: {
    name: 'Confinement',
    level: 7,
    school: 'evocation',
    classes: ['Bard', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '100 ft',
    components: 'V, S, M (ruby dust worth 1,500 gp)',
    duration: '1 hour',
    text: [
      [
        'An immobile, ',
        rules.invisible,
        ', cube-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box as you choose. The prison has an AC of 17 and 140 hit points.',
      ],
      [
        'A prison in the shape of a cage can be up to 20 feet on a side, is made from 1/2-inch diameter bars spaced a 1/2-inch apart, and provides half cover.',
      ],
      [
        'A prison in the shape of a box can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out from the area.',
      ],
      [
        'When you cast the spell, any creature that is completely inside the cage’s area is trapped. Creatures only partially within the area, or those too large to fit inside the area, are pushed away from the center of the area until they are completely outside the area.',
      ],
      [
        'A creature inside the cage can’t leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave the cage, it must first make a Charisma saving throw. On a success, the creature can use that magic to exit the cage. On a failed save, the magic fails and has no effect. The cage also extends into the Ethereal Plane, blocking ethereal travel.',
      ],
      ["This spell can't be dispelled by dispel magic."],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 8th level or higher, the cage’s AC increases by 1 and its hit points increase by 20 for each slot level above 7th.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  conjure_beast_pack: {
    name: 'Conjure Beast Pack',
    level: 3,
    school: 'conjuration',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a handful of grain or corn)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You pull together wisps of magical energy and sculpt them into beasts. Choose a Small or Tiny beast of challenge rating 1/4 or lower, and eight creatures of that type appear immediately in unoccupied spaces around you. If you choose a beast with a flying speed, you summon six creatures instead. Each beast is considered fey and disappears when it drops to 0 hit points or when the spell ends.',
      ],
      [
        'The summoned beasts are friendly to you and your companions. In combat, the beasts share your initiative count, but take their turns immediately after yours. The beasts obey any verbal commands that you issue to them (no action required by you). If you don’t issue any commands to them, they move as a group and take the Dodge action.',
      ],
      [
        'If you command the beasts to attack, choose a target for each beast to attack within its reach, making a single melee spell attack for each target. On a hit, the target takes 1d4 bludgeoning or piercing damage (your choice), plus 1d4 extra damage for each additional beast attacking it. You have advantage on the attack roll if three or more beasts attack the same target, and you add your spellcasting ability modifier to the damage dealt if six or more beasts attack the same target.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  conjure_herald: {
    name: 'Conjure Herald',
    level: 2,
    school: 'conjuration',
    classes: ['Bard', 'Druid', 'Wizard'],
    castingTime: '1 minute or Ritual',
    range: '30 ft',
    components: 'V, S, M (a small silver horn worth at least 10gp, which is consumed)',
    duration: 'Special',
    text: [
      [
        'You create a floating spirit which conveys a message of your choice. The herald appears to be a Medium or Small creature of ghostly form, with you determining its appearance otherwise. The herald knows a fixed message of up to 25 words. When you cast this spell, choose one of the following effects:',
      ],
      [
        '• Ward. The herald is cast at a particular location, or on a statue or other object with a mouth, and is fixed to that point. It is ',
        rules.invisible,
        ' and motionless until a specific condition is met within 30 feet of its location. When the condition is met, it appears and recites its message. If cast on an object, it moves the object’s mouth rather than appearing directly. You determine whether it does so once or disappears again and repeats the message every time the condition is met. When cast in this way, the herald lasts until dispelled.',
      ],
      [
        '• Announcement. The herald floats through the air up to 100 feet up and 30 feet per round, repeating its message every round. It traverses an area up to a 5-mile radius around its location, conveying its message to every creature it sees. When cast in this way, the herald lasts for 1 hour.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  conjure_minor_fiends: {
    name: 'Conjure Minor Fiends',
    level: 3,
    school: 'conjuration',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components:
      'V, S, M (100gp worth of incense mixed with humanoid blood, which is consumed in the casting)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You recite a dark incantation, summoning a group of minor fiends to do your bidding. You may choose the plane you call them from. The spell conjures two demons which use the Minor Fiend stat block below. Alternatively, your GM may choose any number of fiends whose combined challenge ratings are 2 or lower. In combat, the fiends share your initiative count but take their turns immediately after yours.',
      ],
      [
        'The fiends are friendly to you and your companions and hostile to all other creatures. If you lose concentration on the spell, they do not disappear. Instead, they become hostile toward you and your companions. They can’t be dismissed and last for 1 hour after their summoning. A fiend disappears when reduced to 0 hit points.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot above 3rd level, the number of minor fiends or the combined challenge rating of the summoned fiends increases by 1 for each slot level above 3rd.',
      ],
      ['Minor Fiend'],
      ['Medium fiend (demon)'],
      ['• Armor Class 14'],
      ['• Hit Points 32 (5d8+10)'],
      ['• Speed 30 ft.'],
      ['STR · DEX · CON · INT · WIS · CHA'],
      ['16 (+3) · 14 (+2) · 16 (+3) · 8 (-1) · 14 (+2) · 8 (-1)'],
      ['• Damage Resistances cold, fire, lightning'],
      ['• Damage Immunities poison'],
      ['• Condition Immunities ', rules.charmed, ', ', rules.frightened, ', poisoned'],
      ['• Senses darkvision 60 ft., passive Perception 12'],
      ['• Languages Abyssal or Infernal, understands one language you can speak'],
      ['• Proficiency Bonus 2'],
      ['• Challenge 1'],
      [
        'Magic Resistance. The fiend has advantage on saving throws against spells and other magical effects.',
      ],
      [
        '<h3>Actions</h3> <em><strong>Multiattack.</strong></em> The fiend can make two attacks, only one of which can be Abyssal Bile. <em><strong>Claws.</strong></em> <em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 1d8 + 3 slashing damage. <em><strong>Abyssal Bile.</strong></em> The fiend sprays abyssal bile at one creature within 10 feet of it. The target must make a Charisma saving throw against your spell save DC. On a failed save, it rolls 1d4 and is afflicted by a condition according to the result. <ul> <li>1: The target is ',
        rules.frightened,
        ' of the fiend.</li> <li>2: The target is ',
        rules.poisoned,
        '.</li> <li>3: The target is ',
        rules.restrained,
        '.</li> <li>4: The target erupts into black flames, taking 1d6 fire damage at the start of each of its turns.</li> </ul> The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. Once a creature successfully saves against this ability, it is immune for 24 hours.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  corpse_puppets: {
    name: 'Corpse Puppets',
    level: 5,
    school: 'necromancy',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'Your shadow splits, reaching out and reanimating up to five Tiny, Small or Medium corpses of challenge rating 1/4 or higher that you can see within range. Each corpse immediately transforms into an undead creature of the same size, which takes your choice of form (Skeleton or Zombie) using the Corpse Puppet stat block below.',
      ],
      [
        'The puppets are allies to you and your companions. In combat, they share your initiative count, but take their turns immediately after yours. As a bonus action, you can issue one command to any number of puppets within the spell’s range. If you don’t issue a command, they take the Dodge action and use their move to avoid danger.',
      ],
      [
        'The puppets are under your control until the spell ends, after which they become inanimate once more.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  corrosive_burst: {
    name: 'Corrosive Burst',
    level: 4,
    school: 'conjuration',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '150 ft',
    components: 'V, S, M (a handful of saltpeter and some copper shavings)',
    duration: '1 minute',
    text: [
      [
        'You hurl a ball of dripping acid outward, exploding in a 20- foot radius sphere at a point you can see within range. Every creature in the area must make a Dexterity saving throw, taking 8d4 acid damage on a failed save or half as much on a success. A creature that fails the save takes an additional 4d4 acid damage at the end of each of its turns unless it or another creature within 5 feet spends an action to clear the acid off.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the initial damage increases by 2d4 for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'acid-residue',
        name: 'Acid residue',
        lands: { on: 'failed-save', save: 'dex' },
        text: [
          'A creature that fails the save takes an additional 4d4 acid damage at the end of each of its turns unless it or another creature within 5 feet spends an action to clear the acid off.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  curse_of_weakness: {
    name: 'Curse of Weakness',
    level: 2,
    school: 'necromancy',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'Ghastly energy flickers within a 10-foot radius sphere centered on a point you choose within range. When a creature starts its turn in the area or moves into the area during its turn, it must make a Constitution saving throw.',
      ],
      [
        'On a failure, a creature is cursed with weakness until the end of its turn. While cursed, it has disadvantage on Strength checks and Strength saving throws, it deals half damage with weapon attacks that use Strength, and its speed is reduced by 10 feet.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the radius of the sphere increases by 5 feet for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'weakness-curse',
        name: 'Cursed with weakness',
        lands: { on: 'failed-save', save: 'con' },
        text: [
          'While cursed, it has disadvantage on Strength checks and Strength saving throws, it deals half damage with weapon attacks that use Strength, and its speed is reduced by 10 feet.',
        ],
        lasts: { kind: 'until', text: ['the end of its turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  dazzle: {
    name: 'Dazzle',
    level: 1,
    school: 'illusion',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a small glass prism)',
    duration: '1 round',
    text: [
      [
        'You throw open your hand and release a disorienting spray of glittering color motes. Each creature in a 20-foot cone perceives your space as heavily obscured and must make a Constitution saving throw. On a failure, it is ',
        rules.blinded,
        ' and its speed is halved. The spell ends at the end of your next turn.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the cone’s size increases by 5 feet for each slot level above 1st.',
      ],
    ],
    effects: [
      {
        key: 'blinded-slowed',
        name: 'Blinded, speed halved',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.blinded],
        text: ['its speed is halved'],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  death_ray: {
    name: 'Death Ray',
    level: 7,
    school: 'necromancy',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a beam of negative energy at a creature you can see within range. Make a ranged spell attack. The creature takes 8d10+30 necrotic damage on a hit, or half as much damage on a miss.',
      ],
      [
        'If a humanoid dies from this spell or within 1 minute of being hit by it, it rises as a zombie at the start of your next turn and attacks the closest living creature. The GM may either use the zombie statistics from the Basic Rules, or the zombie template as described in reanimation. At the GM’s discretion, other creature types may rise as different undead.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 8th level or higher, the damage increases by 2d10 for each slot level above 7th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  deflect: {
    name: 'Deflect',
    level: 1,
    school: 'abjuration',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Reaction, you are hit by an attack or targeted by the magic missile spell',
    range: 'Self',
    components: 'V, S',
    duration: '1 round',
    text: [
      [
        'A transparent sphere of arcane force appears, averting incoming attacks. Until the start of your next turn, you have a +5 bonus to AC, to a maximum of 21 AC, including against the triggering attack, and you take no damage from magic missile.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the bonus to AC (and the maximum AC) increases by 1 for every two slot levels above 1st (for example, when cast with a 5th-level spell slot, you have a +7 bonus to AC, to a maximum of 23 AC).',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  detect_hazards: {
    name: 'Detect Hazards',
    level: 2,
    school: 'divination',
    classes: ['Cleric', 'Druid', 'Ranger'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You sense the presence of any trap within range. A trap, for the purpose of this spell, includes any object, terrain, or magic that would inflict a sudden or unexpected effect you consider harmful or undesirable. Thus, the spell would sense an area affected by the alarm spell, a spell glyph, a hidden pit trap, or a natural sinkhole, but not a creature lying in ambush.',
      ],
      [
        'The spell reveals the general presence and vague direction of a trap within its 120-foot range, but not its specific location. If you come within 15 feet of the trap, you detect its presence exactly, and any ability checks you or your companions make to examine it are made with advantage.',
      ],
      [
        'The spell is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  detect_otherworldly_influence: {
    name: 'Detect Otherworldly Influence',
    level: 1,
    school: 'divination',
    classes: ['Cleric', 'Paladin'],
    castingTime: 'Action or Ritual',
    range: '30 ft',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You sense the presence of unnatural or extraplanar creatures. The spell reveals the existence of any aberrations, celestials, elementals, fey, fiends, or undead within 30 feet of you, as well as their locations. You also have advantage on Wisdom (Perception) and Wisdom (Insight) checks against such creatures for the duration.',
      ],
      [
        'The spell is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  devil_binding: {
    name: 'Devil Binding',
    level: 5,
    school: 'conjuration',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a vial of blood and an obsidian chalice worth at least 665 gp)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You recite a profane chant to summon a devil, which appears in an unoccupied space that you can see within range. The devil’s challenge rating is at least 4 and no higher than 8. The GM chooses the devil’s type, and it is under the GM’s control. If you know a devil’s true name or possess its talisman, you can attempt to summon that devil regardless of its challenge rating.',
      ],
      [
        'The devil typically resents being summoned but will not harm you for the duration. On each of your turns, you can command it. It obeys orders it considers reasonable and fights ruthlessly, but will retreat to preserve its life and rank.',
      ],
      [
        'After 10 minutes, the devil can ignore your commands and might choose to remain and pursue its own goals. You may attempt to reason with, persuade, or strike a deal that aligns with its interests. If you maintain concentration for the full duration, you may return the devil to whence it came, otherwise, it remains summoned indefinitely.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the devil’s possible challenge rating increases by 2 for each slot level above 5th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  disrupting_smite: {
    name: 'Disrupting Smite',
    level: 5,
    school: 'evocation',
    classes: ['Cleric', 'Paladin'],
    castingTime: 'Bonus Action',
    range: 'Self',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You empower your weapon, giving it the ability to tear the fabric of the planes. The next time you hit a creature with a melee weapon attack before this spell ends, you tear a hole to another plane and tangle it within the interplanar aether. The attack deals an extra 5d10 force damage, and the target must make a Charisma saving throw. On a failure, it is partly phased out of the plane, becoming incapacitated and gaining resistance to all damage until the spell ends,',
      ],
      [
        'A creature incapacitated by this spell makes another Charisma saving throw at the end of each of its turns. On a successful save, the spell ends.',
      ],
    ],
    effects: [
      {
        key: 'phased-out',
        name: 'Phased out',
        lands: { on: 'failed-save', save: 'cha' },
        conditions: [rules.incapacitated],
        text: ['gaining resistance to all damage'],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  divine_temple: {
    name: 'Divine Temple',
    level: 6,
    school: 'conjuration',
    classes: ['Cleric'],
    castingTime: '1 hour',
    range: '120 ft',
    components: 'V, S, M (a holy symbol worth at least 5 gp)',
    duration: '24 hours',
    text: [
      [
        'You create a holy sanctuary at an empty point on the ground you can see within range. The temple occupies a cube up to 60 feet on each side.',
      ],
      [
        'The temple has at least one door and is enclosed by wood and stone floors, walls, and a roof. You determine all other aspects of its appearance (as long as it conforms to the deity represented by the holy symbol used in the casting) such as altars, idols, illumination, rooms, scent, temperature, and windows.',
      ],
      [
        "Divination spells of 6th level and below can't target creatures within the temple or create sensors inside of it.",
      ],
      [
        "When you cast the spell, choose one or more of the following creature types for the temple to oppose: aberrations, celestials, elementals, fey, fiends, or undead. If such a creature attempts to enter the temple, it must make a Charisma saving throw. On a failure, it can't enter the temple for 24 hours. On a success, whenever it makes an attack roll, an ability check, or a saving throw inside the temple, it must roll a d4 and subtract the number rolled from the d20 roll.",
      ],
      ['Casting this spell on the same spot every day for a year makes this effect permanent.'],
      [
        "At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, the casting time increases by 1 hour and the temple's size increases by 60 feet on each side for each spell level above 6th. The temple counters divination spells of a level less than or equal to the slot level used.",
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  draining_bolt: {
    name: 'Draining Bolt',
    level: 0,
    school: 'necromancy',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You sap the vitality of one creature you can see in range. Make a ranged spell attack against the target. On a hit, it takes 1d6 necrotic damage and has disadvantage on the next weapon attack roll it makes before the end of its next turn.',
      ],
      [
        "This spell's damage increases by 1d8 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  drink_life: {
    name: 'Drink Life',
    level: 5,
    school: 'necromancy',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self (60-foot radius)',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You empower yourself with deathly energies, gaining the ability to harvest life from your foes. When you cast the spell, you extend a black tendril out to one creature you can see within range. The target must make a Constitution saving throw. On a failure, it takes 6d8 necrotic damage and has its speed halved until the start of your next turn. On a success, it takes half as much damage and suffers no other effects. You regain hit points equal to half the damage dealt. Until the spell ends, you can use your action on each of your turns to repeat the effect against a creature within range.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.',
      ],
    ],
    effects: [
      {
        key: 'speed-halved',
        name: 'Speed halved',
        lands: { on: 'failed-save', save: 'con' },
        text: ['has its speed halved'],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  dust_cyclone: {
    name: 'Dust Cyclone',
    level: 2,
    school: 'conjuration',
    classes: ['Druid', 'Ranger', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a pinch of dust)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'A small cyclone whips up at a point you can see on the ground within range. The cyclone is a 5-foot radius, 30-foot high cylinder centered on that point.',
      ],
      [
        'Any creature that starts its turn within the radius of the dust cyclone or enters its radius for the first time during its turn must make a Strength saving throw. On a failed save, the creature takes 1d12 bludgeoning damage and is pushed 5 feet away from the center. On a successful save, the creature takes half as much damage and isn’t pushed.',
      ],
      [
        'As a bonus action, you can move the dust cyclone up to 30 feet in any direction. The first time you pass the dust cyclone through a creature, you can force it to make the saving throw, as if it entered the cyclone’s radius. You can continue to move the dust cyclone, but its strength is exhausted until the end of your turn and subsequent creatures are unaffected by it passing through them.',
      ],
      [
        'If the dust cyclone moves over sand, dust, loose dirt, or small gravel, it sucks up the material and heavily obscures its radius until the start of your next turn.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  earth_forming: {
    name: 'Earth Forming',
    level: 5,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self (30-foot radius)',
    components: 'V, S, M (a tiny silver pickaxe)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'For the duration, you magically command the earth to reshape itself around you. As an action, you can permanently modify up to a 20-foot cube of soft earth you can see within range, such as sand, dirt, or clay, which you can move up to 20 feet over the course of 5 minutes. You can change its elevation or create or destroy trenches, pillars, ramps, walls, or other simple shapes. Because the terrain’s transformation occurs slowly, creatures in the area can’t usually be trapped or injured by the ground’s movement. You can choose a new area to modify at any point, though you can only shape one area at a time; an unfinished formation slowly reverts to its original shape.',
      ],
      [
        'The spell can’t shape stone, metal, or other hard materials. Rocks, plants, and structures shift or move to accommodate the new terrain, and may become unstable or fall.',
      ],
      [
        'When you cast this spell as a ritual, the silver pickaxe must be worth at least 500 gp and is consumed.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  earth_leash: {
    name: 'Earth Leash',
    level: 2,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '300 ft',
    components: 'V, S, M (a tiny orange flag)',
    duration: '1 minute',
    text: [
      [
        'You point at one creature you can see within range and send a lashing tendril of earth to haul it to the ground. The target must succeed on a Strength saving throw, or immediately fall ',
        rules.prone,
        '. If the creature has a flying speed, it loses its flying speed for the spell’s duration, causing it to fall even if it can hover. An airborne creature takes falling damage as normal, up to a maximum of 4d6 points of bludgeoning damage.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the number of targets increases by 1 for each slot level above 2nd, and the maximum damage from falling increases by 1d6 for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'grounded',
        name: 'Grounded',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        text: [
          'If the creature has a flying speed, it loses its flying speed for the spell’s duration, causing it to fall even if it can hover.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  earth_rumble: {
    name: 'Earth Rumble',
    level: 1,
    school: 'transmutation',
    classes: ['Bard', 'Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self (10-foot radius)',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You cause the ground immediately around you to shake and roll. Each other creature within 10 feet of you must make a Dexterity saving throw. On a failed save, a target takes 2d6 bludgeoning damage and is knocked ',
        rules.prone,
        '. On a success, a target takes half as much damage and isn’t knocked ',
        rules.prone,
        '. If the terrain is dirt or stone, it becomes difficult terrain for creatures other than you for the next hour.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st, and the radius increases by 5 feet for every two slot levels above 1st.',
      ],
    ],
    effects: [
      {
        key: 'knocked-prone',
        name: 'Knocked prone',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  eldritch_armor: {
    name: 'Eldritch Armor',
    level: 1,
    school: 'abjuration',
    classes: ['Warlock'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a vial of snowmelt)',
    duration: '1 hour',
    text: [
      [
        'You protect yourself with an acidic coating that sprays outward when struck. You gain 1d4 + 4 temporary hit points for the duration. If a creature hits you with a melee attack while you have these temporary hit points, the creature takes 2d4 acid damage.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, both the temporary hit points and the acid damage increase by 2d4 for each slot level above 1st, up to a maximum of 9d4 + 4 temporary hit points and 10d4 damage at 5th level.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  eldritch_rift: {
    name: 'Eldritch Rift',
    level: 1,
    school: 'conjuration',
    classes: ['Warlock'],
    castingTime: 'Action',
    range: 'Self (10-foot radius)',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You open a momentary portal to an unknowable void, letting eldritch tentacles slip through to tear at your enemies. Each other creature within 10 feet of you must make a Strength saving throw. On a failed save, a target takes 3d4 necrotic damage and is gripped by the tentacles, preventing it from making reactions until the start of its next turn. On a successful save, the target takes half as much damage and instead has disadvantage on opportunity attacks until the start of its next turn.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 2d4 for each slot level above 1st, and you can increase the spell’s radius by up to 5 feet for each slot level above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  elemental_reflection: {
    name: 'Elemental Reflection',
    level: 1,
    school: 'abjuration',
    classes: ['Druid', 'Ranger', 'Sorcerer', 'Wizard'],
    castingTime: 'Reaction, when  you take acid, cold, fire, lightning, or thunder damage',
    range: 'Self',
    components: 'S',
    duration: 'Instantaneous',
    text: [
      [
        'You create an elemental ward, gaining resistance to the triggering damage. When you cast the spell, you can choose to either extend the resistance until the end of your next turn, or you can cause your next weapon attack before the end of your next turn to deal an additional 1d8 damage of the triggering type and an additional effect depending on the triggering damage type.',
      ],
      ['• Acid. The target takes 1d4 acid damage at the end of its next turn.'],
      ["• Cold. The target's speed is reduced by 10 feet until the end of your next turn."],
      ['• Fire. The attack ignites flammable objects not being worn or carried.'],
      ["• Lightning. The target can't take reactions until the start of its next turn."],
      ['• Thunder. The target is ', rules.deafened, ' until the end of its next turn.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the additional damage increases by 1d8 for each slot level above 1st.',
      ],
    ],
    effects: [
      {
        key: 'cold',
        name: 'Chilled',
        lands: { on: 'hit' },
        text: ["The target's speed is reduced by 10 feet"],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
      {
        key: 'lightning',
        name: 'No reactions',
        lands: { on: 'hit' },
        text: ["The target can't take reactions"],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
      {
        key: 'thunder',
        name: 'Deafened',
        lands: { on: 'hit' },
        conditions: [rules.deafened],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  elemental_shield: {
    name: 'Elemental Shield',
    level: 6,
    school: 'abjuration',
    classes: ['Druid'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You create a whirling shield of elemental power around yourself. When you cast this spell, select one of the following damage types: acid, cold, fire, lightning, or thunder. Until the spell ends, you gain immunity to that damage type, and creatures of your choice within 5 feet of you gain resistance to it. As a bonus action, you can change the shield’s damage type.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  enkindle: {
    name: 'Enkindle',
    level: 2,
    school: 'transmutation',
    classes: ['Bard', 'Druid'],
    castingTime: 'Bonus Action',
    range: '60 ft',
    components: 'V, S, M (an unlit candle)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You choose a Medium or smaller object not being worn within range and cause it to rapidly heat to unbearable temperatures. If the object is metal or otherwise not flammable, it glows white-hot; if it is flammable, it is engulfed in flame but not destroyed. If a creature is holding the object, it makes a Constitution saving throw at the start of each of its turns, taking 2d4 fire damage on a failure and suffering disadvantage on any ability checks or attack rolls using the item. If it succeeds on the saving throw, it takes half as much damage and suffers no other effects.',
      ],
      [
        'If you maintain concentration for the full 1-minute duration, a nonmagical item is melted, reduced to ash, or otherwise destroyed.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the fire damage increases by 1d4 for each slot level above 2nd.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  erudition: {
    name: 'Erudition',
    level: 3,
    school: 'divination',
    classes: ['Bard', 'Cleric', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a treatise worth at least 250 gp)',
    duration: '1 hour',
    text: [
      [
        'You call on the knowledge of legends, augmenting a skill for the duration. You gain proficiency with the chosen skill. If you were already proficient, you instead gain expertise (doubling your proficiency bonus for any ability check you make with the skill). If you already have expertise, you can instead reroll one of the dice once whenever you have advantage on that ability check. The spell ends early if you cast it again.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  ethereal_slip: {
    name: 'Ethereal Slip',
    level: 3,
    school: 'conjuration',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: '1 minute',
    text: [
      [
        'You thin the fabric of the Ethereal Plane, allowing yourself to slide seamlessly over the boundary. For the duration, roll a d20 at the end of each of your turns. On a roll of 11 or higher, you slip into the Ethereal Plane, returning at the start of your next turn to the space you left. If that space is now occupied, you appear in the nearest unoccupied space. If you rolled an 11 or higher on your prior turn’s blink roll, you roll 2d20 and use the lower result. If you rolled 10 or lower, roll 2d20 and use the higher result.',
      ],
      [
        'While on the Ethereal Plane, you can’t be perceived except by creatures capable of seeing into the Ethereal Plane. You can see and hear your plane of origin out to a range of 60 feet, but you can’t interact with anything or affect any creatures there. When the spell ends, you reappear on your plane of origin. You cannot cast this spell while already on the Ethereal Plane.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  expose_weakness: {
    name: 'Expose Weakness',
    level: 4,
    school: 'transmutation',
    classes: ['Druid', 'Warlock', 'Wizard'],
    castingTime: 'Bonus Action',
    range: '90 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'Select one creature you can see within range, and one damage type that isn’t bludgeoning, piercing, or slashing. The target must make a Charisma saving throw or lose any resistance to that damage type for the duration. The first two times each round that the target takes damage of the chosen type, it takes 2d6 additional damage of that type.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the number of times each round the additional damage can occur increases by 1 for every two slot levels above 4th.',
      ],
    ],
    effects: [
      {
        key: 'vulnerable',
        name: 'Vulnerable to damage type',
        lands: { on: 'failed-save', save: 'cha' },
        text: [
          'lose any resistance to that damage type for the duration. The first two times each round that the target takes damage of the chosen type, it takes 2d6 additional damage of that type.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  expulsion: {
    name: 'Expulsion',
    level: 4,
    school: 'abjuration',
    classes: ['Cleric', 'Paladin', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (an item the target abhors)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You brandish a repellent item at a creature you can see within range and attempt to expel them from this plane. The target must make a Charisma saving throw. On a failure, it is partly wrenched off its current plane. For the duration, it becomes incapacitated and gains resistance to all damage.',
      ],
      [
        'The target makes another Charisma save at the end of each of its turns, ending the spell on a success. A creature on its home plane continues making saves for the duration. An extraplanar creature failing its second Charisma save disappears from its current plane entirely. An extraplanar creature failing the third Charisma save is banished back to its home plane and stops making saving throws. If you maintain concentration for the full duration, this banishment becomes permanent.',
      ],
      [
        'A target that returns reappears in the space it left or in the nearest unoccupied space if that space is occupied.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'expelled',
        name: 'Expelled',
        lands: { on: 'failed-save', save: 'cha' },
        conditions: [rules.incapacitated],
        text: ['gains resistance to all damage'],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  false_death: {
    name: 'False Death',
    level: 3,
    school: 'necromancy',
    classes: ['Bard', 'Cleric', 'Druid', 'Wizard'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S, M (a vial of corpse wax)',
    duration: '8 hours',
    text: [
      [
        'You touch a willing creature, charging it with necrotic magic and allowing it to mimic death. The target gains 10 temporary hit points for the duration.',
      ],
      [
        'As an action, or as a reaction to being hit with an attack or taking damage, the target can appear dead to all outward inspection and to spells used to determine the target’s status. If the target breathes, its respiration is undetectable.',
      ],
      [
        'While in this false state, the target drops ',
        rules.prone,
        ', can see and hear normally, and has resistance to all damage except psychic damage. The false state ends if the target moves or takes an action, bonus action or reaction.',
      ],
      [
        'The spell ends once the target has left the false state. Additionally, you can use an action to touch the target and dismiss the spell.',
      ],
      [
        'If the target is diseased or poisoned when you cast the spell or becomes diseased or ',
        rules.poisoned,
        ' while under the spell’s effect, the disease and poison have no effect until the spell ends.',
      ],
    ],
    effects: [
      {
        key: 'temporary-hit-points',
        name: 'Temporary hit points',
        lands: { on: 'use' },
        text: ['The target gains 10 temporary hit points for the duration.'],
        lasts: { kind: 'time', amount: '8', unit: 'hour' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  false_foes: {
    name: 'False Foes',
    level: 3,
    school: 'enchantment',
    classes: ['Bard', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S, M (a piece of a broken mirror)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You cause a creature to be unable to tell friend from foe. The target must make an Intelligence saving throw, automatically succeeding if it is immune to the ',
        rules.frightened,
        ' condition. On a failure, it treats every other creature as its enemy and fights them with its typical tactics, and must use its reaction to make an opportunity attack against any creature that provokes one. Each time the target takes damage, it repeats the saving throw against the spell. If the saving throw succeeds, the spell ends.',
      ],
    ],
    effects: [
      {
        key: 'enemy-of-all',
        name: 'Treats all as enemies',
        lands: { on: 'failed-save', save: 'int' },
        text: [
          'it treats every other creature as its enemy and fights them with its typical tactics, and must use its reaction to make an opportunity attack against any creature that provokes one',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['damaged'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  fated_strike: {
    name: 'Fated Strike',
    level: 1,
    school: 'divination',
    classes: ['Bard', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Bonus Action',
    range: 'Touch',
    components: 'V, S',
    duration: '1 round',
    text: [
      [
        'You touch a willing creature, foretelling an accurate strike. The next attack the creature makes before the end of your next turn hits regardless of any modifiers or the target’s AC.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the number of attacks that creature makes which automatically hit increases by one for every two slot levels above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  fearsome_visage: {
    name: 'Fearsome Visage',
    level: 1,
    school: 'illusion',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, M (a dead spider)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You bewitch a creature’s mind, terrifying it. The target must succeed on a Wisdom saving throw or become frightened of you for the duration. It can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. A target that is more than 90 feet away from you has advantage on its saving throw.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.',
      ],
    ],
    effects: [
      {
        key: 'frightened',
        name: 'Frightened',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.frightened],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  fiery_blade: {
    name: 'Fiery Blade',
    level: 2,
    school: 'evocation',
    classes: ['Druid'],
    castingTime: 'Bonus Action',
    range: 'Self',
    components: 'V, S, M (one flake of dried chili pepper)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. It counts as a simple melee weapon with which you are proficient, and provides bright light in a 20-foot radius and dim light for an additional 20 feet.',
      ],
      [
        'It deals 2d6 fire damage on a hit and has the finesse, light, and thrown properties (range 20/60). If you hit a flammable creature or object, it ignites, taking 1d6 fire damage at the start of each of its turns until a creature uses its action to douse the flames on itself or another creature.',
      ],
      [
        'If you drop the weapon or throw it, it dissipates at the end of the turn. Thereafter, while the spell persists, you can use a bonus action to cause the blade to reappear in your hand.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, both the blade’s damage and the burning damage increase by 1d6 for every two slot levels above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  fiery_quiver: {
    name: 'Fiery Quiver',
    level: 3,
    school: 'transmutation',
    classes: ['Druid', 'Ranger', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S',
    duration: '10 minutes',
    text: [
      [
        'You enchant a quiver of ammunition with a fiery boon. For the duration, ammunition drawn from this quiver deals an extra 2d6 fire damage on a hit. Only one piece of ammunition can be affected at a time, and the spell ends after 6 pieces of ammunition have been used or if you cast the spell again.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the number of pieces of ammunition you can affect with this spell increases by one for each slot level above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  find_in_nature: {
    name: 'Find in Nature',
    level: 1,
    school: 'divination',
    classes: ['Bard', 'Druid', 'Ranger'],
    castingTime: 'Action or Ritual',
    range: '1 mile',
    components: "V, S, M (a tuft of hound's fur)",
    duration: 'Instantaneous',
    text: [
      [
        'This spell helps you locate a specific kind of beast or plant, which you can either name or describe. You learn the direction and distance to the closest creature or plant of that kind within 1 mile, if any are present.',
      ],
      [
        'At Higher Levels. If you cast this spell using a spell slot of 2nd level, the range of the spell increases to 5 miles. If you use a spell slot of 3rd level or higher, the range increases by 5 additional miles for each slot level above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  fireblast: {
    name: 'Fireblast',
    level: 3,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a bit of peat and quicklime)',
    duration: 'Instantaneous',
    text: [
      [
        'A marble-sized ball of flame appears in your hand before darting out and exploding at a point you choose within range. Every creature within 20 feet of the point must make a Dexterity saving throw, taking 7d6 fire damage on a failure of half as much on a success.',
      ],
      [
        'The blast spreads around corners and ignites flammable objects that aren’t being worn or carried.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  fleeting_portals: {
    name: 'Fleeting Portals',
    level: 6,
    school: 'conjuration',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '500 ft',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You create linked magical gates that you can control for the duration. Select two unoccupied points on the ground that you can see within 500 feet of you. Glowing 10-foot diameter gates open over each point.',
      ],
      [
        'You choose whether the gates are visible and usable from both sides or only one side. Any creature or object entering one gate exits the other as if the two were adjacent to each other. You can use a bonus action to close, open, and move one or both gates up to 60 feet. The spell ends if a gate moves more than 500 feet from the caster’s original location.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  flickering_strikes: {
    name: 'Flickering Strikes',
    level: 5,
    school: 'conjuration',
    classes: ['Ranger', 'Wizard'],
    castingTime: 'Action',
    range: 'Self (30-foot radius)',
    components: 'V, S, M (a melee weapon you are proficient with worth at least 1 sp)',
    duration: 'Instantaneous',
    text: [
      [
        'You brandish the weapon used in the casting before disappearing, instantly teleporting to and striking up to 5 targets within range. Make a melee weapon attack against each target. On a hit, a target takes the weapon damage from the attack, plus an additional 6d6 force damage.',
      ],
      [
        'You can then teleport to an unoccupied space you can see within 5 feet of any target of the spell.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  force_weapon: {
    name: 'Force Weapon',
    level: 2,
    school: 'transmutation',
    classes: ['Paladin', 'Wizard'],
    castingTime: 'Bonus Action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You touch a weapon, imbuing it with magic until the spell ends. A nonmagical weapon becomes magical, and the weapon gains a +1 bonus to attack rolls and deals an extra 1d4 force damage.',
      ],
      [
        'A creature wielding an amplified weapon can use a bonus action to make it start or stop glowing. The wielder chooses the color and amount of bright light from a 5-foot radius to a 30-foot radius, with dim light for an additional equal distance.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the bonus increases to +2 and the force damage increases to 1d6. When you use a spell slot of 6th level or higher, the bonus increases to +3 and the force damage increases to 1d8.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  form_of_fire: {
    name: 'Form of Fire',
    level: 6,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You become elemental fire, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Until the spell ends, you gain the following benefits:',
      ],
      ['• You are immune to fire damage.'],
      [
        '• You can move through the space of other creatures and ignore difficult terrain. The first time on your turn you enter the space of another creature, it takes 2d6 fire damage.',
      ],
      ['• If a creature within 5 feet hits you with a melee attack, it takes 2d6 fire damage.'],
      [
        '• You can use your action to create a line of fire 30 feet long and 5 feet wide extending from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 6d6 fire damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        '• During your turn, if you roll fire damage, you can maximize one die of the fire damage dealt.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  form_of_ice: {
    name: 'Form of Ice',
    level: 6,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You freeze over, taking on a form of elemental ice. Until the spell ends, you gain the following benefits:',
      ],
      ['• You are immune to cold damage.'],
      [
        '• You can move across difficult terrain created by ice or snow without spending extra movement.',
      ],
      [
        '• The ground in a 15-foot radius around you is icy and is difficult terrain for creatures other than you. The radius moves with you.',
      ],
      [
        '• You can use your action to create a 30-foot cone of freezing wind extending from your outstretched hand in a direction you choose. Each creature in the cone must make a Constitution saving throw. A creature takes 4d8 cold damage on a failed save, or half as much damage on a successful one. A creature that fails its save against this effect has its speed halved until the start of your next turn.',
      ],
      [
        '• During your turn, if you roll cold damage, you gain temporary hit points equal to one die rolled (your choice).',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  form_of_stone: {
    name: 'Form of Stone',
    level: 6,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      ['You become made of stone. Until the spell ends, you gain the following benefits:'],
      [
        '• You have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.',
      ],
      [
        '• You can move across difficult terrain made of earth or stone without spending extra movement. You can move through solid earth or stone as if it was air and without destabilizing it, but you can’t end your movement there. If you do so, you are ejected to the nearest unoccupied space, this spell ends, and you are ',
        rules.stunned,
        ' until the end of your next turn.',
      ],
      [
        '• You can use your action to call spikes of stone to raise from the ground. All creatures of your choice within 15 feet of you must make a Dexterity saving throw. A creature takes 4d8 piercing damage on a failed save, or half as much on a successful one. Its space becomes difficult terrain either way.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  form_of_water: {
    name: 'Form of Water',
    level: 6,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You become a surge of elemental water. Until the spell ends, you gain the following benefits:',
      ],
      [
        '• You have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.',
      ],
      [
        '• You can move through the space of other creatures and ignore difficult terrain; the first time you move through a Large or smaller creature, it must pass a Strength saving throw or be knocked ',
        rules.prone,
        '.',
      ],
      [
        "• You can use your action to unleash a blast of water 15 feet long and 5 feet wide extending from you in a direction of your choice. Each creature in the line must make a Strength saving throw. A creature takes 5d6 bludgeoning damage and is knocked prone on a failed save, or half as much and isn't knocked prone on a successful one.",
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  form_of_wind: {
    name: 'Form of Wind',
    level: 6,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You become a gust of elemental wind. Until the spell ends, you gain the following benefits:',
      ],
      ['• You have a flying speed of 60 feet.'],
      [
        '• You can move through and occupy the space of other creatures, and you ignore difficult terrain.',
      ],
      ['• You are ', rules.invisible, '.'],
      [
        '• You can use your action to unleash a powerful blast of wind in a 30 foot cone. Each creature in the cone must make a Strength saving throw. A creature takes 4d8 bludgeoning damage and is knocked 15 feet away from you on a failed save, or takes half as much damage and isn’t knocked backward on a successful one.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  fortune: {
    name: 'Fortune',
    level: 2,
    school: 'abjuration',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime:
      'Reaction, when a creature you can see within 60 feet fails with an attack roll, an ability check, or a saving throw',
    range: '60 ft',
    components: 'V',
    duration: 'Instantaneous',
    text: [
      [
        'You magically reshape causality for the triggering creature, positively influencing its efforts. The triggering creature must reroll the d20 and use the higher roll.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  frost_shuriken: {
    name: 'Frost Shuriken',
    level: 1,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'S, M (a palmful of water and a piece of iron)',
    duration: 'Instantaneous',
    text: [
      [
        'You form a bladed disk of ice and throw it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d4 piercing damage and 2d8 cold damage. The shuriken then explodes (whether you hit or miss). Each other creature within 5 feet of the target must succeed on a Dexterity saving throw or take 2d8 cold damage.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the cold damage increases by 1d8 for each slot level above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  ghost_lights: {
    name: 'Ghost Lights',
    level: 0,
    school: 'evocation',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a bit of tungsten or hickory, or a firefly)',
    duration: '10 minutes',
    text: [
      [
        'You create up to four small lights within range that hover in the air for the duration. Each light may appear as you wish (torch, lantern, glowing orb, etc.) and can be colored as you like. Whichever form you choose, each one sheds dim light in a 15-foot radius.',
      ],
      [
        'As a bonus action on your turn, you can extinguish or move any or all of the lights up to 60 feet within range. A light must be within 30 feet of another light created by this spell, and a light winks out if it exceeds the spell’s range. If you cast this spell again, any current lights you created with this spell instantly wink out.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  ghost_touch: {
    name: 'Ghost Touch',
    level: 0,
    school: 'necromancy',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: '1 round',
    text: [
      [
        'You create an intangible, cadaverous hand that latches onto a creature within range, assailing its life force. Make a ranged spell attack against the target. On a hit, the target takes 1d8 necrotic damage, and it can’t regain hit points until the start of your next turn.',
      ],
      [
        'If you hit an undead target, it has disadvantage on attack rolls against you until the end of your next turn.',
      ],
      [
        "This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
      ],
    ],
    effects: [
      {
        key: 'no-healing',
        name: 'Cannot regain hit points',
        lands: { on: 'hit' },
        text: ['it can’t regain hit points until the start of your next turn'],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
      {
        key: 'undead-disadvantage',
        name: 'Undead: disadvantage on attacks',
        lands: { on: 'hit' },
        text: ['it has disadvantage on attack rolls against you'],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  glacial_orbs: {
    name: 'Glacial Orbs',
    level: 6,
    school: 'conjuration',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: 'Self (60 feet)',
    components: 'V, S, M (a pinch of blue sand)',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You conjure five bitterly cold balls in your hand. A creature can hold a ball, hand it to another creature, throw it up to 60 feet, or use it as ammunition for a sling or appropriate weapon. A ball shatters on impact and explodes in a 15-foot radius.',
      ],
      [
        'Each creature within the area must make a Dexterity saving throw. On a failure, it takes 3d8 cold damage and its speed is halved until the end of its next turn. On a success, it takes half as much damage and suffers no other effects. When the spell ends, any remaining orbs evaporate.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, you create an additional ball for each level above 6th.',
      ],
    ],
    effects: [
      {
        key: 'slowed',
        name: 'Speed halved',
        lands: { on: 'failed-save', save: 'dex' },
        text: ['its speed is halved'],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  glyph_of_power: {
    name: 'Glyph of Power',
    level: 7,
    school: 'abjuration',
    classes: ['Bard', 'Cleric', 'Wizard'],
    castingTime: '1 minute',
    range: 'Touch',
    components: 'V, S, M (500 gp worth of gem dust, dependent on effect, which the spell consumes)',
    duration: 'Until dispelled',
    text: [
      [
        'When you cast this spell, you mark a fixed surface with an arcane inscription, occupying a 5-foot diameter circle. When a creature enters the glyph’s space or otherwise disturbs it, the glyph triggers.',
      ],
      [
        'You can refine the trigger by specifying or exempting creatures or creature types, or by specifying a password a creature can speak as a reaction to prevent the glyph from triggering.',
      ],
      [
        'The glyph is nearly invisible and requires a successful Intelligence (Investigation) check against your spell save DC to be found. A creature has advantage on this check if it is able to perceive magical effects, such as by casting detect magic. If a creature uses its action to destroy the glyph, or the surface is destroyed, the spell ends without triggering.',
      ],
      [
        'When you create the glyph, choose one of the options below, expending its material component. When the glyph triggers, it flares with colored light until destroyed. The effect immediately occurs, targeting every non-exempt creature within 60 feet.',
      ],
      [
        '• Weakness (Amethyst). Each target must make a Strength saving throw. On a failure, it suffers crippling weakness for 1 hour. Its speed drops to 15 feet, and all its weapon attacks deal damage as if it rolled the minimum result.',
      ],
      [
        '• Binding (Topaz). Each target must make a Dexterity saving throw. On a failure, it is ',
        rules.restrained,
        ' by magical lines of force for 1 hour.',
      ],
      [
        '• Death (Black Sapphire). Each target must make a Constitution saving throw, dropping to 0 hit points on a failure or suffering 10d8 necrotic damage on a success.',
      ],
      [
        '• Bafflement (Citrine). Each target must make an Intelligence saving throw. On a failed save, it loses its ability to understand the world for 1 hour. It cannot cast spells and has disadvantage on all ability checks and attack rolls.',
      ],
      [
        '• Rage (Garnet). Each target must make a Wisdom saving throw. On a failed save, it becomes hostile to all other creatures and attacks the nearest target. It can repeat the save at the end of each of its turns.',
      ],
      [
        '• Stupor (Emerald). Each target must make a Charisma saving throw, or enter a dazed state, its mind disconnected from its body. A creature takes no actions, and its speed is reduced by half. It recovers after 1 hour or when it takes any damage.',
      ],
    ],
    effects: [
      {
        key: 'weakness',
        name: 'Crippling weakness',
        lands: { on: 'failed-save', save: 'str' },
        text: [
          'Its speed drops to 15 feet, and all its weapon attacks deal damage as if it rolled the minimum result.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'bound',
        name: 'Bound by force',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.restrained],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'baffled',
        name: 'Baffled',
        lands: { on: 'failed-save', save: 'int' },
        text: [
          'It cannot cast spells and has disadvantage on all ability checks and attack rolls.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'rage',
        name: 'Rage',
        lands: { on: 'failed-save', save: 'wis' },
        text: ['it becomes hostile to all other creatures and attacks the nearest target'],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
      {
        key: 'stupor',
        name: 'Stupor',
        lands: { on: 'failed-save', save: 'cha' },
        text: ['A creature takes no actions, and its speed is reduced by half.'],
        lasts: { kind: 'until', text: ['It recovers after 1 hour or when it takes any damage.'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  grave_call: {
    name: 'Grave Call',
    level: 0,
    school: 'necromancy',
    classes: ['Cleric', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a coffin nail)',
    duration: 'Instantaneous',
    text: [
      [
        'You gesture at one creature within range and chant a brief dirge, hastening its doom. The target must succeed on a Wisdom saving throw or suffer 1d8 necrotic damage. If it is below half its maximum hit points, the damage increases to 1d12.',
      ],
      [
        "This spell's damage increases by one die when you reach 5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th level (4d8 or 4d12).",
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  great_wave: {
    name: 'Great Wave',
    level: 8,
    school: 'conjuration',
    classes: ['Druid'],
    castingTime: 'Action',
    range: '300 ft',
    components: 'V, S',
    duration: 'Concentration, up to 6 rounds',
    text: [
      [
        'You create a giant, overwhelming wave at a point you can see, summoning a 50-foot long, 50-foot high, 10-foot thick wall of water. You can increase the casting time when casting the spell up to a maximum of 6 rounds; each round increases the wall’s size by 50 feet in length and height, and 10 feet in thickness (up to a maximum of 300 feet long, 300 feet high, and 60 feet thick).',
      ],
      [
        'The wall lasts for the duration. When the wall appears, each creature within its area must make a Strength saving throw. On a failed save, a creature takes 6d10 bludgeoning damage, or half as much damage on a successful save.',
      ],
      [
        'At the start of each of your turns after the wall appears, the wall, along with any creatures in it, moves 50 feet along the ground in a direction of your choice. Any Huge or smaller creature inside the wall or whose space the wall enters when it moves must succeed on a Strength saving throw or take 5d10 bludgeoning damage. A creature can take this damage only once per round. At the end of the turn, the wall’s height is reduced by 50 feet, and the damage creatures take from the spell on subsequent rounds is reduced by 1d10. When the wall reaches 0 feet in height, the spell ends.',
      ],
      [
        'A creature caught in the wall can attempt to swim through it by making a successful Strength (Athletics) check against your spell save DC. If it fails the check, it can’t move. A creature that moves out of the spell’s area falls to the ground.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  hailstorm: {
    name: 'Hailstorm',
    level: 4,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '300 ft',
    components: 'V, S, M (a piece of onion and a droplet of water)',
    duration: '1 round',
    text: [
      [
        'Balls of ice slam to the ground in a 20-foot radius, 40-foot high cylinder centered on a point within range for the duration. The balls of ice turn the storm’s area of effect into difficult terrain. Any creature starting its turn in the cylinder must make a Dexterity saving throw. It takes 5d4 bludgeoning damage and 5d4 cold damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the bludgeoning and cold damage both increase by 1d4 for each slot level above 4th. Additionally, the radius and height increase by 5 feet for each slot level above 4th.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  hallucination: {
    name: 'Hallucination',
    level: 2,
    school: 'illusion',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a small glass bottle)',
    duration: '1 minute',
    text: [
      [
        'You afflict a creature you can see within range with an illusory phantasm. The target immediately perceives an object, creature, or other phenomenon which you specify. The phantasm lasts for the duration, must be smaller than a 10-foot cube, and is imperceptible except to the target. It seems real, including sound, smell, and any other properties as needed. The spell has no effect on undead or constructs. It can’t cause damage or inflict conditions. The target behaves as if the phantasm is real, and can inspect the phantasm as an action, making an Intelligence (Investigation) check against your spell save DC. If it is close enough to touch the phantasm, it has advantage on this check. On a success, the spell ends.',
      ],
      [
        'As a bonus action while you are within range, you can adjust the phantasm (for instance, moving a creature up to 30 feet, opening a door, or shattering a window).',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  holy_fire: {
    name: 'Holy Fire',
    level: 5,
    school: 'evocation',
    classes: ['Cleric'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a pinch of ash from burnt incense)',
    duration: 'Instantaneous',
    text: [
      [
        'A column of holy fire roars down from the heavens to smite your foes, striking all creatures within a 40-foot high, 10-foot radius cylinder. When you cast this spell, choose if it deals radiant damage, fire damage, or both. All creatures within the cylinder must make a Dexterity saving throw. A creature takes 8d8 damage of the chosen type (4d8 of each type if both were selected) on a failed save, or half as much on a success.',
      ],
      ['Targets gain no benefit from cover for this saving throw.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, the damage increases by 2d8 (or 1d8 of each type) for every two slot levels above 5th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  imbue_element: {
    name: 'Imbue Element',
    level: 3,
    school: 'transmutation',
    classes: ['Druid', 'Paladin', 'Ranger'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You touch a melee weapon and enhance it with elemental power. Choose one of the following damage types: acid, cold, fire, or lightning. For the duration, the weapon deals 1d6 bonus damage on a hit, and the weapon’s base damage is changed to the chosen type. In addition, once per round after a creature takes damage from the weapon, it suffers an effect based on the damage type chosen:',
      ],
      ['• Acid. The target takes 2d4 acid damage at the end of its next turn.'],
      ['• Cold. The target’s speed is halved until the end of its next turn.'],
      ['• Fire. The target takes 1d6 additional fire damage.'],
      ['• Lightning. The target can’t take reactions until the end of its next turn.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the bonus damage increases by 1d6 for every two slot levels above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  impaling_spires: {
    name: 'Impaling Spires',
    level: 6,
    school: 'transmutation',
    classes: ['Druid'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You haul up to six mighty spikes of rock out of the ground, erupting at locations you can see within range. Each spike occupies a 5-foot space, is up to 30 feet tall, and has AC 11 and 30 hit points. Any creature above a spike when the spell is cast must make a Dexterity saving throw. On a failure, it takes 5d10 piercing damage and is impaled if it is Large or smaller, becoming restrained at the top of the spike. Huge creatures can be restrained if targeted with two or more spikes, and Gargantuan creatures with six or more. On a success, a target suffers half as much damage and no other effects. A creature in the area of more than one spike is only damaged once.',
      ],
      [
        'An impaled target can use its action to attempt to free itself with a Strength (Athletics) or Dexterity (Acrobatics) check against your spell save DC. On a success, it is no longer restrained and falls. A target is also freed if all spikes impaling it are destroyed.',
      ],
      [
        'If a creature is slammed into a ceiling or other obstacle when it gets impaled, it takes an additional 2d10 bludgeoning damage, and attempts to free itself are made with disadvantage.',
      ],
      ['The spikes crumble back into the earth after 1 hour.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, you can create two additional spikes for each slot level above 6th.',
      ],
    ],
    effects: [
      {
        key: 'impaled',
        name: 'Impaled',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.restrained],
        lasts: { kind: 'until', text: ['all spikes impaling it are destroyed'] },
        ends: { escape: { dc: 'spell' } },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  incinerate: {
    name: 'Incinerate',
    level: 5,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You channel agonizing flames, wreathing a creature you can see within range. At the start of each of its turns, the target must make a Dexterity saving throw, taking 10d6 fire damage on a failure. On a success, it takes half as much damage and the spell ends for that creature. While a target is on fire, it casts bright light for 30 feet and dim light for an additional 30 feet.',
      ],
      [
        'As a bonus action, you can spread the flames from any target creature to another within 10 feet of it, making that creature an additional target. If damage from this spell reduces a target to 0 hit points, the target is turned to ash.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  inflict_disease: {
    name: 'Inflict Disease',
    level: 5,
    school: 'necromancy',
    classes: ['Cleric', 'Druid'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'Your touch inflicts disease. Make a melee spell attack against a creature within your reach. On a hit, the target is afflicted with one of the diseases listed below (your choice). The spell has no effect on constructs, undead, or creatures immune to disease. The disease is magical and can only be cured by the heal spell or equivalent magic.',
      ],
      [
        'At the end of each of the target’s turns, it must make another Constitution saving throw. If it succeeds, it suffers no effects from the disease until the end of its next turn. When the target has succeeded on three of these saving throws, it is no longer diseased. When it has failed on three of these saving throws, the disease sets in, and lasts for 7 days, or until treated by an appropriate means. Once the target has either three successes or three failures on these saving throws, it stops making saves for this spell.',
      ],
      [
        '• Muscle Weakness. The creature’s arms become unbearably weak. It has disadvantage on Strength checks, Strength saving throws, and attack rolls that use Strength. Its attacks using Strength deal half damage.',
      ],
      [
        '• Trembling Spasms. The creature is overcome with terrible tremors. It has disadvantage on Dexterity checks, Dexterity saving throws, and attack rolls that use Dexterity. Its attacks using Dexterity do half damage.',
      ],
      [
        '• Skinslough. The creature’s skin becomes paper-thin and causes agonizing pain when it tears. It has disadvantage on Constitution checks and Constitution saving throws, except those caused by this spell. In addition, when the creature takes damage, its speed is reduced to 10 feet until the end of its next turn.',
      ],
      [
        '• Mindrot. The creature becomes disoriented and confused. The creature has disadvantage on Intelligence checks and Intelligence saving throws and cannot tell friend from foe in combat.',
      ],
      [
        '• Fire-eyes Fever. The creature’s eyes turn milky white and are searingly painful. It has disadvantage on Wisdom checks and Wisdom saving throws and is ',
        rules.blinded,
        '.',
      ],
      [
        '• Flesh Rot. The creature’s flesh decays. It has disadvantage on Charisma checks and Charisma saving throws and takes 5 additional points of damage when it suffers bludgeoning, piercing, or slashing damage.',
      ],
    ],
    effects: [
      {
        key: 'muscle-weakness',
        name: 'Muscle Weakness',
        lands: { on: 'hit' },
        text: [
          'The creature’s arms become unbearably weak. It has disadvantage on Strength checks, Strength saving throws, and attack rolls that use Strength. Its attacks using Strength deal half damage.',
        ],
        lasts: { kind: 'time', amount: '7', unit: 'day' },
        ends: {
          cure: [
            'The disease is magical and can only be cured by the heal spell or equivalent magic.',
          ],
        },
      },
      {
        key: 'trembling-spasms',
        name: 'Trembling Spasms',
        lands: { on: 'hit' },
        text: [
          'The creature is overcome with terrible tremors. It has disadvantage on Dexterity checks, Dexterity saving throws, and attack rolls that use Dexterity. Its attacks using Dexterity do half damage.',
        ],
        lasts: { kind: 'time', amount: '7', unit: 'day' },
        ends: {
          cure: [
            'The disease is magical and can only be cured by the heal spell or equivalent magic.',
          ],
        },
      },
      {
        key: 'skinslough',
        name: 'Skinslough',
        lands: { on: 'hit' },
        text: [
          'The creature’s skin becomes paper-thin and causes agonizing pain when it tears. It has disadvantage on Constitution checks and Constitution saving throws, except those caused by this spell. In addition, when the creature takes damage, its speed is reduced to 10 feet until the end of its next turn.',
        ],
        lasts: { kind: 'time', amount: '7', unit: 'day' },
        ends: {
          cure: [
            'The disease is magical and can only be cured by the heal spell or equivalent magic.',
          ],
        },
      },
      {
        key: 'mindrot',
        name: 'Mindrot',
        lands: { on: 'hit' },
        text: [
          'The creature becomes disoriented and confused. The creature has disadvantage on Intelligence checks and Intelligence saving throws and cannot tell friend from foe in combat.',
        ],
        lasts: { kind: 'time', amount: '7', unit: 'day' },
        ends: {
          cure: [
            'The disease is magical and can only be cured by the heal spell or equivalent magic.',
          ],
        },
      },
      {
        key: 'fire-eyes-fever',
        name: 'Fire-eyes Fever',
        lands: { on: 'hit' },
        conditions: [rules.blinded],
        text: [
          'The creature’s eyes turn milky white and are searingly painful. It has disadvantage on Wisdom checks and Wisdom saving throws and is ',
          rules.blinded,
          '.',
        ],
        lasts: { kind: 'time', amount: '7', unit: 'day' },
        ends: {
          cure: [
            'The disease is magical and can only be cured by the heal spell or equivalent magic.',
          ],
        },
      },
      {
        key: 'flesh-rot',
        name: 'Flesh Rot',
        lands: { on: 'hit' },
        text: [
          'The creature’s flesh decays. It has disadvantage on Charisma checks and Charisma saving throws and takes 5 additional points of damage when it suffers bludgeoning, piercing, or slashing damage.',
        ],
        lasts: { kind: 'time', amount: '7', unit: 'day' },
        ends: {
          cure: [
            'The disease is magical and can only be cured by the heal spell or equivalent magic.',
          ],
        },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  injunction: {
    name: 'Injunction',
    level: 5,
    school: 'enchantment',
    classes: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Wizard'],
    castingTime: '1 minute',
    range: '60 ft',
    components: 'V',
    duration: '30 days',
    text: [
      [
        "You magically bind a creature that can understand you within range to either complete or abstain from some action or activity. It must succeed on a Wisdom saving throw or become charmed by you for the duration. Once per turn while charmed in this way, the target's current and maximum hit points are reduced by 5d10 if its behavior contradicts your instructions. This reduction lasts until the spell ends.",
      ],
      [
        "You can issue any command you choose, though the spell ends if you issue a suicidal command. The creature's death does not end the spell.",
      ],
      [
        "As an action, you can end the spell early. Remove curse cast at the spell's level also ends the spell. Greater restoration ends the reduction of the target's hit point maximum, but it does not end the spell.",
      ],
      [
        'At Higher Levels. The spell reduces maximum hit points by an additional 1d10 for each slot level above 5th. When you cast this spell using a spell slot of 7th or 8th level, the duration is 1 year. When you cast this spell using a spell slot of 9th level, the spell lasts until it is ended by one of the spells mentioned above.',
      ],
    ],
    effects: [
      {
        key: 'charmed',
        name: 'Charmed',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.charmed],
        text: [
          "Once per turn while charmed in this way, the target's current and maximum hit points are reduced by 5d10 if its behavior contradicts your instructions. This reduction lasts until the spell ends.",
        ],
        lasts: { kind: 'time', amount: '30', unit: 'day' },
        ends: { cure: ["Remove curse cast at the spell's level also ends the spell."] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  irradiate: {
    name: 'Irradiate',
    level: 4,
    school: 'evocation',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You create an eerie, pulsating blue light within a 30-foot radius sphere centered on a point you choose within range. The bright light spreads around corners, and lasts until the spell ends.',
      ],
      [
        'When a creature moves into the spell’s area for the first time on a turn or starts its turn there, it must make a Constitution saving throw. Constructs automatically succeed on saving throws against this spell.',
      ],
      [
        'On a failure, the creature’s hit point maximum is reduced by 7d4, its speed is reduced by 5 feet, and it receives a -2 penalty to attack rolls, ability checks, saving throws, and save DCs. A creature suffers cumulative effects with each failed saving throw. If a creature fails its saving throw five times, it dies.',
      ],
      [
        'Additionally on a failure, the creature emits light in a 5-foot radius and can’t benefit from being ',
        rules.invisible,
        '. Each subsequent failed save increases the radius by 5 feet.',
      ],
      ['All effects caused by this spell (except death) end when the spell ends.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the hit point maximum reduction increases by 1d4 for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'irradiated',
        name: 'Irradiated',
        lands: { on: 'failed-save', save: 'con' },
        text: [
          'the creature’s hit point maximum is reduced by 7d4, its speed is reduced by 5 feet, and it receives a -2 penalty to attack rolls, ability checks, saving throws, and save DCs.',
        ],
        lasts: {
          kind: 'until',
          text: ['All effects caused by this spell (except death) end when the spell ends.'],
        },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  lashing_vine: {
    name: 'Lashing Vine',
    level: 2,
    school: 'conjuration',
    classes: ['Druid', 'Ranger'],
    castingTime: '1 minute',
    range: '30 ft',
    components: 'V, S',
    duration: '1 minute',
    text: [
      [
        'You cause a magical vine to burst forth from the ground, wall, or ceiling in an unoccupied space of your choice that you can see within range. The vine is an object that has an AC and hit points equal to your spell save DC. When you cast this spell, and as a bonus action on your subsequent turns for the duration, you can direct the vine to pull a Large or smaller creature within 30 feet of it that you can see. That creature must succeed on a Dexterity saving throw or be pulled 20 feet directly toward the vine. The spell ends if you cast it again or dismiss it as an action.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the range and distance the vine can pull a creature increases by 10 feet for each slot level above 2nd. If you cast this spell using a spell slot of 4th level or higher, the vine can attempt to pull a Huge or smaller creature.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  life_drain_spells_that_dont_suck: {
    name: 'Life Drain',
    level: 3,
    school: 'necromancy',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send tendrils of necrotic energy out, sucking the life essence from your foes. Select up to three creatures within range that aren’t constructs or undead. Make a ranged spell attack against each target, dealing 3d6 necrotic damage on a hit. You regain hit points equal to half the damage dealt.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d6 for every two slot levels above 5th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  lightning_beam: {
    name: 'Lightning Beam',
    level: 3,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a piece of quartz and a bit of fine dust)',
    duration: 'Instantaneous',
    text: [
      [
        'A brilliant, blue-white beam of lightning flashes forth from your fingertips, forming a line 100 feet long and 5 feet wide in a direction you choose.',
      ],
      [
        'You can cause the beam to bounce once off of a solid, non-conductive object that you can see (such as a stone wall) in a new direction you choose equal to the beam’s remaining length. Each creature in the beam’s path must make a Dexterity saving throw. A target creature takes 4d12 lightning damage on a failure, or half as much damage on a success.',
      ],
      ['The lightning ignites flammable objects in the area that aren’t being worn or carried.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d12 for each slot level above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  lightning_leash: {
    name: 'Lightning Leash',
    level: 0,
    school: 'evocation',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: '1 round',
    text: [
      [
        'You create a whip of crackling electricity and crack it outwards at a creature you choose that you can see within 30 feet. Make a melee spell attack. On a hit, the target takes 1d6 lightning damage and is ensnared by the lightning leash. If the target moves outside of the spell’s range before the start of your next turn, you can use your reaction to yank on the leash. The target must succeed on a Strength saving throw or take 1d6 lightning damage and have its speed halved until the start of your next turn. Once it is outside of the spell’s range, the leash dissipates.',
      ],
      [
        'Both damage rolls increase by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
      ],
    ],
    effects: [
      {
        key: 'speed-halved',
        name: 'Leash yanked',
        lands: { on: 'failed-save', save: 'str' },
        text: ['have its speed halved'],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  lightning_tendril: {
    name: 'Lightning Tendril',
    level: 1,
    school: 'evocation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '20 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'Crackling beams of blue energy leap from your hands. For the duration of the spell, as an action, you can direct them toward a creature within range, dealing 1d12 lightning damage to that creature.',
      ],
      [
        'At Higher Levels. When you cast this spell using a 2nd- or 3rd-level spell slot, the damage increases to 2d12 and the range increases to 30 feet. When you cast it using a 4th- or 5th-level spell slot, the damage increases to 3d12 and the range increases to 60 feet. When you cast it using a spell slot of 6th level or higher, the damage increases to 4d12 and the range increases to 120 feet.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  luminous_smite: {
    name: 'Luminous Smite',
    level: 2,
    school: 'evocation',
    classes: ['Paladin'],
    castingTime: 'Bonus Action',
    range: 'Self',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'The next time you hit a creature with a melee weapon attack before this spell ends, the weapon flashes with otherworldly light, dealing 2d8 additional radiant damage. Until the spell ends, the target can’t be ',
        rules.invisible,
        ', isn’t obscured by a darkness spell, and sheds dim light in a 5-foot radius.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the extra damage increases by 1d8 for each slot level above 2nd.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  lunar_beam: {
    name: 'Lunar Beam',
    level: 2,
    school: 'evocation',
    classes: ['Druid'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a small pearl or quartz disc)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You call down a beam of shimmering moonlight at a point within range. The beam takes the shape of a 5-foot radius, 40-foot high cylinder of dim light.',
      ],
      [
        'When a creature starts its turn in the beam or moves into the beam during its turn, it is seared by the pale light. It must make a Constitution saving throw, taking 2d10 radiant damage on a failure, or half as much on a success. A shapechanger or other creature susceptible to silver has disadvantage on this saving throw, takes an additional 1d10 damage on a failure, and cannot change its form while within the beam.',
      ],
      [
        'As an action on each of your subsequent turns, you can move the beam up to 60 feet in any direction within the spell’s range.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d10 for each slot level above 2nd.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  magic_fruit: {
    name: 'Magic Fruit',
    level: 1,
    school: 'transmutation',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S, M (up to 10 pieces of freshly-picked fruit)',
    duration: '24 hours',
    text: [
      [
        'You infuse the components used in the spell’s casting with magic. The fruit gains minor healing properties for the duration. A creature can use its action to eat one fruit and restore 1 hit point. If a creature eats 10 infused fruits, the magic combines to provide enough nourishment to sustain a creature for one day.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  magic_net: {
    name: 'Magic Net',
    level: 1,
    school: 'abjuration',
    classes: ['Druid', 'Ranger', 'Wizard'],
    castingTime: '1 minute',
    range: '5 ft',
    components:
      'S, M (a length of wire, string, cord, or rope worth at least 5 sp, which the spell consumes)',
    duration: 'Instantaneous',
    text: [
      [
        'You construct a magical 5-foot radius, 10-foot high cylinder snare trap at a point on the ground within range. The trap is barely visible but can be detected with a successful Intelligence check against your spell save DC. If a creature detects the trap, it is immune to the spell. When a creature moves into the cylinder, it must succeed on a Dexterity saving throw or become restrained and be magically lifted 10 feet up into the air, where it hangs upside down. Huge or larger creatures automatically succeed. As an action, a creature can attempt to free itself by making a Strength (Athletics) or Dexterity (Acrobatics) check against your spell save DC, ending the spell on a success.',
      ],
    ],
    effects: [
      {
        key: 'netted',
        name: 'Netted',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 'spell' } },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  manipulate_earth: {
    name: 'Manipulate Earth',
    level: 0,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Special',
    text: [
      [
        'You mold earth you can see within range, causing it to twist and buckle to your command. Select one of the following effects:',
      ],
      [
        '• You can excavate a 5-foot cube of loose dirt or soil and move it along the ground to another unoccupied space within 5 feet.',
      ],
      [
        '• You can make minor alterations to dirt or stone, such as changing its color or carving small, simple shapes.',
      ],
      [
        '• You can turn a 5-foot square of earth or stone into difficult terrain for 1 hour. You can create up to three patches of difficult terrain this way; if you create additional patches, the first one you created returns to normal terrain.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  manipulate_fire: {
    name: 'Manipulate Fire',
    level: 0,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Special',
    text: [
      [
        'You control a fire you can see within range, causing it to bend to your command. Select one of the following effects:',
      ],
      [
        '• You can grant a creature of your choice within range resistance to fire damage until the start of your next turn.',
      ],
      [
        '• You can spark or spread fire in a 5-foot cube, as long as there is fuel that can be ignited within the area.',
      ],
      ['• You can douse fire within a 5-foot cube.'],
      [
        '• You can adjust a flame’s brightness (halving or doubling it), color (turning the flames to any color of your choice), or shape (forming simple shapes) within a 5-foot cube for 10 minutes.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  manipulate_water: {
    name: 'Manipulate Water',
    level: 0,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: '1 round',
    text: [
      [
        'You shape water you can see within range, causing it to move at your command. Select one of the following effects:',
      ],
      [
        '• You can move or direct the flow of a 5-foot cube of water in a direction of your choice, but the water will revert back to its natural flow at the start of your next turn unless you concentrate on keeping it in place.',
      ],
      [
        '• You can mold the water into small shapes or simple animations. This change lasts for 1 minute.',
      ],
      [
        '• You can change the color or opacity of a 5-foot cube of water. This change lasts for 1 hour.',
      ],
      [
        '• You can freeze up to a 5-foot cube of unoccupied water or thaw up to a 5-foot cube of ice. The water unfreezes or refreezes naturally based on the environmental conditions (usually taking an hour or more to completely melt or freeze unless in extreme conditions).',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  manipulate_wind: {
    name: 'Manipulate Wind',
    level: 0,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: '1 round',
    text: [
      [
        'You create a small gust within range, causing the air to surge and swirl to your command. Select one of the following effects:',
      ],
      [
        '• The next ranged weapon attack against a creature of your choice within range has disadvantage.',
      ],
      [
        '• One Large or smaller creature of your choice within range must succeed on a Strength saving throw or be pushed 5 feet or knocked prone (your choice).',
      ],
      [
        '• You can increase the next jump made by a creature of your choice within range by 5 feet.',
      ],
      [
        '• You manipulate the wind in a minor way, such as pushing a light object up to 10 feet, rustling plants, slamming a door, or similar effects. These aren’t powerful enough to move creatures or deal damage.',
      ],
    ],
    effects: [
      {
        key: 'knocked-prone',
        name: 'Knocked prone',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  martial_transformation: {
    name: 'Martial Transformation',
    level: 6,
    school: 'transmutation',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a small statuette of a warrior)',
    duration: '10 minutes',
    text: [
      [
        'You empower yourself with the physical prowess and battle knowledge of famous warriors. Until the spell ends, you can’t cast spells or concentrate on them, and you gain the following benefits:',
      ],
      ['• You gain 50 temporary hit points for the duration.'],
      [
        '• You have advantage on all weapon attacks, and when you hit a target with a weapon attack, it takes an extra 2d12 force damage.',
      ],
      [
        '• You have proficiency in all armor, shields, simple weapons, martial weapons, and with Strength and Constitution saving throws.',
      ],
      [
        '• You can attack twice, instead of once, when you take the Attack action on your turn, unless you already have a feature (such as Extra Attack) which gives you extra attacks.',
      ],
      [
        '• You can conjure and equip (as part of the action used to cast the spell) any armor and any simple or martial weapon of your choice. These items have no strength requirements and are magical in nature, but otherwise have the same properties as their nonmagical counterparts. The equipment vanishes when the spell ends.',
      ],
      [
        'Immediately after the spell ends, you must succeed on a DC 15 Constitution saving throw or suffer one level of exhaustion. You can end the spell as a bonus action.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  mass_freeze: {
    name: 'Mass Freeze',
    level: 5,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You choose a point within range and cause all the warmth to vanish from its vicinity. Each creature in a 20-foot radius sphere centered on that point must make a Constitution saving throw. A target takes 4d8 cold damage on a failure, or half as much damage on a success.',
      ],
      [
        'If a creature fails the saving throw, it is frozen in place, locked down by sheets of ice. It takes 1d8 cold damage at the start of each of its turns, and is ',
        rules.restrained,
        '. It may reattempt the saving throw at the end of each of its turns, ending the effect on a success.',
      ],
    ],
    effects: [
      {
        key: 'frozen',
        name: 'Frozen',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.restrained],
        text: ['It takes 1d8 cold damage at the start of each of its turns.'],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  mind_link: {
    name: 'Mind Link',
    level: 8,
    school: 'enchantment',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: ' anys',
    components: 'V, S, M (a piece of sea coral and a spiderweb)',
    duration: '24 hours',
    text: [
      [
        'You form a mental connection with another creature. The target must make a Wisdom saving throw modified by its location and your familiarity. The target is aware of the contact and can choose to fail its saving throw.',
      ],
      ['Circumstances · Save Modifier'],
      ['On a different plane · +10'],
      ['Secondhand (you know of the target) · +5'],
      ['Firsthand (you have met the target) · 0'],
      ['Familiar (you know the target well) · -5'],
      ['Within sight or hearing · -5'],
      [
        'On a failure, you and the target can communicate via the link, and the target recognizes you as a creature it is communicating with. Additionally, you can cast any divination or illusion spell of 4th level or lower that targets a creature on the creature you have linked to, regardless of the spell’s range requirement, such as detect thoughts or major image, but the spell only affects that creature. Finally, you can use your action to use its senses instead of your own until the start of your next turn.',
      ],
      [
        'If you cast a spell in this manner, the target may repeat its saving throw against this spell at the end of each of its turns.',
      ],
    ],
    effects: [
      {
        key: 'mind-link',
        name: 'Mind link',
        lands: { on: 'failed-save', save: 'wis' },
        text: [
          'On a failure, you and the target can communicate via the link, and the target recognizes you as a creature it is communicating with.',
        ],
        lasts: { kind: 'time', amount: '24', unit: 'hour' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  minor_drain: {
    name: 'Minor Drain',
    level: 1,
    school: 'necromancy',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a pulse of necrotic energy towards a target, sucking its life essence away. Make a ranged spell attack. On a hit, the target takes 3d6 necrotic damage, and you gain half the damage dealt as temporary hit points. These temporary hit points fade after 1 minute.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  misdirection_spells_that_dont_suck: {
    name: 'Misdirection',
    level: 5,
    school: 'illusion',
    classes: ['Bard', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'As an action, or as a reaction when you are hit by an attack, you become ',
        rules.invisible,
        ', hidden and create an illusory double of yourself in your space. The double can move at your speed, can gesture or speak as you choose, and mimics any action you take (your attacks or spells appear to originate from the double). The double has the same AC as you.',
      ],
      [
        'Any time a creature would damage the double, or perceives the double making an attack or casting a spell, it makes an Intelligence (Investigation) check against your spell save DC. If the check succeeds, it realizes the double is an illusion and you are no longer invisible to that creature.',
      ],
      [
        'As an action, you can use the double’s senses instead of your own until you use your action to return to your normal senses, or until the spell ends. While you do so, you are blinded and deafened to your own surroundings.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  misfortune: {
    name: 'Misfortune',
    level: 1,
    school: 'abjuration',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime:
      'Reaction, a creature you can see within 60 feet succeeds with an attack roll, an ability check, or a saving throw',
    range: '60 ft',
    components: 'V',
    duration: 'Instantaneous',
    text: [
      [
        'You magically reshape causality for the triggering creature, negatively influencing its efforts. The triggering creature must reroll the d20 and use the lower roll.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  morph_earth: {
    name: 'Morph Earth',
    level: 5,
    school: 'transmutation',
    classes: ['Druid', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a handful of rice and water)',
    duration: 'Until dispelled',
    text: [
      ['You transform up to a 40-foot cube of earth with one of the following effects:'],
      [
        'Create Mud. Rock and dirt in the area becomes mud for the spell’s duration. Creatures sink into the ground, and each foot that a creature moves costs 4 feet of movement. If a creature is on the ground when you cast the spell, moves into the area for the first time, or ends its turn there, it must make a Strength saving throw. On a failure, the creature is ',
        rules.restrained,
        '. As an action, a restrained target or another creature within 5 feet can end the ',
        rules.restrained,
        ' condition.',
      ],
      [
        'Create Rock. An area of wet earth less than 10 feet deep becomes rock for the spell’s duration. Any creature standing in the mixture when it hardens must make a Dexterity saving throw. On a success, a creature moves to an unoccupied space on the rock’s surface. On a failure, a creature is ',
        rules.restrained,
        '. As an action, a restrained target or another creature within 5 feet can end the ',
        rules.restrained,
        ' condition by succeeding on a Strength (Athletics) check against your spell save DC. The rock has AC 15 and 25 hit points and is immune to poison and psychic damage.',
      ],
    ],
    effects: [
      {
        key: 'stuck-in-mud',
        name: 'Stuck in mud',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: {
          cure: [
            'As an action, a restrained target or another creature within 5 feet can end the ',
            rules.restrained,
            ' condition.',
          ],
        },
      },
      {
        key: 'stuck-in-rock',
        name: 'Stuck in rock',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 'spell' } },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  muddy_servant: {
    name: 'Muddy Servant',
    level: 2,
    school: 'transmutation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S, M (a pinch of earth and a drop of water)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You take control of loose soil and rock and mold it into a small construct, creating a Medium mud golem which occupies a 5-foot space within range. The mud golem has AC 12 and 20 hit points. It can immediately grab at a Large or smaller creature within 5 feet, forcing the target to make a Strength saving throw. On a failure, the target becomes restrained and takes 2d6 bludgeoning damage.',
      ],
      [
        'As long as the mud golem is within 30 feet of you, you can mentally command it as an action. If it is restraining a target, you can command it to squeeze. The target makes a Strength saving throw, taking 2d6 bludgeoning damage on a failure, or half as much on a success. Alternatively, you can command the golem to dissolve and reform (with full hit points, even if it has been destroyed) anywhere within the spell’s range and attempt to grab a creature within 5 feet. You can order the golem to let go of a creature at any time (no action required).',
      ],
      [
        'To break out, a restrained target can use its action to attempt a Strength (Athletics) or Dexterity (Acrobatics) check against your spell save DC. On a success, it is no longer ',
        rules.restrained,
        '.',
      ],
    ],
    effects: [
      {
        key: 'held-by-golem',
        name: 'Held by mud golem',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 'spell' } },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  natures_fury: {
    name: "Nature's Fury",
    level: 5,
    school: 'evocation',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You summon the power of the natural world to assault your foes. For the duration of the spell, all terrain within 60 feet of you is difficult terrain except for creatures you specify. When you cast the spell and as a bonus action on your subsequent turns, you can create one of the following effects, targeting any point you can see within 60 feet of you.',
      ],
      [
        '• Trees. A tree erupts from the ground and reaches out to rake your enemies with its branches. Each creature of your choice within 10 feet must succeed on a Dexterity saving throw or take 6d6 slashing damage.',
      ],
      [
        '• Roots. Roots erupt from the ground, seizing creatures within a 10-foot radius. Each creature must make a Strength saving throw or become ',
        rules.restrained,
        '. Any creature within 5 feet of a restrained creature can use an action to make a Strength (Athletics) check against your spell save DC, ending the effect on a success.',
      ],
      [
        '• Rocks. You conjure a boulder and hurl it at a creature. Make a ranged spell attack. On a hit, the target takes 6d10 bludgeoning damage and is knocked prone if it is Large or smaller.',
      ],
      [
        '• Wind. You summon a mighty gust. The gust takes the shape of a line 60 feet long and 20 feet wide, originating at a location you can see and traveling in a direction of your choice. All Large or smaller creatures within the area must succeed on a Strength saving throw or be swept 25 feet in the direction of the gust and knocked ',
        rules.prone,
        '.',
      ],
    ],
    effects: [
      {
        key: 'roots',
        name: 'Roots',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 'spell' } },
      },
      {
        key: 'rocks',
        name: 'Knocked prone by rock',
        lands: { on: 'hit' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
      {
        key: 'wind',
        name: 'Knocked prone by wind',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  natures_protection: {
    name: "Nature's Protection",
    level: 5,
    school: 'abjuration',
    classes: ['Druid'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'Your surrounding natural environment accommodates your movement while creating obstacles to protect you in a 10-foot radius. Until the spell ends, the aura moves with you, centered on you. The area within the aura provides three-quarters cover, and is difficult terrain for creatures other than you.',
      ],
      [
        'As a bonus action (or as a reaction to a creature entering the aura), you can cause the elements to powerfully surge away from you. Large or smaller creatures within the aura must make a Strength saving throw. On a success, a creature is pushed out of the aura’s area to the nearest unoccupied space. On a failure, the creature also falls ',
        rules.prone,
        '.',
      ],
    ],
    effects: [
      {
        key: 'knocked-prone',
        name: 'Knocked prone',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  necromantic_infusion: {
    name: 'Necromantic Infusion',
    level: 3,
    school: 'necromancy',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, M (a handful of bone chips)',
    duration: 'Instantaneous',
    text: [
      [
        'You open a conduit to a plane of death, infusing one creature you can see within range with a jolt of negative energy. A living target must make a Constitution saving throw, taking 5d8 necrotic damage on a failure or half as much on a success. An undead target gains 5d8 temporary hit points. While it has these temporary hit points, it has advantage on its attacks.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  necromantic_storm: {
    name: 'Necromantic Storm',
    level: 5,
    school: 'necromancy',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, M (a piece of tattered black silk)',
    duration: 'Instantaneous',
    text: [
      [
        'You tear a rift to a plane of death at a point within range, summoning forth a flood of negative energy. All non-undead creatures within 10 feet of the rift must make a Constitution saving throw, taking 6d8 necrotic damage on a failure or half as much on a success. If a creature is killed by this spell, the blast spreads, affecting a 10-foot radius around that creature as well. A creature cannot be damaged twice by the spell, and the spell ends after damaging 10 creatures.',
      ],
      [
        'If a humanoid dies from this spell, it rises as a zombie at the start of your next turn and attacks the closest living creature. The GM may either use the zombie statistics from the Basic Rules, or the zombie template as described in reanimation. At the GM’s discretion, other creature types may rise as different undead.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the maximum number of creatures damaged increases by 2 for each slot level above 5th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  necrotic_sphere: {
    name: 'Necrotic Sphere',
    level: 6,
    school: 'necromancy',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '150 ft',
    components: 'V, S, M (a lead nail)',
    duration: 'Instantaneous',
    text: [
      [
        'You send a pulse of necromantic power radiating outward in a 60-foot radius from a point you can see within range. The pulse rips the life force out of up to eight creatures, starting from the center of the area and moving outward (prioritizing targets with fewer hit points). Each affected creature must make a Constitution saving throw, taking 8d8 necrotic damage on a failure or half as much on a success.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, the number of creatures affected increases by four for each slot level above 6th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  oakenhide: {
    name: 'Oakenhide',
    level: 2,
    school: 'transmutation',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: '1 minute',
    text: [
      [
        'You magically encase your body in a hard shell of bark. You gain 6 temporary hit points at the start of each of your turns, and while you have these temporary hit points, you can calculate your AC as 15 + your Dexterity modifier (maximum of +2).',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, your AC increases by 1 for every two slot levels above 2nd. The temporary hit points increase by 3 for each slot level above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  petrify: {
    name: 'Petrify',
    level: 6,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a pinch of chalk, water, and dirt)',
    duration: 'Concentration, up to 3 rounds',
    text: [
      [
        'You attempt to petrify a creature that you can see within range. If the target’s body is made of flesh, the creature must make a Constitution saving throw. If it fails its saving throw by 5 or more, the creature is instantly petrified; otherwise, a creature that fails the save begins to turn to stone and is ',
        rules.restrained,
        '.',
      ],
      [
        'A creature restrained by this spell must make another Constitution saving throw at the end of each of its turns. If it successfully saves against this spell three times, the spell ends; if it fails its save, it is ',
        rules.petrified,
        '.',
      ],
      [
        'The petrification lasts until the creature is freed by the greater restoration spell or other magic.',
      ],
      [
        'If the creature is physically broken while ',
        rules.petrified,
        ', it suffers from similar damage if it reverts to its original state.',
      ],
    ],
    effects: [
      {
        key: 'turning-to-stone',
        name: 'Turning to stone',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'], successes: 3 },
        becomes: {
          failures: 1,
          key: 'petrified',
          name: 'Petrified',
          outlastsConcentration: true,
          conditions: [rules.petrified],
          lasts: {
            kind: 'until',
            text: [
              'The petrification lasts until the creature is freed by the greater restoration spell or other magic.',
            ],
          },
        },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  phantasm: {
    name: 'Phantasm',
    level: 2,
    school: 'illusion',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: "V, S, M (a small piece of lambs' wool)",
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You plant a debilitating phantasm into the mind of a creature you can see within range. The target must succeed on a Wisdom saving throw or it believes the phantasm to be real and capable of hindering and harming it. When you cast the spell, select one of the following options:',
      ],
      ['• ', rules.blinded, '. Your phantasm blocks the target’s sight, blinding it.'],
      ['• ', rules.restrained, '. Your phantasm entangles the target, restraining it.'],
      [
        '• Terrified. Your phantasm takes the form of the target’s greatest fears, making it ',
        rules.frightened,
        '.',
      ],
      [
        '• Assailed. Your phantasm is real enough to cause harm. The target takes 2d10 psychic damage at the start of each of its turns.',
      ],
      [
        'The target can repeat the saving throw at the end of each of its turns, ending the spell on a success.',
      ],
    ],
    effects: [
      {
        key: 'phantasm-blinded',
        name: 'Blinded by phantasm',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.blinded],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
      {
        key: 'phantasm-restrained',
        name: 'Restrained by phantasm',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.restrained],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
      {
        key: 'phantasm-terrified',
        name: 'Terrified by phantasm',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.frightened],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  phantasmal_horror: {
    name: 'Phantasmal Horror',
    level: 4,
    school: 'illusion',
    classes: ['Bard', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You select a creature you can see within range and create an illusion of its worst nightmares, which only it can see. At the start of each of the target’s turns, it must make a Wisdom saving throw. On a failure, it takes 4d10 psychic damage and is ',
        rules.frightened,
        '. On a success, the spell ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d10 for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'frightened',
        name: 'Frightened',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.frightened],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['start-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  phantasmal_nightmares: {
    name: 'Phantasmal Nightmares',
    level: 9,
    school: 'illusion',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You create horrifying illusions in the minds of creatures you can see. Select any number of creatures within 30 feet of a point you can see within range. Each target must make a Wisdom saving throw or become ',
        rules.frightened,
        ' for the duration. While frightened in this way, at the start of a creature’s turn, it takes 6d10 psychic damage and must roll 1d10, suffering an effect from the table below. Unless noted, effects last until the start of the creature’s next turn.',
      ],
      ['d10 · Effect'],
      [
        '1 · The creature believes itself dead and falls ',
        rules.unconscious,
        ' until it takes damage or is awoken as an action.',
      ],
      ['2-3 · The creature is ', rules.paralyzed, ' with fear.'],
      ['4-5 · The creature is ', rules.stunned, '.'],
      ["6-7 · The creature's speed is reduced to 0."],
      ['8-10 · The creature screams uncontrollably and can make no other sounds.'],
      [
        'A creature can repeat the saving throw at the end of each of its turns, ending the spell for itself on a success.',
      ],
    ],
    effects: [
      {
        key: 'frightened',
        name: 'Frightened',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.frightened],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  poison_fang: {
    name: 'Poison Fang',
    level: 0,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You conjure a spectral snake that bites down on one creature you can see within range. The target must succeed on a Constitution saving throw or take 1d12 poison damage and be ',
        rules.poisoned,
        ' until the start of its next turn.',
      ],
      [
        "This spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Poisoned',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.poisoned],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  power_word_nap: {
    name: 'Power Word Nap',
    level: 3,
    school: 'enchantment',
    classes: ['Bard', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '3 ft',
    components: 'V',
    duration: 'Special',
    text: [
      [
        'You command up to three willing prone creatures of your choice that you can see within range to sleep. The spell ends for a target if it wakes up, such as through damage or being shaken awake as an action. If a target remains ',
        rules.unconscious,
        ' for the full duration, that target gains the benefit of a short rest, and it can’t benefit from this spell again until it finishes a long rest. The spell’s duration is one-fifth the time normally required for a short rest (for example, 12 minutes for a one-hour rest).',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, you can target one additional willing creature for each slot level above 3rd.',
      ],
    ],
    effects: [
      {
        key: 'nap',
        name: 'Asleep',
        lands: { on: 'use' },
        conditions: [rules.unconscious],
        lasts: {
          kind: 'until',
          text: [
            'The spell ends for a target if it wakes up, such as through damage or being shaken awake as an action',
          ],
        },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  prismatic_bolt: {
    name: 'Prismatic Bolt',
    level: 1,
    school: 'evocation',
    classes: ['Sorcerer'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a blast of chaotically shifting energy at one creature within range. Make a ranged spell attack. On a hit, the bolt deals 1d8 damage. The number rolled on the die determines the damage type, additional damage, and additional effects. If you roll more than 1d8 (for instance, on a critical hit or casting at a higher level), you may select which d8 determines the table result.',
      ],
      [
        '1 · Acid · The target takes 2d4 acid damage immediately, and 3d4 acid damage at the end of its next turn.',
      ],
      [
        '2 · Cold · The target takes 2d8 cold damage and has its speed halved until the end of its next turn.',
      ],
      ['3 · Fire · The target takes 3d6 fire damage.'],
      [
        '4 · Force · The target takes 3d4 force damage and is knocked prone if it is Large or smaller.',
      ],
      [
        "5 · Lightning · The target takes 1d12 lightning damage and can't take reactions until the start of its next turn.",
      ],
      [
        '6 · Poison · The target takes 1d12 poison damage and is ',
        rules.poisoned,
        ' until the end of its next turn.',
      ],
      [
        '7 · Psychic · The target takes 2d8 psychic damage and is ',
        rules.charmed,
        ' by you until the end of its next turn.',
      ],
      [
        '8 · Thunder · The target takes 2d8 thunder damage and is ',
        rules.deafened,
        ' until the end of its next turn.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the initial damage roll increases by 1d8 for each slot level above 1st.',
      ],
    ],
    effects: [
      {
        key: 'cold-slow',
        name: 'Speed halved',
        lands: { on: 'hit' },
        text: ['has its speed halved'],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'force-prone',
        name: 'Knocked prone',
        lands: { on: 'hit' },
        conditions: [rules.prone],
        text: ['is knocked ', rules.prone, ' if it is Large or smaller'],
        lasts: { kind: 'until-removed' },
      },
      {
        key: 'lightning-no-reactions',
        name: 'No reactions',
        lands: { on: 'hit' },
        text: ["can't take reactions"],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
      {
        key: 'poison',
        name: 'Poisoned',
        lands: { on: 'hit' },
        conditions: [rules.poisoned],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'psychic-charm',
        name: 'Charmed',
        lands: { on: 'hit' },
        conditions: [rules.charmed],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'thunder-deafen',
        name: 'Deafened',
        lands: { on: 'hit' },
        conditions: [rules.deafened],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  psychic_skewer: {
    name: 'Psychic Skewer',
    level: 2,
    school: 'divination',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You pierce the mind of one creature you can see within range. The target must make an Intelligence saving throw, taking 3d8 psychic damage on a failure, or half as much damage on a success. On a failure, you psychically pin the target and link yourself to its mind. For the duration, you can use a bonus action to mentally twist the skewer, causing the creature to subtract 1d4 from the next saving throw it makes before the end of your next turn.',
      ],
      [
        'Additionally, you have perfect knowledge of the target’s location as long as you are on the same plane of existence. The target can’t be hidden from you and gains no benefit from the ',
        rules.invisible,
        ' condition against you. If you maintain concentration for the full duration, this knowledge persists 1 hour after the spell ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'twisted',
        name: 'Pinned',
        lands: { on: 'failed-save', save: 'int' },
        text: [
          'causing the creature to subtract 1d4 from the next saving throw it makes before the end of your next turn',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  psychokinesis: {
    name: 'Psychokinesis',
    level: 5,
    school: 'transmutation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You attempt to mentally manipulate a creature or object you can see within range. Choose one of the following effects:',
      ],
      [
        '• Creature. You attempt to move a Huge or smaller creature, including yourself. The creature must make a Strength saving throw. A creature can willingly fail this save. On a failure, you move the creature up to 30 feet in any direction within the spell’s range, and you may restrain the creature until the end of your next turn.',
      ],
      [
        '• Object. You attempt to move an object that weighs up to 1,000 pounds and can exert fine control on it. If the object isn’t being worn or carried, you move it up to 30 feet in any direction within the spell’s range. If the object is worn or carried by a creature, the creature must make a Strength saving throw. On a failure, you pull the object away from that creature and can move it up to 30 feet in any direction within the spell’s range.',
      ],
      ['A creature or object moved into mid-air will hover until the end of your next turn.'],
      [
        'On each of your turns after you cast this spell, you can use an action to attempt to continue the effect (with the target repeating the saving throw) or choose a new target. You can only affect one object or creature at a time.',
      ],
    ],
    effects: [
      {
        key: 'restrained',
        name: 'Restrained',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.restrained],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  rain_of_fire: {
    name: 'Rain of Fire',
    level: 7,
    school: 'evocation',
    classes: ['Cleric', 'Druid', 'Sorcerer'],
    castingTime: 'Action',
    range: '150 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You create a whirling storm of fire in the air, calling down destruction upon your enemies. The firestorm appears at a height of your choice between 20 and 300 feet above you, centered above your current location.',
      ],
      [
        'When you cast the spell, and as a bonus action on subsequent turns, you can call down a 5-foot radius cylinder of fire at five points you can see within 120 feet. Creatures within an area must make a Dexterity saving throw, taking 8d6 fire damage on a failure or half as much on a success. A creature in more than one area is affected only once. The fire ignites flammable objects that aren’t being worn or carried.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  reanimation: {
    name: 'Reanimation',
    level: 3,
    school: 'necromancy',
    classes: ['Cleric', 'Wizard'],
    castingTime: '1 minute',
    range: '10 ft',
    components: 'V, S',
    duration: '24 hours',
    text: [
      [
        'You channel necromantic energy to raise a corpse as an undead servant. Choose a pile of bones or corpse within range, which belonged in life to a humanoid of challenge rating 2 or lower. The target is raised as a skeleton or zombie, respectively, applying the Skeleton or Zombie template to its former stat block.',
      ],
      [
        'On each of your turns, you can use a bonus action to mentally command any or all minions you have created through this spell within 60 feet. You select an action for each creature and where it will move. If you issue no command, the creature moves to attack any creatures hostile to it or takes the Dodge action if it cannot detect any.',
      ],
      [
        'The creature is under your control for 24 hours, after which it becomes hostile to you and all living things. You can control a number of minions up to your proficiency bonus through this spell, but their combined challenge rating cannot exceed 3, and you must wait 24 hours after creating one before you can create another. If you cast the spell while you have any controlled reanimated servants, you may renew the duration of their control rather than creating a new one.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  reanimation_greater: {
    name: 'Reanimation, Greater',
    level: 3,
    school: 'necromancy',
    classes: ['Cleric', 'Wizard'],
    castingTime: '1 minute',
    range: '10 ft',
    components: 'V, S',
    duration: '24 hours',
    text: [
      [
        'You summon a mighty surge of necromantic power to revive the dead as undead servants. Choose a number of bone piles or corpses within range up to your proficiency bonus, which belonged in life to a creature of challenge rating 6 or lower. Each target is raised as a skeleton, zombie, or ghoul, applying the appropriate template to its former stat block.',
      ],
      [
        'On each of your turns, you can use a bonus action to mentally command any or all minions you created through this spell within 60 feet. You select an action for each creature and where it will move. If you issue no command, the creature moves to attack any creatures hostile to it or takes the Dodge action if it cannot detect any.',
      ],
      [
        'The targets are under your control for 24 hours, after which they become hostile to you and all living things. You can control a number of minions up to your proficiency bonus through this spell, but their combined challenge rating cannot exceed 10. You can cast this spell without any targets to renew the duration of control on all your current minions, as well as any created through reanimation. Minions created through reanimation also count towards the challenge rating limit of 10.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  rejuvenation: {
    name: 'Rejuvenation',
    level: 7,
    school: 'transmutation',
    classes: ['Bard', 'Cleric', 'Druid'],
    castingTime: 'Action',
    range: 'Touch',
    components: "V, S, M (a lizard's tail)",
    duration: '10 minutes',
    text: [
      [
        'You touch a creature and imbue it with miraculous life, causing its flesh to knit back together and repair itself. For the duration of the spell, the target gains 10 hit points at the start of each of its turns. If you reach your hit point maximum while affected by this spell, then scars are healed, missing limbs or digits regrow, and permanent wounds are fully mended.',
      ],
      [
        'The spell ends early if the target takes a single instance of fire or acid damage equal to or greater than twice your level.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  riptide_spells_that_dont_suck: {
    name: 'Riptide',
    level: 3,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You conjure a sudden wave in a 20-foot square on the ground or in a body of water which you can see within range. Each creature in the area must make a Strength saving throw. On a failure, it takes 4d8 bludgeoning damage and a Huge or smaller creature is knocked ',
        rules.prone,
        '. On a success, it takes half as much damage and is not knocked ',
        rules.prone,
        '. All creatures failing the save are moved 15 feet in a direction of your choice.',
      ],
      [
        'At Higher Levels. When you cast this spell with a spell slot of 4th level or higher, the damage increases by 1d8 and the distance moved on a failed save increases by 5 feet for each slot level above 3rd.',
      ],
    ],
    effects: [
      {
        key: 'prone',
        name: 'Knocked prone',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        text: ['a Huge or smaller creature is knocked ', rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  rot: {
    name: 'Rot',
    level: 4,
    school: 'necromancy',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You infuse a creature with a powerful burst of necrotic power, causing its flesh to blacken and fall away. The target must make a Constitution saving throw. On a failure, the target takes 9d8 necrotic damage and has disadvantage on attack rolls and ability checks until the end of your next turn. On a success, it takes half as much damage and suffers no other effects.',
      ],
      [
        'Constructs and undead automatically succeed on this saving throw, while plants have disadvantage.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  sacred_circle: {
    name: 'Sacred Circle',
    level: 5,
    school: 'abjuration',
    classes: ['Cleric', 'Paladin'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a piece of turquoise mounted in silver)',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You create a 60-foot radius, 120-foot tall cylinder of resonating planar energy centered on a point on the ground that you can see within range. Until the spell ends, aberrations, celestials, elementals, fey, fiends, and undead have disadvantage on attack rolls against three creatures of your choice within the cylinder.',
      ],
      [
        'As an action, you may remove any charm, fear, or possession effects caused by creatures of those types from a creature of your choice within the cylinder.',
      ],
      [
        'Additionally, you can choose whether to allow or block teleportation, interplanar travel, or creatures being summoned within the cylinder.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  sacred_strikes: {
    name: 'Sacred Strikes',
    level: 1,
    school: 'evocation',
    classes: ['Paladin'],
    castingTime: 'Bonus Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You ask for a divine blessing on your weapon, empowering it against your foes. For the duration, your weapon attacks deal an extra 1d6 radiant damage.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  safekeeping: {
    name: 'Safekeeping',
    level: 7,
    school: 'transmutation',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: 'Touch',
    components:
      'V, S, M (a thread of flax covered with powder from precious gems worth at least 1000 gp per target, which the spell consumes)',
    duration: 'Until dispelled',
    text: [
      [
        'You touch up to 8 willing creatures or objects, hiding each target for the duration. You can turn each target invisible or into an object of the same size, such as a statue or full-length portrait.',
      ],
      [
        'Divination spells can’t locate or perceive the target. A creature is ',
        rules.incapacitated,
        ' and doesn’t age or need to breathe, eat, or drink. The spell ends on a target if it takes any damage.',
      ],
      [
        'You can also define a condition for the spell to end early (your GM must approve the condition).',
      ],
    ],
    effects: [
      {
        key: 'stasis',
        name: 'Stasis',
        lands: { on: 'use' },
        conditions: [rules.incapacitated],
        lasts: { kind: 'until', text: ['The spell ends on a target if it takes any damage'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  scintillant_blast: {
    name: 'Scintillant Blast',
    level: 7,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a shimmering wave of force outward, striking each creature within a 60-foot cone with a random blast of magic. Roll 1d8 on the table below for each target struck by the blast. That creature must make a Dexterity saving throw, suffering the effects below on a failure or half the initial damage and no additional effects on a success.',
      ],
      ['d8 · Damage Type · Effect'],
      [
        '1 · Acid · The target takes 12d4 acid damage and another 12d4 acid damage at the end of its next turn.',
      ],
      [
        '2 · Cold · The target takes 9d8 cold damage and is ',
        rules.restrained,
        ' until the end of its next turn.',
      ],
      ['3 · Fire · The target takes 14d6 fire damage.'],
      [
        '4 · Lightning · The target takes 6d12 lightning damage, and until the end of its next turn, cannot take reactions and has disadvantage on Dexterity saving throws.',
      ],
      [
        '5 · Poison · The target takes 6d12 poison damage and is ',
        rules.poisoned,
        ' until the end of its next turn.',
      ],
      [
        '6 · Psychic · The target takes 9d8 psychic damage and is ',
        rules.stunned,
        ' until the end of its next turn.',
      ],
      [
        '7 · Thunder · The target takes 9d8 thunder damage, is knocked backwards 30 feet, and falls ',
        rules.prone,
        '.',
      ],
      [
        "8 · Multiple · The target is struck by multiple blasts. Roll twice more, rerolling any 8's.",
      ],
    ],
    effects: [
      {
        key: 'cold-restrain',
        name: 'Restrained',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.restrained],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'lightning-no-reactions',
        name: 'No reactions',
        lands: { on: 'failed-save', save: 'dex' },
        text: ['cannot take reactions and has disadvantage on Dexterity saving throws'],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'poison',
        name: 'Poisoned',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.poisoned],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'psychic-stun',
        name: 'Stunned',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.stunned],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'thunder-prone',
        name: 'Knocked prone',
        lands: { on: 'failed-save', save: 'dex' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  seal_away: {
    name: 'Seal Away',
    level: 8,
    school: 'abjuration',
    classes: ['Warlock', 'Wizard'],
    castingTime: '1 minute',
    range: '30 ft',
    components:
      'V, S, M (a sculpted or painted likeness of the target, and black emeralds worth at least 200gp per Hit Die of the target, which are consumed)',
    duration: 'Permanent',
    text: [
      [
        'You prepare a magical prison, trapping a creature you can see within range for eternity. The target must succeed on a Wisdom saving throw or be imprisoned. On a success, it is immune to this spell for 1 year. While imprisoned in this way, the target does not age, does not need to eat, breathe, or drink, and cannot be found by any divination magic. You select the form of the prison when you cast the spell. Common options would be a sealed demiplane, miniaturized within a gemstone, or trapped in a cavity deep below the ground.',
      ],
      [
        'When you cast the spell, you must specify the condition by which the target can be freed. The condition can be as elaborate or as specific as you desire, but it must be reasonable and possible (your GM must approve the condition). The condition can involve a creature’s name, identity, or characteristics, but not game concepts such as level, class, or hit points. Dispel magic cannot free the target. If the condition comes to pass, the target is instantly freed.',
      ],
    ],
    effects: [
      {
        key: 'imprisoned',
        name: 'Imprisoned',
        lands: { on: 'failed-save', save: 'wis' },
        text: [
          'While imprisoned in this way, the target does not age, does not need to eat, breathe, or drink, and cannot be found by any divination magic',
        ],
        lasts: {
          kind: 'until',
          text: ['If the condition comes to pass, the target is instantly freed'],
        },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  secret_missive: {
    name: 'Secret Missive',
    level: 1,
    school: 'illusion',
    classes: ['Bard', 'Warlock', 'Wizard'],
    castingTime: '1 minute or Ritual',
    range: 'Touch',
    components: 'S, M (A lead-based ink worth at least 10gp, which the spell consumes)',
    duration: '10 days',
    text: [
      [
        'You pen a secret message on a parchment, paper, or other writing material. When you write the message, choose a password or passphrase; when a creature speaks this code while holding the parchment, the secret message appears for 10 minutes before fading again. Alternatively, you can specify a creature. The message automatically appears when it holds the parchment. You can write any other text on the parchment, which becomes invisible anytime the secret message is displayed. When the spell ends, the secret message disappears forever.',
      ],
      [
        'Creatures with truesight can see the secret message. A dispel magic cast on the parchment ends the spell without revealing the secret message.',
      ],
      [
        'The spell’s duration is related to the quality of ink used. Magical ink worth 10 gp gives it a duration of 10 days. More expensive ink lasts an additional day for each 1 gp spent; if 100 gp worth of magical ink is used, the duration becomes permanent.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  shape_winds: {
    name: 'Shape Winds',
    level: 5,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '100 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You seize control of the air in a cube up to 300 feet on a side you can see within range, bending it to your will. Choose one of the following effects. The effect persists until the spell ends, or until you use your action to pause it or change it to a different effect. You can resume a paused effect as an action.',
      ],
      [
        '• Gale. A steady wind blows in a horizontal direction of your choice. Every foot of movement against the wind costs 2 extra feet, and ranged attacks made against the wind automatically miss. Creatures moving with the wind can move 1 extra foot for each foot of movement spent. When a creature or projectile moves within the area, you can use your reaction to change the wind’s direction. As a bonus action, you can create a gust. All creatures within the area must succeed on a Strength saving throw or be pushed 30 feet in the wind’s direction.',
      ],
      [
        '• Turbulence. You whip the wind into a chaotic vortex. Ranged attacks passing through the wind are made with disadvantage. Any creature that flies into the wind’s area, starts its turn flying there, or takes flight there has its flying speed halved, and must succeed on a Strength saving throw or be knocked ',
        rules.prone,
        '.',
      ],
      [
        '• Thermal Column. You direct the wind to blow upwards. All creatures suffering fall damage within the wind can reduce that damage by five times your spellcasting ability modifier. When a creature within the wind makes a vertical jump, its jump height is tripled.',
      ],
    ],
    effects: [
      {
        key: 'turbulence',
        name: 'Turbulence',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        text: ['has its flying speed halved'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  shatter_mind: {
    name: 'Shatter Mind',
    level: 8,
    school: 'transmutation',
    classes: ['Bard', 'Druid', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You blast the mind of a creature that you can see within range, attempting to shatter its intellect and personality. The target takes 4d6 psychic damage and must make an Intelligence saving throw.',
      ],
      [
        'On a failure, the creature’s Intelligence and Charisma scores become 1. It can only take the most instinctive actions, such as fighting with unarmed strikes or natural weapons, or running away in a straight line. It can’t cast spells, activate magic items, understand language, use weapons or tools, or communicate in any way. It can understand when another creature means it harm.',
      ],
      [
        'After one day has passed, a creature can repeat its saving throw, ending the spell on a success. Each time it fails the saving throw, it adds one additional day onto the time interval before it can repeat its save.',
      ],
      ['The spell can also be ended by greater restoration, heal, or wish.'],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  siphon_life: {
    name: 'Siphon Life',
    level: 3,
    school: 'necromancy',
    classes: ['Cleric', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You gesture at two creatures within range, redirecting the life force from one to heal another within range. One creature of your choice within 30 feet of you that you can see must make a Constitution saving throw. On a failure, the target loses 4d8 hit points, which can’t be reduced in any way, and another creature of your choice that you can see within 30 feet of your target regains an equivalent number of hit points. A creature can willingly fail this save.',
      ],
      ['The spell has no effect on constructs or the undead.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  sky_omen: {
    name: 'Sky Omen',
    level: 6,
    school: 'illusion',
    classes: ['Bard', 'Druid', 'Wizard'],
    castingTime: 'Action',
    range: '1 mile',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You create a gigantic stationary symbol in a part of the sky you can see. You control the appearance of this omen, which displays animations up to 10 minutes in length. The image is visible for a radius of 1 mile. It is obviously unnatural and cannot be mistaken for a real object.',
      ],
      [
        'The first time a creature sees the omen, it must make a Wisdom saving throw. A creature can choose to fail its saving throw if it interprets the omen positively. On a failure, it suffers one of the following effects (or another appropriate effect upon its confidence or morale, as determined by the GM). At the end of every day, a creature can repeat its saving throw against this spell.',
      ],
      ['Terror'],
      ['A creature failing the save is ', rules.frightened, ' of the omen.'],
      ['Awe'],
      [
        'A creature failing the save is ',
        rules.charmed,
        ' and will not willingly move anywhere it cannot see the omen.',
      ],
      ['Courage'],
      [
        'A creature has advantage on saving throws against fear and charm effects while it can see the omen.',
      ],
      [
        'At Higher Levels. If you cast this spell using a 7th-level spell slot, the radius is 6 miles and the duration is concentration, up to 8 hours. If you use an 8th-level spell slot, the radius is 12 miles and the duration is concentration, up to 24 hours. If you use a 9th-level spell slot, the radius is 18 miles, the spell no longer requires concentration, and it lasts until dispelled.',
      ],
    ],
    effects: [
      {
        key: 'terror',
        name: 'Frightened',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.frightened],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: { repeatSave: ['every-24-hours'] },
      },
      {
        key: 'awe',
        name: 'Charmed by the omen',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.charmed],
        text: ['will not willingly move anywhere it cannot see the omen'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: { repeatSave: ['every-24-hours'] },
      },
      {
        key: 'courage',
        name: 'Courage',
        lands: { on: 'failed-save', save: 'wis' },
        text: ['has advantage on saving throws against fear and charm effects'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  sonic_rift: {
    name: 'Sonic Rift',
    level: 3,
    school: 'conjuration',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You create and step through a brief dimensional rift, teleporting to an unoccupied space you can see within range. You can bring your possessions and any objects you can carry. You may also bring one willing creature your size or smaller, who must be standing 5 feet from where you cast the spell and appears within 5 feet of your destination. If there is not enough space at the destination, it is left behind.',
      ],
      [
        'After you teleport, the rift closes and emits a sonic shockwave. Choose either your starting or ending space. All creatures within 10 feet of that space except you and any creature you brought with you must make a Constitution saving throw, taking 4d8 thunder damage on a failure or half as much damage on a success. The shockwave is audible out to 300 feet.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  soul_transfer: {
    name: 'Soul Transfer',
    level: 7,
    school: 'necromancy',
    classes: ['Wizard'],
    castingTime: '1 minute',
    range: 'Self',
    components: 'V, S, M (a tiny ornate container worth at least 500 gp)',
    duration: 'Until dispelled',
    text: [
      [
        'Your body falls unconscious as your soul enters the spell’s material component. You perceive from the component using your senses, but can’t move or use reactions. You can only use your action to project your soul up to 100 feet, either to return to your living body (ending the spell) or to try to possess a humanoid’s body that you can see. Creatures warded by a protection from evil and good or circle of protection spell can’t be possessed.',
      ],
      [
        'The target must make a Charisma saving throw. On a failure, its soul is trapped in the component, and you take control of its body. You use its physical statistics and features, but retain your alignment and mental ability scores, and your GM determines which mental features you may use. You can use your action to return to the component if it is within 100 feet, returning the target creature’s soul to its body. If the target succeeds at its Charisma saving throw, you can’t attempt to possess it again for 24 hours.',
      ],
      [
        'The possessed creature can perceive from the component using its senses and can repeat its saving throw as an action after every hour. It can take no other actions. On a success, the target returns to its body and you return to the component if it is within 100 feet; otherwise, you die.',
      ],
      [
        'If the target’s body dies while you possess it, the creature dies, and you must make a Charisma saving throw against your spellcasting DC. On a success, you return to the component if it is within 100 feet; otherwise, you die.',
      ],
      [
        'If the spell ends or the container is destroyed, each affected soul attempts to return to its body if it is alive and within 100 feet; otherwise, it dies. Only a wish spell can prevent this death.',
      ],
      ['When the spell ends, the container is destroyed.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 8th level or higher, the possessed creature can repeat its saving throw once per day. When you cast this spell using a spell slot of 9th level, the possessed creature can repeat its saving throw once per year.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  sparking_shot: {
    name: 'Sparking Shot',
    level: 3,
    school: 'transmutation',
    classes: ['Ranger'],
    castingTime: 'Bonus Action',
    range: 'Touch',
    components: 'V, S, M (a piece of ammunition or weapon worth at least 1 cp)',
    duration: '1 round',
    text: [
      [
        'You imbue a piece of ammunition or weapon with crackling electricity. When you make an attack with the piece of ammunition or weapon, it creates arcs of lightning from the attack’s target. The target and two creatures of your choice within 15 feet must make a Dexterity saving throw, taking 3d12 lightning damage on a failure or half as much on a success. If the attack hits, the target automatically fails this saving throw.',
      ],
      ['The piece of ammunition or weapon then reverts to normal.'],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d12 for each slot level above 3rd.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  speak_with_nature: {
    name: 'Speak with Nature',
    level: 1,
    school: 'divination',
    classes: ['Bard', 'Druid', 'Ranger'],
    castingTime: 'Action or Ritual',
    range: 'Self',
    components: 'V, S',
    duration: '10 minutes',
    text: [
      [
        'You can verbally communicate with beasts for the duration. This allows beasts to answer questions you pose; at minimum, a beast can inform you about whatever it can perceive or has perceived within the past day, including nearby locations and monsters.',
      ],
      [
        'The knowledge, awareness, and personality of a beast is limited by its intelligence, but you may deceive, intimidate, persuade, or otherwise influence a beast at the GM’s discretion. A creature is under no compulsion to answer (or answer truthfully) if you are hostile to it, or it recognizes you as an enemy.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you imbue plants with limited sentience, allowing you to communicate with them like beasts. When you cast this spell using a spell slot of 3rd level or higher, you imbue plants with limited animation, allowing them to freely move branches, tendrils, and stalks. You can command plants to release a restrained creature, to turn ordinary terrain into difficult terrain (or the opposite), or to perform other tasks at the GM’s discretion.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  spectral_champion: {
    name: 'Spectral Champion',
    level: 3,
    school: 'necromancy',
    classes: ['Cleric', 'Paladin', 'Warlock', 'Wizard'],
    castingTime: 'Bonus Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You summon a large, ghostly entity which envelops you, aiding your attacks and making its own, striking down your foes. The entity is incorporeal and invulnerable. Choose a damage type when you cast this spell: cold, necrotic, or radiant. All damage dealt by this spell is of that type.',
      ],
      [
        'For the duration of the spell, your weapons are wreathed in ethereal light, dealing 1d4 extra damage on every hit. Any creature that takes this damage can’t regain hit points until the start of your next turn. In addition, when you cast this spell and as a bonus action on subsequent turns, you can command the entity to make a melee spell attack against one target within 10 feet. On a hit, the target takes 2d8 damage and must succeed on a Wisdom saving throw or have its speed reduced to 0 until the end of its next turn.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage dealt by the entity’s attacks increases by 1d8 for each slot level above 3rd.',
      ],
    ],
    effects: [
      {
        key: 'speed-zero',
        name: 'Speed reduced to 0',
        lands: { on: 'failed-save', save: 'wis' },
        text: ['have its speed reduced to 0'],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'no-healing',
        name: "Can't regain hit points",
        lands: { on: 'hit' },
        text: ['can’t regain hit points'],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  spell_glyph: {
    name: 'Spell Glyph',
    level: 3,
    school: 'abjuration',
    classes: ['Bard', 'Cleric', 'Wizard'],
    castingTime: '1 minute',
    range: 'Touch',
    components: 'V, S, M (silver powder worth at least 100gp, which the spell consumes)',
    duration: 'Until dispelled or destroyed',
    text: [
      [
        'When you cast this spell, you mark a fixed surface with an arcane inscription, occupying a 5-foot diameter circle. When a creature enters the glyph’s space or otherwise disturbs it, the glyph triggers.',
      ],
      [
        'You can refine the trigger by specifying or exempting creatures or creature types, or by specifying a password a creature can speak as a reaction to prevent the glyph from triggering.',
      ],
      [
        'The glyph is nearly invisible and requires a successful Intelligence (Investigation) check against your spell save DC to be found. A creature has advantage on this check if it is able to perceive magical effects, such as by casting detect magic. If a creature uses its action to destroy the glyph, or the surface is destroyed, the spell ends without triggering.',
      ],
      [
        'As part of the casting, you must cast another prepared spell of 3rd level or lower, storing it in the glyph. The spell must have a casting time of 1 action and must be able to target a creature other than the caster. When the glyph triggers, it releases the stored spell, targeting the triggering creature. If the spell targets an area or summons creatures, the effect is centered on the triggering creature. A spell requiring concentration lasts for its full duration. A triggered glyph glows brightly for the stored spell’s full duration. If a creature uses its action to destroy the triggered glyph, or the surface is destroyed, the spell ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the stored spell’s maximum level increases by 1 and the material component cost increases by 50 gp for each slot level above 3rd.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  spirit_remnant: {
    name: 'Spirit Remnant',
    level: 3,
    school: 'necromancy',
    classes: ['Bard', 'Cleric'],
    castingTime: 'Action',
    range: '10 ft',
    components: 'V, S, M (a small heart-shaped piece of wood)',
    duration: '10 minutes',
    text: [
      [
        'You perform a rite over a corpse you can see within range, summoning a vestige of its spirit and compelling it to answer questions. It must have a mouth or other means of speaking, can’t be undead, and can’t have been the target of this spell within the past 10 days.',
      ],
      [
        'Until the spell ends, the corpse will answer up to five questions using the knowledge it possessed before its death. Its responses are typically brief, cryptic, or puzzling, but it will not lie or refuse to answer.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  spreadshot: {
    name: 'Spreadshot',
    level: 3,
    school: 'conjuration',
    classes: ['Ranger'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M',
    duration: 'Instantaneous',
    text: [
      [
        'You touch the component used in the spell’s casting, multiplying the projectiles in a 60-foot cone. Make a single ranged attack roll with the weapon. Each target in the cone takes 4d8 damage on a hit, or half as much damage on a miss. The damage type is the same as that of the weapon or ammunition used as a component.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  stinging_insects: {
    name: 'Stinging Insects',
    level: 0,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S, M (six sugar crystals)',
    duration: 'Instantaneous',
    text: [
      [
        'You cause a cloud of biting, stinging insects to appear near one creature you can see within range. The target must make a Constitution saving throw. On failure, it takes 1d4 piercing damage and 1d4 poison damage and moves 5 feet in a direction of your choice. The creature doesn’t move into obviously dangerous ground, such as a fire or a pit.',
      ],
      [
        "The spell's damage increases by 1d4 when you reach 5th level (2d4 + 2d4), 11th level (3d4 + 3d4), and 17th level (4d4 + 4d4).",
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  stone_pact: {
    name: 'Stone Pact',
    level: 3,
    school: 'transmutation',
    classes: ['Cleric', 'Druid'],
    castingTime: 'Action',
    range: 'Touch',
    components: 'V, S',
    duration: '1 hour',
    text: [
      [
        'You lay your hand on an outcropping of rock or a stone wall and speak to the stone, coaxing it to grant a mighty boon. Choose one of the following options:',
      ],
      [
        '• Stone Meld. You and up to 7 other Large or smaller creatures you choose are able to meld with the stone. Until the end of your next round, each willing creature can touch a 5-foot area of the stone and be absorbed into it. While absorbed, a creature cannot see or hear anything, but has tremorsense within 30 feet. A creature may exit the stone voluntarily as an action, or be ejected if the stone is destroyed or the spell ends.',
      ],
      [
        '• Stone Armor. The stone joins with you, covering your body in a rocky exterior. You gain 10 temporary hit points and have resistance to nonmagical damage as long as you have these temporary hit points.',
      ],
      [
        '• Stone Step. Your feet blend into the stone. You gain tremorsense within 30 feet, and as long as you are standing on the ground, you are immune to the ',
        rules.prone,
        ' condition or to being moved against your will.',
      ],
    ],
    effects: [
      {
        key: 'stone-meld',
        name: 'Stone meld',
        lands: { on: 'use' },
        text: ['cannot see or hear anything, but has tremorsense within 30 feet'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  stormcloud: {
    name: 'Stormcloud',
    level: 4,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '150 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You create a 20-foot radius cylinder of crackling storms, up to 100 feet high, centered on a point you choose within range. At the start of each of your turns, you can choose to move the cylinder up to 10 feet in a direction of your choice. The cylinder spreads around corners, and its area is difficult terrain. The area is lightly obscured, and creatures inside are ',
        rules.deafened,
        '.',
      ],
      [
        'As a bonus action on each of your turns, you can direct a lightning strike from the cylinder at one creature of your choice within 60 feet of the center. Make a ranged spell attack, with advantage on the attack roll if the target is within the cylinder. On a hit, the target takes 2d12 lightning damage.',
      ],
      [
        'After this lightning strike, each creature in the area must make a Constitution saving throw. A creature takes 4d8 thunder damage on a failure, or half as much damage on a success.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the thunder damage increases by 1d8 and the lightning damage increases by 1d12 for every two slot levels above 4th.',
      ],
    ],
    effects: [
      {
        key: 'deafened',
        name: 'Deafened',
        lands: { on: 'use' },
        conditions: [rules.deafened],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  stream_of_flame: {
    name: 'Stream of Flame',
    level: 2,
    school: 'evocation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a drop of oil)',
    duration: 'Instantaneous',
    text: [
      [
        'A gout of flame projects from your hand in a direction you choose. Each creature in a 30-foot long, 5-foot wide line must make a Dexterity saving throw. A creature takes 4d8 fire damage on a failure, or half as much damage on a success. The flames ignite any flammable objects in the area that aren’t being worn or carried.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 and the length of the line increases by 5 feet for each slot level above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  summon_animal_spirit: {
    name: 'Summon Animal Spirit',
    level: 2,
    school: 'conjuration',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a set of fine animal statuettes, worth at least 200gp altogether)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You gather energy from the nature around you and sculpt it into a powerful spirit animal, appearing in an unoccupied space you can see within range. It uses the Animal Spirit stat block, and you select either the Earth, Sea, or Sky option when you cast the spell. The creature disappears when it drops to 0 hit points or when the spell ends.',
      ],
      [
        'The creature is an ally to you and your companions. In combat, it shares your initiative count, and takes its turn immediately after yours. It obeys your verbal commands. If you don’t issue any command, it takes the Dodge action and moves only to avoid hazards.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  summon_golem: {
    name: 'Summon Golem',
    level: 4,
    school: 'conjuration',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a stone or iron statuette worth at least 400gp)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You conjure raw materials and sculpt them into a construct, appearing in an unoccupied space you can see within range. It uses the Golem Spirit stat block, and you select either the Flesh, Stone, or Iron option when you cast the spell. The creature disappears when it drops to 0 hit points or when the spell ends.',
      ],
      [
        'The creature is an ally to you and your companions. In combat, it shares your initiative count, and takes its turn immediately after yours. It obeys your verbal commands. If you don’t issue any command, it takes the Dodge action and moves only to avoid hazards.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  summon_grave_spirit: {
    name: 'Summon Grave Spirit',
    level: 3,
    school: 'necromancy',
    classes: ['Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a jeweled skull statuette worth at least 300gp)',
    duration: 'Concentration, up to 1 hour',
    text: [
      [
        'You summon an undead creature which manifests in an unoccupied space that you can see within range. It uses the Grave Spirit stat block, and you select the Ethereal, Ghoulish, or Bone option when you cast the spell. The creature disappears when it drops to 0 hit points or when the spell ends.',
      ],
      [
        'The creature is an ally to you and your companions. In combat, the creature shares your initiative count, and it takes its turn immediately after yours. It obeys your verbal commands. If you don’t issue a command, it takes the Dodge action and moves only to avoid hazards.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  symbol_of_resilience: {
    name: 'Symbol of Resilience',
    level: 3,
    school: 'abjuration',
    classes: ['Cleric'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You create a tiny symbol above you, which radiates hope in a 30-foot radius until the spell ends. The symbol can take whatever form you choose, such as that of your deity. As a bonus action on your turn, you can move the symbol up to 30 feet.',
      ],
      [
        'Each non-hostile, living creature in the symbol’s radius (including you) has advantage on Wisdom saving throws, adds your spellcasting ability modifier to its death saving throws (treating rolls equal to or above 20 as a natural 20), and regains the maximum number of hit points possible from any healing.',
      ],
      [
        'The first time a non-hostile, living creature starts its turn in the symbol’s radius, it can use a bonus action to expend one Hit Die to regain hit points as if it had taken a short rest. If the creature had fewer hit points than half its hit point maximum, it also gains an equivalent number of temporary hit points until the spell ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, a creature can spend one additional Hit Die for each slot level above 3rd.',
      ],
    ],
    effects: [
      {
        key: 'resilience',
        name: 'Resilience',
        lands: { on: 'use' },
        text: [
          'has advantage on Wisdom saving throws, adds your spellcasting ability modifier to its death saving throws',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  synaptic_shockwave: {
    name: 'Synaptic Shockwave',
    level: 9,
    school: 'enchantment',
    classes: ['Bard', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a roiling wave of psionic energy outward in a 60-foot cone of psionic power, creating psychic storms in the brains of affected creatures. All creatures in the area must make an Intelligence saving throw. On a failure, a creature takes 10d8 psychic damage and is ',
        rules.stunned,
        '. On a success, it suffers half as much damage and no other effects.',
      ],
      [
        'At the end of each of a stunned creature’s turns, it rolls 1d6. Its Intelligence score is reduced by an amount equal to the roll. The creature then repeats the saving throw using its original intelligence score, gaining a bonus to the roll equal to the total amount its Intelligence score has been reduced. On a success, it is no longer ',
        rules.stunned,
        '. If a creature’s Intelligence is reduced to 0, it dies.',
      ],
      [
        'A creature regains 1 point of lost Intelligence after finishing a long rest. The heal, mass heal, regenerate, and wish spells can instantly restore all lost Intelligence. Greater restoration can restore 1d6 points of lost Intelligence.',
      ],
    ],
    effects: [
      {
        key: 'stunned',
        name: 'Stunned',
        lands: { on: 'failed-save', save: 'int' },
        conditions: [rules.stunned],
        text: ['Its Intelligence score is reduced by an amount equal to the roll'],
        lasts: { kind: 'until-removed' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  synaptic_spear: {
    name: 'Synaptic Spear',
    level: 4,
    school: 'enchantment',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a spear of psychic energy at a creature within range. The target must make an Intelligence saving throw. On a failure, it takes 6d8 psychic damage and is ',
        rules.blinded,
        ' and ',
        rules.deafened,
        ' until the end of your next turn. On a success, it takes half as much damage and suffers no other effects.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th.',
      ],
    ],
    effects: [
      {
        key: 'blinded-deafened',
        name: 'Blinded and deafened',
        lands: { on: 'failed-save', save: 'int' },
        conditions: [rules.blinded, rules.deafened],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  tempest: {
    name: 'Tempest',
    level: 9,
    school: 'conjuration',
    classes: ['Druid'],
    castingTime: 'Action',
    range: '360 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You create a swirling storm cloud, centered on a point you can see and covering a cylinder with a 60-foot radius and a height up to 2,000 feet. Each creature starting its turn below the cloud must succeed on a Constitution saving throw or take 4d8 thunder damage and be ',
        rules.deafened,
        ' until the start of its next turn.',
      ],
      [
        'As long as you maintain concentration on the spell, you can use your action to intensify the storm. You can add one of the following effects to the storm, which lasts for the duration. Adding an effect does not remove prior effects, though most effects can be added only once.',
      ],
      [
        '• Lightning. Lightning strikes rain down. As a bonus action, you can designate two points below the cloud to be struck by lightning. All creatures within a 10-foot radius of either point must make a Dexterity saving throw, taking 4d12 lightning damage on a failure or half as much on a success.',
      ],
      [
        '• Downpour. Torrential rain falls. The storm’s entire area becomes difficult terrain, and heavily obscured to every creature except you.',
      ],
      [
        '• Hurricane. Gusting winds whip with brutal ferocity. Ranged weapon attacks in the area automatically miss. Every Huge or smaller creature starting its turn below the cloud must succeed on a Strength saving throw or be thrown 30 feet in a random direction and knocked ',
        rules.prone,
        '.',
      ],
      [
        '• Hailstorm. Icy stones rain down. Each creature starting its turn below the cloud takes 2d10 bludgeoning damage. Any creature below the cloud has disadvantage on saving throws it makes to maintain concentration.',
      ],
      [
        '• Expansion. You can move the storm 120 feet or increase its radius by 60 feet. You can add this effect any number of times.',
      ],
    ],
    effects: [
      {
        key: 'deafened',
        name: 'Deafened',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.deafened],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
      {
        key: 'hurricane',
        name: 'Knocked prone',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
      {
        key: 'hailstorm',
        name: 'Concentration penalty',
        lands: { on: 'use' },
        text: ['has disadvantage on saving throws it makes to maintain concentration'],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  thought_wisp: {
    name: 'Thought Wisp',
    level: 0,
    school: 'transmutation',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'S',
    duration: '24 hours',
    text: [
      [
        'You touch your head, transferring a thought into a cloud-like wisp, which appears in your hand as a Tiny, weightless, semisolid object. The color of the thought-wisp depends on the thought: ideas are yellow, memories are silver, and messages are blue.',
      ],
      [
        'When you cast the spell, you can limit who can receive the contents to specific creatures or creature types. A specified creature can use its action to receive whatever the thought-wisp contains, ending the spell. If no limit is specified, any creature can do so.',
      ],
      [
        'Any creature who can cast this spell or is concentrating on a spell that allows thought reading (such as detect thoughts or modify memory) can use its action to receive what a thought-wisp contains, ending the spell. A creature concentrating in this manner can also cast this spell to transform thoughts it reads into a thought-wisp. Additionally, modify memory can affect thought-wisps.',
      ],
      ['A creature can touch a thought-wisp and use its action to disperse it, ending the spell.'],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  thunder_burst: {
    name: 'Thunder Burst',
    level: 0,
    school: 'evocation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'S',
    duration: 'Instantaneous',
    text: [
      [
        'You create a concussive pulse, producing a boom audible out to 300 feet. All other creatures within 5 feet of you must succeed on a Constitution saving throw or take 1d8 thunder damage and be ',
        rules.deafened,
        ' until the end of its next turn.',
      ],
      [
        "The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
      ],
    ],
    effects: [
      {
        key: 'deafened',
        name: 'Deafened',
        lands: { on: 'failed-save', save: 'con' },
        conditions: [rules.deafened],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  touch_of_filth: {
    name: 'Touch of Filth',
    level: 2,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: 'Self',
    components: 'V, S, M (a piece of rotting food)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You envelop your hand in a vile miasma. Make a melee spell attack against a creature within your reach. On a hit, the target takes 1d6 poison damage and is ',
        rules.poisoned,
        '. At the end of each of its turns, it can make a Constitution saving throw, ending the poison on a success. Until the spell ends, you can make this attack again on each of your turns as an action.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Poisoned',
        lands: { on: 'hit' },
        conditions: [rules.poisoned],
        text: [
          'At the end of each of its turns, it can make a Constitution saving throw, ending the poison on a success',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  twister: {
    name: 'Twister',
    level: 7,
    school: 'transmutation',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '300 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You call down a huge tornado at a point you can see on the ground within range. The twister occupies a 30-foot radius, 100-foot high cylinder centered on that point. As an action, you can move the twister up to 30 feet along the ground.',
      ],
      [
        'When a creature enters the twister on its turn or starts its turn there, it must make a Strength saving throw. On a failure, it takes 10d6 bludgeoning damage, and a Large or smaller creature is sucked up into the twister and ',
        rules.restrained,
        '. Restrained creatures move with the twister when it moves and are carried vertically 25 feet each round toward the twister’s center. At the end of each of its turns, a restrained creature can repeat the saving throw. On a success, it is hurled 60 feet horizontally out of the twister in a random direction.',
      ],
      [
        'The twister’s area is lightly obscured, and ranged attacks that pass through the twister automatically miss.',
      ],
    ],
    effects: [
      {
        key: 'restrained',
        name: 'Restrained',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.restrained],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  unbridled_fury: {
    name: 'Unbridled Fury',
    level: 2,
    school: 'enchantment',
    classes: ['Bard', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You plant an unquenchable rage in the mind of one humanoid you can see within range. The target must succeed on a Wisdom saving throw or become charmed by you, its eyes glowing with a fiery light. When you cast the spell and as an action on subsequent turns, you can activate this rage.',
      ],
      [
        'If you activate a target’s rage, it must move up to its speed at the start of its turn towards the nearest creature and use its action to make one melee attack against that creature. If you don’t activate its rage or it can’t reach another creature with its movement, the target takes its turn as normal. The target can repeat the saving throw at the end of each of its turns, ending the spell on a success.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the target makes two melee attacks if it has an ability that would normally allow it to make more than one attack on its turn.',
      ],
    ],
    effects: [
      {
        key: 'charmed',
        name: 'Charmed',
        lands: { on: 'failed-save', save: 'wis' },
        conditions: [rules.charmed],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  unearth_legend: {
    name: 'Unearth Legend',
    level: 5,
    school: 'divination',
    classes: ['Bard', 'Cleric', 'Wizard'],
    castingTime: '1 minute or Ritual',
    range: 'Self',
    components:
      'V, S, M (rare gems worth at least 250 gp, which the spell consumes, and a jeweled notebook worth at least 200 gp)',
    duration: '7 days',
    text: [
      [
        'You contact an otherworldly entity, offering it the gems used in the spell’s casting in exchange for the history of a person, place, or object. The entity tells you everything it knows about the subject (typically well-known lore or widely-told stories).',
      ],
      [
        'After it is contacted, the entity researches the subject for up to seven days. Its discoveries appear as writing in the jeweled notebook. It might learn obscure myths, forgotten legends, or even lost secrets. The more information you possess when you cast the spell, the faster and more detailed the results will be. The entity may not understand the information it finds, and so might impart unsolved riddles, confusing poems, or other puzzling communications. Once the entity has conveyed everything it can discover, the spell ends.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  unerring_sentry: {
    name: 'Unerring Sentry',
    level: 4,
    school: 'conjuration',
    classes: ['Wizard'],
    castingTime: '1 minute',
    range: '30 ft',
    components: 'V, S, M (a dog collar)',
    duration: '8 hours',
    text: [
      [
        'You conjure an arcane sentry in an unoccupied space that you can see within range. It can take any form you wish, but is obviously magical in nature, and is always Small or Medium. It lasts for the duration, until you dismiss it, until you move 100 feet from it, or until you cast the spell again.',
      ],
      [
        'When you cast the spell, designate any number of creatures you can see as the sentry’s allies. The sentry is ',
        rules.invisible,
        ' to everyone except its allies, and if any other creature of challenge rating 1/4 or higher comes within 60 feet of it, it calls out an alarm. It can see invisible creatures, see into the Ethereal Plane, and cannot be deceived by illusions.',
      ],
      [
        'As an action on your turn, you may direct the sentry to attack a target you can see within 100 feet of its original location. It can move up to 30 feet, and attack a creature within 5 feet of it. Make a melee spell attack. On a hit, it deals 4d8 force damage. If you are ',
        rules.incapacitated,
        ', ',
        rules.unconscious,
        ', or otherwise unable to direct the sentry, then at the end of your turn it attacks the nearest creature of challenge rating 1/4 or higher that is not its ally.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  wall_of_dust: {
    name: 'Wall of Dust',
    level: 3,
    school: 'transmutation',
    classes: ['Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S, M (a handful of dirt or sand)',
    duration: '10 minutes',
    text: [
      [
        'You construct a wall of blowing dirt and grit at a point you can see within range. The wall can be up to 30 feet long, 10 feet high, and 10 feet thick. The wall blocks line of sight, and a creature is ',
        rules.blinded,
        ' and ',
        rules.deafened,
        ' while within the wall. When a creature enters the wall or starts its turn there, it must make a Strength saving throw. On a failure, each foot that the creature moves through the wall costs 6 feet of movement. On a success, each foot that the creature moves through the wall only costs 3 feet of movement.',
      ],
      ['The wall disappears when the spell ends.'],
    ],
    effects: [
      {
        key: 'blinded-and-deafened',
        name: 'Blinded and deafened',
        lands: { on: 'use' },
        conditions: [rules.blinded, rules.deafened],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  warding_sigil: {
    name: 'Warding Sigil',
    level: 1,
    school: 'abjuration',
    classes: ['Bard', 'Warlock', 'Wizard'],
    castingTime: 'Bonus Action',
    range: 'Self',
    components: 'S',
    duration: '1 minute',
    text: [
      [
        'You make a magical sign, creating a protective ward around yourself. The ward has 4 hit points and is resistant to bludgeoning, piercing, and slashing damage. For the duration, whenever you take damage, the ward takes the damage instead. If this damage reduces the ward to 0 hit points, you take any remaining damage and the spell ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the ward’s hit points increase by 2d4 for each slot level above 1st.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  water_wall: {
    name: 'Water Wall',
    level: 3,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a vial of pure water)',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You summon a wall of swirling water at a point you can see on the ground within range. The wall can be up to 30 feet long, 10 feet high, and 5 feet thick, or shaped as a ring up to 15 feet in diameter, 20 feet high, and 5 feet thick. Each foot moved through the wall costs 3 feet of movement. The wall’s water disappears when the spell ends.',
      ],
      [
        'A creature that starts its turn in the wall or enters it on its turn must make a Strength saving throw, suffering 2d6 bludgeoning damage on a failure or half as much on a success. Ranged attacks passing through the wall have disadvantage and deal half damage. Fire effects passing through are instantly extinguished. Cold effects passing through apply to any creature within 5 feet of the point they touch the wall. Lightning effects apply half their damage to any creature in contact with the wall when they pass through.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  wayfinding: {
    name: 'Wayfinding',
    level: 5,
    school: 'divination',
    classes: ['Bard', 'Cleric', 'Druid'],
    castingTime: '1 minute',
    range: 'Self',
    components:
      'V, S, M (two divinatory tools to indicate direction or display an image, such as a pendulum and a mirror, worth 100 gp)',
    duration: '24 hours',
    text: [
      [
        'You name a specific location on the same plane of existence, receiving supernatural knowledge regarding the way between you and the destination. If the destination moves to another plane, the spell fails.',
      ],
      [
        'When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one:',
      ],
      [
        '• Dowsing. The pendulum tugs in a direction with increasing urgency as you near your destination, informing you of its distance and direction.',
      ],
      [
        '• Ascertainment. Whenever you are presented with a choice of paths along the way to the destination, the pendulum points towards the shortest and most direct route (ignoring safety).',
      ],
      [
        '• Forecast. The mirror displays images of the next 30 miles on the path to the destination, granting a general awareness of natural hazards or obstacles, such as decaying bridges or cliffs.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  wellspring: {
    name: 'Wellspring',
    level: 2,
    school: 'transmutation',
    classes: ['Druid', 'Ranger'],
    castingTime: 'Action',
    range: '30 ft',
    components: 'V, S, M (a tiny silver watering can)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You pour out a stream of pure water and create a 10-foot radius magical healing pool at a point on the ground you can see within range. At any time (no action required by you) you can choose to restore 2d4 hit points to any creature in the pool, depleting the pool’s magic. The pool’s magic is restored at the start of each of your turns.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the healing increases by 1d4 and the radius of the pool increases by 5 feet for each slot level above 2nd.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  whirling_blades: {
    name: 'Whirling Blades',
    level: 2,
    school: 'conjuration',
    classes: ['Bard', 'Sorcerer', 'Warlock', 'Wizard'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S, M (a handful of metal shavings)',
    duration: 'Concentration, up to 10 minutes',
    text: [
      [
        'You produce a storm of metal shards that occupy a 5-foot diameter sphere in a space you can see within range. A creature takes 4d4 slashing damage when it enters the spell’s area for the first time on a turn or starts its turn there.',
      ],
      [
        'As an action, you can cause the blades to point and shoot at a creature within 30 feet of the sphere. Make a ranged spell attack. On a hit, targets take 4d4 piercing damage, or half as much damage on a miss. Hit or miss, the spell then ends.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d4 for each slot level above 2nd.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  whirling_water: {
    name: 'Whirling Water',
    level: 4,
    school: 'conjuration',
    classes: ['Druid', 'Sorcerer', 'Wizard'],
    castingTime: 'Action',
    range: '90 ft',
    components: 'V, S, M (a droplet of water)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You create a swirling ball of water in a 10-foot radius at a point on the ground or in water you can see within range. Any creature that enters the sphere on its turn or starts its turn in it must succeed on a Strength saving throw or be restrained and trapped within the water. At the start of each of its turns, a restrained target can repeat the saving throw, ending the effect on a success. A Huge or smaller creature partially within the sphere makes its saving throw with advantage, while a Gargantuan creature automatically succeeds.',
      ],
      [
        'As an action, you can cause the sphere to roll up to 30 feet, carrying all restrained creatures with it and dousing all nonmagical flame it passes through. If this causes a creature in the sphere to collide with a creature outside it, both creatures take 4d6 bludgeoning damage. Restrained creatures are not affected by any terrain the sphere passes over.',
      ],
      [
        'As a bonus action, you can hurl a restrained creature out of the sphere. It is thrown 20 feet in a direction of your choice and takes 4d6 bludgeoning damage. If it collides with another creature, that creature must succeed on a Dexterity saving throw or take 4d6 bludgeoning damage.',
      ],
      [
        'When the spell ends, creatures restrained by it fall ',
        rules.prone,
        ', and all fires within 20 feet are extinguished. The water disappears afterward.',
      ],
    ],
    effects: [
      {
        key: 'trapped',
        name: 'Trapped in the water',
        lands: { on: 'failed-save', save: 'str' },
        conditions: [rules.restrained],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['start-of-turn'] },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  whirlpool: {
    name: 'Whirlpool',
    level: 5,
    school: 'evocation',
    classes: ['Druid'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a spoon)',
    duration: 'Concentration, up to 1 minute',
    text: [
      [
        'You conjure a 30-foot radius circle of churning water centered on a point on the ground or in a body of water which you can see within range. The whirlpool’s area is difficult terrain, but it is not deep enough to require swimming. Any creature that starts its turn there or enters on its turn must make a Strength saving throw. On a failure, it takes 5d8 bludgeoning damage and is pulled 10 feet towards the center. If the spell targets an existing body of water, the damage increases by 1d8.',
      ],
      [
        'At Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.',
      ],
    ],
    effects: [],
    publication: refs.publications.spells_that_dont_suck,
  },
  withering_field: {
    name: 'Withering Field',
    level: 8,
    school: 'necromancy',
    classes: ['Wizard'],
    castingTime: 'Action',
    range: '120 ft',
    components: 'V, S, M (a fistful of fine sand and a drop of blood)',
    duration: '1 round',
    text: [
      [
        'You shrivel and decay every living thing within a 30-foot cube you can see within range, sucking the life away until the targets crumble to dust. Each creature in the area must make a Constitution saving throw. On a failure, the target takes 12d8 necrotic damage, has its speed halved and has disadvantage on all of its attack rolls and ability checks until the end of its next turn. On a success, it takes half as much damage and suffers no other effects.',
      ],
      [
        'Constructs and undead automatically succeed on this saving throw, while plants have disadvantage. Anything reduced to 0 hit points while under the spell’s effect crumbles to dust.',
      ],
    ],
    effects: [
      {
        key: 'withered',
        name: 'Withered',
        lands: { on: 'failed-save', save: 'con' },
        text: [
          'has its speed halved and has disadvantage on all of its attack rolls and ability checks',
        ],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
  wound: {
    name: 'Wound',
    level: 6,
    school: 'necromancy',
    classes: ['Cleric'],
    castingTime: 'Action',
    range: '60 ft',
    components: 'V, S',
    duration: 'Instantaneous',
    text: [
      [
        'You send a surge of negative energy into a creature that you can see within range. The target must make a Constitution saving throw. On a failure, it takes 14d6 necrotic damage, or half as much damage on a success. The target’s hit point maximum is reduced for 1 hour by an amount equal to the necrotic damage it took.',
      ],
    ],
    publication: refs.publications.spells_that_dont_suck,
  },
})

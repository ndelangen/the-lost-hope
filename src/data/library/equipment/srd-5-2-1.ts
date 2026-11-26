import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createEquipment } from '#/definitions/library.ts'

const { rules } = campaignRefs

/** The adventuring gear and sample poisons of the System Reference Document 5.2.1 (CC BY 4.0). */
export default createEquipment({
  acid: {
    name: 'Acid',
    category: 'Adventuring Gear',
    price: { amount: 25, coin: 'gp' },
    weight: 1,
    text: [
      [
        'When you take the Attack action, you can replace one of your attacks with throwing a vial of Acid. Target one creature or object you can see within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or take 2d6 Acid damage.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  alchemists_fire: {
    name: 'Alchemist’s Fire',
    category: 'Adventuring Gear',
    price: { amount: 50, coin: 'gp' },
    weight: 1,
    text: [
      [
        'When you take the Attack action, you can replace one of your attacks with throwing a flask of Alchemist’s Fire. Target one creature or object you can see within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or take 1d4 Fire damage and start burning (see “Rules Glossary”).',
      ],
    ],
    effects: [
      {
        key: 'burning',
        name: 'Burning',
        lands: { on: 'failed-save', save: 'dex', dc: 'user' },
        text: ['start burning (see “Rules Glossary”)'],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  ammunition: {
    name: 'Ammunition',
    category: 'Adventuring Gear',
    text: [
      [
        'Ammunition is required by a weapon that has the Ammunition property. A weapon’s description specifies the type of ammunition used by the weapon. The Ammunition table lists the different types and the amount you get when you buy them. The table also lists the item that is typically used to store each type; storage must be bought separately.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  antitoxin: {
    name: 'Antitoxin',
    category: 'Adventuring Gear',
    price: { amount: 50, coin: 'gp' },
    text: [
      [
        'As a Bonus Action, you can drink a vial of Antitoxin to gain Advantage on saving throws to avoid or end the ',
        rules.poisoned,
        ' condition for 1 hour.',
      ],
    ],
    effects: [
      {
        key: 'antitoxin',
        name: 'Antitoxin',
        lands: { on: 'use' },
        text: ['Advantage on saving throws to avoid or end the ', rules.poisoned, ' condition'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  arcane_focus: {
    name: 'Arcane Focus',
    category: 'Adventuring Gear',
    text: [
      [
        'An Arcane Focus takes one of the forms in the Arcane Focuses table and is bejeweled or carved to channel arcane magic. A Sorcerer, Warlock, or Wizard can use such an item as a Spellcasting Focus.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  assassins_blood: {
    name: 'Assassin’s Blood',
    category: 'Poison',
    detail: 'Ingested',
    price: { amount: 150, coin: 'gp' },
    text: [
      [
        'A creature subjected to Assassin’s Blood makes a DC 10 Constitution saving throw. On a failed save, the creature takes 6 (1d12) Poison damage and has the ',
        rules.poisoned,
        ' condition for 24 hours. On a successful save, the creature takes half as much damage only.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Poisoned',
        lands: { on: 'failed-save', save: 'con', dc: 10 },
        conditions: [rules.poisoned],
        lasts: { kind: 'time', amount: '24', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  backpack: {
    name: 'Backpack',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 5,
    text: [
      ['A Backpack holds up to 30 pounds within 1 cubic foot. It can also serve as a saddlebag.'],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  ball_bearings: {
    name: 'Ball Bearings',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 2,
    text: [
      [
        'As a Utilize action, you can spill Ball Bearings from their pouch. They spread to cover a level, 10-foot-square area within 10 feet of yourself. A creature that enters this area for the first time on a turn must succeed on a DC 10 Dexterity saving throw or have the ',
        rules.prone,
        ' condition. It takes 10 minutes to recover the Ball Bearings.',
      ],
    ],
    effects: [
      {
        key: 'slipped',
        name: 'Slipped',
        lands: { on: 'failed-save', save: 'dex', dc: 10 },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  barrel: {
    name: 'Barrel',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 70,
    text: [['A Barrel holds up to 40 gallons of liquid or up to 4 cubic feet of dry goods.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  basket: {
    name: 'Basket',
    category: 'Adventuring Gear',
    price: { amount: 4, coin: 'sp' },
    weight: 2,
    text: [['A Basket holds up to 40 pounds within 2 cubic feet.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  bedroll: {
    name: 'Bedroll',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 7,
    text: [
      [
        'A Bedroll sleeps one Small or Medium creature. While in a Bedroll, you automatically succeed on saving throws against extreme cold (see “Gameplay Toolbox”).',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  bell: {
    name: 'Bell',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    text: [
      [
        'When rung as a Utilize action, a Bell produces a sound that can be heard up to 60 feet away.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  blanket: {
    name: 'Blanket',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'sp' },
    weight: 3,
    text: [
      [
        'While wrapped in a blanket, you have Advantage on saving throws against extreme cold (see “Gameplay Toolbox”).',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  block_and_tackle: {
    name: 'Block and Tackle',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 5,
    text: [
      ['A Block and Tackle allows you to hoist up to four times the weight you can normally lift.'],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  book: {
    name: 'Book',
    category: 'Adventuring Gear',
    price: { amount: 25, coin: 'gp' },
    weight: 5,
    text: [
      [
        'A Book contains fiction or nonfiction. If you consult an accurate nonfiction Book about its topic, you gain a +5 bonus to Intelligence (Arcana, History, Nature, or Religion) checks you make about that topic.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  bottle_glass: {
    name: 'Bottle, Glass',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 2,
    text: [['A Glass Bottle holds up to 1½ pints.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  bucket: {
    name: 'Bucket',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'cp' },
    weight: 2,
    text: [['A Bucket holds up to half a cubic foot of contents.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  burglars_pack: {
    name: 'Burglar’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 16, coin: 'gp' },
    weight: 42,
    text: [
      [
        'A Burglar’s Pack contains the following items: Backpack, Ball Bearings, Bell, 10 Candles, Crowbar, Hooded Lantern, 7 flasks of Oil, 5 days of Rations, Rope, Tinderbox, and Waterskin.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  burnt_othur_fumes: {
    name: 'Burnt Othur Fumes',
    category: 'Poison',
    detail: 'Inhaled',
    price: { amount: 500, coin: 'gp' },
    text: [
      [
        'A creature subjected to Burnt Othur Fumes must succeed on a DC 13 Constitution saving throw or take 10 (3d6) Poison damage, and it must repeat the save at the start of each of its turns. On each successive failed save, the creature takes 3 (1d6) Poison damage. After three successful saves, the poison ends.',
      ],
    ],
    effects: [
      {
        key: 'fumes',
        name: 'Burnt othur fumes',
        lands: { on: 'failed-save', save: 'con', dc: 13 },
        text: [
          'It must repeat the save at the start of each of its turns. On each successive failed save, the creature takes 3 (1d6) Poison damage. After three successful saves, the poison ends.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  caltrops: {
    name: 'Caltrops',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 2,
    text: [
      [
        'As a Utilize action, you can spread Caltrops from their bag to cover a 5-foot-square area within 5 feet of yourself. A creature that enters this area for the first time on a turn must succeed on a DC 15 Dexterity saving throw or take 1 Piercing damage and have its Speed reduced to 0 until the start of its next turn. It takes 10 minutes to recover the Caltrops.',
      ],
    ],
    effects: [
      {
        key: 'caltrop-wound',
        name: 'Caltrop wound',
        lands: { on: 'failed-save', save: 'dex', dc: 15 },
        text: ['have its Speed reduced to 0'],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  candle: {
    name: 'Candle',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'cp' },
    text: [
      [
        'For 1 hour, a lit Candle sheds Bright Light in a 5-foot radius and Dim Light for an additional 5 feet.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  case_crossbow_bolt: {
    name: 'Case, Crossbow Bolt',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 1,
    text: [['A Crossbow Bolt Case holds up to 20 Bolts.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  case_map_or_scroll: {
    name: 'Case, Map or Scroll',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 1,
    text: [['A Map or Scroll Case holds up to 10 sheets of paper or 5 sheets of parchment.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  chain: {
    name: 'Chain',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 10,
    text: [
      [
        'As a Utilize action, you can wrap a Chain around an unwilling creature within 5 feet of yourself that has the Grappled, Incapacitated, or ',
        rules.restrained,
        ' condition if you succeed on a DC 13 Strength (Athletics) check. If the creature’s legs are bound, the creature has the ',
        rules.restrained,
        ' condition until it escapes. Escaping the Chain requires the creature to make a successful DC 18 Dexterity (Acrobatics) check as an action. Bursting the Chain requires a successful DC 20 Strength (Athletics) check as an action.',
      ],
    ],
    effects: [
      {
        key: 'legs-chained',
        name: 'Legs bound with a chain',
        lands: { on: 'use' },
        conditions: [rules.restrained],
        text: [
          'If the creature’s legs are bound, the creature has the ',
          rules.restrained,
          ' condition until it escapes.',
          ' Bursting the Chain requires a successful DC 20 Strength (Athletics) check as an action.',
        ],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 18 } },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  chest: {
    name: 'Chest',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 25,
    text: [['A Chest holds up to 12 cubic feet of contents.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  climbers_kit: {
    name: 'Climber’s Kit',
    category: 'Adventuring Gear',
    price: { amount: 25, coin: 'gp' },
    weight: 12,
    text: [
      [
        'A Climber’s Kit includes boot tips, gloves, pitons, and a harness. As a Utilize action, you can use the Climber’s Kit to anchor yourself; when you do, you can’t fall more than 25 feet from the anchor point, and you can’t move more than 25 feet from there without undoing the anchor as a Bonus Action.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  clothes_fine: {
    name: 'Clothes, Fine',
    category: 'Adventuring Gear',
    price: { amount: 15, coin: 'gp' },
    weight: 6,
    text: [
      [
        'Fine Clothes are made of expensive fabrics and adorned with expertly crafted details. Some events and locations admit only people wearing these clothes.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  clothes_travelers: {
    name: 'Clothes, Traveler’s',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 4,
    text: [
      ['Traveler’s Clothes are resilient garments designed for travel in various environments.'],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  component_pouch: {
    name: 'Component Pouch',
    category: 'Adventuring Gear',
    price: { amount: 25, coin: 'gp' },
    weight: 2,
    text: [
      [
        'A Component Pouch is watertight and filled with compartments that hold all the free Material components of your spells.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  costume: {
    name: 'Costume',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 4,
    text: [
      [
        'While wearing a Costume, you have Advantage on any ability check you make to impersonate the person or type of person it represents.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  crawler_mucus: {
    name: 'Crawler Mucus',
    category: 'Poison',
    detail: 'Contact',
    price: { amount: 200, coin: 'gp' },
    text: [
      [
        'A creature subjected to Crawler Mucus must succeed on a DC 13 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 1 minute. The creature also has the ',
        rules.paralyzed,
        ' condition while Poisoned in this way. The creature repeats the save at the end of each of its turns, ending the effect on itself on a success.',
      ],
    ],
    effects: [
      {
        key: 'paralyzed',
        name: 'Paralysed by crawler mucus',
        lands: { on: 'failed-save', save: 'con', dc: 13 },
        conditions: [rules.poisoned, rules.paralyzed],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  crowbar: {
    name: 'Crowbar',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 5,
    text: [
      [
        'Using a Crowbar gives you Advantage on Strength checks where the Crowbar’s leverage can be applied.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  diplomats_pack: {
    name: 'Diplomat’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 39, coin: 'gp' },
    weight: 39,
    text: [
      [
        'A Diplomat’s Pack contains the following items: Chest, Fine Clothes, Ink, 5 Ink Pens, Lamp, 2 Map or Scroll Cases, 4 flasks of Oil, 5 sheets of Paper, 5 sheets of Parchment, Perfume, and Tinderbox.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  druidic_focus: {
    name: 'Druidic Focus',
    category: 'Adventuring Gear',
    text: [
      [
        'A Druidic Focus takes one of the forms in the Druidic Focuses table and is carved, tied with ribbon, or painted to channel primal magic. A Druid or Ranger can use such an object as a Spellcasting Focus.',
      ],
      ['Wooden staff (also a Quarterstaff)'],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  dungeoneers_pack: {
    name: 'Dungeoneer’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 12, coin: 'gp' },
    weight: 55,
    text: [
      [
        'A Dungeoneer’s Pack contains the following items: Backpack, Caltrops, Crowbar, 2 flasks of Oil, 10 days of Rations, Rope, Tinderbox, 10 Torches, and Waterskin.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  entertainers_pack: {
    name: 'Entertainer’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 40, coin: 'gp' },
    weight: 58.5,
    text: [
      [
        'An Entertainer’s Pack contains the following items: Backpack, Bedroll, Bell, Bullseye Lantern, 3 Costumes, Mirror, 8 flasks of Oil, 9 days of Rations, Tinderbox, and Waterskin.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  essence_of_ether: {
    name: 'Essence of Ether',
    category: 'Poison',
    detail: 'Inhaled',
    price: { amount: 300, coin: 'gp' },
    text: [
      [
        'A creature subjected to Essence of Ether must succeed on a DC 15 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 8 hours. The creature also has the ',
        rules.unconscious,
        ' condition while Poisoned in this way. The creature wakes up if it takes damage or if another creature takes an action to shake it awake.',
      ],
    ],
    effects: [
      {
        key: 'asleep',
        name: 'Ether sleep',
        lands: { on: 'failed-save', save: 'con', dc: 15 },
        conditions: [rules.poisoned, rules.unconscious],
        text: [
          'The creature wakes up if it takes damage or if another creature takes an action to shake it awake.',
        ],
        lasts: { kind: 'time', amount: '8', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  explorers_pack: {
    name: 'Explorer’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 10, coin: 'gp' },
    weight: 55,
    text: [
      [
        'An Explorer’s Pack contains the following items: Backpack, Bedroll, 2 flasks of Oil, 10 days of Rations, Rope, Tinderbox, 10 Torches, and Waterskin.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  flask: {
    name: 'Flask',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'cp' },
    weight: 1,
    text: [['A Flask holds up to 1 pint.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  grappling_hook: {
    name: 'Grappling Hook',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 4,
    text: [
      [
        'As a Utilize action, you can throw the Grappling Hook at a railing, a ledge, or another catch within 50 feet of yourself, and the hook catches on if you succeed on a DC 13 Dexterity (Acrobatics) check. If you tied a Rope to the hook, you can then climb it.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  healers_kit: {
    name: 'Healer’s Kit',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 3,
    text: [
      [
        'A Healer’s Kit has ten uses. As a Utilize action, you can expend one of its uses to stabilize an Unconscious creature that has 0 Hit Points without needing to make a Wisdom (Medicine) check.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  holy_symbol: {
    name: 'Holy Symbol',
    category: 'Adventuring Gear',
    text: [
      [
        'A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to channel divine magic. A Cleric or Paladin can use a Holy Symbol as a Spellcasting Focus. The table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (such as a tabard or banner) or a Shield.',
      ],
      ['Amulet (worn or held) Emblem (borne on fabric or a Shield) Reliquary (held)'],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  holy_water: {
    name: 'Holy Water',
    category: 'Adventuring Gear',
    price: { amount: 25, coin: 'gp' },
    weight: 1,
    text: [
      [
        'When you take the Attack action, you can replace one of your attacks with throwing a flask of Holy Water. Target one creature you can see within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or take 2d8 Radiant damage if it is a Fiend or an Undead.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  hunting_trap: {
    name: 'Hunting Trap',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 25,
    text: [
      [
        'As a Utilize action, you can set a Hunting Trap, which is a sawtooth steel ring that snaps shut when a creature steps on a pressure plate in the center.',
      ],
      [
        'The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground. A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 Piercing damage and have its Speed reduced to 0 until the start of its next turn. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet). A creature can use its action to make a DC 13 Strength (Athletics) check, freeing itself or another creature within its reach on a success. Each failed check deals 1 Piercing damage to the trapped creature.',
      ],
    ],
    effects: [
      {
        key: 'trapped',
        name: 'Caught in the trap',
        lands: { on: 'failed-save', save: 'dex', dc: 13 },
        text: [
          'have its Speed reduced to 0 until the start of its next turn. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet).',
          ' Each failed check deals 1 Piercing damage to the trapped creature.',
        ],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 13 } },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  ink: {
    name: 'Ink',
    category: 'Adventuring Gear',
    price: { amount: 10, coin: 'gp' },
    text: [['Ink comes in a 1-ounce bottle, which provides enough ink to write about 500 pages.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  ink_pen: {
    name: 'Ink Pen',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'cp' },
    text: [['Using Ink, an Ink Pen is used to write or draw.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  jug: {
    name: 'Jug',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'cp' },
    weight: 4,
    text: [['A Jug holds up to 1 gallon.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  ladder: {
    name: 'Ladder',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'sp' },
    weight: 25,
    text: [['A Ladder is 10 feet tall. You must climb to move up or down it.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  lamp: {
    name: 'Lamp',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'sp' },
    weight: 1,
    text: [
      [
        'A Lamp burns Oil as fuel to cast Bright Light in a 15-foot radius and Dim Light for an additional 30 feet.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  lantern_bullseye: {
    name: 'Lantern, Bullseye',
    category: 'Adventuring Gear',
    price: { amount: 10, coin: 'gp' },
    weight: 2,
    text: [
      [
        'A Bullseye Lantern burns Oil as fuel to cast Bright Light in a 60-foot Cone and Dim Light for an additional 60 feet.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  lantern_hooded: {
    name: 'Lantern, Hooded',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 2,
    text: [
      [
        'A Hooded Lantern burns Oil as fuel to cast Bright Light in a 30-foot radius and Dim Light for an additional 30 feet. As a Bonus Action, you can lower the hood, reducing the light to Dim Light in a 5-foot radius, or raise it again.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  lock: {
    name: 'Lock',
    category: 'Adventuring Gear',
    price: { amount: 10, coin: 'gp' },
    weight: 1,
    text: [
      [
        'A Lock comes with a key. Without the key, a creature can use Thieves’ Tools to pick this Lock with a successful DC 15 Dexterity (Sleight of Hand) check.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  magnifying_glass: {
    name: 'Magnifying Glass',
    category: 'Adventuring Gear',
    price: { amount: 100, coin: 'gp' },
    text: [
      [
        'A Magnifying Glass grants Advantage on any ability check made to appraise or inspect a highly detailed item. Lighting a fire with a Magnifying Glass requires light as bright as sunlight to focus, tinder to ignite, and about 5 minutes for the fire to ignite.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  malice: {
    name: 'Malice',
    category: 'Poison',
    detail: 'Inhaled',
    price: { amount: 250, coin: 'gp' },
    text: [
      [
        'A creature subjected to Malice must succeed on a DC 15 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 1 hour. The creature also has the ',
        rules.blinded,
        ' condition while Poisoned in this way.',
      ],
    ],
    effects: [
      {
        key: 'blinded',
        name: 'Blinded by malice',
        lands: { on: 'failed-save', save: 'con', dc: 15 },
        conditions: [rules.poisoned, rules.blinded],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  manacles: {
    name: 'Manacles',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    text: [
      [
        'As a Utilize action, you can use Manacles to bind an unwilling Small or Medium creature within 5 feet of yourself that has the Grappled, Incapacitated, or ',
        rules.restrained,
        ' condition if you succeed on a DC 13 Dexterity (Sleight of Hand) check. While bound, a creature has Disadvantage on attack rolls, and the creature is Restrained if the Manacles are attached to a chain or hook that is fixed in place. Escaping the Manacles requires a successful DC 20 Dexterity (Sleight of Hand) check as an action. Bursting them requires a successful DC 25 Strength (Athletics) check as an action. Each set of Manacles comes with a key. Without the key, a creature can use Thieves’ Tools to pick the Manacles’ lock with a successful DC 15 Dexterity (Sleight of Hand) check.',
      ],
    ],
    effects: [
      {
        key: 'manacled',
        name: 'Manacled',
        lands: { on: 'use' },
        text: [
          'While bound, a creature has Disadvantage on attack rolls, and the creature is ',
          rules.restrained,
          ' if the Manacles are attached to a chain or hook that is fixed in place.',
          ' Bursting them requires a successful DC 25 Strength (Athletics) check as an action.',
        ],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 20 } },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  map: {
    name: 'Map',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    text: [
      [
        'If you consult an accurate Map, you gain a +5 bonus to Wisdom (Survival) checks you make to find your way in the place represented on it.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  midnight_tears: {
    name: 'Midnight Tears',
    category: 'Poison',
    detail: 'Ingested',
    price: { amount: 1500, coin: 'gp' },
    text: [
      [
        'A creature that ingests Midnight Tears suffers no effect until the stroke of midnight. Any effect that ends the ',
        rules.poisoned,
        ' condition neutralizes this poison. If the poison hasn’t been neutralized before midnight, the creature makes a DC 17 Constitution saving throw, taking 31 (9d6) Poison damage on a failed save or half as much damage on a successful one.',
      ],
    ],
    effects: [
      {
        key: 'midnight-tears',
        name: 'Midnight Tears',
        lands: { on: 'use' },
        text: [
          'Any effect that ends the ',
          rules.poisoned,
          ' condition neutralizes this poison. If the poison hasn’t been neutralized before midnight, the creature makes a DC 17 Constitution saving throw, taking 31 (9d6) Poison damage on a failed save or half as much damage on a successful one.',
        ],
        lasts: { kind: 'until', text: ['the stroke of midnight'] },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  mirror: {
    name: 'Mirror',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    weight: 0.5,
    text: [
      [
        'A handheld steel Mirror is useful for personal cosmetics but also for peeking around corners and reflecting light as a signal.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  net: {
    name: 'Net',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 3,
    text: [
      [
        'When you take the Attack action, you can replace one of your attacks with throwing a Net. Target a creature you can see within 15 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or have the ',
        rules.restrained,
        ' condition until it escapes. The target succeeds automatically if it is Huge or larger. To escape, the target or a creature within 5 feet of it must take an action to make a DC 10 Strength (Athletics) check, freeing the Restrained creature on a success. Destroying the Net (AC 10; 5 HP; Immunity to Bludgeoning, Poison, and Psychic damage) also frees the target, ending the effect.',
      ],
    ],
    effects: [
      {
        key: 'netted',
        name: 'Netted',
        lands: { on: 'failed-save', save: 'dex', dc: 'user' },
        conditions: [rules.restrained],
        text: [
          'To escape, the target or a creature within 5 feet of it must take an action to make a DC 10 Strength (Athletics) check, freeing the ',
          rules.restrained,
          ' creature on a success. Destroying the Net (AC 10; 5 HP; Immunity to Bludgeoning, Poison, and Psychic damage) also frees the target, ending the effect.',
        ],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 10 } },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  oil: {
    name: 'Oil',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'sp' },
    weight: 1,
    text: [
      [
        'You can douse a creature, object, or space with Oil or use it as fuel, as detailed below. Dousing a Creature or an Object. When you take the Attack action, you can replace one of your attacks with throwing an Oil flask. Target one creature or object within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or be covered in oil. If the target takes Fire damage before the oil dries (after 1 minute), the target takes an extra 5 Fire damage from burning oil. Dousing a Space. You can take the Utilize action to pour an Oil flask on level ground to cover a 5-foot-square area within 5 feet of yourself. If lit, the oil burns until the end of the turn 2 rounds from when the oil was lit (or 12 seconds) and deals 5 Fire damage to any creature that enters the area or ends its turn there. A creature can take this damage only once per turn.',
      ],
      [
        'Fuel. Oil serves as fuel for Lamps and Lanterns. Once lit, a flask of Oil burns for 6 hours in a Lamp or Lantern. That duration doesn’t need to be consecutive; you can extinguish the burning Oil (as a Utilize action) and rekindle it again until it has burned for a total of 6 hours.',
      ],
    ],
    effects: [
      {
        key: 'oiled',
        name: 'Covered in oil',
        lands: { on: 'failed-save', save: 'dex', dc: 'user' },
        text: [
          'If the target takes Fire damage before the oil dries (after 1 minute), the target takes an extra 5 Fire damage from burning oil.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  oil_of_taggit: {
    name: 'Oil of Taggit',
    category: 'Poison',
    detail: 'Contact',
    price: { amount: 400, coin: 'gp' },
    text: [
      [
        'A creature subjected to Oil of Taggit must succeed on a DC 13 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 24 hours. The creature also has the ',
        rules.unconscious,
        ' condition while Poisoned in this way. It wakes up if it takes damage.',
      ],
    ],
    effects: [
      {
        key: 'asleep',
        name: 'Taggit sleep',
        lands: { on: 'failed-save', save: 'con', dc: 13 },
        conditions: [rules.poisoned, rules.unconscious],
        text: ['It wakes up if it takes damage.'],
        lasts: { kind: 'time', amount: '24', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  pale_tincture: {
    name: 'Pale Tincture',
    category: 'Poison',
    detail: 'Ingested',
    price: { amount: 250, coin: 'gp' },
    text: [
      [
        'A creature subjected to Pale Tincture must succeed on a DC 16 Constitution saving throw or take 3 (1d6) Poison damage and have the ',
        rules.poisoned,
        ' condition. The Poisoned creature repeats the save every 24 hours, taking 3 (1d6) Poison damage on a failed save. The damage the poison deals can’t be healed by any means while the creature remains Poisoned. After seven successful saves against the poison, the creature is no longer Poisoned.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Pale tincture',
        lands: { on: 'failed-save', save: 'con', dc: 16 },
        conditions: [rules.poisoned],
        text: [
          'The ',
          rules.poisoned,
          ' creature repeats the save every 24 hours, taking 3 (1d6) Poison damage on a failed save. The damage the poison deals can’t be healed by any means while the creature remains ',
          rules.poisoned,
          '. After seven successful saves against the poison, the creature is no longer ',
          rules.poisoned,
          '.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  paper: {
    name: 'Paper',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'sp' },
    text: [['One sheet of Paper can hold about 250 handwritten words.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  parchment: {
    name: 'Parchment',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'sp' },
    text: [['One sheet of Parchment can hold about 250 handwritten words.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  perfume: {
    name: 'Perfume',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'gp' },
    text: [
      [
        'Perfume comes in a 4-ounce vial. For 1 hour after applying Perfume to yourself, you have Advantage on Charisma (Persuasion) checks made to influence an Indifferent Humanoid within 5 feet of yourself.',
      ],
    ],
    effects: [
      {
        key: 'perfumed',
        name: 'Perfumed',
        lands: { on: 'use' },
        text: [
          'Advantage on Charisma (Persuasion) checks made to influence an Indifferent Humanoid within 5 feet of yourself.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  poison_basic: {
    name: 'Poison, Basic',
    category: 'Adventuring Gear',
    price: { amount: 100, coin: 'gp' },
    text: [
      [
        'As a Bonus Action, you can use a vial of Basic Poison to coat one weapon or up to three pieces of ammunition. A creature that takes Piercing or Slashing damage from the poisoned weapon or ammunition takes an extra 1d4 Poison damage. Once applied, the poison retains potency for 1 minute or until its damage is dealt, whichever comes first.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  pole: {
    name: 'Pole',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'cp' },
    weight: 7,
    text: [
      [
        'A Pole is 10 feet long. You can use it to touch something up to 10 feet away. If you must make a Strength (Athletics) check as part of a High or Long Jump, you can use the Pole to vault, giving yourself Advantage on the check.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  pot_iron: {
    name: 'Pot, Iron',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 10,
    text: [['An Iron Pot holds up to 1 gallon.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  pouch: {
    name: 'Pouch',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'sp' },
    weight: 1,
    text: [['A Pouch holds up to 6 pounds within one-fifth of a cubic foot.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  priests_pack: {
    name: 'Priest’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 33, coin: 'gp' },
    weight: 29,
    text: [
      [
        'A Priest’s Pack contains the following items: Backpack, Blanket, Holy Water, Lamp, 7 days of Rations, Robe, and Tinderbox.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  purple_worm_poison: {
    name: 'Purple Worm Poison',
    category: 'Poison',
    detail: 'Injury',
    price: { amount: 2000, coin: 'gp' },
    text: [
      [
        'A creature subjected to Purple Worm Poison makes a DC 21 Constitution saving throw, taking 35 (10d6) Poison damage on a failed save or half as much damage on a successful one.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  quiver: {
    name: 'Quiver',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 1,
    text: [['A Quiver holds up to 20 Arrows.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  ram_portable: {
    name: 'Ram, Portable',
    category: 'Adventuring Gear',
    price: { amount: 4, coin: 'gp' },
    weight: 35,
    text: [
      [
        'You can use a Portable Ram to break down doors. When doing so, you gain a +4 bonus to the Strength check. One other character can help you use the ram, giving you Advantage on this check.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  rations: {
    name: 'Rations',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'sp' },
    weight: 2,
    text: [
      [
        'Rations consist of travel-ready food, including jerky, dried fruit, hardtack, and nuts. See “Malnutrition” in “Rules Glossary” for the risks of not eating.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  robe: {
    name: 'Robe',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 4,
    text: [
      [
        'A Robe has vocational or ceremonial significance. Some events and locations admit only people wearing a Robe bearing certain colors or symbols.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  rope: {
    name: 'Rope',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 5,
    text: [
      [
        'As a Utilize action, you can tie a knot with Rope if you succeed on a DC 10 Dexterity (Sleight of Hand) check. The Rope can be burst with a successful DC 20 Strength (Athletics) check. You can bind an unwilling creature with the Rope only if the creature has the Grappled, Incapacitated, or ',
        rules.restrained,
        ' condition. If the creature’s legs are bound, the creature has the ',
        rules.restrained,
        ' condition until it escapes. Escaping the Rope requires the creature to make a successful DC 15 Dexterity (Acrobatics) check as an action.',
      ],
    ],
    effects: [
      {
        key: 'legs-bound',
        name: 'Legs bound with rope',
        lands: { on: 'use' },
        conditions: [rules.restrained],
        text: [
          'If the creature’s legs are bound, the creature has the ',
          rules.restrained,
          ' condition until it escapes.',
          ' The Rope can be burst with a successful DC 20 Strength (Athletics) check.',
        ],
        lasts: { kind: 'until-removed' },
        ends: { escape: { dc: 15 } },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  sack: {
    name: 'Sack',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'cp' },
    weight: 0.5,
    text: [['A Sack holds up to 30 pounds within 1 cubic foot.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  scholars_pack: {
    name: 'Scholar’s Pack',
    category: 'Adventuring Gear',
    price: { amount: 40, coin: 'gp' },
    weight: 22,
    text: [
      [
        'A Scholar’s Pack contains the following items: Backpack, Book, Ink, Ink Pen, Lamp, 10 flasks of Oil, 10 sheets of Parchment, and Tinderbox.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  serpent_venom: {
    name: 'Serpent Venom',
    category: 'Poison',
    detail: 'Injury',
    price: { amount: 200, coin: 'gp' },
    text: [
      [
        'A creature subjected to Serpent Venom must succeed on a DC 11 Constitution saving throw, taking 10 (3d6) Poison damage on a failed save or half as much damage on a successful one.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  shovel: {
    name: 'Shovel',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 5,
    text: [
      [
        'Working for 1 hour, you can use a Shovel to dig a hole that is 5 feet on each side in soil or similar material.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  signal_whistle: {
    name: 'Signal Whistle',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'cp' },
    text: [
      [
        'When blown as a Utilize action, a Signal Whistle produces a sound that can be heard up to 600 feet away.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  spiders_sting: {
    name: 'Spider’s Sting',
    category: 'Poison',
    detail: 'Injury',
    price: { amount: 200, coin: 'gp' },
    text: [
      [
        'A creature subjected to Spider’s Sting must succeed on a DC 13 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 1 hour. If the creature fails the save by 5 or more, the creature also has the ',
        rules.unconscious,
        ' condition while Poisoned in this way. The creature wakes up if it takes damage or if another creature takes an action to shake it awake.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Spider’s Sting',
        lands: { on: 'failed-save', save: 'con', dc: 13 },
        conditions: [rules.poisoned],
        text: [
          'If the creature fails the save by 5 or more, the creature also has the ',
          rules.unconscious,
          ' condition while ',
          rules.poisoned,
          ' in this way. The creature wakes up if it takes damage or if another creature takes an action to shake it awake.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  spikes_iron: {
    name: 'Spikes, Iron',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    weight: 5,
    text: [
      [
        'Iron Spikes come in bundles of ten. As a Utilize action, you can use a blunt object, such as a Light Hammer, to hammer a spike into wood, earth, or a similar material. You can do so to jam a door shut or to then tie a Rope or Chain to the Spike.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  spyglass: {
    name: 'Spyglass',
    category: 'Adventuring Gear',
    price: { amount: 1000, coin: 'gp' },
    weight: 1,
    text: [['Objects viewed through a Spyglass are magnified to twice their size.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  string: {
    name: 'String',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'sp' },
    text: [['String is 10 feet long. You can tie a knot in it as a Utilize action.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  tent: {
    name: 'Tent',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'gp' },
    weight: 20,
    text: [['A Tent sleeps up to two Small or Medium creatures.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  tinderbox: {
    name: 'Tinderbox',
    category: 'Adventuring Gear',
    price: { amount: 5, coin: 'sp' },
    weight: 1,
    text: [
      [
        'A Tinderbox is a small container holding flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire. Using it to light a Candle, Lamp, Lantern, or Torch—or anything else with exposed fuel—takes a Bonus Action. Lighting any other fire takes 1 minute.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  torch: {
    name: 'Torch',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'cp' },
    weight: 1,
    text: [
      [
        'A Torch burns for 1 hour, casting Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. When you take the Attack action, you can attack with the Torch, using it as a Simple Melee weapon. On a hit, the target takes 1 Fire damage.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  torpor: {
    name: 'Torpor',
    category: 'Poison',
    detail: 'Ingested',
    price: { amount: 600, coin: 'gp' },
    text: [
      [
        'A creature subjected to Torpor poison must succeed on a DC 15 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 4d6 hours. The creature’s Speed is halved while the creature is Poisoned in this way.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Torpor',
        lands: { on: 'failed-save', save: 'con', dc: 15 },
        conditions: [rules.poisoned],
        text: [
          'The creature’s Speed is halved while the creature is ',
          rules.poisoned,
          ' in this way.',
        ],
        lasts: { kind: 'time', amount: '4d6', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  truth_serum: {
    name: 'Truth Serum',
    category: 'Poison',
    detail: 'Ingested',
    price: { amount: 150, coin: 'gp' },
    text: [
      [
        'A creature subjected to Truth Serum must succeed on a DC 11 Constitution saving throw or have the ',
        rules.poisoned,
        ' condition for 1 hour. The Poisoned creature can’t knowingly communicate a lie.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Truth serum',
        lands: { on: 'failed-save', save: 'con', dc: 11 },
        conditions: [rules.poisoned],
        text: ['The ', rules.poisoned, ' creature can’t knowingly communicate a lie.'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.srd_5_2_1,
  },
  vial: {
    name: 'Vial',
    category: 'Adventuring Gear',
    price: { amount: 1, coin: 'gp' },
    text: [['A Vial holds up to 4 ounces.']],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  waterskin: {
    name: 'Waterskin',
    category: 'Adventuring Gear',
    price: { amount: 2, coin: 'sp' },
    text: [
      [
        'A Waterskin holds up to 4 pints. If you don’t drink sufficient water, you risk dehydration (see “Rules Glossary”).',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
  wyvern_poison: {
    name: 'Wyvern Poison',
    category: 'Poison',
    detail: 'Injury',
    price: { amount: 1200, coin: 'gp' },
    text: [
      [
        'A creature subjected to Wyvern Poison makes a DC 14 Constitution saving throw, taking 24 (7d6) Poison damage on a failed save or half as much damage on a successful one.',
      ],
    ],
    effects: [],
    publication: refs.publications.srd_5_2_1,
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.critical_role_call_of_the_netherdeep,
  monsters: {
    bristled_moorbounder: {
      name: 'Bristled Moorbounder',
      page: 203,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Marsh', 'Foothills'],
      appearance: [
        [
          'A muscular, tusked hunter with rows of long blade-shaped bristles along its back and sides.',
        ],
      ],
      tableNotes: [
        [
          'Encounter application: In Moorbounder Mayhem on p. 43, two bristled moorbounders threaten a mounted scout. A character can spend an action to frighten one away with a successful DC 21 Charisma (Intimidation) check.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '3',
        ac: 15,
        armor: 'natural armor',
        hitDice: '7d10',
        speed: { walk: 70 },
        scores: { str: 18, dex: 14, con: 14, int: 2, wis: 13, cha: 5 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'bladed-hide',
            name: 'Bladed Hide',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'At the start of the moorbounder’s turn, each creature that is grappling it takes ',
              { roll: '2d4' },
              ' piercing damage.',
            ],
          },
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'The moorbounder can long jump up to 40 ft. or high jump up to 20 ft. from a standstill or after a run.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'blades' },
              ' attack and one ',
              { ability: 'claw' },
              ' attack.',
            ],
          },
          {
            key: 'blades',
            name: 'Blades',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d4', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    foghome: {
      name: 'Foghome',
      alignment: 'neutral good',
      languages: ['any two languages', 'Elvish', 'Giant', 'any two languages', 'Elvish', 'Giant'],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Priest'],
        ['Applied templates: Firbolg'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 13,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 10, con: 12, int: 13, wis: 16, cha: 13 },
        skills: { medicine: 'expert', persuasion: 'proficient', religion: 'expert' },
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'The priest is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save ',
              { dc: 'wis' },
              ', ',
              { toHit: 'wis' },
              ' to hit with spell attacks). The priest has the following cleric spells prepared: Cantrips (at will): ',
              refs.spells.light_srd_5_1,
              ', ',
              refs.spells.sacred_flame_srd_5_1,
              ', ',
              refs.spells.thaumaturgy_srd_5_1,
              '; 1st level (4 slots): ',
              refs.spells.cure_wounds_srd_5_1,
              ', ',
              refs.spells.guiding_bolt_srd_5_1,
              ', ',
              refs.spells.sanctuary_srd_5_1,
              '; 2nd level (3 slots): ',
              refs.spells.lesser_restoration_srd_5_1,
              ', ',
              refs.spells.spiritual_weapon_srd_5_1,
              '; 3rd level (2 slots): ',
              refs.spells.dispel_magic_srd_5_1,
              ', ',
              refs.spells.spirit_guardians_srd_5_1,
            ],
          },
          {
            key: 'divine-eminence',
            name: 'Divine Eminence',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'As a bonus action, the priest can expend a spell slot to cause its melee weapon attacks to magically deal an extra ',
              { roll: '3d6' },
              ' radiant damage to a target on a hit. This benefit lasts until the end of the turn. If the priest expends a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each level above 1st.  Powerful Build. Treat as one size larger for carrying capacity and for pushing, dragging, or lifting.',
            ],
          },
          {
            key: 'speech-of-beast-and-leaf',
            name: 'Speech of Beast and Leaf',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Beasts and plants understand it. Roll Charisma checks with advantage to influence them.',
            ],
          },
          {
            key: 'mace',
            name: 'Mace',
            timing: 'action',
            icon: 'gi/GiFlangedMace',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Priests bring the teachings of their gods to the common folk. They are the spiritual leaders of temples and shrines and often hold positions of influence in their communities. Evil priests might work openly under a tyrant, or they might be the leaders of religious sects hidden in the shadows of good society, overseeing depraved rites. A priest typically has one or more acolytes to help with religious ceremonies and other sacred duties.',
            ],
          },
        ],
      },
    },
    moonshark: {
      name: 'Moonshark',
      page: 33,
      alignment: 'unaligned',
      languages: [],
      habitats: ['underwater'],
      appearance: [
        [
          'A massive slate-gray shark with a silver spear lodged in its side. A thick rope holds a gold-and-emerald amulet to its body.',
        ],
      ],
      tableNotes: [
        [
          'Emerald Eye: The rope holding the amulet has AC 17 and 5 HP, and characters can attack it to cut the amulet free. If the shark is dead or incapacitated, a character can remove the rope as an action.',
        ],
        [
          'Encounter application: If the party crossed the grotto in 10 rounds or fewer, the rivals arrive after the shark encounter. At 11 to 15 rounds, the rivals enter and roll initiative in round 3. Unless hostile to the characters, they help fight the shark. Hostile rivals pursue the amulet or interfere with the characters without intentionally killing them. At 16 rounds or more, the rivals arrive first and reduce the shark to 75 HP before the characters roll initiative. At 0 HP the shark knocks over the southern pillar, breaking open the passage to E11.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '5',
        ac: 13,
        armor: 'natural armor',
        hitDice: '11d12',
        speed: { walk: 0, swim: 50 },
        scores: { str: 23, dex: 11, con: 21, int: 1, wis: 10, cha: 5 },
        skills: { perception: 'proficient' },
        senses: { blindsight: 60 },
        abilities: [
          {
            key: 'blood-frenzy',
            name: 'Blood Frenzy',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The shark has advantage on melee attack rolls against creatures below their hit point maximum.',
            ],
          },
          {
            key: 'water-breathing',
            name: 'Water Breathing',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The shark breathes only underwater.'],
          },
          {
            key: 'silver-spear',
            name: 'Silver Spear',
            timing: 'trait',
            icon: 'gi/GiThrownDaggers',
            text: [
              'While the spear is lodged in its side, the shark sheds bright silver light within 10 ft. and dim light for another 10 ft. A character within 5 ft. can use an action to dislodge the spear with a successful DC 13 Strength (Athletics) check.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d10', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'spear-assisted-swim',
            name: 'Spear-Assisted Swim',
            timing: 'bonus action',
            icon: 'gi/GiThrownDaggers',
            text: [
              'While the spear is embedded, if the shark uses its action to ',
              { ability: 'bite' },
              ' and misses, it can spend a bonus action to swim up to 25 ft. This movement does not provoke opportunity attacks.',
            ],
          },
        ],
      },
    },
    moorbounder: {
      name: 'Moorbounder',
      page: 203,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Marsh', 'Foothills'],
      appearance: [
        [
          'A sleek, broad-chested hunting cat with long ivory tusks, powerful hind legs, and large clawed paws.',
        ],
      ],
      tableNotes: [
        [
          'Encounter application: In Moorbounder Mayhem on p. 43, Justice rides a moorbounder named Rice Pudding. The mount is frightened by two bristled moorbounders and bucks as Justice hangs on.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 13,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 70 },
        scores: { str: 18, dex: 14, con: 14, int: 2, wis: 13, cha: 5 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'The moorbounder can long jump up to 40 ft. or high jump up to 20 ft. from a standstill or after a run.',
            ],
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d4', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    young_horizonback_tortoise: {
      name: 'Young Horizonback Tortoise',
      page: 26,
      alignment: 'unaligned',
      languages: ['Understands Goblin but cannot speak'],
      habitats: ['Wetlands', 'Fields'],
      appearance: [
        [
          'A fifteen-foot-tall tortoise with a high dome of overlapping shell plates, a thick beaked head, and sturdy legs.',
        ],
      ],
      tableNotes: [
        [
          'Base-block action: The inherited Ankylosaurus Tail is a +7 melee weapon attack with 10 ft. reach against one target. It deals 18 (4d6 + 4) bludgeoning damage. A creature hit must succeed on a DC 14 Strength save or fall prone.',
        ],
        [
          'Encounter application: Maneuvering a tortoise takes three successful Wisdom (Animal Handling) checks, starting at DC 12 and increasing by 1 after each check. On a failed check, it bucks the rider, who must make a DC 13 Dexterity save or fall for 3 (1d6) bludgeoning damage. Remounting requires a DC 15 Dexterity (Acrobatics) check. Failure prompts a Bite. A tortoise charmed through animal friendship or a similar effect does not buck its handler on a failed check, and the handler has advantage on checks to guide it.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '3',
        ac: 15,
        armor: 'natural armor',
        hitDice: '8d12',
        speed: { walk: 30 },
        scores: { str: 19, dex: 11, con: 15, int: 2, wis: 12, cha: 5 },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The tortoise can breathe air and water.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              printedBonus: 7,
              damage: [{ dice: '4d6', type: rules.piercing, addModifier: true }],
            },
            text: [
              'A creature hit must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
  },
})

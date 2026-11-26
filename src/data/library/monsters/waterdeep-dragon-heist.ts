import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.waterdeep_dragon_heist,
  monsters: {
    awakened_rat: {
      name: 'Awakened Rat',
      page: 102,
      alignment: 'unaligned',
      languages: ['Speaks Common'],
      habitats: ['Urban', 'Underground'],
      appearance: [['A brown rat with rounded ears, whiskers, and a long hairless tail.']],
      tableNotes: [
        [
          'Adventure context: Jeryth Phaulkon has one of her awakened rats guide Emerald Enclave characters to the secret staircase in the Castle Ward sewers that leads to Xanathar’s lair.',
        ],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 10,
        hitDice: '1d4',
        speed: { walk: 20 },
        scores: { str: 2, dex: 11, con: 9, int: 10, wis: 10, cha: 4 },
        senses: { darkvision: 30 },
        abilities: [
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The rat has advantage on Wisdom (Perception) checks that rely on smell.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              printedBonus: 0,
              damage: [{ dice: '1', type: rules.piercing }],
            },
          },
        ],
      },
    },
    diatryma: {
      name: 'Diatryma',
      page: 191,
      alignment: 'unaligned',
      languages: [],
      habitats: ['grassland', 'hill'],
      appearance: [
        [
          'A colorful flightless bird with a broad heavy beak, blue-gray mantle, russet plumage, and thick legs.',
        ],
      ],
      tableNotes: [
        [
          'Feather of Diatryma Summoning: The rare feather requires attunement. Use an action to speak the command word and toss the feather into a Large unoccupied space on the ground within 5 ft. The bird appears for up to 6 hours. It reverts sooner at 0 HP or if the user touches it and spends an action to repeat the command word. The feather can summon again after 7 days have elapsed from the reversion. The summoned bird is friendly to the user and their companions and can be ridden. It understands the user’s languages and follows spoken commands. In the absence of orders, it defends itself and takes no other actions.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 11,
        hitDice: '3d10',
        speed: { walk: 50 },
        scores: { str: 14, dex: 12, con: 12, int: 2, wis: 10, cha: 5 },
        abilities: [
          {
            key: 'beak',
            name: 'Beak',
            timing: 'action',
            icon: 'gi/GiRaven',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    elzerina_cassalanter: {
      name: 'Elzerina Cassalanter',
      tags: ['human'],
      alignment: 'noncombatant',
      tableNotes: [
        [
          'The Lost Hope homebrew. Original mechanics for a rescue, chase, or distraction scene. No encounter XP.',
        ],
        ['Rules origin: Homebrew stat block'],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '0',
        ac: 11,
        hitDice: '1d6',
        speed: { walk: 25 },
        scores: { str: 7, dex: 12, con: 12, int: 11, wis: 12, cha: 13 },
        skills: { insight: 'proficient', persuasion: 'proficient' },
        abilities: [
          {
            key: 'point-out-cover',
            name: 'Point Out Cover',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Choose one willing ally within 15 ft. who can hear Elzerina. If Elzerina can see an unoccupied space that grants cover from a creature she can see, the ally can use its reaction to move up to 5 ft. into that space without provoking opportunity attacks.',
            ],
          },
        ],
      },
    },
    falcon: {
      name: 'Falcon',
      page: 53,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Urban'],
      appearance: [
        [
          'A compact falcon with pointed folded wings, a barred cream breast, and a dark leather falconry hood.',
        ],
      ],
      tableNotes: [
        [
          'Adventure context: Lord Gralhund keeps the falcon hooded in a cage in the Den and Trophy Room, area G10.',
        ],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 10, fly: 60 },
        scores: { str: 5, dex: 16, con: 8, int: 2, wis: 14, cha: 6 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-sight',
            name: 'Keen Sight',
            timing: 'trait',
            icon: 'lucide/Eye',
            text: ['The falcon has advantage on Wisdom (Perception) checks that rely on sight.'],
          },
          {
            key: 'talons',
            name: 'Talons',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1', type: rules.slashing }],
            },
          },
        ],
      },
    },
    giant_mimic: {
      name: 'Giant Mimic',
      tags: ['shapechanger'],
      alignment: 'neutral',
      languages: [],
      habitats: ['Waterdeep', 'Cassalanter Villa', 'Banquet Hall'],
      appearance: [
        [
          'An oversized shapechanger that can pose as furniture. Its attack exposes a toothed maw, tongue and sticky pseudopods.',
        ],
      ],
      tableNotes: [
        [
          'Rules source: Waterdeep: Dragon Heist, p. 122. The digital catalog lists the same CR 3 monster under both Waterdeep adventures. The printed Mad Mage statue is a separate Large Mimic.',
        ],
        [
          "Encounter: In Dragon Heist, the Cassalanters' giant mimic disguises itself as a long dining table. It spares their household and obeys only Lord and Lady Cassalanter. For the statue encounter in Mad Mage, use the separate Large Mimic entry.",
        ],
      ],
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '3',
        ac: 12,
        armor: 'natural armor',
        hitDice: '10d10',
        speed: { walk: 15 },
        scores: { str: 17, dex: 12, con: 15, int: 5, wis: 13, cha: 8 },
        skills: { stealth: 'expert' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.acid],
        conditionImmunities: [rules.prone],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Use an action to become an object or return to its amorphous form. Statistics and equipment stay the same. Death restores its true form.',
            ],
          },
          {
            key: 'adhesive-object-form-only',
            name: 'Adhesive (object form only)',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Anything touching the mimic sticks to it. A Huge or smaller creature that sticks is ',
              rules.grappled,
              ' (escape DC 13), with Disadvantage on escape checks.',
            ],
          },
          {
            key: 'false-appearance-object-form-only',
            name: 'False Appearance (object form only)',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['While motionless, it looks like an ordinary object.'],
          },
          {
            key: 'grappler',
            name: 'Grappler',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Gain Advantage on attacks against a creature it has ', rules.grappled, '.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make two ',
              { ability: 'pseudopod' },
              ' attacks and one ',
              { ability: 'bite' },
              ' attack.',
            ],
          },
          {
            key: 'pseudopod',
            name: 'Pseudopod',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: ['In object form, this also applies Adhesive.'],
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
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
            text: ['Plus ', { roll: '1d8' }, ' acid.'],
          },
        ],
      },
    },
    halfling_wererat: {
      name: 'Halfling Wererat',
      tags: ['halfling', 'shapechanger'],
      alignment: 'lawful evil',
      languages: ['Common', 'Halfling', "Thieves' cant"],
      habitats: ['Dock Ward', 'Trollskull Alley', 'Waterdeep'],
      appearance: [
        [
          'A small halfling shapechanger whose hybrid form has a rat muzzle, pointed ears and a long tail.',
        ],
      ],
      tableNotes: [
        ['Rules source: Waterdeep: Dragon Heist, p. 42.'],
        [
          "Encounter: The Shard Shunners are a gang of halfling wererats based in a Dock Ward hostel. Emmek Frewn hires Kelso and Danika Fiddlewick, Dasher Snobeedle and Brynn Hilltopple to interfere with the characters' tavern in Trollskull Alley.",
        ],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '6d6',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        nonmagicalExcept: 'silvered',
        nonmagicalImmunities: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Use an action to assume a rat-humanoid hybrid form, giant rat form, or true halfling form. Except for size, statistics stay the same. Worn and carried equipment does not change. Death restores true form.',
            ],
          },
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['Advantage on Wisdom (Perception) checks using smell.'],
          },
          {
            key: 'brave',
            name: 'Brave',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Advantage on saving throws against being ', rules.frightened, '.'],
          },
          {
            key: 'halfling-nimbleness',
            name: 'Halfling Nimbleness',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Can move through the space of a Medium or larger creature.'],
          },
          {
            key: 'multiattack-humanoid-or-hybrid-only',
            name: 'Multiattack (humanoid or hybrid only)',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two attacks. At most one can be a Bite.'],
          },
          {
            key: 'bite-rat-or-hybrid-only',
            name: 'Bite (rat or hybrid only)',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'A humanoid target must succeed on a ',
              { dc: 'con' },
              ' Constitution save or contract wererat lycanthropy.',
            ],
          },
          {
            key: 'shortsword-humanoid-or-hybrid-only',
            name: 'Shortsword (humanoid or hybrid only)',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'hand-crossbow-humanoid-or-hybrid-only',
            name: 'Hand Crossbow (humanoid or hybrid only)',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    havia_quickknife: {
      name: 'Havia Quickknife',
      tags: ['halfling'],
      alignment: 'lawful evil',
      languages: ['Common', 'Halfling'],
      habitats: ['Kolat Towers', 'Extradimensional Sanctum', 'Audience Chamber'],
      appearance: [
        [
          'A lightfoot halfling martial artist in unarmored fighting clothes, wearing a brass teleporter ring.',
        ],
      ],
      tableNotes: [
        ['Rules source: Waterdeep: Dragon Heist, p. 160.'],
        [
          'Equipment: Teleporter Ring. Use an action while wearing the ring at either linked circle to teleport yourself and up to six willing creatures to the other circle. The circles are in Kolat Towers and the extradimensional sanctum.',
        ],
        [
          "Encounter: Havia is one of Manshoon's Zhentarim lieutenants. She guards the sanctum Audience Chamber with Mookie Plush and carries keys to locked doors in Kolat Towers.",
        ],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '3',
        ac: 16,
        hitDice: '11d6',
        speed: { walk: 25 },
        scores: { str: 11, dex: 17, con: 13, int: 11, wis: 16, cha: 10 },
        skills: { acrobatics: 'proficient', insight: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'unarmored-defense',
            name: 'Unarmored Defense',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['While wearing neither armor nor a shield, add Wisdom to AC.'],
          },
          {
            key: 'brave',
            name: 'Brave',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Advantage on saves against being ', rules.frightened, '.'],
          },
          {
            key: 'halfling-nimbleness',
            name: 'Halfling Nimbleness',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Can move through the space of a Medium or larger creature.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make three Unarmed Strikes or three ', { ability: 'dart' }, ' attacks.'],
          },
          {
            key: 'unarmed-strike',
            name: 'Unarmed Strike',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'For a creature hit, choose one extra effect: ',
              { dc: 'dex', save: 'str' },
              ' Strength save or drop one held item chosen by the adept, ',
              { dc: 'dex' },
              ' Dexterity save or fall ',
              rules.prone,
              ', or ',
              { dc: 'dex', save: 'con' },
              ' Constitution save or become ',
              rules.stunned,
              " until the end of the adept's next turn.",
            ],
          },
          {
            key: 'dart',
            name: 'Dart',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [20, 60],
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'deflect-missile',
            name: 'Deflect Missile',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'When hit by a ranged weapon attack, reduce the damage by 1d10 + 3. At 0 damage, catch a missile small enough for one hand if a hand is free.',
            ],
          },
        ],
      },
    },
    jenks: {
      name: 'Jenks',
      tags: ['human'],
      alignment: 'noncombatant',
      tableNotes: [
        [
          'The Lost Hope homebrew. Original mechanics for a rescue, chase, or distraction scene. No encounter XP.',
        ],
        ['Rules origin: Homebrew stat block'],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '0',
        ac: 10,
        hitDice: '1d6',
        speed: { walk: 25 },
        scores: { str: 8, dex: 10, con: 12, int: 13, wis: 12, cha: 9 },
        skills: { investigation: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'owlbear-decoy-1-short-or-long-rest',
            name: 'Owlbear Decoy (1/Short or Long Rest)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Toss the stuffed owlbear into an unoccupied space within 15 ft. Choose a creature that sees it land. That creature makes a ',
              { dc: 'wis' },
              ' Wisdom save. On a failure, the next Dexterity (Stealth) check made to hide from it before the start of Jenks’s next turn has advantage. Retrieve the toy before using this action again.',
            ],
          },
        ],
      },
    },
  },
})

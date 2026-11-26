import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.plane_shift_kaladesh,
  monsters: {
    drake_large: {
      name: 'Drake (Large)',
      page: 324,
      alignment: 'neutral good',
      languages: [
        'Speaks Giant Eagle and understands Common and Auran without speaking them, per the Giant Eagle base',
      ],
      habitats: ['mountain', 'grassland', 'hill', 'coastal'],
      appearance: [
        [
          'A slim, two-legged flying reptile with a long neck and leathery wings. Its hooked claws catch prey and grip cliff faces and the hides of sky beasts.',
        ],
      ],
      tableNotes: [
        [
          'The larger drake uses the Giant Eagle statistics. Kaladesh drakes may recognize airships that have killed others in their rush.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 13,
        hitDice: '4d10',
        speed: { walk: 10, fly: 80 },
        scores: { str: 16, dex: 17, con: 13, int: 8, wis: 14, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-sight',
            name: 'Keen Sight',
            timing: 'trait',
            icon: 'lucide/Eye',
            text: ['Advantage on Wisdom (Perception) checks that rely on sight.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'beak' },
              ' attack and one ',
              { ability: 'talons' },
              ' attack.',
            ],
          },
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
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'talons',
            name: 'Talons',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    drake_small: {
      name: 'Drake (Small)',
      page: 80,
      alignment: 'unaligned',
      languages: [],
      habitats: ['mountain', 'grassland', 'coastal'],
      appearance: [
        [
          'A slim, two-legged flying reptile with a long neck and leathery wings. Its hooked claws catch prey and grip cliff faces and the hides of sky beasts.',
        ],
      ],
      tableNotes: [
        [
          'This smaller drake uses the Pteranodon’s Medium size. On its turf it may hunt in a rush of up to a dozen drakes.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d8',
        speed: { walk: 10, fly: 60 },
        scores: { str: 12, dex: 15, con: 10, int: 2, wis: 9, cha: 5 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'flyby',
            name: 'Flyby',
            timing: 'trait',
            icon: 'gi/GiFeather',
            text: ['Leaving an enemy’s reach while flying does not provoke an opportunity attack.'],
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
              damage: [{ dice: '2d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    gremlin: {
      name: 'Gremlin',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Aether-rich sites', 'Inventors’ laboratories', 'Workshops', 'Ghirapur'],
      appearance: [
        [
          'A hairless scavenger with a long snout and six legs. The dense claws on each foot cut through wood and rock and can tear into metal machinery.',
        ],
      ],
      tableNotes: [
        [
          'Its aether sense is useful around laboratories and airship machinery. The printed Siphon description supplies no fixed number of uses that destroys a device.',
        ],
      ],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '1/2',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 40 },
        scores: { str: 12, dex: 13, con: 13, int: 3, wis: 13, cha: 6 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'aether-scent',
            name: 'Aether Scent',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['Pinpoint refined or unrefined aether by smell within 30 ft.'],
          },
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'siphon',
            name: 'Siphon',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Choose a visible aether-powered device within 5 ft. If carried or worn, its bearer can prevent the touch with a ',
              { dc: 'dex' },
              ' Dexterity save. An unattended device automatically loses aether. Reduce any bonus it grants by 1. A device with charges also loses one charge. A device without charges stops working for 1 round. Left unhindered, the gremlin can ruin a device.',
            ],
            effects: [],
          },
        ],
      },
    },
    sky_leviathan: {
      name: 'Sky Leviathan',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Aethersphere', 'Aether currents', 'Airship routes'],
      appearance: [
        [
          'An enormous eel-like beast that swims through the sky. Its long body tapers behind a broad swallowing mouth.',
        ],
      ],
      tableNotes: [
        ['Movement notes: Can hover'],
        ['fly · (hover)'],
        [
          'Swallowed creatures: A swallowed creature is blinded and restrained and has total cover against attacks and effects outside the leviathan. It takes 21 (6d6) acid damage at the start of each of the leviathan’s turns. If any one creature inside deals at least 30 damage to the leviathan in a single turn, the leviathan makes a DC 21 Constitution save at the end of that turn. On a failure it expels every swallowed creature. Each lands prone within 10 ft. If the leviathan dies, its swallowed creatures are no longer restrained by it and may spend 20 ft. of movement to get out of the corpse, emerging prone.',
        ],
        [
          'Track the damage dealt by each creature inside on its current turn. The swallow follows the self-contained Leviathan rules.',
        ],
      ],
      stats: {
        size: 'gargantuan',
        type: 'beast',
        cr: '10',
        ac: 14,
        armor: 'natural armor',
        hitDice: '15d20',
        speed: { fly: 50, walk: 0 },
        scores: { str: 28, dex: 7, con: 22, int: 1, wis: 8, cha: 4 },
        saves: { con: 'proficient', wis: 'proficient' },
        abilities: [
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
              printedBonus: 9,
              damage: [{ dice: '3d8', type: rules.piercing, addModifier: true }],
            },
            text: [
              'A Large or smaller creature hit by the bite must make a ',
              { dc: 'con', save: 'dex' },
              ' Dexterity save or be swallowed.',
            ],
          },
        ],
      },
    },
    sky_whale: {
      name: 'Sky Whale',
      page: 324,
      alignment: 'unaligned',
      languages: [],
      habitats: ['swamp'],
      appearance: [
        [
          'A vast floating whale with a broad filtering mouth, powerful paired flippers and forked tail flukes. Its markings are slate gray and cream.',
        ],
      ],
      tableNotes: [
        ['Movement notes: Can hover'],
        ['fly · (hover)'],
        [
          'Sky whales mostly avoid confrontations. Read the Giant Crocodile base speeds as continuing to apply because the supplement adds hover flight without removing those modes. Flipper replaces the bite and only has the effects of Tail.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '5',
        ac: 14,
        armor: 'natural armor',
        hitDice: '9d12',
        speed: { walk: 30, fly: 50, swim: 50 },
        scores: { str: 21, dex: 9, con: 17, int: 2, wis: 10, cha: 7 },
        skills: { stealth: 'expert' },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The whale can go without taking a breath for up to 30 minutes.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'flipper' },
              ' attack and one ',
              { ability: 'tail' },
              ' attack.',
            ],
          },
          {
            key: 'flipper',
            name: 'Flipper',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'If it is a creature, it must pass a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
          {
            key: 'tail',
            name: 'Tail',
            timing: 'action',
            icon: 'gi/GiWhiplash',
            text: [
              'Use the same reach, hit modifier, targeting restriction, damage and save as ',
              { ability: 'flipper' },
              '.',
            ],
          },
        ],
      },
    },
  },
})

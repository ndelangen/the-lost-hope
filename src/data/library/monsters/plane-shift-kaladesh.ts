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
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.plane_shift_dominaria,
  monsters: {
    kavu_predator: {
      name: 'Kavu Predator',
      alignment: 'unaligned',
      habitats: ['Dominaria', 'Llanowar forest', 'Forest canopy', 'Kelfae woodlands'],
      appearance: [
        [
          'A large arboreal reptilian predator with broad grasping claws and sharp jaws. Dark olive scales and angular brows are art-informed details.',
        ],
      ],
      tableNotes: [
        [
          'The Claw attack can trigger Pounce as part of Multiattack. The printed climb speed is 30 ft. The accompanying breeding lore describes arboreal kavu on sheer surfaces, and the stat block supplies no separate Spider Climb trait.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '2',
        ac: 15,
        armor: 'natural armor',
        hitDice: '10d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 18, dex: 12, con: 15, int: 6, wis: 14, cha: 8 },
        skills: { perception: 'proficient', stealth: 'expert' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'pounce',
            name: 'Pounce',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If the kavu moves at least 20 ft. directly toward a creature and hits it with ',
              { ability: 'claw' },
              ' during the same turn, the target makes a ',
              { dc: 'str' },
              ' Strength save. A failure knocks it ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the kavu may ',
              { ability: 'bite' },
              ' it as a bonus action.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'claw' }, ' attacks.'],
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
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
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
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    steel_leaf_kavu: {
      name: 'Steel Leaf Kavu',
      alignment: 'unaligned',
      habitats: ['Dominaria', 'Llanowar forest', 'Forest floor', 'Basiphem stables'],
      appearance: [
        [
          'A massive ground-dwelling reptilian cavalry mount. Broad jaws, raised brow plates and a thick scaled neck draw on the credited book artwork.',
        ],
      ],
      tableNotes: [
        [
          'Rend is also a named action against a prone target. Raking Charge grants a bonus-action Rend when its setup succeeds and the target is prone. The written Large size is the block’s size even though the lore mentions especially large mounts.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '4',
        ac: 16,
        armor: 'natural armor',
        hitDice: '15d10',
        speed: { walk: 40 },
        scores: { str: 20, dex: 12, con: 18, int: 6, wis: 14, cha: 8 },
        skills: { perception: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'raking-charge',
            name: 'Raking Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'If the kavu moves at least 20 ft. directly toward a creature and hits it with ',
              { ability: 'bite' },
              ' on the same turn, the target makes a ',
              { dc: 'str' },
              ' Strength save. A failure knocks it ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the kavu may ',
              { ability: 'rend' },
              ' it as a bonus action.',
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
              damage: [{ dice: '2d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'rend',
            name: 'Rend',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d8', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

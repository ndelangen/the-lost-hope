import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.flee_mortals_public_preview,
  monsters: {
    lightbender: {
      name: 'Lightbender',
      reprintedIn: [refs.publications.flee_mortals, refs.publications.where_evil_lives],
      alignment: 'unaligned',
      languages: [],
      habitats: ['Sunlit wilderness'],
      appearance: [
        [
          'A lionlike predator with an iridescent mane and a pair of tails tipped with refractive crystals.',
        ],
      ],
      tableNotes: [
        ['Public playtest rules. The final printing is a separate publication version.'],
      ],
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '5',
        ac: 15,
        armor: 'natural armor',
        hitDice: '12d10',
        speed: { walk: 50 },
        scores: { str: 18, dex: 14, con: 16, int: 6, wis: 12, cha: 8 },
        skills: { perception: 'expert', stealth: 'expert' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'avoidance',
            name: 'Avoidance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'When a successful save would halve damage, instead take none on success and half on failure.',
            ],
          },
          {
            key: 'pounce',
            name: 'Pounce',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Move at least 20 ft. straight toward a creature and hit it with ',
              { ability: 'claw' },
              ' that turn. It makes a ',
              { dc: 'str' },
              ' Strength save or falls ',
              { effect: 'pounce-prone' },
              '. The lightbender can make one ',
              { ability: 'bite' },
              ' against that ',
              rules.prone,
              ' target as a bonus action.',
            ],
            effects: [
              {
                key: 'pounce-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['One ', { ability: 'bite' }, ' and two Claws, or two Tail Whips.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            text: ['Melee +7, reach 5 ft. Hit: ', { roll: '1d8', mod: 'str' }, ' piercing.'],
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            text: ['Melee +7, reach 5 ft. Hit: ', { roll: '1d6', mod: 'str' }, ' slashing.'],
          },
          {
            key: 'tail-whip',
            name: 'Tail Whip',
            timing: 'action',
            icon: 'gi/GiWhiplash',
            text: [
              'Melee +7, reach 15 ft. Hit: ',
              { roll: '1d6', mod: 'str' },
              ' bludgeoning and ',
              { roll: '2d6' },
              ' radiant.',
            ],
          },
          {
            key: 'hypnotic-mane',
            name: 'Hypnotic Mane',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Creatures within 15 ft. save Wisdom ',
              { dc: 'con' },
              ' or are ',
              { effect: 'mane-charmed' },
            ],
            effects: [
              {
                key: 'mane-charmed',
                name: 'Hypnotized',
                lands: { on: 'save', save: 'wis', dc: 'con' },
                conditions: [rules.charmed, rules.incapacitated],
                text: [
                  'with speed 0. Damage to it, or someone shaking it as an action, ends the effect on it.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
              },
            ],
            uses: 1,
            recharge: 'Long rest',
          },
          {
            key: 'afterimage',
            name: 'Afterimage',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'On a hit, the lightbender can make the attack miss and reappear in an open space it sees within 30 ft. This fails against senses that do not rely on sight or that see through illusions.',
            ],
          },
        ],
      },
    },
    skitterling: {
      name: 'Skitterling',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Caves', 'Ruins', 'Forests', 'Jagged Edge Hideaway'],
      appearance: [
        ['A housecat-sized, six-legged rodent with broad bat wings and grasping claws.'],
      ],
      tableNotes: [
        ['Public playtest rules. The final printing is a separate publication version.'],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '1/8',
        ac: 13,
        hitDice: '2d4',
        speed: { walk: 30, fly: 60 },
        scores: { str: 4, dex: 16, con: 10, int: 3, wis: 12, cha: 5 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'flyby',
            name: 'Flyby',
            timing: 'trait',
            icon: 'gi/GiFeather',
            text: ["It provokes no opportunity attacks for flying out of an enemy's reach."],
          },
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1', type: rules.slashing }],
            },
            text: [
              'The target must pass a ',
              { dc: 'con' },
              ' Constitution save or be ',
              { effect: 'blinded' },
              '. Immunity to poison damage or ',
              rules.poisoned,
              ' gives an automatic success.',
            ],
            effects: [
              {
                key: 'blinded',
                name: 'Blinded',
                lands: { on: 'save', save: 'con', dc: 'con' },
                conditions: [rules.blinded],
                lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
              },
            ],
          },
        ],
      },
    },
  },
})

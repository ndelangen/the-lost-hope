import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ravenloft_the_horrors_within,
  monsters: {
    swarm_of_infesting_insects: {
      name: 'Swarm of Infesting Insects',
      alignment: 'unaligned',
      languages: [],
      habitats: ['coastal', 'forest', 'grassland', 'swamp', 'urban'],
      appearance: [
        [
          'Olive-green, segmented insect larvae with rust-red heads mingle with darker adults with translucent wings.',
        ],
      ],
      stats: {
        swarmOf: 'tiny',
        size: 'medium',
        type: 'beast',
        cr: '2',
        ac: 13,
        hitDice: '6d8',
        speed: { walk: 20, climb: 20, swim: 20 },
        scores: { str: 3, dex: 14, con: 12, int: 1, wis: 7, cha: 1 },
        senses: { blindsight: 30 },
        damageResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        conditionImmunities: [
          rules.charmed,
          rules.frightened,
          rules.grappled,
          rules.paralyzed,
          rules.petrified,
          rules.prone,
          rules.restrained,
          rules.stunned,
        ],
        abilities: [
          {
            key: 'swarm',
            name: 'Swarm',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The swarm and other creatures can share a space. It can move through openings that admit a Tiny creature. It cannot regain HP or gain temporary HP.',
            ],
          },
          {
            key: 'infestation',
            name: 'Infestation',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '4d4', type: rules.poison, addModifier: true }],
            },
            text: [
              'Or ',
              { roll: '2d4', mod: 'dex' },
              ' if the swarm is Bloodied. The target becomes ',
              { effect: 'infestation-poison' },
              '. If this poison is still active after 1 hour, the target makes a ',
              { dc: 'con' },
              ' Constitution save. A success ends the condition. On a failure, roll 1d6. On 1–2 the target becomes ',
              rules.blinded,
              ', on 3–4 its maximum HP drops by ',
              { roll: '1d10' },
              ', and on 5–6 it gains 1 ',
              rules.exhaustion,
              ' level. The rolled effect ends when this poison ends.',
            ],
            effects: [
              {
                key: 'infestation-poison',
                name: 'Infestation poison',
                lands: { on: 'hit' },
                conditions: [rules.poisoned],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
    swarm_of_ravenous_insects: {
      name: 'Swarm of Ravenous Insects',
      alignment: 'unaligned',
      languages: [],
      habitats: ['coastal', 'forest', 'grassland', 'swamp', 'urban'],
      appearance: [
        [
          'Olive-green, segmented insect larvae with rust-red heads mingle with darker adults with translucent wings.',
        ],
      ],
      stats: {
        swarmOf: 'tiny',
        size: 'medium',
        type: 'beast',
        cr: '3',
        ac: 13,
        hitDice: '6d8',
        speed: { walk: 30, burrow: 30, climb: 30 },
        scores: { str: 3, dex: 15, con: 14, int: 1, wis: 12, cha: 1 },
        senses: { tremorsense: 60 },
        damageResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        conditionImmunities: [
          rules.charmed,
          rules.frightened,
          rules.grappled,
          rules.paralyzed,
          rules.petrified,
          rules.prone,
          rules.restrained,
          rules.stunned,
        ],
        abilities: [
          {
            key: 'skeletonize',
            name: 'Skeletonize',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'At the start of the swarm’s turn, a Large or smaller corpse sharing its space is destroyed. Anything the corpse wore or carried remains.',
            ],
          },
          {
            key: 'swarm',
            name: 'Swarm',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The swarm and other creatures can share a space. It can move through openings that admit a Tiny creature. It cannot regain HP or gain temporary HP.',
            ],
          },
          {
            key: 'ravenous-bites',
            name: 'Ravenous Bites',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '4d8', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Or ',
              { roll: '2d8', mod: 'dex' },
              ' if the swarm is Bloodied. The insects burrow into the target and ',
              { effect: 'burrowing-poison' },
              '. At the start of each turn while ',
              rules.poisoned,
              ' this way, the target takes ',
              { roll: '1d8' },
              ' piercing damage. It dies if this ongoing damage reduces it to 0 HP.',
            ],
            effects: [
              {
                key: 'burrowing-poison',
                name: 'Burrowing poison',
                lands: { on: 'hit' },
                conditions: [rules.poisoned],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
                ends: {
                  cure: [
                    'A spell or effect that restores the target’s HP ends the condition early.',
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  },
})

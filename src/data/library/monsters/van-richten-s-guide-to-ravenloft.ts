import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.van_richten_s_guide_to_ravenloft,
  monsters: {
    swarm_of_maggots: {
      name: 'Swarm of Maggots',
      page: 247,
      languages: [],
      habitats: ['Domains of Dread'],
      appearance: [['A low heap of soft, pale segmented larvae with small tapered ends.']],
      stats: {
        swarmOf: 'tiny',
        size: 'medium',
        type: 'beast',
        cr: '2',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 20, swim: 20 },
        scores: { str: 3, dex: 12, con: 10, int: 1, wis: 7, cha: 1 },
        senses: { blindsight: 10 },
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
              'It and another creature can share space. It passes through any opening big enough for a Tiny maggot. It cannot recover HP or gain temporary HP.',
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
              reach: 0,
              damage: [{ dice: '4d4', type: rules.piercing }],
            },
            text: [
              'Or ',
              { roll: '2d4' },
              ' when the swarm has half its HP or less. A creature the swarm damages makes a ',
              { dc: 'con', printed: 12 },
              ' Constitution save or ',
              { effect: 'maggot-disease' },
              ' The disease ends when magic removes it or when the creature rolls the same result band on two consecutive long rests.',
            ],
            effects: [
              {
                key: 'maggot-disease',
                name: 'Maggot infestation',
                lands: { on: 'save', save: 'con', dc: 'con', printed: 12 },
                text: [
                  'contracts a disease. At the end of each long rest, roll a d6 for the effect. 1–2. ',
                  rules.blinded,
                  ' until the creature finishes a long rest. 3–4. Reduce its HP maximum by ',
                  { roll: '2d4' },
                  '. That reduction lasts until the disease ends. The creature dies if its maximum drops to 0. 5–6. Disadvantage on ability checks and attack rolls until it finishes its next long rest.',
                ],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
    swarm_of_scarabs: {
      name: 'Swarm of Scarabs',
      page: 247,
      languages: [],
      habitats: ['Domains of Dread'],
      appearance: [
        ['A clustered mass of dark oval scarab beetles with ridged wing cases and short legs.'],
      ],
      stats: {
        swarmOf: 'tiny',
        size: 'medium',
        type: 'beast',
        cr: '3',
        ac: 13,
        armor: 'natural armor',
        hitDice: '5d8',
        speed: { walk: 30, burrow: 30, climb: 30 },
        scores: { str: 3, dex: 14, con: 13, int: 1, wis: 12, cha: 1 },
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
            key: 'swarm',
            name: 'Swarm',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'It and another creature can share space. It passes through any opening big enough for a Tiny scarab. It cannot recover HP or gain temporary HP.',
            ],
          },
          {
            key: 'skeletonize',
            name: 'Skeletonize',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If it starts its turn in the same space as a dead creature of Large size or smaller, it destroys the corpse and leaves its equipment and bones or exoskeleton.',
            ],
          },
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'It crosses difficult surfaces, including the underside of ceilings, without an ability check.',
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
              reach: 0,
              damage: [{ dice: '4d6', type: rules.piercing }],
            },
            text: [
              'Or ',
              { roll: '2d6' },
              ' when the swarm has half its HP or less. If the target is a creature, the scarabs burrow into it and deal ',
              { roll: '1d6' },
              ' piercing damage at the start of each of its turns. Any creature can use an action to remove or kill the scarabs with fire or a piercing weapon. The target takes 1 damage of the corresponding type. A creature the swarm’s piercing damage reduces to 0 HP dies.',
            ],
          },
        ],
      },
    },
  },
})

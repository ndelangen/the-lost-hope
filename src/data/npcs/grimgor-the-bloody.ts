import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Grimgor the Bloody',
  avatar: '/assets/npcs/grimgor-the-bloody.png',
  species: 'Orc',
  memberships: [
    {
      organization: refs.organizations.church_of_gruumsh,
      status: 'former',
      rank: 'First Champion',
    },
  ],
  notes: [
    [
      "An ancient warrior celebrated in the church's holy texts. He has grey hair, extensive scars, and nine fingers. A dragon bit off his middle finger after he gave it an offensive gesture.",
    ],
    [
      'A former adventuring companion and close friend of ',
      refs.npcs.sarogarth,
      '. His remains lie in a crypt whose location is not recorded.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '8',
    ac: 17,
    armor: 'scale mail',
    hitDice: '15d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 20,
      dex: 14,
      con: 18,
      int: 9,
      wis: 12,
      cha: 15,
    },
    saves: {
      str: 'proficient',
      dex: 'proficient',
      con: 'proficient',
    },
    skills: {
      athletics: 'expert',
      intimidation: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'relentless-endurance',
        name: 'Relentless Endurance',
        timing: 'trait',
        icon: 'lucide/HeartPulse',
        text: ['When reduced to 0 HP but not killed outright, he drops to 1 HP instead.'],
        uses: 1,
        recharge: 'Long rest',
      },
      {
        key: 'first-champion',
        name: 'First Champion',
        timing: 'trait',
        icon: 'gi/GiSkullCrossedBones',
        text: [
          'Allies of the Church of Gruumsh within 30 ft. of him have ',
          refs.rules.advantage,
          ' on saves against being ',
          refs.rules.frightened,
          '.',
        ],
        effects: [],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Three ',
          {
            ability: 'greataxe',
          },
          ' attacks.',
        ],
      },
      {
        key: 'greataxe',
        name: 'Greataxe',
        timing: 'action',
        icon: 'gi/GiBattleAxe',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d12',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
        text: ['A ', refs.rules.critical_hit, ' also leaves the target ', refs.rules.prone, '.'],
        effects: [],
      },
      {
        key: 'javelin',
        name: 'Javelin',
        timing: 'action',
        icon: 'gi/GiThrownDaggers',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'str',
          range: [30, 120],
          damage: [
            {
              dice: '1d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'bloody-fury',
        name: 'Bloody Fury',
        timing: 'bonus action',
        icon: 'gi/GiPowerLightning',
        text: [
          'Until the end of his turn, his attacks have ',
          refs.rules.advantage,
          ' and attacks against him have ',
          refs.rules.advantage,
          '.',
        ],
      },
      {
        key: 'nine-fingered-parry',
        name: 'Nine-Fingered Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: ['Adds 3 to his AC against one melee attack that would hit him.'],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_gladiator', 'srd-2024_berserker'],
      changes:
        'An ancient orc champion: gladiator stats with a berserker’s fury and orc endurance. Raised to CR 8 for a figure of holy texts.',
    },
  },
})

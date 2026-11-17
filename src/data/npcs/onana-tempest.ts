import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Onana Tempest',
  avatar: '/assets/npcs/onana-tempest-portrait.png',
  species: 'Air Genasi',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'A merchant and dungeon owner who introduces himself as the youngest of his siblings. He prefers conducting business openly.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '3',
    ac: 15,
    armor: 'breastplate',
    hitDice: '9d8',
    speed: {
      walk: 35,
    },
    scores: {
      str: 10,
      dex: 16,
      con: 14,
      int: 14,
      wis: 12,
      cha: 17,
    },
    skills: {
      deception: 'proficient',
      insight: 'proficient',
      persuasion: 'expert',
    },
    senses: {
      darkvision: 60,
    },
    damageResistances: [refs.rules.lightning],
    abilities: [
      {
        key: 'unending-breath',
        name: 'Unending Breath',
        timing: 'trait',
        icon: 'gi/GiTornado',
        text: [
          'Can hold his breath indefinitely and is resistant to ',
          refs.rules.lightning,
          ' damage.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'rapier',
          },
          ' attacks.',
        ],
      },
      {
        key: 'rapier',
        name: 'Rapier',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d8',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'gust',
        name: 'Gust',
        timing: 'action',
        icon: 'gi/GiWindHole',
        save: {
          ability: 'str',
          dc: 'cha',
          target: { creatures: 1, range: 30 },
          onFail: {
            conditions: [refs.rules.prone],
            also: ['It is pushed 15 ft. away before it falls.'],
          },
        },
      },
      {
        key: 'business-is-business',
        name: 'Business Is Business',
        timing: 'bonus action',
        icon: 'gi/GiMoneyStack',
        text: ['Offers a deal.'],
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { creatures: 1, range: 30, which: 'that can hear him' },
          onFail: { conditions: [refs.rules.charmed], also: ['It lasts until it takes damage.'] },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'zone-of-truth',
        name: 'Zone of Truth',
        timing: 'action',
        icon: 'gi/GiCrystalBall',
        text: ['He knows who failed. A creature can still stay silent or dodge the question.'],
        save: {
          ability: 'cha',
          dc: 'cha',
          target: { area: { shape: refs.rules.sphere, size: 10 }, range: 60 },
          onFail: { also: ['It cannot tell a deliberate lie while it is in the zone.'] },
        },
        uses: 1,
        recharge: 'Long rest',
      },
      {
        key: 'detect-thoughts',
        name: 'Detect Thoughts',
        timing: 'action',
        icon: 'gi/GiTelepathy',
        text: [
          'For 1 minute (',
          refs.rules.concentration,
          ') he reads the surface thoughts of one creature within 30 ft., and it does not notice. As an action he can switch to another creature, or probe one deeper with the save below. A probed creature feels it whether it fails or not, and a success ends the spell.',
        ],
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { creatures: 1, range: 30 },
          onFail: {
            also: [
              'He learns its reasoning, its emotional state, and whatever looms large in its mind.',
            ],
          },
        },
        uses: 1,
        recharge: 'Long rest',
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'Adds 2 to his AC against one melee attack that would hit him, while holding a weapon.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_noble'],
      changes:
        'An air genasi merchant and dungeon owner: a stronger noble with wind tricks, a small Zone of Truth and Detect Thoughts.',
    },
  },
})

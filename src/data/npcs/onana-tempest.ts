import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Onana Tempest',
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
    size: 'Medium',
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
        text: ['Can hold his breath indefinitely and is resistant to lightning damage.'],
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
        text: [
          'One creature within 30 ft.: Strength saving throw, ',
          {
            dc: 'cha',
          },
          '. Failure: pushed 15 ft. and ',
          refs.rules.prone,
          '.',
        ],
      },
      {
        key: 'business-is-business',
        name: 'Business Is Business',
        timing: 'bonus action',
        icon: 'gi/GiMoneyStack',
        text: [
          'Offers a deal to one creature within 30 ft. that can hear him: Wisdom saving throw, ',
          {
            dc: 'cha',
          },
          '. Failure: ',
          refs.rules.charmed,
          ' until it takes damage.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
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
      changes: 'An air genasi merchant and dungeon owner: a stronger noble with wind tricks.',
    },
  },
})

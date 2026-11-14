import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Ryan',
  location: refs.locations.badesh,
  notes: [['The guard captain of ', refs.locations.badesh, '.']],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '4',
    ac: 18,
    armor: 'chain mail, shield',
    hitDice: '15d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 16,
      dex: 14,
      con: 16,
      int: 11,
      wis: 13,
      cha: 13,
    },
    skills: {
      athletics: 'proficient',
      perception: 'proficient',
    },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'longsword',
          },
          ' attacks.',
        ],
      },
      {
        key: 'longsword',
        name: 'Longsword',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d8',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
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
        key: 'rally',
        name: 'Rally the Guard',
        timing: 'bonus action',
        icon: 'gi/GiSonicShout',
        intent: 'support',
        text: ['Each ally within 30 ft. that can hear him gains 5 temporary HP.'],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'shield-ally',
        name: 'Shield Ally',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'When a creature attacks an ally within 5 ft. of him, he imposes ',
          refs.rules.disadvantage,
          ' on that attack roll.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_guard-captain'],
      changes: 'The SRD guard captain with a rallying shout.',
    },
  },
})

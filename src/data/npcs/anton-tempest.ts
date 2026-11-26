import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Anton Tempest',
  avatar: '/assets/npcs/anton-tempest-portrait.png',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [['An enforcer known for his strict insistence on rules.']],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '3',
    ac: 17,
    armor: 'splint',
    hitDice: '10d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 16,
      dex: 13,
      con: 14,
      int: 10,
      wis: 11,
      cha: 10,
    },
    skills: {
      athletics: 'proficient',
      insight: 'proficient',
      intimidation: 'proficient',
    },
    abilities: [
      {
        key: 'by-the-rules',
        name: 'By the Rules',
        timing: 'trait',
        icon: 'gi/GiScrollUnfurled',
        text: [
          refs.rules.advantage,
          ' on Insight checks to tell whether someone is breaking an agreement or a rule.',
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
            ability: 'maul',
          },
          ' attacks.',
        ],
      },
      {
        key: 'maul',
        name: 'Maul',
        timing: 'action',
        icon: 'gi/GiWarhammer',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '2d6',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
        text: [
          'If the target breaks a rule Anton stated this fight, it also has ',
          { effect: 'prone' },
          '.',
        ],
        effects: [
          {
            key: 'prone',
            name: 'Prone',
            lands: { on: 'hit' },
            conditions: [refs.rules.prone],
            lasts: { kind: 'until-removed' },
          },
        ],
      },
      {
        key: 'heavy-crossbow',
        name: 'Heavy Crossbow',
        timing: 'action',
        icon: 'gi/GiCrossbow',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [100, 400],
          damage: [
            {
              dice: '2d10',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
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
      adaptedFrom: ['srd-2024_warrior-veteran'],
      changes: 'The family enforcer: a maul instead of a greatsword, and a rule-keeping hook.',
    },
  },
})

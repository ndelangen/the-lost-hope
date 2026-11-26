import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Tempest Patriarch',
  avatar: '/assets/npcs/tempest-patriarch-portrait.png',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'The unnamed father at the head of the ',
      refs.organizations.tempest_family,
      ' and its trading business. The local gang regards him as too powerful to challenge.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '9',
    ac: 16,
    armor: 'storm-woven robes',
    hitDice: '16d8',
    speed: {
      walk: 30,
      fly: 30,
    },
    scores: {
      str: 12,
      dex: 14,
      con: 16,
      int: 16,
      wis: 15,
      cha: 20,
    },
    saves: {
      con: 'proficient',
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      insight: 'proficient',
      intimidation: 'expert',
      persuasion: 'expert',
    },
    damageResistances: [refs.rules.lightning, refs.rules.thunder],
    abilities: [
      {
        key: 'too-powerful',
        name: 'Untouchable',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: [
          refs.rules.advantage,
          ' on saves against being ',
          refs.rules.charmed,
          ' or ',
          refs.rules.frightened,
          '.',
        ],
        effects: [],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If he fails a ', refs.rules.saving_throw, ', he can choose to succeed instead.'],
        uses: 1,
        recharge: 'Long rest',
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
            ability: 'storm-bolt',
          },
          ' attacks.',
        ],
      },
      {
        key: 'storm-bolt',
        name: 'Storm Bolt',
        timing: 'action',
        icon: 'gi/GiTornado',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'cha',
          range: [120, 120],
          damage: [
            {
              dice: '2d8',
              type: refs.rules.lightning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'tempest',
        name: 'Tempest',
        timing: 'action',
        icon: 'gi/GiTornado',
        intent: 'damage',
        save: {
          ability: 'dex',
          dc: 'cha',
          target: { area: { shape: refs.rules.sphere, size: 20 }, range: 120 },
          onFail: {
            damage: [{ dice: '6d8', type: refs.rules.thunder }],
            also: ['It is also pushed 10 ft. away.'],
          },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
        effects: [],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_mage', 'srd-2024_noble'],
      changes:
        'The unnamed head of the Tempest family: a storm caster too powerful for the gang to challenge.',
    },
  },
})

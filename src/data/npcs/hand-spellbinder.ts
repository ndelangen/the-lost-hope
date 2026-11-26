import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Hand Spellbinder',
  avatar: '/assets/npcs/hand-spellbinder-portrait.png',
  notes: [['A thin figure in a grey cloak who stays behind the fighters, fingers moving.']],
  secretMemberships: [
    { organization: refs.organizations.the_eyeless_hand, status: 'active', rank: 'Member' },
  ],
  motivations: [
    ['Pin down whoever the blades cannot get through, so the fighters can take them alive.'],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '3',
    ac: 14,
    armor: 'mage armor',
    hitDice: '9d8',
    speed: { walk: 30 },
    scores: { str: 9, dex: 15, con: 12, int: 17, wis: 12, cha: 11 },
    saves: { int: 'proficient', wis: 'proficient' },
    skills: { arcana: 'proficient', perception: 'proficient' },
    abilities: [
      {
        key: 'fire-bolt',
        name: 'Fire Bolt',
        timing: 'action',
        icon: 'gi/GiFireRing',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [120, 120],
          damage: [{ dice: '2d10', type: refs.rules.fire }],
        },
      },
      {
        key: 'hold-person',
        name: 'Hold Person',
        timing: 'action',
        icon: 'gi/GiShadowGrasp',
        save: {
          ability: 'wis',
          dc: 'int',
          target: { creatures: 1, range: 60, which: 'humanoid' },
          onFail: {
            also: [{ effect: 'paralyzed-hold' }],
          },
        },
        uses: 2,
        recharge: 'Long rest',
        effects: [
          {
            key: 'paralyzed-hold',
            name: 'Paralyzed',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.paralyzed],
            text: [
              'Lasts up to 1 minute (',
              refs.rules.concentration,
              '). Melee hits from within 5 ft. on a ',
              refs.rules.paralyzed,
              ' target are ',
              refs.rules.critical_hit,
              's, and a ',
              refs.rules.paralyzed,
              ' creature cannot drink a potion.',
            ],
            lasts: { kind: 'time', amount: '1', unit: 'minute' },
            ends: { repeatSave: ['end-of-turn'] },
          },
        ],
      },
      {
        key: 'command',
        name: 'Command',
        timing: 'action',
        icon: 'gi/GiKneeling',
        save: {
          ability: 'wis',
          dc: 'int',
          target: { creatures: 1, range: 60 },
          onFail: {
            also: [{ effect: 'commanded' }],
          },
        },
        uses: 2,
        recharge: 'Long rest',
        effects: [
          {
            key: 'commanded',
            name: 'Commanded',
            lands: { on: 'failed-save' },
            text: [
              'On its next turn it obeys one word: “Kneel” (it falls ',
              refs.rules.prone,
              ' and ends its turn), “Drop” (it drops what it holds), “Halt” (it does nothing) or “Flee” (it moves away from the caster).',
            ],
            lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
          },
        ],
      },
      {
        key: 'fireball',
        name: 'Fireball',
        timing: 'action',
        icon: 'gi/GiFlame',
        intent: 'damage',
        save: {
          ability: 'dex',
          dc: 'int',
          target: { area: { shape: refs.rules.sphere, size: 20 }, range: 150 },
          onFail: { damage: [{ dice: '8d6', type: refs.rules.fire }] },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Long rest',
        effects: [],
      },
      {
        key: 'misty-step',
        name: 'Misty Step',
        timing: 'bonus action',
        icon: 'gi/GiTeleport',
        text: ['It teleports up to 30 ft. to a space it can see.'],
        uses: 2,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_mage'],
      changes:
        'A lesser mage, about CR 3: fewer hit points, Fire Bolt instead of Arcane Burst, and spells that go around armour with saving throws (Hold Person, Command, one Fireball) plus Misty Step to stay out of reach.',
    },
  },
})

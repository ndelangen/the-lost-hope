import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Tempest Soldier',
  avatar: '/assets/npcs/tempest-soldier-portrait.png',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Soldier' },
  ],
  notes: [
    [
      'A soldier of the ',
      refs.organizations.tempest_family,
      ' in storm-grey livery, drilling, loading supplies, and clearing the streets for the fleet.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1/4',
    ac: 17,
    armor: 'chain shirt, shield, Defense fighting style',
    hitDice: '2d10',
    speed: { walk: 30 },
    scores: { str: 15, dex: 12, con: 14, int: 10, wis: 11, cha: 10 },
    saves: { str: 'proficient', con: 'proficient' },
    skills: { athletics: 'proficient', perception: 'proficient' },
    abilities: [
      {
        key: 'spear',
        name: 'Spear',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d6', type: refs.rules.piercing, addModifier: true }],
        },
      },
      {
        key: 'action-surge',
        name: 'Action Surge',
        timing: 'trait',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'On their turn they take one extra action, usually a second ',
          { ability: 'spear' },
          ' thrust.',
        ],
        uses: 1,
        recharge: 'Short rest',
      },
      {
        key: 'second-wind',
        name: 'Second Wind',
        timing: 'bonus action',
        icon: 'gi/GiHealing',
        intent: 'healing',
        text: ['They regain 1d10 + 2 HP.'],
        uses: 2,
        recharge: 'One on a short rest, all on a long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_guard'],
      changes:
        'A 2nd-level fighter instead of a guard: d10 hit dice, the Defense fighting style, Action Surge and Second Wind.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Captain Garran',
  species: 'Human',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Captain' },
  ],
  notes: [
    ['A heavily armoured, blunt-spoken officer of the ', refs.organizations.tempest_family, '.'],
  ],
  motivations: [
    [
      'Win the war for ',
      refs.npcs.onana_tempest,
      ' and get his soldiers home alive. He has no patience for adventurers, but he follows orders to the letter.',
    ],
  ],
  background: [
    [
      'He is the armoured man who led the escort in ',
      refs.events.n2_e168,
      '. He impounds vessels for ',
      refs.npcs.onana_tempest,
      ' with his soldiers and the battle-cruiser.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '3',
    ac: 18,
    armor: 'plate armor',
    hitDice: '8d8',
    speed: { walk: 30 },
    scores: { str: 16, dex: 11, con: 14, int: 11, wis: 11, cha: 15 },
    saves: { con: 'proficient', wis: 'proficient' },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['Two ', { ability: 'longsword' }, ' attacks.'],
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
          damage: [{ dice: '1d8', type: refs.rules.slashing, addModifier: true }],
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
      adaptedFrom: ['srd-2024_knight'],
      changes: 'A Tempest captain: knight numbers with a parry instead of the leadership features.',
    },
  },
})

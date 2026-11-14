import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Blackbeard',
  location: refs.locations.sea_of_unknown,
  notes: [
    [
      'A pirate hostile to ',
      refs.pcs.swift_starblade,
      '. ',
      refs.npcs.alberto,
      ' specifically named Blackbeard when warning Swift that returning to the sea would require an army.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '10',
    ac: 18,
    armor: 'studded leather, plate scraps',
    hitDice: '20d8',
    speed: {
      walk: 30,
      swim: 30,
    },
    scores: {
      str: 16,
      dex: 18,
      con: 18,
      int: 14,
      wis: 14,
      cha: 18,
    },
    saves: {
      str: 'proficient',
      dex: 'proficient',
      wis: 'proficient',
    },
    skills: {
      athletics: 'proficient',
      intimidation: 'expert',
      perception: 'proficient',
    },
    abilities: [
      {
        key: 'dread-reputation',
        name: 'Dread Reputation',
        timing: 'trait',
        icon: 'gi/GiSkullCrossedBones',
        text: [
          'Allies within 30 ft. of him have ',
          refs.rules.advantage,
          ' on saves against being ',
          refs.rules.frightened,
          '.',
        ],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If he fails a ', refs.rules.saving_throw, ', he can choose to succeed instead.'],
        uses: 2,
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
            ability: 'cutlass',
          },
          ' attacks, or two ',
          {
            ability: 'pistol-volley',
          },
          ' shots.',
        ],
      },
      {
        key: 'cutlass',
        name: 'Cutlass',
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
            {
              dice: '1d6',
              type: refs.rules.necrotic,
            },
          ],
        },
      },
      {
        key: 'pistol-volley',
        name: 'Pistol Volley',
        timing: 'action',
        icon: 'gi/GiSaberAndPistol',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [30, 90],
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
        key: 'smoke-in-his-beard',
        name: 'Smoke in His Beard',
        timing: 'bonus action',
        icon: 'gi/GiSmokeBomb',
        text: [
          'Lit fuses in his beard fill the area with smoke that heavily obscures it until the start of his next turn.',
        ],
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { area: { shape: refs.rules.emanation, size: 10 }, chosen: true },
          onFail: { conditions: [refs.rules.frightened] },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'Adds 4 to his AC against one melee attack that would hit him, while holding a weapon.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_pirate-captain'],
      changes:
        'A legendary pirate who needs an army to face: more hit points, necrotic cutlass, smoke, and legendary resistance. CR raised to 10.',
    },
  },
})

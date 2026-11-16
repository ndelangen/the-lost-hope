import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Mage',
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '6',
    ac: 15,
    armor: 'mage armor',
    hitDice: '18d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 9,
      dex: 14,
      con: 11,
      int: 17,
      wis: 12,
      cha: 11,
    },
    saves: {
      int: 'proficient',
      wis: 'proficient',
    },
    skills: {
      arcana: 'proficient',
      history: 'proficient',
    },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Three ',
          {
            ability: 'arcane-burst',
          },
          ' attacks.',
        ],
      },
      {
        key: 'arcane-burst',
        name: 'Arcane Burst',
        timing: 'action',
        icon: 'gi/GiMagicSwirl',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [120, 120],
          damage: [
            {
              dice: '3d8',
              type: refs.rules.force,
              addModifier: true,
            },
          ],
        },
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
          onFail: {
            damage: [{ dice: '8d6', type: refs.rules.fire }],
          },
          onSuccess: 'half',
        },
        uses: 2,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_mage'],
      changes: 'Trimmed to its attacks and Fireball; the other spells are left out.',
    },
  },
})

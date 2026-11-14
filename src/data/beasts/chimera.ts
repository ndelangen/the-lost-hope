import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Chimera',
  species: 'Chimera',
  stats: {
    size: 'large',
    type: 'monstrosity',
    cr: '6',
    ac: 14,
    armor: 'natural armor',
    hitDice: '12d10',
    speed: {
      walk: 30,
      fly: 60,
    },
    scores: {
      str: 19,
      dex: 11,
      con: 19,
      int: 3,
      wis: 14,
      cha: 10,
    },
    skills: {
      perception: 'expert',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'One ',
          {
            ability: 'bite',
          },
          ', one ',
          {
            ability: 'horns',
          },
          ', and one ',
          {
            ability: 'claw',
          },
          '. It can replace the ',
          {
            ability: 'claw',
          },
          ' with ',
          {
            ability: 'fire-breath',
          },
          ' if available.',
        ],
      },
      {
        key: 'bite',
        name: 'Bite',
        timing: 'action',
        icon: 'gi/GiFangs',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '2d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'horns',
        name: 'Horns',
        timing: 'action',
        icon: 'gi/GiBullHorns',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d12',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'claw',
        name: 'Claw',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '2d6',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'fire-breath',
        name: 'Fire Breath',
        timing: 'action',
        icon: 'gi/GiFireBreath',
        intent: 'damage',
        save: {
          ability: 'dex',
          dc: 'con',
          target: { area: { shape: refs.rules.cone, size: 15 } },
          onFail: { damage: [{ dice: '7d8', type: refs.rules.fire }] },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_chimera'],
    },
  },
})

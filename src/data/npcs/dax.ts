import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dax',
  avatar: '/assets/npcs/dax.png',
  species: 'Elemental spirit',
  notes: [
    [
      'A red-shelled tortoise who walks on two legs. ',
      refs.npcs.sarogarth,
      ' transformed him so he could explore underwater.',
    ],
    ['He has a shared contract with ', refs.npcs.sarogarth, '.'],
  ],
  stats: {
    size: 'small',
    type: 'elemental',
    cr: '2',
    ac: 16,
    armor: 'natural armor',
    hitDice: '6d6',
    speed: {
      walk: 25,
      swim: 40,
    },
    scores: {
      str: 14,
      dex: 10,
      con: 16,
      int: 10,
      wis: 12,
      cha: 11,
    },
    senses: {
      darkvision: 60,
    },
    damageResistances: [refs.rules.fire],
    abilities: [
      {
        key: 'shell',
        name: 'Shell',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: [
          'As a ',
          refs.rules.bonus_action,
          ', pulls into his shell: +4 AC and speed 0 until he comes out as a ',
          refs.rules.bonus_action,
          '.',
        ],
      },
      {
        key: 'amphibious',
        name: 'Amphibious',
        timing: 'trait',
        icon: 'gi/GiWaterSplash',
        text: ['Breathes air and water.'],
      },
      {
        key: 'snapping-bite',
        name: 'Snapping Bite',
        timing: 'action',
        icon: 'gi/GiFangs',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d10',
              type: refs.rules.piercing,
              addModifier: true,
            },
            {
              dice: '1d6',
              type: refs.rules.fire,
            },
          ],
        },
      },
      {
        key: 'steam-burst',
        name: 'Steam Burst',
        timing: 'action',
        icon: 'gi/GiFireBreath',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'con',
          target: { area: { shape: refs.rules.cone, size: 10 } },
          onFail: { damage: [{ dice: '3d6', type: refs.rules.fire }] },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: [],
      changes:
        'Homebrew: a red-shelled, upright tortoise spirit Sarogarth reshaped for underwater travel.',
    },
  },
})

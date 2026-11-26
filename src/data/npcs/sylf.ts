import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylf',
  avatar: '/assets/npcs/sylf-portrait.png',
  previousPortraits: [{ url: '/assets/npcs/sylf.png', description: 'Previous character portrait' }],
  species: 'Demon',
  languages: ['Infernal'],
  notes: [
    [
      refs.npcs.dax,
      "'s wife, in the form of a blue-shelled tortoise. Her true name is not recorded.",
    ],
    [
      refs.npcs.sarogarth,
      ' bound her because he thought she was lonely. Their shared contract was described as equal. Its status after the wager is unknown.',
    ],
  ],
  stats: {
    size: 'small',
    type: 'fiend',
    cr: '2',
    ac: 16,
    armor: 'natural armor',
    hitDice: '6d6',
    speed: {
      walk: 25,
      swim: 40,
    },
    scores: {
      str: 12,
      dex: 12,
      con: 16,
      int: 12,
      wis: 14,
      cha: 15,
    },
    senses: {
      darkvision: 60,
    },
    damageResistances: [refs.rules.cold, refs.rules.fire],
    abilities: [
      {
        key: 'shell',
        name: 'Shell',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: [
          'As a ',
          refs.rules.bonus_action,
          ', pulls into her shell: +4 AC and speed 0 until she comes out as a ',
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
              dice: '1d8',
              type: refs.rules.piercing,
              addModifier: true,
            },
            {
              dice: '1d6',
              type: refs.rules.cold,
            },
          ],
        },
      },
      {
        key: 'infernal-whisper',
        name: 'Infernal Whisper',
        timing: 'action',
        icon: 'gi/GiCharm',
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { creatures: 1, range: 30, which: 'that can hear her' },
          onFail: {
            also: [{ effect: 'charmed-by-sylf' }],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
        effects: [
          {
            key: 'charmed-by-sylf',
            name: 'Charmed',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.charmed],
            lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
          },
        ],
      },
    ],
    source: {
      adaptedFrom: [],
      changes: 'Homebrew: a demon bound into a blue-shelled tortoise, the cold twin of Dax.',
    },
  },
})

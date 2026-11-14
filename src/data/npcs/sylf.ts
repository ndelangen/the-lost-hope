import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylf',
  avatar: '/assets/npcs/sylf.png',
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
    size: 'Small',
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
    damageResistances: ['cold', 'fire'],
    abilities: [
      {
        key: 'shell',
        name: 'Shell',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: [
          'As a bonus action, pulls into her shell: +4 AC and speed 0 until she comes out as a bonus action.',
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
              type: 'piercing',
              addModifier: true,
            },
            {
              dice: '1d6',
              type: 'cold',
            },
          ],
        },
      },
      {
        key: 'infernal-whisper',
        name: 'Infernal Whisper',
        timing: 'action',
        icon: 'gi/GiCharm',
        text: [
          'One creature within 30 ft. that can hear her: Wisdom saving throw, ',
          {
            dc: 'cha',
          },
          '. Failure: ',
          {
            condition: 'charmed',
          },
          ' until the end of her next turn.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: [],
      changes: 'Homebrew: a demon bound into a blue-shelled tortoise, the cold twin of Dax.',
    },
  },
})

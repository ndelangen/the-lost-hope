import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Wolfie',
  avatar: '/assets/npcs/wolfie.png',
  location: refs.locations.skynet_s_second_best_inn,
  species: 'Dire wolf in a humanoid form',
  notes: [
    ['One of two pups taken from the stables of ', refs.npcs.lord_malachar, ' by the party.'],
  ],
  stats: {
    size: 'Medium',
    type: 'monstrosity',
    cr: '2',
    ac: 14,
    armor: 'natural armor',
    hitDice: '6d8',
    speed: { walk: 40 },
    scores: { str: 16, dex: 15, con: 15, int: 8, wis: 12, cha: 9 },
    skills: { perception: 'expert', stealth: 'proficient', athletics: 'proficient' },
    senses: { darkvision: 60 },
    abilities: [
      {
        key: 'keen-nose',
        name: 'Keen Nose',
        timing: 'trait',
        icon: 'gi/GiNoseSide',
        text: ['Advantage on Wisdom (Perception) checks that rely on smell.'],
      },
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          'Advantage on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          { condition: 'incapacitated' },
          '.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['One ', { ability: 'bite' }, ' and one ', { ability: 'claw' }, '.'],
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
          damage: [{ dice: '1d10', type: 'piercing', addModifier: true }],
        },
        text: [
          'If the target is Medium or smaller, it has the ',
          { condition: 'prone' },
          ' condition.',
        ],
      },
      {
        key: 'claw',
        name: 'Claw',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [{ dice: '1d6', type: 'slashing', addModifier: true }],
        },
      },
      {
        key: 'pounce',
        name: 'Pounce',
        timing: 'bonus action',
        icon: 'gi/GiPaw',
        intent: 'damage',
        text: [
          'Moves up to ',
          { speed: 'walk', times: 0.5 },
          ' straight toward a creature without provoking an ',
          { action: 'opportunity attack' },
          ', then makes one ',
          { ability: 'bite' },
          '.',
        ],
        uses: 1,
        recharge: 'Short or long rest',
      },
      {
        key: 'guard-my-handler',
        name: 'Guard My Handler',
        timing: 'reaction',
        icon: 'lucide/Shield',
        intent: 'damage',
        text: [
          'When a creature Wolfie can see hits his handler within 5 ft. of him, he makes one ',
          { ability: 'bite' },
          ' against that creature.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_dire-wolf', 'srd-2024_werewolf'],
      changes:
        'Dire wolf bite and senses on an upright Medium body, with werewolf-style claws and multiattack. Pounce and the handler reaction are new. Tuned to CR 2 as a companion for a level 5 party.',
    },
  },
})

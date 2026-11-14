import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Sir Fabulous',
  avatar: '/assets/npcs/wolfie.png',
  location: refs.locations.the_blackstone,
  species: 'Dire wolf',
  notes: [
    [
      'One of two pups taken from the stables of ',
      refs.npcs.lord_malachar,
      ' by the party. He is distinguished by a notably fuller coat than ',
      refs.beasts.wolfie,
      '.',
    ],
    [
      'Sir Fabulous’s original dire-wolf form. It no longer exists separately after becoming ',
      refs.beasts.sir_fabulous_divine_steed,
      '.',
    ],
  ],
  stats: {
    size: 'Large',
    type: 'beast',
    cr: '1',
    ac: 14,
    armor: 'natural armor',
    hitDice: '3d10',
    speed: { walk: 50 },
    scores: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7 },
    skills: { perception: 'expert', stealth: 'proficient' },
    senses: { darkvision: 60 },
    abilities: [
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          'Advantage on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          refs.rules.incapacitated,
          '.',
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
          damage: [{ dice: '1d10', type: refs.rules.piercing, addModifier: true }],
        },
        text: ['If the target is Large or smaller, it has the ', refs.rules.prone, ' condition.'],
      },
    ],
    source: { adaptedFrom: ['srd-2024_dire-wolf'] },
  },
})

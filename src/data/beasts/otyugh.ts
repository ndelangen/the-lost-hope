import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Otyugh',
  location: refs.locations.rustmoor,
  species: 'Otyugh',
  notes: [
    [
      'A bloated, three-legged mound of a creature with a huge toothy mouth, two spiked tentacles and an eye on a stalk. It lives in filth and eats it.',
    ],
  ],
  background: [
    [
      'One has settled in the sludge clogging a mill wheel on the river through ',
      refs.locations.rustmoor,
      '. It can send simple thoughts into a mind, and it would rather bargain for garbage than fight.',
    ],
  ],
  stats: {
    size: 'large',
    type: 'aberration',
    cr: '5',
    ac: 14,
    armor: 'natural armor',
    hitDice: '12d10',
    speed: { walk: 30 },
    scores: { str: 16, dex: 11, con: 19, int: 6, wis: 13, cha: 6 },
    saves: { con: 'proficient' },
    senses: { darkvision: 120 },
    abilities: [
      {
        key: 'limited-telepathy',
        name: 'Limited Telepathy',
        timing: 'trait',
        icon: 'gi/GiTelepathy',
        text: [
          'It can send simple messages and images to creatures within 120 ft. that understand a language. They cannot answer through the link.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['One ', { ability: 'bite' }, ' and two ', { ability: 'tentacle' }, ' attacks.'],
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
          damage: [{ dice: '2d8', type: refs.rules.piercing, addModifier: true }],
        },
        text: [
          'The target makes a DC 15 Constitution save against disease. On a failure it is ',
          refs.rules.poisoned,
          ' until the disease is cured.',
        ],
      },
      {
        key: 'tentacle',
        name: 'Tentacle',
        timing: 'action',
        icon: 'gi/GiTentacleStrike',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [
            { dice: '1d8', type: refs.rules.bludgeoning, addModifier: true },
            { dice: '1d8', type: refs.rules.piercing },
          ],
        },
        text: [
          'A Medium or smaller target is ',
          refs.rules.grappled,
          ' (escape DC 13) and ',
          refs.rules.restrained,
          '. Each of its two tentacles can hold one target.',
        ],
      },
      {
        key: 'tentacle-slam',
        name: 'Tentacle Slam',
        timing: 'action',
        icon: 'gi/GiStomp',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'con',
          target: { creatures: 2, range: 10 },
          onFail: {
            damage: [{ dice: '2d6', type: refs.rules.bludgeoning }],
            conditions: [refs.rules.stunned],
            also: [
              'Only creatures it is grappling. The stun lasts until the end of its next turn.',
            ],
          },
          onSuccess: 'half',
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_otyugh'],
      changes: 'Numbers as in the 2014 SRD.',
    },
  },
})

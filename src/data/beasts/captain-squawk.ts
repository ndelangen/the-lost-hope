import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Captain Squawk',
  avatar: '/assets/beasts/captain-squawk.jpg',
  species: 'Parrot familiar',
  notes: [
    [
      'A rainbow-feathered familiar of ',
      refs.pcs.swift_starblade,
      ' that addresses him as captain.',
    ],
  ],
  stats: {
    size: 'tiny',
    type: 'celestial',
    cr: '1/8',
    ac: 12,
    hitDice: '1d4',
    speed: {
      walk: 10,
      fly: 60,
    },
    scores: {
      str: 3,
      dex: 15,
      con: 10,
      int: 8,
      wis: 14,
      cha: 9,
    },
    skills: {
      perception: 'proficient',
      stealth: 'proficient',
    },
    abilities: [
      {
        key: 'mimicry',
        name: 'Mimicry',
        timing: 'trait',
        icon: 'gi/GiParrotHead',
        text: ['Mimics any sound it has heard; it calls Swift “captain”.'],
      },
      {
        key: 'familiar',
        name: 'Familiar',
        timing: 'trait',
        icon: 'lucide/Link',
        text: ['Swift can see and hear through it while within 100 ft.'],
      },
      {
        key: 'beak',
        name: 'Beak',
        timing: 'action',
        icon: 'gi/GiParrotHead',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d4',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'distraction',
        name: 'Distracting Flutter',
        timing: 'bonus action',
        icon: 'gi/GiFeather',
        text: [
          'One creature within 5 ft. has ',
          refs.rules.disadvantage,
          ' on its next attack roll.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_raven'],
      changes: 'A rainbow parrot familiar: raven numbers with a distracting flutter.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Sir Fabulous, Divine Steed',
  avatar: '/assets/beasts/sir-fabulous-divine-steed-portrait.png',
  previousPortraits: [
    { url: '/assets/npcs/sir-fabulous-divine-steed.png', description: 'Previous beast portrait' },
  ],
  species: 'Dire wolf',
  notes: [
    [
      'The transformed form of ',
      refs.beasts.sir_fabulous,
      ', now an enlarged and divinely altered dire wolf bonded to ',
      refs.pcs.devan,
      ' as his magical steed.',
    ],
    [
      'He has no home of his own: wherever ',
      refs.pcs.devan,
      ' is, Sir Fabulous tends to be with him, unless he is stationed somewhere for a while.',
    ],
    ['His additional abilities and trained skill remain undecided.'],
  ],
  stats: {
    size: 'large',
    type: 'celestial',
    cr: '3',
    ac: 16,
    armor: 'natural armor',
    hitDice: '7d10',
    speed: {
      walk: 60,
    },
    scores: {
      str: 18,
      dex: 15,
      con: 16,
      int: 6,
      wis: 13,
      cha: 10,
    },
    skills: {
      perception: 'expert',
      stealth: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    damageResistances: [refs.rules.radiant],
    abilities: [
      {
        key: 'bonded-mount',
        name: 'Bonded Mount',
        timing: 'trait',
        icon: 'lucide/Link',
        text: [
          'Devan can ride him; while mounted, Devan’s attacks against creatures smaller than the steed have ',
          refs.rules.advantage,
          '.',
        ],
      },
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          refs.rules.advantage,
          ' on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          refs.rules.incapacitated,
          '.',
        ],
      },
      {
        key: 'bite',
        name: 'Divine Bite',
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
              dice: '1d8',
              type: refs.rules.radiant,
            },
          ],
        },
        text: ['If the target is Large or smaller, it has the ', refs.rules.prone, ' condition.'],
      },
      {
        key: 'fell-glare',
        name: 'Fell Glare',
        timing: 'reaction',
        icon: 'gi/GiSunbeams',
        text: ['When a creature within 60 ft. hits Devan:'],
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { creatures: 1, range: 60, which: 'that hit Devan' },
          onFail: {
            conditions: [refs.rules.frightened],
            also: ['It lasts until the end of its next turn.'],
          },
        },
      },
      {
        key: 'healing-touch',
        name: 'Healing Touch',
        timing: 'bonus action',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: ['Touches Devan or another creature, which regains 2d8 + 2 HP.'],
        uses: 1,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_dire-wolf'],
      changes:
        'Sir Fabulous after the divine change: a celestial steed for Devan with otherworldly-steed abilities. His trained skill is still undecided.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Rust Monster',
  location: refs.locations.the_old_battlefield,
  species: 'Rust monster',
  notes: [
    [
      'An armoured, insect-like beast with long feathery antennae that eats metal, turning it to rust at a touch.',
    ],
  ],
  background: [
    [
      'They thrive on ',
      refs.locations.the_old_battlefield,
      ', where there is more metal than anywhere else in the world, and they are the scavengers’ worst enemy.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'monstrosity',
    cr: '1/2',
    ac: 14,
    armor: 'natural armor',
    hitDice: '5d8',
    speed: { walk: 40 },
    scores: { str: 13, dex: 12, con: 13, int: 2, wis: 13, cha: 6 },
    senses: { darkvision: 60 },
    abilities: [
      {
        key: 'iron-scent',
        name: 'Iron Scent',
        timing: 'trait',
        icon: 'gi/GiNoseSide',
        text: ['It can smell ferrous metal within 30 ft.'],
      },
      {
        key: 'rust-metal',
        name: 'Rust Metal',
        timing: 'trait',
        icon: 'gi/GiBreakingChain',
        text: [
          'A nonmagical metal weapon that hits it deals its damage, then takes a permanent, cumulative −1 to damage rolls; it breaks at −5. Nonmagical metal ammunition that hits it is destroyed after dealing damage.',
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
          damage: [{ dice: '1d8', type: refs.rules.piercing, addModifier: true }],
        },
      },
      {
        key: 'antennae',
        name: 'Antennae',
        timing: 'action',
        icon: 'gi/GiHeatHaze',
        save: {
          ability: 'dex',
          dc: 'con',
          target: { creatures: 1, range: 5 },
          onFail: {
            also: [
              'Its antennae touch a nonmagical ferrous metal item the target wears or carries. Armour or a shield takes a permanent, cumulative −1 to the AC it gives (armour breaks at AC 10, a shield at +0); a held weapon rusts as with Rust Metal.',
            ],
          },
          onSuccess: 'none',
        },
        text: [
          'An unattended metal object it touches simply loses a chunk a foot across, no save.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_rust-monster'],
      changes: 'Numbers as in the 2014 SRD.',
    },
  },
})

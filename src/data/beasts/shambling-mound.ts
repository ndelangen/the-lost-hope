import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Shambling Mound',
  location: refs.locations.thornwall_maze,
  species: 'Shambling mound',
  notes: [['A walking heap of rotting vines, moss and fungus that swallows whatever it catches.']],
  background: [
    [
      'It wanders the ',
      refs.locations.thornwall_maze,
      ' and hunts by sound. When a ',
      refs.beasts.shrieker_fungus,
      ' screams, it comes.',
    ],
  ],
  stats: {
    size: 'large',
    type: 'plant',
    cr: '5',
    ac: 15,
    armor: 'natural armor',
    hitDice: '13d10',
    speed: { walk: 30, swim: 20 },
    scores: { str: 18, dex: 8, con: 16, int: 5, wis: 10, cha: 5 },
    skills: { stealth: 'proficient' },
    senses: { blindsight: 60 },
    damageResistances: [refs.rules.cold, refs.rules.fire],
    damageImmunities: [refs.rules.lightning],
    conditionImmunities: [refs.rules.deafened],
    abilities: [
      {
        key: 'lightning-absorption',
        name: 'Lightning Absorption',
        timing: 'trait',
        icon: 'gi/GiPowerLightning',
        intent: 'healing',
        text: [
          'Whenever it would take lightning damage, it takes none and regains hit points equal to the lightning damage instead.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiRallyTheTroops',
        intent: 'damage',
        text: [
          'Three ',
          { ability: 'tendril' },
          ' attacks. It can replace one of them with ',
          { ability: 'engulf' },
          '.',
        ],
      },
      {
        key: 'tendril',
        name: 'Tendril',
        timing: 'action',
        icon: 'gi/GiWhiplash',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [{ dice: '1d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
        text: [
          'A Medium or smaller target is pulled up to 5 ft. toward it and is ',
          refs.rules.grappled,
          ' (escape DC 14).',
        ],
      },
      {
        key: 'engulf',
        name: 'Engulf',
        timing: 'action',
        icon: 'gi/GiSlime',
        intent: 'damage',
        save: {
          ability: 'str',
          dc: 'str',
          target: { creatures: 1, range: 5, which: 'that it is grappling' },
          onFail: {
            damage: [{ dice: '3d6', type: refs.rules.bludgeoning }],
            conditions: [refs.rules.blinded, refs.rules.restrained],
            also: [
              'The creature is pulled inside the mound. It takes the damage again at the start of each of the mound’s turns until it escapes, the grapple ends, or the mound dies. The mound can hold one creature inside at a time.',
            ],
          },
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_shambling-mound'],
      changes:
        'Tendril attacks follow the SRD block; Engulf is simplified to a single Strength save against the creature it is already grappling. Exhaustion immunity is left out.',
    },
  },
})

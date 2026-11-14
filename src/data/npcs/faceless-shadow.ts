import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Faceless Shadow',
  notes: [
    ['A hovering, faceless shadowy figure seen wielding ', refs.items.cursed_shadow_sword, '.'],
  ],
  stats: {
    size: 'Medium',
    type: 'undead',
    cr: '5',
    ac: 14,
    hitDice: '12d8',
    speed: {
      walk: 0,
      fly: 40,
    },
    scores: {
      str: 6,
      dex: 16,
      con: 16,
      int: 10,
      wis: 12,
      cha: 14,
    },
    skills: {
      stealth: 'expert',
    },
    senses: {
      darkvision: 60,
    },
    damageResistances: [
      'acid',
      'cold',
      'fire',
      'lightning',
      'thunder',
      'bludgeoning',
      'piercing',
      'slashing',
    ],
    damageImmunities: ['necrotic', 'poison'],
    conditionImmunities: ['grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
    abilities: [
      {
        key: 'incorporeal',
        name: 'Incorporeal Movement',
        timing: 'trait',
        icon: 'gi/GiShadowFollower',
        text: [
          'Moves through creatures and objects as if they were difficult terrain; takes 1d10 force damage if it ends its turn inside an object.',
        ],
      },
      {
        key: 'shadow-stealth',
        name: 'Shadow Stealth',
        timing: 'trait',
        icon: 'gi/GiInvisible',
        text: [
          'While in dim light or darkness, it can take the ',
          {
            action: 'hide',
          },
          ' action as a bonus action.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'cursed-blade',
          },
          ' attacks.',
        ],
      },
      {
        key: 'cursed-blade',
        name: 'Cursed Shadow Sword',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d8',
              type: 'slashing',
              addModifier: true,
            },
            {
              dice: '2d6',
              type: 'necrotic',
            },
          ],
        },
        text: ['The target’s Strength drops by 1d4 until it finishes a short or long rest.'],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_shadow', 'srd-2024_wraith'],
      changes:
        'A hovering shadow armed with the cursed shadow sword: shadow stealth and strength drain, wraith-like durability.',
    },
  },
})

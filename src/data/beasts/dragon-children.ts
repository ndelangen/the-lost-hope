import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Dragon Children',
  avatar: '/assets/npcs/dragon-children.png',
  location: refs.locations.mountain_top,
  species: 'Dragon',
  notes: [
    [
      'The children of ',
      refs.npcs.misha,
      ' and ',
      refs.npcs.dragon_of_the_mountain,
      '. All dragons — possibly hundreds. Their exact number, and any individual names, colors, or ages, are unestablished.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'dragon',
    cr: '3',
    ac: 17,
    armor: 'natural armor',
    hitDice: '10d8',
    speed: {
      walk: 30,
      fly: 60,
      swim: 30,
    },
    scores: {
      str: 19,
      dex: 14,
      con: 17,
      int: 14,
      wis: 11,
      cha: 16,
    },
    saves: {
      dex: 'proficient',
      wis: 'proficient',
    },
    skills: {
      perception: 'expert',
      stealth: 'proficient',
    },
    senses: {
      blindsight: 10,
      darkvision: 60,
    },
    damageImmunities: [refs.rules.fire],
    abilities: [
      {
        key: 'amphibious',
        name: 'Amphibious',
        timing: 'trait',
        icon: 'gi/GiWaterSplash',
        text: ['Breathes air and water.'],
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
            ability: 'rend',
          },
          ' attacks.',
        ],
      },
      {
        key: 'rend',
        name: 'Rend',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d10',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'fire-breath',
        name: 'Fire Breath',
        timing: 'action',
        icon: 'gi/GiFireBreath',
        intent: 'damage',
        text: [
          'Each creature in a 15-ft. cone: Dexterity ',
          refs.rules.saving_throw,
          ', ',
          {
            dc: 'con',
          },
          '. Failure: 4d10 ',
          refs.rules.fire,
          ' damage. Success: ',
          refs.rules.half_damage,
          '.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_gold-dragon-wyrmling'],
      changes:
        'One wyrmling of the brood; colours vary, so it uses gold wyrmling numbers with fire breath. One stat block per child.',
    },
  },
})

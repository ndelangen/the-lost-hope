import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Serpent Eclipse Lake Serpent',
  avatar: '/assets/beasts/serpent-eclipse-lake-serpent.jpg',
  species: 'Giant serpent',
  location: refs.locations.serpent_eclipse_flooded_cavern,
  notes: [['An enormous dark-blue serpent that moves beneath the water and stone platforms.']],
  stats: {
    size: 'Gargantuan',
    type: 'monstrosity',
    cr: '8',
    ac: 15,
    armor: 'natural armor',
    hitDice: '12d20',
    speed: {
      walk: 20,
      swim: 60,
    },
    scores: {
      str: 22,
      dex: 14,
      con: 20,
      int: 3,
      wis: 12,
      cha: 6,
    },
    skills: {
      perception: 'proficient',
      stealth: 'expert',
    },
    senses: {
      blindsight: 30,
      darkvision: 60,
    },
    abilities: [
      {
        key: 'hold-breath',
        name: 'Hold Breath',
        timing: 'trait',
        icon: 'gi/GiWaterSplash',
        text: ['Can hold its breath for 1 hour.'],
      },
      {
        key: 'under-the-platforms',
        name: 'Under the Platforms',
        timing: 'trait',
        icon: 'gi/GiSnake',
        text: [
          'While submerged, it has total cover and can attack anyone standing at a platform’s edge.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'One ',
          {
            ability: 'bite',
          },
          ' and one ',
          {
            ability: 'constrict',
          },
          '.',
        ],
      },
      {
        key: 'bite',
        name: 'Bite',
        timing: 'action',
        icon: 'gi/GiSnakeBite',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 15,
          damage: [
            {
              dice: '2d10',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'constrict',
        name: 'Constrict',
        timing: 'action',
        icon: 'gi/GiSnake',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 15,
          damage: [
            {
              dice: '2d8',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
        text: [
          'A Huge or smaller target has the ',
          refs.rules.grappled,
          ' condition (escape ',
          {
            dc: 'str',
          },
          ') and is ',
          refs.rules.restrained,
          ' while grappled.',
        ],
      },
      {
        key: 'drag-under',
        name: 'Drag Under',
        timing: 'bonus action',
        icon: 'gi/GiWaterSplash',
        text: ['Pulls a creature it has ', refs.rules.grappled, ' underwater with it.'],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_giant-constrictor-snake'],
      changes:
        'An enormous lake serpent: giant constrictor snake scaled up to Gargantuan and CR 8.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Knukkles',
  avatar: '/assets/npcs/knukkles-portrait.png',
  previousPortraits: [
    { url: '/assets/npcs/knukkles.png', description: 'Previous character portrait' },
  ],
  location: refs.locations.the_sullen_monk,
  species: 'unknown',
  notes: [['A four-armed figure with a red face.']],
  stats: {
    size: 'large',
    type: 'humanoid',
    cr: '5',
    ac: 15,
    armor: 'natural armor',
    hitDice: '12d10',
    speed: {
      walk: 30,
    },
    scores: {
      str: 19,
      dex: 14,
      con: 16,
      int: 10,
      wis: 12,
      cha: 11,
    },
    skills: {
      athletics: 'expert',
      intimidation: 'proficient',
    },
    abilities: [
      {
        key: 'four-arms',
        name: 'Four Arms',
        timing: 'trait',
        icon: 'gi/GiFist',
        text: ['Can grapple two creatures at once and still attack with its other hands.'],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Four ',
          {
            ability: 'fist',
          },
          ' attacks.',
        ],
      },
      {
        key: 'fist',
        name: 'Fist',
        timing: 'action',
        icon: 'gi/GiFist',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
        text: [
          'If two fists hit the same Medium or smaller target this turn, it has the ',
          refs.rules.grappled,
          ' condition (escape ',
          {
            dc: 'str',
          },
          ').',
        ],
        effects: [],
      },
      {
        key: 'crush',
        name: 'Crush',
        timing: 'bonus action',
        icon: 'gi/GiFist',
        intent: 'damage',
        text: [
          'Each creature Knukkles has ',
          refs.rules.grappled,
          ' takes 2d6 + 4 ',
          refs.rules.bludgeoning,
          ' damage.',
        ],
        effects: [],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_tough-boss'],
      changes: 'A four-armed, red-faced brawler: tough boss numbers rebuilt around four fists.',
    },
  },
})

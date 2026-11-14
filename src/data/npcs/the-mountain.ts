import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Mountain',
  notes: [['A cage fighter known by this epithet.']],
  stats: {
    size: 'Large',
    type: 'humanoid',
    cr: '5',
    ac: 16,
    armor: 'natural toughness',
    hitDice: '15d10',
    speed: {
      walk: 30,
    },
    scores: {
      str: 20,
      dex: 12,
      con: 18,
      int: 9,
      wis: 12,
      cha: 14,
    },
    saves: {
      str: 'proficient',
      dex: 'proficient',
      con: 'proficient',
    },
    skills: {
      athletics: 'expert',
      intimidation: 'proficient',
    },
    abilities: [
      {
        key: 'crowd-favourite',
        name: 'Crowd Favourite',
        timing: 'trait',
        icon: 'gi/GiSonicShout',
        text: [
          'Advantage on saves against being ',
          {
            condition: 'frightened',
          },
          ' while an audience watches.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Three ',
          {
            ability: 'fist',
          },
          ' attacks.',
        ],
      },
      {
        key: 'fist',
        name: 'Cage Fist',
        timing: 'action',
        icon: 'gi/GiFist',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d8',
              type: 'bludgeoning',
              addModifier: true,
            },
          ],
        },
        text: [
          'If two fists hit the same target this turn, it has the ',
          {
            condition: 'grappled',
          },
          ' condition (escape ',
          {
            dc: 'str',
          },
          ').',
        ],
      },
      {
        key: 'slam',
        name: 'Body Slam',
        timing: 'bonus action',
        icon: 'gi/GiStomp',
        intent: 'damage',
        text: [
          'One creature he has ',
          {
            condition: 'grappled',
          },
          ': Strength saving throw, ',
          {
            dc: 'str',
          },
          '. Failure: 2d8 + 5 bludgeoning damage and ',
          {
            condition: 'prone',
          },
          '.',
        ],
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: ['Adds 3 to his AC against one melee attack that would hit him.'],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_gladiator'],
      changes: 'A cage fighter: gladiator numbers fought with fists, grapples, and slams.',
    },
  },
})

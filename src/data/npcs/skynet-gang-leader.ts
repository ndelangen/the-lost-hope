import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Skynet Gang Leader',
  notes: [['A large, four-armed criminal who leads a local gang.']],
  stats: {
    size: 'Large',
    type: 'humanoid',
    cr: '4',
    ac: 15,
    armor: 'natural armor',
    hitDice: '11d10',
    speed: {
      walk: 30,
    },
    scores: {
      str: 18,
      dex: 13,
      con: 16,
      int: 11,
      wis: 11,
      cha: 14,
    },
    skills: {
      athletics: 'proficient',
      intimidation: 'expert',
    },
    abilities: [
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          'Advantage on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          {
            condition: 'incapacitated',
          },
          '.',
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
            ability: 'club',
          },
          ' attacks and one ',
          {
            ability: 'grab',
          },
          '.',
        ],
      },
      {
        key: 'club',
        name: 'Heavy Club',
        timing: 'action',
        icon: 'gi/GiSpikedBat',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d10',
              type: 'bludgeoning',
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'grab',
        name: 'Grab',
        timing: 'action',
        icon: 'gi/GiFist',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d4',
              type: 'bludgeoning',
              addModifier: true,
            },
          ],
        },
        text: [
          'A Medium or smaller target has the ',
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
    ],
    source: {
      adaptedFrom: ['srd-2024_tough-boss'],
      changes: 'A large, four-armed gang leader: tough boss with an extra grabbing pair of hands.',
    },
  },
})

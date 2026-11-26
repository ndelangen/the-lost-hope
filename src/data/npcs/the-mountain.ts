import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Mountain',
  avatar: '/assets/npcs/the-mountain-portrait.png',
  notes: [['A cage fighter known by this epithet.']],
  stats: {
    size: 'large',
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
          refs.rules.advantage,
          ' on saves against being ',
          refs.rules.frightened,
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
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
        text: [
          'If two fists hit the same target this turn, it has ',
          { effect: 'cage-grapple' },
          '.',
        ],
        effects: [
          {
            key: 'cage-grapple',
            name: 'Grappled',
            lands: { on: 'hit' },
            conditions: [refs.rules.grappled],
            lasts: { kind: 'until-removed' },
            ends: { escape: { dc: 'str' } },
          },
        ],
      },
      {
        key: 'slam',
        name: 'Body Slam',
        timing: 'bonus action',
        icon: 'gi/GiStomp',
        intent: 'damage',
        save: {
          ability: 'str',
          dc: 'str',
          target: { creatures: 1, range: 5, which: 'he has grappled' },
          onFail: {
            damage: [{ dice: '2d8', type: refs.rules.bludgeoning, addModifier: true }],

            also: [{ effect: 'prone' }],
          },
        },
        effects: [
          {
            key: 'prone',
            name: 'Prone',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.prone],
            lasts: { kind: 'until-removed' },
          },
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

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Cloaked Snatcher',
  avatar: '/assets/npcs/cloaked-snatcher-portrait.png',
  secretMemberships: [
    { organization: refs.organizations.the_eyeless_hand, status: 'active', rank: 'Member' },
  ],
  motivations: [
    [
      'Bring ',
      refs.pcs.jim,
      ' back to ',
      refs.npcs.the_father,
      ' alive. Anyone else is only in the way.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1/2',
    ac: 13,
    armor: 'leather armor',
    hitDice: '5d8',
    speed: { walk: 30 },
    scores: { str: 15, dex: 14, con: 14, int: 10, wis: 11, cha: 10 },
    skills: { athletics: 'proficient', stealth: 'proficient' },
    abilities: [
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          'Advantage on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          refs.rules.incapacitated,
          '.',
        ],
      },
      {
        key: 'sap',
        name: 'Sap',
        timing: 'action',
        icon: 'gi/GiFlangedMace',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
        text: ['A target reduced to 0 hit points is knocked out instead of dying.'],
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
          damage: [{ dice: '1d4', type: refs.rules.bludgeoning, addModifier: true }],
        },
        text: [
          'A Medium or smaller target has the ',
          refs.rules.grappled,
          ' condition (escape ',
          { dc: 'str' },
          ').',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_tough'],
      changes:
        'A snatch-squad tough: lighter armour, Athletics and Stealth, a sap that knocks out instead of killing, and a grab to hold a target down.',
    },
  },
})

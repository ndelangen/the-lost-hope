import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Father',
  avatar: '/assets/npcs/the-father-portrait.png',
  notes: [
    [
      'The secret leader of ',
      refs.organizations.the_eyeless_hand,
      '; his true identity is a closely guarded secret.',
    ],
  ],
  motivations: [
    [
      'He wants ',
      refs.npcs.light_13th_marshal,
      ' to put down the pen. On the day Light stops writing, the memories the Father holds are the only record left in the world, and whoever owns the only memory owns everything. Light does not know this. The party can find it out, and must then convince Light that he cannot carry out his plan yet.',
    ],
    [
      'He fires the green beam from the flying fortress to capture ',
      refs.pcs.jim,
      ' and holds him there. The damage it does is an accident of the power needed to take a ghost who carries a guild tattoo.',
    ],
  ],
  background: [
    ['Working ideas from brainstorming. Not settled.'],
    [
      'He may be a past adventurer who learned the secret of ',
      refs.npcs.light_13th_marshal,
      ' and the shadow. He takes the memories that Arcane Dust users lose, so he pushes more drug use to learn more, and in that way rivals Light.',
    ],
    [
      '',
      refs.organizations.the_eyeless_hand,
      ' first dealt in the drug for money. Now the drug empire exists to feed a network of information.',
    ],
    [
      'He is out to control the whole world. ',
      refs.pcs.jim,
      ' was meant to be his protégé and replacement, which would explain why he wants him found alive.',
    ],
    ['Still open: how far the Hand reaches into the ', refs.organizations.marshals_court, '.'],
  ],
  memberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Leader',
    },
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '8',
    ac: 16,
    armor: 'studded leather',
    hitDice: '15d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 11,
      dex: 18,
      con: 14,
      int: 15,
      wis: 14,
      cha: 16,
    },
    saves: {
      dex: 'proficient',
      int: 'proficient',
    },
    skills: {
      acrobatics: 'proficient',
      deception: 'expert',
      perception: 'proficient',
      stealth: 'expert',
    },
    damageResistances: [refs.rules.poison],
    abilities: [
      {
        key: 'evasion',
        name: 'Evasion',
        timing: 'trait',
        icon: 'gi/GiSmokeBomb',
        text: [
          'When a Dexterity save would halve damage, he takes none on a success and half on a failure.',
        ],
      },
      {
        key: 'no-face',
        name: 'A Thousand Faces',
        timing: 'trait',
        icon: 'gi/GiHoodedFigure',
        text: [
          'His true identity is hidden: he appears as whoever the viewer least suspects, and magic that reveals identity fails unless the caster beats ',
          {
            dc: 'cha',
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
          'Three ',
          {
            ability: 'hand-blade',
          },
          ' attacks.',
        ],
      },
      {
        key: 'hand-blade',
        name: 'Eyeless Blade',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
            {
              dice: '3d6',
              type: refs.rules.poison,
            },
          ],
        },
      },
      {
        key: 'poison-dart',
        name: 'Poison Dart',
        timing: 'action',
        icon: 'gi/GiThrownDaggers',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [30, 120],
          damage: [
            {
              dice: '1d4',
              type: refs.rules.piercing,
              addModifier: true,
            },
            {
              dice: '3d6',
              type: refs.rules.poison,
            },
          ],
        },
      },
      {
        key: 'vanish',
        name: 'Vanish',
        timing: 'bonus action',
        icon: 'gi/GiInvisible',
        text: [
          'Takes the ',
          refs.rules.hide,
          ' or ',
          refs.rules.disengage,
          ' action; in dim light he becomes ',
          refs.rules.invisible,
          ' until he attacks.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_assassin'],
      changes:
        'The secret leader of the Eyeless Hand: SRD assassin numbers with a hidden identity.',
    },
  },
})

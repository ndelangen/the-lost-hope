import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Father',
  avatar: '/assets/npcs/the-father.png',
  notes: [
    [
      'The secret leader of ',
      refs.organizations.the_eyeless_hand,
      '; his true identity is a closely guarded secret.',
    ],
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

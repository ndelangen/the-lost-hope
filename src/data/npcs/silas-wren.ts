import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Silas Wren',
  species: 'Human',
  notes: [
    [
      'A soft-spoken man in a plain grey cloak who wears a black cloth over his eyes, yet never misses a step. He never turns his head to look at the person he is speaking to.',
    ],
  ],
  secretMemberships: [
    { organization: refs.organizations.the_eyeless_hand, status: 'active', rank: 'Finger' },
  ],
  motivations: [
    [
      'Bring ',
      refs.pcs.jim,
      ' home to ',
      refs.npcs.the_father,
      ' without a drop of blood. He knew ',
      refs.pcs.jim,
      ' as a boy and still thinks of him fondly. To him this is a rescue, not an arrest.',
    ],
  ],
  background: [
    [
      'He leads the ',
      refs.npcs.cloaked_snatcher,
      ' squad at the docks and speaks for it. He is courteous, patient and certain: he believes ',
      refs.pcs.jim,
      ' is going home to his inheritance. He has no quarrel with ',
      refs.pcs.swift_starblade,
      ' and is wary of the Starblade name.',
    ],
    [
      'What he says: “He isn’t a prisoner where he’s going, Starblade. He’s an heir.” “If you want to help him, don’t make this bloody.” “Your name buys you one courtesy. This is it.”',
    ],
    ['He does not know who ', refs.npcs.the_father, ' really is. Nobody he knows does.'],
    [
      'When the green beam strikes, pick his reaction to fit who fired it. If it was not the Hand: “That wasn’t us,” and for once he sounds afraid. If it was: he says nothing and melts into the crowd.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '2',
    ac: 15,
    armor: 'studded leather',
    hitDice: '10d8',
    speed: { walk: 30 },
    scores: { str: 13, dex: 16, con: 14, int: 14, wis: 14, cha: 15 },
    saves: { dex: 'proficient', wis: 'proficient' },
    skills: {
      deception: 'proficient',
      insight: 'proficient',
      perception: 'proficient',
      persuasion: 'proficient',
      stealth: 'proficient',
    },
    senses: { blindsight: 30 },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['Two ', { ability: 'hooked-blade' }, ' attacks.'],
      },
      {
        key: 'hooked-blade',
        name: 'Hooked Blade',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [{ dice: '1d6', type: refs.rules.piercing, addModifier: true }],
        },
        text: ['He can choose to knock the target out instead of killing it.'],
      },
      {
        key: 'signal',
        name: 'Signal the Squad',
        timing: 'bonus action',
        icon: 'lucide/UsersRound',
        text: [
          'One ally he can see within 30 ft. can use its reaction to move up to half its speed and make one melee attack.',
        ],
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'Adds 2 to his AC against one melee attack that would hit him, while holding a weapon.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_bandit-captain'],
      changes:
        'A Hand squad leader: bandit captain numbers with blindsight behind his blindfold, a blade that can knock out, and a bonus action that sends one of his squad in.',
    },
  },
})

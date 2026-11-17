import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Captain Garran',
  avatar: '/assets/npcs/captain-garran-portrait.png',
  species: 'Human',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Captain' },
  ],
  notes: [
    ['A heavily armoured, blunt-spoken officer of the ', refs.organizations.tempest_family, '.'],
  ],
  motivations: [
    [
      'Win the war for ',
      refs.npcs.onana_tempest,
      ' and get his soldiers home alive. He has no patience for adventurers, but he follows orders to the letter.',
    ],
  ],
  background: [
    [
      'He is the armoured man who led the escort in ',
      refs.events.n2_e168,
      '. He impounds vessels for ',
      refs.npcs.onana_tempest,
      ' with his soldiers and the battle-cruiser.',
    ],
    [
      'What he says: “I’ve seen worse.” (his key phrase) “Do not fight. You will lose. The outcome will be the same, just bloodier.”',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '2',
    ac: 18,
    armor: 'plate armor',
    hitDice: '6d10',
    speed: { walk: 30 },
    scores: { str: 18, dex: 11, con: 14, int: 11, wis: 11, cha: 15 },
    saves: { str: 'proficient', con: 'proficient' },
    skills: { athletics: 'proficient', intimidation: 'proficient' },
    abilities: [
      {
        key: 'longsword',
        name: 'Longsword',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d10', type: refs.rules.slashing, addModifier: true }],
        },
        text: [
          'Held in both hands. On a hit the target has ',
          refs.rules.disadvantage,
          ' on its next attack roll before the start of his next turn.',
        ],
      },
      {
        key: 'action-surge',
        name: 'Action Surge',
        timing: 'trait',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'On his turn he takes one extra action, usually a second ',
          { ability: 'longsword' },
          ' swing.',
        ],
        uses: 1,
        recharge: 'Short rest',
      },
      {
        key: 'superiority',
        name: 'Superiority Dice',
        timing: 'trait',
        icon: 'gi/GiKnightBanner',
        text: [
          'A 4th-level Battle Master. He has four d8 superiority dice for ',
          { ability: 'trip-attack' },
          ', ',
          { ability: 'commanders-strike' },
          ' and ',
          { ability: 'rally' },
          '; each use spends one.',
        ],
        uses: 4,
        recharge: 'Short rest',
      },
      {
        key: 'trip-attack',
        name: 'Trip Attack',
        timing: 'action',
        icon: 'gi/GiFootTrip',
        intent: 'damage',
        save: {
          ability: 'str',
          dc: 'str',
          target: { creatures: 1, range: 5, which: 'that he just hit, Large or smaller' },
          onFail: { conditions: [refs.rules.prone] },
        },
        text: [
          'When his ',
          { ability: 'longsword' },
          ' hits, he adds 1d8 to the damage and forces the save.',
        ],
      },
      {
        key: 'commanders-strike',
        name: 'Commander’s Strike',
        timing: 'bonus action',
        icon: 'gi/GiRallyTheTroops',
        text: [
          'He gives up his ',
          { ability: 'longsword' },
          ' attack this turn. One soldier who can see or hear him uses its reaction to make one attack, adding 1d8 to the damage.',
        ],
      },
      {
        key: 'rally',
        name: 'Rally',
        timing: 'bonus action',
        icon: 'gi/GiAnthem',
        intent: 'healing',
        text: ['One soldier who can see or hear him gains 1d8 + 2 temporary HP.'],
      },
      {
        key: 'second-wind',
        name: 'Second Wind',
        timing: 'bonus action',
        icon: 'gi/GiHealing',
        intent: 'healing',
        text: ['He regains 1d10 + 4 HP.'],
        uses: 3,
        recharge: 'One on a short rest, all on a long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_knight'],
      changes:
        'A 4th-level Battle Master fighter: one longsword swing a turn (the knight’s Multiattack is gone, as fighters only get Extra Attack at 5th), with Action Surge, Second Wind, Weapon Mastery (Sap), and superiority dice to trip foes, order a soldier to strike and rally his men.',
    },
  },
})

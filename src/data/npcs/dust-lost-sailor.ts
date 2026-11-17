import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dust-Lost Sailor',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Sailor' },
  ],
  notes: [
    [
      'A sailor of the ',
      refs.organizations.tempest_family,
      ' with grey-veined eyes, who fights without fear and without a word.',
    ],
  ],
  background: [
    [
      refs.organizations.the_eyeless_hand,
      ' fed the crew of ',
      refs.items.ride_the_lightning,
      ' Arcane Dust until they lost themselves. They follow the voice of ',
      refs.npcs.ilsa_corrow,
      ', and they are victims as much as enemies.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '2',
    ac: 13,
    armor: 'hide armor',
    hitDice: '9d8',
    speed: { walk: 30 },
    scores: { str: 16, dex: 12, con: 17, int: 9, wis: 11, cha: 9 },
    skills: { perception: 'proficient' },
    abilities: [
      {
        key: 'dust-frenzy',
        name: 'Dust Frenzy',
        timing: 'trait',
        icon: 'gi/GiBullHorns',
        text: [
          'While below half its ',
          refs.rules.hit_points,
          ', it has ',
          refs.rules.advantage,
          ' on attack rolls and ',
          refs.rules.saving_throw,
          's.',
        ],
      },
      {
        key: 'steered',
        name: 'Steered',
        timing: 'trait',
        icon: 'gi/GiSonicShout',
        text: [
          'When the Finger who steers it is dead or ',
          refs.rules.unconscious,
          ', it drops its weapon and has the ',
          refs.rules.incapacitated,
          ' condition until someone talks it back to itself.',
        ],
      },
      {
        key: 'boarding-axe',
        name: 'Boarding Axe',
        timing: 'action',
        icon: 'gi/GiBattleAxe',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d12', type: refs.rules.slashing, addModifier: true }],
        },
      },
      {
        key: 'shadow-bolt',
        name: 'Shadow Bolt',
        timing: 'action',
        icon: 'gi/GiShadowFollower',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'con',
          range: [60, 60],
          damage: [{ dice: '2d6', type: refs.rules.necrotic }],
        },
        text: ['The dust gives it a scrap of borrowed magic.'],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_berserker'],
      changes:
        'A Tempest sailor on Arcane Dust: the berserker’s frenzy and greataxe, plus a shadow bolt the dust lends it, and it stops fighting when the Finger who steers it falls.',
    },
  },
})

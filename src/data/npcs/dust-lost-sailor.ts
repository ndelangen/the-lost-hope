import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dust-Lost Sailor',
  avatar: '/assets/npcs/dust-lost-sailor-portrait.png',
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
    [
      'They are softer opponents than a ',
      refs.npcs.tempest_soldier,
      ': they are drugged up, and less emotionally invested in the fight.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1/8',
    ac: 12,
    armor: 'leather armor',
    hitDice: '2d8',
    speed: { walk: 30 },
    scores: { str: 12, dex: 12, con: 12, int: 9, wis: 11, cha: 9 },
    skills: { perception: 'proficient' },
    abilities: [
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
        effects: [],
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
          damage: [{ dice: '1d8', type: refs.rules.slashing, addModifier: true }],
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
          damage: [{ dice: '1d6', type: refs.rules.necrotic }],
        },
        text: ['The dust gives it a scrap of borrowed magic.'],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_bandit'],
      changes:
        'A Tempest sailor on Arcane Dust, as soft as a bandit: a boarding axe, a weak shadow bolt the dust lends it, and it stops fighting when the Finger who steers it falls.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sergeant Bruna Kell',
  avatar: '/assets/npcs/sergeant-bruna-kell-portrait.png',
  species: 'Dwarf',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Sergeant' },
  ],
  notes: [
    [
      'A loud, cheerful recruiting sergeant of the ',
      refs.organizations.tempest_family,
      ', standing on a crate and signing up anyone who can hold a spear.',
    ],
  ],
  motivations: [
    [
      'Fill her quota before the fleet rolls out. She will flatter, bargain, or shame anyone who looks able.',
    ],
  ],
  background: [
    [
      'What she shouts: “Pay, rations, and a Tempest pension for anyone who can hold a spear!” “Fairhaven had no army. We do!”',
    ],
    [
      'She tries to sign up whoever looks strongest in the party. Turning her down costs nothing, but signing up gets them a pass through the crowded links between the islands.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1/8',
    ac: 16,
    armor: 'chain shirt, shield',
    hitDice: '2d8',
    speed: { walk: 30 },
    scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
    skills: { perception: 'proficient' },
    abilities: [
      {
        key: 'spear',
        name: 'Spear',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d6', type: refs.rules.piercing, addModifier: true }],
        },
      },
    ],
    source: { adaptedFrom: ['srd-2024_guard'] },
  },
})

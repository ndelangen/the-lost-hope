import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Light 13th Marshal',
  avatar: '/assets/npcs/light.png',
  location: refs.locations.fajanet_guildhall,
  species: 'unknown',
  notes: [
    [
      'Leader of the ',
      refs.organizations.adventurers_guild,
      ' in ',
      refs.locations.fajanet,
      "; the party's main quest-giver.",
    ],
    ['The price of the one favor he grants each new recruit is unstated.'],
    ['He is one of the thirteen world governors and holds the formal rank of 13th Marshal.'],
    ['He has an enormous amount of paperwork to do and never sleeps.'],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Guildmaster',
    },
    {
      organization: refs.organizations.marshals_court,
      status: 'active',
      rank: '13th Marshal',
    },
  ],
  stats: {
    size: 'medium',
    type: 'celestial',
    cr: '12',
    ac: 17,
    hitDice: '18d8',
    speed: {
      walk: 30,
      fly: 60,
    },
    scores: {
      str: 12,
      dex: 16,
      con: 18,
      int: 20,
      wis: 20,
      cha: 22,
    },
    saves: {
      int: 'proficient',
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      arcana: 'proficient',
      insight: 'expert',
      persuasion: 'proficient',
    },
    senses: {
      truesight: 60,
    },
    damageResistances: [refs.rules.radiant],
    abilities: [
      {
        key: 'marshals-authority',
        name: 'Marshal’s Authority',
        timing: 'trait',
        icon: 'gi/GiHolySymbol',
        text: [
          'Can’t be ',
          refs.rules.charmed,
          ' or ',
          refs.rules.frightened,
          '. A creature that has signed one of his contracts has ',
          refs.rules.disadvantage,
          ' on saves against his abilities.',
        ],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If he fails a ', refs.rules.saving_throw, ', he can choose to succeed instead.'],
        uses: 3,
        recharge: 'Long rest',
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
            ability: 'radiant-lance',
          },
          ' attacks.',
        ],
      },
      {
        key: 'radiant-lance',
        name: 'Radiant Lance',
        timing: 'action',
        icon: 'gi/GiSunbeams',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'cha',
          range: [120, 120],
          damage: [
            {
              dice: '2d8',
              type: refs.rules.radiant,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'blinding-light',
        name: 'Blinding Light',
        timing: 'action',
        icon: 'gi/GiSunbeams',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'cha',
          target: { area: { shape: refs.rules.emanation, size: 30 }, chosen: true },
          onFail: {
            damage: [{ dice: '6d8', type: refs.rules.radiant }],
            conditions: [refs.rules.blinded],
            also: ['The blindness lasts until the end of its next turn.'],
          },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'grant-a-favour',
        name: 'Grant a Favour',
        timing: 'bonus action',
        icon: 'gi/GiScrollUnfurled',
        intent: 'healing',
        text: [
          'One creature within 60 ft. under contract with him regains 4d8 HP or ends one condition.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_archmage', 'srd-2024_deva'],
      changes:
        'One of the thirteen world governors: archmage-level casting expressed as light, with a deva’s wings. His true species is unknown.',
    },
  },
})

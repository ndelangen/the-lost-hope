import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rudolf Tempest',
  avatar: '/assets/npcs/rudolf-tempest-portrait.png',
  memberships: [
    { organization: refs.organizations.tempest_family, status: 'active', rank: 'Family member' },
  ],
  notes: [
    [
      'An artificer whom the local gang calls the youngest sibling. Their account conflicts with ',
      refs.npcs.onana_tempest,
      "'s claim to be the youngest.",
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '3',
    ac: 16,
    armor: 'half plate',
    hitDice: '9d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 14,
      con: 14,
      int: 18,
      wis: 12,
      cha: 11,
    },
    saves: {
      con: 'proficient',
      int: 'proficient',
    },
    skills: {
      arcana: 'expert',
      investigation: 'proficient',
      sleight_of_hand: 'proficient',
    },
    abilities: [
      {
        key: 'flash-of-genius',
        name: 'Flash of Genius',
        timing: 'trait',
        icon: 'gi/GiGearHammer',
        text: ['When he or an ally within 30 ft. makes a check or save, adds 4 to the roll.'],
        uses: 4,
        recharge: 'Long rest',
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'arc-pistol',
          },
          ' shots.',
        ],
      },
      {
        key: 'arc-pistol',
        name: 'Arc Pistol',
        timing: 'action',
        icon: 'gi/GiSaberAndPistol',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [60, 180],
          damage: [
            {
              dice: '1d10',
              type: refs.rules.lightning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'steel-defender',
        name: 'Deploy Steel Defender',
        timing: 'action',
        icon: 'gi/GiGearHammer',
        text: [
          'A mechanical guardian appears next to him: it imposes ',
          refs.rules.disadvantage,
          ' on the next attack against an ally within 5 ft. of it, then falls apart.',
        ],
        uses: 1,
        recharge: 'Short or long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_mage'],
      changes:
        'An artificer: the SRD mage’s caster numbers expressed as a lightning pistol and a deployable guardian.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Hex',
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.lucky_palm,
      status: 'active',
      rank: 'Member',
    },
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '3',
    ac: 12,
    armor: 'leather armor',
    hitDice: '9d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 9,
      dex: 14,
      con: 14,
      int: 12,
      wis: 13,
      cha: 17,
    },
    saves: {
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      arcana: 'proficient',
      deception: 'proficient',
      sleightOfHand: 'proficient',
    },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'eldritch-bolt',
          },
          ' attacks.',
        ],
      },
      {
        key: 'eldritch-bolt',
        name: 'Eldritch Bolt',
        timing: 'action',
        icon: 'gi/GiMagicSwirl',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'cha',
          range: [120, 120],
          damage: [
            {
              dice: '1d10',
              type: refs.rules.force,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'hex',
        name: 'Hex',
        timing: 'bonus action',
        icon: 'gi/GiCharm',
        text: [
          'Curses one creature within 90 ft. for 1 minute. Her attacks deal it an extra 1d6 ',
          refs.rules.necrotic,
          ' damage, and it has disadvantage on checks with one ability of her choice.',
        ],
      },
      {
        key: 'lucky-palm',
        name: 'Lucky Palm',
        timing: 'reaction',
        icon: 'gi/GiDiceSixFacesSix',
        text: ['When she or an ally within 30 ft. fails a d20 test, the roll gains a 1d6 bonus.'],
        uses: 3,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_mage'],
      changes:
        'An adventurer and Lucky Palm member: a warlock-style caster with a curse and some luck, scaled down from the SRD mage.',
    },
  },
})

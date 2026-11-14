import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Gruumsh High Priest',
  location: refs.locations.gruumsh_war_temple,
  notes: [['Notably short, but strong enough to lift and throw a troll.']],
  memberships: [
    {
      organization: refs.organizations.church_of_gruumsh,
      status: 'active',
      rank: 'High Priest',
    },
  ],
  stats: {
    size: 'Small',
    type: 'humanoid',
    cr: '5',
    ac: 16,
    armor: 'chain mail',
    hitDice: '12d6',
    speed: {
      walk: 30,
    },
    scores: {
      str: 20,
      dex: 10,
      con: 16,
      int: 12,
      wis: 18,
      cha: 14,
    },
    saves: {
      con: 'proficient',
      wis: 'proficient',
    },
    skills: {
      athletics: 'expert',
      religion: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'mighty-build',
        name: 'Mighty Build',
        timing: 'trait',
        icon: 'gi/GiFist',
        text: [
          'Counts as Large for carrying, pushing, and grappling, and can throw a Large creature he has grappled up to 15 ft.',
        ],
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
            ability: 'mace',
          },
          ' attacks.',
        ],
      },
      {
        key: 'mace',
        name: 'Spiked Mace',
        timing: 'action',
        icon: 'gi/GiFlangedMace',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
            {
              dice: '1d8',
              type: refs.rules.radiant,
            },
          ],
        },
      },
      {
        key: 'one-eyed-glare',
        name: 'One-Eyed Glare',
        timing: 'action',
        icon: 'gi/GiHolySymbol',
        intent: 'damage',
        text: [
          'One creature within 60 ft.: Wisdom saving throw, ',
          {
            dc: 'wis',
          },
          '. Failure: 4d8 radiant damage and ',
          refs.rules.frightened,
          ' until the end of its next turn. Success: half damage.',
        ],
      },
      {
        key: 'blessing-of-gruumsh',
        name: 'Blessing of Gruumsh',
        timing: 'bonus action',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: ['He or an ally within 30 ft. regains 2d8 + 4 HP.'],
        uses: 2,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_priest'],
      changes:
        'A short, absurdly strong war priest: priest spellcasting reshaped into radiant strikes and a troll-throwing grip.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Gruumsh High Priest',
  avatar: '/assets/npcs/gruumsh-high-priest-portrait.png',
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
    size: 'small',
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
          'Counts as Large for carrying, pushing, and grappling, and can throw a Large creature he has ',
          refs.rules.grappled,
          ' up to 15 ft.',
        ],
        effects: [],
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
        save: {
          ability: 'wis',
          dc: 'wis',
          target: { creatures: 1, range: 60 },
          onFail: {
            damage: [{ dice: '4d8', type: refs.rules.radiant }],

            also: [{ effect: 'frightened-glare' }],
          },
          onSuccess: 'half',
        },
        effects: [
          {
            key: 'frightened-glare',
            name: 'Frightened',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.frightened],
            text: ['The fear lasts until the end of its next turn.'],
            lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
          },
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

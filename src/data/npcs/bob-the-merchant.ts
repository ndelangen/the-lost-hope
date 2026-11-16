import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bob the Merchant',
  avatar: '/assets/npcs/bob-the-merchant-portrait.png',
  previousPortraits: [
    { url: '/assets/npcs/bob-the-merchant.png', description: 'Previous character portrait' },
  ],
  location: refs.locations.bob_s_stall,
  species: 'unknown',
  notes: [
    [
      'The party usually sees Bob as a skeletal merchant with blue flames in his eye sockets, fine clothes, and an enormous stock of magical trinkets. He insists that he is alive and presents himself from inside the ',
      refs.beasts.mimic_chest,
      ' at ',
      refs.locations.bob_s_stall,
      '.',
    ],
    [
      'Other observers have perceived Bob as a normal, exceptionally handsome human man with black hair. His actual nature and the reason for these conflicting appearances remain unknown.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '6',
    ac: 14,
    hitDice: '13d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 14,
      con: 14,
      int: 20,
      wis: 15,
      cha: 18,
    },
    saves: {
      int: 'proficient',
      wis: 'proficient',
    },
    skills: {
      arcana: 'expert',
      deception: 'proficient',
      insight: 'proficient',
      persuasion: 'expert',
    },
    senses: {
      darkvision: 60,
    },
    damageResistances: [refs.rules.fire, refs.rules.necrotic],
    abilities: [
      {
        key: 'two-faces',
        name: 'Two Faces',
        timing: 'trait',
        icon: 'lucide/Eye',
        text: [
          'Some see a skeletal merchant with blue flames in his eye sockets; others a handsome black-haired man. Truesight does not settle which is real.',
        ],
      },
      {
        key: 'mimic-partner',
        name: 'Mimic Partner',
        timing: 'trait',
        icon: 'lucide/Box',
        text: [
          'While his chest is within 5 ft. of him, he can take the ',
          refs.rules.dodge,
          ' action as a ',
          refs.rules.bonus_action,
          '.',
        ],
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
            ability: 'arcane-burst',
          },
          ' attacks.',
        ],
      },
      {
        key: 'arcane-burst',
        name: 'Blue-Flame Burst',
        timing: 'action',
        icon: 'gi/GiFlame',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [120, 120],
          damage: [
            {
              dice: '2d10',
              type: refs.rules.fire,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'trinket',
        name: 'Pull a Trinket',
        timing: 'action',
        icon: 'gi/GiMagicSwirl',
        save: {
          ability: 'wis',
          dc: 'int',
          target: { creatures: 1, range: 60 },
          onFail: {
            conditions: [refs.rules.charmed],
            also: [
              'It lasts 1 minute. If he prefers, it takes 4d6 ',
              refs.rules.force,
              ' damage instead of being ',
              refs.rules.charmed,
              '.',
            ],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'blink',
        name: 'Blink Behind the Stall',
        timing: 'reaction',
        icon: 'gi/GiTeleport',
        text: [
          'When he is hit, he teleports up to 30 ft. to a space he can see and the attack misses.',
        ],
        uses: 2,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_mage'],
      changes:
        'Homebrew merchant of uncertain nature: mage numbers with blue fire instead of a spell list.',
    },
  },
})

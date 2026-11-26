import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Lord Malachar',
  avatar: '/assets/npcs/lord-malachar-portrait.png',
  location: refs.locations.the_blackstone,
  species: 'unknown',
  notes: [['The feared ruler of ', refs.locations.shadowpeak, '.']],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '9',
    ac: 18,
    armor: 'plate',
    hitDice: '18d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 18,
      dex: 12,
      con: 18,
      int: 14,
      wis: 15,
      cha: 18,
    },
    saves: {
      con: 'proficient',
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      intimidation: 'expert',
      insight: 'proficient',
      perception: 'proficient',
    },
    abilities: [
      {
        key: 'master-of-wolves',
        name: 'Master of Wolves',
        timing: 'trait',
        icon: 'gi/GiPaw',
        text: [
          'Dire wolves he raised obey his commands and have ',
          refs.rules.advantage,
          ' on attacks while he is within 30 ft.',
        ],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If he fails a ', refs.rules.saving_throw, ', he can choose to succeed instead.'],
        uses: 1,
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
            ability: 'blackblade',
          },
          ' attacks.',
        ],
      },
      {
        key: 'blackblade',
        name: 'Blackblade',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d8',
              type: refs.rules.slashing,
              addModifier: true,
            },
            {
              dice: '2d8',
              type: refs.rules.necrotic,
            },
          ],
        },
      },
      {
        key: 'command-of-fear',
        name: 'Command of Fear',
        timing: 'action',
        icon: 'gi/GiSkullCrossedBones',
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { area: { shape: refs.rules.emanation, size: 30 }, chosen: true },
          onFail: {
            also: [{ effect: 'feared' }],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
        effects: [
          {
            key: 'feared',
            name: 'Frightened',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.frightened],
            lasts: { kind: 'time', amount: '1', unit: 'minute' },
            ends: { repeatSave: ['end-of-turn'] },
          },
        ],
      },
      {
        key: 'rally-the-pack',
        name: 'Rally the Pack',
        timing: 'bonus action',
        icon: 'gi/GiSonicShout',
        intent: 'damage',
        text: [
          'Up to two allies within 30 ft. that can hear him each make one attack using their ',
          refs.rules.reaction,
          '.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_knight'],
      changes:
        'The feared ruler of Shadowpeak: knight numbers raised to CR 9, with a necrotic blade, fear, and command of his wolves. His species is unknown.',
    },
  },
})

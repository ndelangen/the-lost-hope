import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.tal_dorei_campaign_setting_reborn,
  monsters: {
    ashari_stoneguard: {
      name: 'Ashari Stoneguard',
      tags: ['any'],
      tableNotes: [['Tal’Dorei Campaign Setting Reborn, p. 229.']],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '7',
        ac: 15,
        hitDice: '16d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 10, con: 20, int: 10, wis: 14, cha: 9 },
        skills: { athletics: 'proficient', intimidation: 'proficient' },
        senses: { tremorsense: 30 },
        conditionImmunities: [rules.petrified],
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              '3rd-level druid casting with Wisdom. Save ',
              { dc: 'wis' },
              ', spell attack ',
              { toHit: 'wis' },
              '. Cantrips at will · Druidcraft, Resistance. 1st level, 4 slots · Goodberry, Speak with Animals, Thunderwave. 2nd level, 2 slots · Hold Person, Spike Growth.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make three ', { ability: 'granite-maul' }, ' attacks.'],
          },
          {
            key: 'granite-maul',
            name: 'Granite Maul',
            timing: 'action',
            icon: 'gi/GiWarhammer',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'The stoneguard can immediately use its bonus action to cast ',
              refs.spells.thunderwave_srd_5_1,
              ', spending a slot and using no components.',
            ],
          },
          {
            key: 'sentinel',
            name: 'Sentinel',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'If a creature within 5 ft. attacks someone else, the stoneguard can make one attack against that creature.',
            ],
          },
          {
            key: 'skin-to-stone',
            name: 'Skin to Stone',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'When attacked, gain resistance to nonmagical bludgeoning, piercing and slashing attacks until that attacker’s turn ends.',
            ],
          },
        ],
      },
    },
    wraithroot_tree: {
      name: 'Wraithroot Tree',
      alignment: 'neutral evil',
      tableNotes: [['Tal’Dorei Campaign Setting Reborn, p. 259.']],
      stats: {
        size: 'huge',
        type: 'plant',
        cr: '14',
        ac: 16,
        armor: 'natural armor',
        hitDice: '20d12',
        speed: { walk: 30 },
        scores: { str: 23, dex: 8, con: 24, int: 12, wis: 16, cha: 12 },
        skills: { perception: 'proficient' },
        damageResistances: [rules.bludgeoning, rules.piercing],
        damageVulnerabilities: [rules.fire],
        conditionImmunities: [
          rules.charmed,
          rules.frightened,
          rules.paralyzed,
          rules.poisoned,
          rules.stunned,
        ],
        abilities: [
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['While motionless, it cannot be distinguished from an ordinary tree.'],
          },
          {
            key: 'wraith-shift',
            name: 'Wraith Shift',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'On its turn it passes through other creatures and objects as Difficult Terrain without provoking Opportunity Attacks. It must finish moving clear of Large or larger creatures and objects. Any Medium or smaller creatures sharing its space choose a nearest unoccupied space and are pushed there. The tree chooses the nearest unoccupied spaces for Medium or smaller objects it displaces.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'slam' }, ' attacks.'],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '3d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'rock',
            name: 'Rock',
            timing: 'action',
            icon: 'gi/GiSlingshot',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'str',
              range: [60, 180],
              damage: [{ dice: '4d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'wraithstorm',
            name: 'Wraithstorm',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Each creature within 30 ft. other than a Construct or Undead makes a ',
              { dc: 'wis', save: 'con' },
              ' Constitution save. On failure its speed is halved and it becomes vulnerable to bludgeoning until the end of the tree’s next turn.',
            ],
            uses: 1,
            recharge: 'Recharge 5–6',
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.storm_lord_s_wrath,
  monsters: {
    statue_of_talos: {
      name: 'Statue of Talos',
      alignment: 'chaotic evil',
      languages: ['Terran'],
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '10',
        ac: 17,
        armor: 'natural armor',
        hitDice: '14d10',
        speed: { walk: 30, fly: 60 },
        scores: { str: 19, dex: 11, con: 20, int: 6, wis: 11, cha: 9 },
        saves: { wis: 'proficient' },
        skills: { perception: 'proficient' },
        senses: { darkvision: 60 },
        nonmagicalExcept: 'adamantine',
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.exhaustion, rules.petrified, rules.poisoned],
        nonmagicalResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the statue remains motionless, it is indistinguishable from an inanimate statue.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The statue makes five attacks: one with its headbutt and four with its lightning bolt blades.',
            ],
          },
          {
            key: 'headbutt',
            name: 'Headbutt',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'lightning-bolt-blades',
            name: 'Lightning Bolt Blades',
            timing: 'action',
            icon: 'gi/GiPowerLightning',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d4', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    tooth_n_claw: {
      name: 'Tooth-N-Claw',
      alignment: 'lawful evil',
      languages: ["understands Infernal but can't speak it"],
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '3',
        ac: 15,
        armor: 'natural armor',
        hitDice: '7d8',
        speed: { walk: 50 },
        scores: { str: 17, dex: 12, con: 14, int: 6, wis: 13, cha: 6 },
        skills: { perception: 'expert' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.cold],
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'Tooth-N-Claw has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              "Tooth-N-Claw has advantage on an attack roll against a creature if at least one of its allies is within 5 feet of the creature and the ally isn't ",
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [
                { dice: '1d8', type: rules.piercing, addModifier: true },
                { dice: '2d6', type: rules.cold },
              ],
            },
          },
          {
            key: 'freezing-breath',
            name: 'Freezing Breath',
            timing: 'action',
            icon: 'gi/GiDragonBreath',
            intent: 'damage',
            save: {
              ability: 'dex',
              dc: 'con',
              target: { area: { shape: rules.cone, size: 15 } },
              onFail: {
                damage: [{ dice: '6d6', type: rules.cold }],
              },
              onSuccess: 'half',
            },
            text: ['Tooth-N-Claw exhales an icy blast in a 15-foot cone.'],
            uses: 1,
            recharge: 'Recharge 5–6',
          },
        ],
      },
    },
  },
})

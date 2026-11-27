import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.nerds_restoring_harmony_a_voice_in_the_wilderness,
  monsters: {
    chimeric_fox: {
      name: 'Chimeric Fox',
      page: 8,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Wilderness'],
      appearance: [['A small fox with pale fur that shifts to the tan of its surroundings.']],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 30, burrow: 5 },
        scores: { str: 2, dex: 16, con: 11, int: 3, wis: 12, cha: 6 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'chimeric-creation',
            name: 'Chimeric Creation',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The fox’s coat changes color to match its surroundings, granting advantage on Dexterity (Stealth) checks.',
            ],
          },
          {
            key: 'keen-hearing',
            name: 'Keen Hearing',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: ['The fox has advantage on Wisdom (Perception) checks that depend on hearing.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1', type: rules.piercing }],
            },
          },
        ],
      },
    },
    scarlet_sentinel: {
      name: 'Scarlet Sentinel',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '1',
        ac: 8,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 6, con: 14, int: 1, wis: 6, cha: 1 },
        senses: { darkvision: 60 },
        conditionImmunities: [
          rules.charmed,
          rules.exhaustion,
          rules.frightened,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
        ],
        abilities: [
          {
            key: 'immutable-form',
            name: 'Immutable Form',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The Scarlet Sentinel is immune to any spell or effect that would alter its form.',
            ],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The Scarlet Sentinel has advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'magic-weapons',
            name: 'Magic Weapons',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ["The Scarlet Sentinel's weapon attacks are magical."],
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
              reach: 5,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

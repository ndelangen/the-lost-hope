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
  },
})

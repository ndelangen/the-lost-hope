import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_12_the_raven,
  monsters: {
    orog: {
      name: 'Orog',
      reprintedIn: [
        refs.publications.ddex3_16_assault_on_maerimydra,
        refs.publications.princes_of_the_apocalypse_online_supplement,
      ],
      tags: ['orc'],
      alignment: 'chaotic evil',
      languages: ['Common', 'Orc'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 18,
        armor: 'plate',
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 12, con: 18, int: 12, wis: 11, cha: 12 },
        skills: { intimidation: 'expert', survival: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'aggressive',
            name: 'Aggressive',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'As a bonus action, the orog can move up to its speed toward a hostile creature that it can see.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The orog makes two greataxe attacks.'],
          },
          {
            key: 'greataxe',
            name: 'Greataxe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d12', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'javelin',
            name: 'Javelin',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

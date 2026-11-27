import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.nerds_restoring_harmony_a_sticky_situation,
  monsters: {
    goon: {
      name: 'Goon',
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 12,
        armor: 'leather armor',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 12, con: 10, int: 10, wis: 11, cha: 10 },
        abilities: [
          {
            key: 'goon-grit',
            name: 'Goon Grit',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The goon has advantage on saving throws against being ',
              rules.charmed,
              ', intimidated, or persuaded.',
            ],
            effects: [],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

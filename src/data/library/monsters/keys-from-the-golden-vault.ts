import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.keys_from_the_golden_vault,
  monsters: {
    conservatory_student: {
      name: 'Conservatory Student',
      alignment: 'any alignment',
      languages: ['any two languages'],
      habitats: ['urban'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 11,
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 12, con: 11, int: 12, wis: 14, cha: 16 },
        skills: { performance: 'expert' },
        abilities: [],
      },
    },
  },
})

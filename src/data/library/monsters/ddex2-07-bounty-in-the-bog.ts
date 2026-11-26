import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex2_07_bounty_in_the_bog,
  monsters: {
    bandit_mage: {
      name: 'Bandit Mage',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 9, dex: 14, con: 11, int: 17, wis: 12, cha: 11 },
        abilities: [],
      },
    },
    gray_ooze: {
      name: 'Gray Ooze',
      stats: {
        size: 'medium',
        type: 'ooze',
        cr: '1/2',
        ac: 8,
        hitDice: '3d8',
        speed: { walk: 10, climb: 10 },
        scores: { str: 12, dex: 6, con: 16, int: 1, wis: 6, cha: 2 },
        abilities: [],
      },
    },
  },
})

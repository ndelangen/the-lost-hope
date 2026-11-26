import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_04_dues_for_the_dead,
  monsters: {
    rorreth_red_wizard: {
      name: 'Rorreth (Red Wizard)',
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
  },
})

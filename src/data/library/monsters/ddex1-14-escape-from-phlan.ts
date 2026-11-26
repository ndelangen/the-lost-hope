import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_14_escape_from_phlan,
  monsters: {
    vine_blight: {
      name: 'Vine Blight',
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/2',
        ac: 12,
        hitDice: '4d8',
        speed: { walk: 10 },
        scores: { str: 15, dex: 8, con: 14, int: 5, wis: 10, cha: 3 },
        abilities: [],
      },
    },
    will_o_wisp: {
      name: "Will-o'-Wisp",
      stats: {
        size: 'tiny',
        type: 'undead',
        cr: '2',
        ac: 19,
        hitDice: '9d4',
        speed: { walk: 0, fly: 50 },
        scores: { str: 1, dex: 28, con: 10, int: 13, wis: 14, cha: 11 },
        abilities: [],
      },
    },
  },
})

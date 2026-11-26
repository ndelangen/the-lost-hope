import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  monsters: {
    rabbithead: {
      name: 'Rabbithead',
      alignment: 'unaligned',
      habitats: ['arctic', 'desert', 'coastal', 'grassland', 'hill', 'urban', 'forest'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '0',
        ac: 10,
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        abilities: [],
      },
    },
  },
})

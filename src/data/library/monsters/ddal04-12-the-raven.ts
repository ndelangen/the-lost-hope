import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_12_the_raven,
  monsters: {
    orc_blood_shaman_orc_war_chief: {
      name: 'Orc Blood Shaman (Orc War Chief)',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '4',
        ac: 18,
        hitDice: '11d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 12, con: 18, int: 11, wis: 13, cha: 16 },
        abilities: [],
      },
    },
    wereboar: {
      name: 'Wereboar',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '4',
        ac: 10,
        hitDice: '12d8',
        speed: { walk: 40 },
        scores: { str: 17, dex: 10, con: 15, int: 10, wis: 11, cha: 8 },
        abilities: [],
      },
    },
  },
})

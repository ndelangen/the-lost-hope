import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_07_the_innocent,
  monsters: {
    bone_naga: {
      name: 'Bone Naga',
      stats: {
        size: 'large',
        type: 'undead',
        cr: '4',
        ac: 15,
        hitDice: '9d10',
        speed: { walk: 30 },
        scores: { str: 15, dex: 16, con: 12, int: 15, wis: 15, cha: 16 },
        abilities: [],
      },
    },
    regold_veteran: {
      name: 'Regold (Veteran)',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 11,
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
        abilities: [],
      },
    },
    yuan_ti_malison: {
      name: 'Yuan-ti Malison',
      stats: {
        size: 'medium',
        type: 'monstrosity',
        cr: '3',
        ac: 12,
        hitDice: '12d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 14, con: 13, int: 14, wis: 12, cha: 16 },
        abilities: [],
      },
    },
  },
})

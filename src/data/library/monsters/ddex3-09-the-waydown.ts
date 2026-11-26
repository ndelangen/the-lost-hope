import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_09_the_waydown,
  monsters: {
    red_plume_soldier_thug: {
      name: 'Red Plume Soldier (Thug)',
      tags: ['any race'],
      alignment: 'any non-good alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 15,
        armor: 'chain shirt, shield',
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 11, con: 14, int: 10, wis: 10, cha: 11 },
        skills: { intimidation: 'proficient' },
        abilities: [
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The thug has advantage on an attack roll against a creature if at least one of the thug’s allies is within 5 feet of the creature and the ally isn’t ',
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The thug makes two melee attacks.'],
          },
          {
            key: 'mace',
            name: 'Mace',
            timing: 'action',
            icon: 'gi/GiFlangedMace',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'heavy-crossbow',
            name: 'Heavy Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [100, 400],
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

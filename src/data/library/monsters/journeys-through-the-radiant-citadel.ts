import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.journeys_through_the_radiant_citadel,
  monsters: {
    rooster: {
      name: 'Rooster',
      page: 206,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Grasslands', 'Shelter'],
      appearance: [
        ['A domestic rooster with a red comb and wattles, curved back feathers, and clawed feet.'],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 10 },
        scores: { str: 5, dex: 16, con: 8, int: 2, wis: 14, cha: 6 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-sight',
            name: 'Keen Sight',
            timing: 'trait',
            icon: 'lucide/Eye',
            text: ['The rooster has advantage on sight-based Wisdom (Perception) checks.'],
          },
          {
            key: 'talons',
            name: 'Talons',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1', type: rules.slashing }],
            },
          },
        ],
      },
    },
  },
})

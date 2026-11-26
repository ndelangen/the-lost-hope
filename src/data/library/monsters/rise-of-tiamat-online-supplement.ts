import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.rise_of_tiamat_online_supplement,
  monsters: {
    warhorse: {
      name: 'Warhorse',
      page: 26,
      alignment: 'unaligned',
      habitats: ['Grassland', 'Cavalry stables'],
      appearance: [['A bay horse with a dark mane, tail, and lower legs.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 11,
        hitDice: '3d10',
        speed: { walk: 60 },
        scores: { str: 18, dex: 12, con: 13, int: 2, wis: 12, cha: 7 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'If the horse moves at least 20 ft. straight toward a creature and hits it with ',
              { ability: 'hooves' },
              ' on the same turn, the target must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the horse can make another ',
              { ability: 'hooves' },
              ' attack against it as a bonus action.',
            ],
          },
          {
            key: 'hooves',
            name: 'Hooves',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              printedBonus: 4,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

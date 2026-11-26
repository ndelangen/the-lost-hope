import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.the_lost_hope_dm_library,
  monsters: {
    gutter_ray: {
      name: 'Gutter ray',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '0',
        ac: 12,
        hitDice: '2d6',
        speed: { swim: 30, walk: 0 },
        scores: { str: 8, dex: 14, con: 10, int: 2, wis: 13, cha: 3 },
        abilities: [
          {
            key: 'drain-feeder',
            name: 'Drain Feeder',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'In moving water, the gutter ray follows the strongest runoff it can reach. Clearing a blocked outlet sends it toward the renewed current on its next turn.',
            ],
          },
          {
            key: 'tail-sweep',
            name: 'Tail Sweep',
            timing: 'action',
            icon: 'gi/GiWhiplash',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    handrail_crawler: {
      name: 'Handrail crawler',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '2d6',
        speed: { walk: 15, climb: 20 },
        scores: { str: 8, dex: 10, con: 12, int: 2, wis: 12, cha: 4 },
        abilities: [
          {
            key: 'paint-grazer',
            name: 'Paint Grazer',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'During one quiet minute on a railing, the crawler can strip a handspan of its outermost paint layer. An exposed trail runs from the wider end of its rasp marks to the narrower end. Placing mineral paste along a route guides it there.',
            ],
          },
          {
            key: 'shell-bump',
            name: 'Shell Bump',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

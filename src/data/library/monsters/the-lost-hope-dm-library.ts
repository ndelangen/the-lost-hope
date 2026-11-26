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
    porch_sentinel: {
      name: 'Porch sentinel',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '3d6',
        speed: { walk: 25, burrow: 10 },
        scores: { str: 12, dex: 12, con: 12, int: 3, wis: 14, cha: 5 },
        abilities: [
          {
            key: 'warning-knock',
            name: 'Warning Knock',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'When someone steps directly over its nest, the sentinel knocks once from below. It gives a creature that moves off the boards before its next turn room to leave.',
            ],
          },
          {
            key: 'board-heave',
            name: 'Board Heave',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            intent: 'damage',
            save: {
              ability: 'dex',
              dc: 'dex',
              target: { creatures: 1, range: 5, which: 'standing on loose boards' },
              onFail: {
                damage: [{ dice: '1d6', type: rules.bludgeoning }],
                also: ['The creature falls ', rules.prone, '.'],
              },
            },
            text: ['Targets a creature standing on loose boards within 5 feet of the sentinel.'],
            uses: 1,
            recharge: 'Recharge 5–6',
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    rivetback_eel: {
      name: 'Rivetback eel',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '1/8',
        ac: 13,
        hitDice: '3d6',
        speed: { swim: 30, walk: 0 },
        scores: { str: 8, dex: 14, con: 11, int: 2, wis: 12, cha: 4 },
        abilities: [
          {
            key: 'vibration-sense',
            name: 'Vibration Sense',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While touching water or metal, the eel knows which moving mechanism within 30 feet is nearest. It approaches that sound if it can reach it safely.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'wedge',
            name: 'Wedge',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'While adjacent to a moving mechanism within its space, the eel wedges its head in it and stops it. Turning a loose gear within 10 feet draws the eel out at the start of its next turn. A creature can also extract it as an action with a successful DC 11 Strength (Athletics) check.',
            ],
          },
        ],
      },
    },
    sill_moth_colony: {
      name: 'Sill-moth colony',
      alignment: 'unaligned',
      languages: [],
      stats: {
        swarmOf: 'tiny',
        size: 'medium',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '4d8',
        speed: { walk: 5, fly: 25 },
        scores: { str: 4, dex: 14, con: 9, int: 1, wis: 10, cha: 3 },
        abilities: [
          {
            key: 'door-nest',
            name: 'Door Nest',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The colony starts calm when its nest is undisturbed. Warming the opposite side of its door or frame for one minute lets a creature lift the nest without scattering the moths.',
            ],
          },
          {
            key: 'scatter',
            name: 'Scatter',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The moths fly up to 15 feet as a group. Until the start of their next turn, nearby fluttering wings make the area within 5 feet of their new space lightly obscured.',
            ],
            uses: 1,
            recharge: 'Recharge 5–6',
          },
          {
            key: 'buffeting-wings',
            name: 'Buffeting Wings',
            timing: 'action',
            icon: 'gi/GiBatWing',
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
    spooltail_tern: {
      name: 'Spooltail tern',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '2d4',
        speed: { walk: 10, fly: 45 },
        scores: { str: 3, dex: 16, con: 10, int: 2, wis: 14, cha: 5 },
        abilities: [
          {
            key: 'fiber-collector',
            name: 'Fiber Collector',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The tern spends its first turn tugging a length of loose fiber it can see within 30 feet. Loose cord offered nearer than its current prize draws it away, and it drops anything it cannot carry alongside the cord.',
            ],
          },
          {
            key: 'peck',
            name: 'Peck',
            timing: 'action',
            icon: 'gi/GiRaven',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '4', type: rules.piercing }],
            },
          },
        ],
      },
    },
  },
})

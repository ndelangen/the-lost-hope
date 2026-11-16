import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Crowy',
  avatar: '/assets/npcs/crowy-portrait.png',
  species: 'Talking crow',
  languages: ['Common'],
  notes: [
    [
      'A talking crow sent indirectly by ',
      refs.npcs.light_13th_marshal,
      ' through ',
      refs.npcs.borris,
      '. The party unanimously chose the name Crowy.',
    ],
    [
      'Crowy can communicate directly with Light. Its contract requires the party to provide basic care; it can produce the paperwork by vomiting it out.',
    ],
    [
      'Crowy directly asked ',
      refs.npcs.light_13th_marshal,
      ' to become the “Bird of Gluttony,” and Light granted the request. The exact powers, duration, and limits of the granted form remain unknown. The party assumes Crowy can no longer sleep, but this has not been confirmed.',
    ],
  ],
  stats: {
    size: 'tiny',
    type: 'beast',
    cr: '1/4',
    ac: 12,
    hitDice: '2d4',
    speed: {
      walk: 10,
      fly: 50,
    },
    scores: {
      str: 2,
      dex: 14,
      con: 12,
      int: 8,
      wis: 13,
      cha: 10,
    },
    skills: {
      perception: 'expert',
      stealth: 'proficient',
    },
    abilities: [
      {
        key: 'mimicry',
        name: 'Mimicry',
        timing: 'trait',
        icon: 'gi/GiRaven',
        text: ['Speaks Common and mimics sounds it has heard.'],
      },
      {
        key: 'bird-of-gluttony',
        name: 'Bird of Gluttony',
        timing: 'trait',
        icon: 'gi/GiRaven',
        text: [
          'Granted by Light: never sleeps and can swallow any object up to its own size, storing it unharmed. Its exact limits are unknown.',
        ],
      },
      {
        key: 'direct-line',
        name: 'Direct Line',
        timing: 'trait',
        icon: 'lucide/Link',
        text: ['Can speak to Light, the 13th Marshal, at will.'],
      },
      {
        key: 'beak',
        name: 'Beak',
        timing: 'action',
        icon: 'gi/GiRaven',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d4',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_raven'],
      changes:
        'A raven touched by Light: hardier, speaks freely, and keeps a direct line to the 13th Marshal.',
    },
  },
})

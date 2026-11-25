import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Goblin Grass-Keepers',
  avatar: '/assets/npcs/goblin-grass-keepers-portrait.png',
  location: refs.locations.fajanet,
  species: 'Goblin',
  notes: [
    [
      'A group of friendly goblins in ',
      refs.locations.fajanet,
      ' who keep a patch of grass in absolutely perfect condition. Friendly to the city and to strangers, but fiercely protective of their turf. The location of their turf and whether they have a leader are unestablished.',
    ],
  ],
  background: [
    [
      'They are the Dust collectors of ',
      refs.locations.fajanet,
      '. In the morning the shadow condenses on their grass, and they gather the Dust it leaves.',
    ],
  ],
  stats: {
    size: 'small',
    type: 'fey',
    cr: '1/4',
    ac: 15,
    armor: 'leather armor, shield',
    hitDice: '3d6',
    speed: {
      walk: 30,
    },
    scores: {
      str: 8,
      dex: 15,
      con: 10,
      int: 10,
      wis: 8,
      cha: 8,
    },
    skills: {
      stealth: 'expert',
      nature: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'our-turf',
        name: 'Our Turf',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: [
          refs.rules.advantage,
          ' on attack rolls against a creature standing on their grass.',
        ],
      },
      {
        key: 'nimble-escape',
        name: 'Nimble Escape',
        timing: 'trait',
        icon: 'gi/GiSmokeBomb',
        text: [
          'Takes the ',
          refs.rules.disengage,
          ' or ',
          refs.rules.hide,
          ' action as a ',
          refs.rules.bonus_action,
          '.',
        ],
      },
      {
        key: 'shears',
        name: 'Garden Shears',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'sling',
        name: 'Sling',
        timing: 'action',
        icon: 'gi/GiSlingshot',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [30, 120],
          damage: [
            {
              dice: '1d4',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_goblin-warrior'],
      changes:
        'Goblin warriors with garden shears and slings, deadly on their own turf. One stat block per goblin.',
    },
  },
})

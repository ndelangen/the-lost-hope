import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bernard',
  location: refs.locations.verdant_haven,
  species: 'Talking goat',
  stats: {
    size: 'Medium',
    type: 'beast',
    cr: '0',
    ac: 10,
    hitDice: '1d8',
    speed: {
      walk: 40,
    },
    scores: {
      str: 12,
      dex: 10,
      con: 11,
      int: 6,
      wis: 10,
      cha: 8,
    },
    abilities: [
      {
        key: 'talking-goat',
        name: 'Talking Goat',
        timing: 'trait',
        icon: 'gi/GiGoat',
        text: ['Speaks Common.'],
      },
      {
        key: 'sure-footed',
        name: 'Sure-Footed',
        timing: 'trait',
        icon: 'lucide/Footprints',
        text: [
          'Advantage on saves against being knocked ',
          {
            condition: 'prone',
          },
          '.',
        ],
      },
      {
        key: 'ram',
        name: 'Ram',
        timing: 'action',
        icon: 'gi/GiGoat',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d4',
              type: 'bludgeoning',
              addModifier: true,
            },
          ],
        },
        text: [
          'If Bernard moved at least 20 ft. straight toward the target first, it takes an extra 1d4 bludgeoning damage.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_goat'],
      changes: 'A talking Medium goat; the SRD goat is Small and mute.',
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Displacer Beast',
  avatar: '/assets/npcs/displacer-beast.png',
  location: refs.locations.fajanet,
  species: 'Displacer Beast (Monstrosity)',
  notes: [
    [
      'A displacer beast — one of the three animals missing from the ',
      refs.npcs.rare_animal_dealer,
      '. D&D Beyond monster listing: https://www.dndbeyond.com/monsters?filter-search=displacer-beast (Monster Manual, p. 81; a Feywild-origin monstrosity that displaces light to appear offset from its true position). D&D Beyond monster pages use unstable numeric IDs, so this filter URL is the closest thing to a stable permalink.',
    ],
  ],
  stats: {
    size: 'Large',
    type: 'monstrosity',
    cr: '3',
    ac: 13,
    armor: 'natural armor',
    hitDice: '10d10',
    speed: {
      walk: 40,
    },
    scores: {
      str: 18,
      dex: 15,
      con: 16,
      int: 6,
      wis: 12,
      cha: 8,
    },
    skills: {
      stealth: 'expert',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'displacement',
        name: 'Light-Bending Hide',
        timing: 'trait',
        icon: 'gi/GiMirrorMirror',
        text: [
          'Attack rolls against it have disadvantage until it is hit; the effect returns at the start of its next turn.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'tentacle',
          },
          ' attacks.',
        ],
      },
      {
        key: 'tentacle',
        name: 'Barbed Tentacle',
        timing: 'action',
        icon: 'gi/GiTentacleStrike',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [
            {
              dice: '1d6',
              type: 'bludgeoning',
              addModifier: true,
            },
            {
              dice: '1d6',
              type: 'piercing',
            },
          ],
        },
      },
      {
        key: 'pounce',
        name: 'Pounce',
        timing: 'bonus action',
        icon: 'gi/GiPaw',
        text: [
          'Moves up to ',
          {
            speed: 'walk',
            times: 0.5,
          },
          ' without provoking an ',
          {
            action: 'opportunity attack',
          },
          '.',
        ],
      },
    ],
    source: {
      adaptedFrom: [],
      changes:
        'Homebrew: the displacer beast is not in the SRD, so this is an original build of a six-legged, tentacled cat whose hide bends light, using SRD panther mobility.',
    },
  },
})

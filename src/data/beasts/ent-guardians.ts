import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Ent Guardians',
  avatar: '/assets/beasts/ent-guardians-portrait.png',
  location: refs.locations.verdant_haven_forest,
  species: 'Walking tree-like creatures',
  notes: [['Guardians that roam the forest around ', refs.locations.verdant_haven, ' at night.']],
  stats: {
    size: 'huge',
    type: 'plant',
    cr: '2',
    ac: 13,
    armor: 'natural armor',
    hitDice: '7d12',
    speed: {
      walk: 20,
    },
    scores: {
      str: 19,
      dex: 6,
      con: 15,
      int: 10,
      wis: 10,
      cha: 7,
    },
    damageVulnerabilities: [refs.rules.fire],
    damageResistances: [refs.rules.bludgeoning, refs.rules.piercing],
    abilities: [
      {
        key: 'false-appearance',
        name: 'False Appearance',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: ['While motionless, it is indistinguishable from an ordinary tree.'],
      },
      {
        key: 'forest-ward',
        name: 'Forest Ward',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: [
          'At night in its forest, it can’t be surprised and knows where every creature on the ground within 60 ft. is.',
        ],
      },
      {
        key: 'slam',
        name: 'Slam',
        timing: 'action',
        icon: 'gi/GiTreeBranch',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [
            {
              dice: '3d6',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'entangle',
        name: 'Grasping Roots',
        timing: 'action',
        icon: 'gi/GiTreeBranch',
        save: {
          ability: 'str',
          dc: 'str',
          target: { creatures: 1, range: 10 },
          onFail: {
            conditions: [refs.rules.restrained],
            also: ['It lasts until the end of its next turn.'],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_awakened-tree'],
      changes:
        'Night guardians of the forest: awakened trees with root grabs and a watchful ward. One stat block per guardian.',
    },
  },
})

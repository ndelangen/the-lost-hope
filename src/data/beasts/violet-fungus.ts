import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Violet Fungus',
  location: refs.locations.thornwall_maze,
  species: 'Violet fungus',
  notes: [['A purple mushroom that lashes out with rotting tendrils.']],
  background: [
    [
      'In the ',
      refs.locations.thornwall_maze,
      ' they cluster in the wrecks, and a few grow on the back of ',
      refs.beasts.the_mossback,
      '.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'plant',
    cr: '1/4',
    ac: 5,
    hitDice: '4d8',
    speed: { walk: 5 },
    scores: { str: 3, dex: 1, con: 10, int: 1, wis: 3, cha: 1 },
    senses: { blindsight: 30 },
    conditionImmunities: [
      refs.rules.blinded,
      refs.rules.charmed,
      refs.rules.deafened,
      refs.rules.frightened,
    ],
    abilities: [
      {
        key: 'false-appearance',
        name: 'False Appearance',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: ['While it does not move, it looks like an ordinary mushroom.'],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['Two ', { ability: 'rotting-touch' }, ' attacks.'],
      },
      {
        key: 'rotting-touch',
        name: 'Rotting Touch',
        timing: 'action',
        icon: 'gi/GiDeathSkull',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'con',
          reach: 10,
          damage: [{ dice: '1d8', type: refs.rules.necrotic }],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_violet-fungus'],
      changes: 'The attack is built on Constitution so the derived to-hit matches the SRD block.',
    },
  },
})

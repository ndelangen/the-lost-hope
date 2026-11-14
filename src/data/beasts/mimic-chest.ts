import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Mimic Chest',
  location: refs.locations.the_flying_whale,
  species: 'Mimic',
  notes: [['A chest-shaped mimic used by ', refs.npcs.bob_the_merchant, ' at his stall.']],
  stats: {
    size: 'medium',
    type: 'monstrosity',
    cr: '2',
    ac: 12,
    armor: 'natural armor',
    hitDice: '9d8',
    speed: { walk: 20 },
    scores: { str: 17, dex: 12, con: 15, int: 5, wis: 13, cha: 8 },
    skills: { stealth: 'expert' },
    senses: { darkvision: 60 },
    damageImmunities: [refs.rules.acid],
    conditionImmunities: [refs.rules.prone],
    abilities: [
      {
        key: 'adhesive',
        name: 'Adhesive (Object Form Only)',
        timing: 'trait',
        icon: 'lucide/Link',
        text: [
          'Anything that touches the mimic sticks to it. A Huge or smaller creature stuck to it has the ',
          refs.rules.grappled,
          ' condition (escape ',
          { dc: 'str' },
          '), and ability checks to escape have ',
          refs.rules.disadvantage,
          '.',
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
          ability: 'str',
          damage: [
            { dice: '1d8', type: refs.rules.piercing, addModifier: true },
            { dice: '1d8', type: refs.rules.acid },
          ],
        },
        text: [refs.rules.advantage, ' against a creature it has ', refs.rules.grappled, '.'],
      },
      {
        key: 'pseudopod',
        name: 'Pseudopod',
        timing: 'action',
        icon: 'lucide/Target',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            { dice: '1d8', type: refs.rules.bludgeoning, addModifier: true },
            { dice: '1d8', type: refs.rules.acid },
          ],
        },
        text: [
          'A Large or smaller target has the ',
          refs.rules.grappled,
          ' condition (escape ',
          { dc: 'str' },
          '), with ',
          refs.rules.disadvantage,
          ' on checks to escape.',
        ],
      },
      {
        key: 'shape-shift',
        name: 'Shape-Shift',
        timing: 'bonus action',
        icon: 'lucide/Box',
        text: ['Becomes a Medium or Small object, or returns to its true form.'],
      },
    ],
    source: { adaptedFrom: ['srd-2024_mimic'] },
  },
})

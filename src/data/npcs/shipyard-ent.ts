import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Shipyard Ent',
  species: 'Ent',
  notes: [
    [
      'One of the ents who work the shipyard on ',
      refs.locations.skynet,
      ', standing shoulder to shoulder across the gate.',
    ],
  ],
  motivations: [
    [
      'Keep the yard and its unfinished hulls safe until ',
      refs.npcs.esia,
      ' says otherwise. Paying customers pass. Everyone else is pushed back, gently at first.',
    ],
  ],
  stats: {
    size: 'huge',
    type: 'plant',
    cr: '2',
    ac: 13,
    armor: 'bark',
    hitDice: '7d12',
    speed: { walk: 20 },
    scores: { str: 19, dex: 6, con: 15, int: 10, wis: 10, cha: 7 },
    damageVulnerabilities: [refs.rules.fire],
    damageResistances: [refs.rules.bludgeoning, refs.rules.piercing],
    abilities: [
      {
        key: 'bar-the-way',
        name: 'Bar the Way',
        timing: 'action',
        icon: 'gi/GiStomp',
        text: ['Sweeps a creature back with a limb without hurting it.'],
        save: {
          ability: 'str',
          dc: 'str',
          target: { creatures: 1, range: 10, which: 'that is Large or smaller' },
          onFail: {
            conditions: [refs.rules.prone],
            also: ['It is pushed 10 ft. away before it falls.'],
          },
        },
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
          damage: [{ dice: '3d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_awakened-tree'],
      changes: 'A living tree that works and guards: it shoves people back before it strikes.',
    },
  },
})

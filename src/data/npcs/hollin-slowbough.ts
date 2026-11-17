import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Hollin Slowbough',
  location: refs.locations.skynet_airship_shipyard,
  species: 'Ent',
  notes: [
    [
      'An old holly ent who works the gate of the ',
      refs.locations.skynet_airship_shipyard,
      '. Dark glossy leaves and clusters of red berries crown him, and his bark is worn smooth where the workers lean on him between shifts.',
    ],
    [
      'He speaks very slowly and repeats a name back before he answers, so he will remember it: “Jim… Jim. Yes. Hm.”',
    ],
  ],
  motivations: [
    [
      'To be chosen for a final voyage when he dies, so that his body becomes a ship and he finally sees the world. Until then he keeps the yard safe for ',
      refs.npcs.esia,
      ', and he likes anyone who asks him where ships go.',
    ],
  ],
  stats: {
    size: 'huge',
    type: 'plant',
    cr: '3',
    ac: 14,
    armor: 'old bark',
    hitDice: '9d12',
    speed: { walk: 20 },
    scores: { str: 20, dex: 6, con: 16, int: 11, wis: 14, cha: 9 },
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
      {
        key: 'holly-thicket',
        name: 'Holly Thicket',
        timing: 'action',
        icon: 'gi/GiTreeBranch',
        text: ['He spreads his spiny lower boughs to wall off the gate.'],
        save: {
          ability: 'dex',
          dc: 'str',
          target: { area: { shape: refs.rules.cube, size: 15 }, range: 10 },
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
        'An elder of the shipyard ents: tougher and wiser than the others, with a spiny holly thicket to block the gate.',
    },
  },
})

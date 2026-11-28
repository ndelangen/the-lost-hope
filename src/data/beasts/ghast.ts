import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Ghast',
  location: refs.locations.the_old_battlefield,
  species: 'Ghast',
  notes: [['A ghoul grown stronger and fouler, wrapped in a stench that turns the stomach.']],
  background: [
    [
      'The captain of the crashed battleship whose crew became ghouls. Still in his rotted uniform, still giving orders.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'undead',
    cr: '2',
    ac: 13,
    hitDice: '8d8',
    speed: { walk: 30 },
    scores: { str: 16, dex: 17, con: 10, int: 11, wis: 10, cha: 8 },
    senses: { darkvision: 60 },
    damageResistances: [refs.rules.necrotic],
    damageImmunities: [refs.rules.poison],
    conditionImmunities: [refs.rules.charmed, refs.rules.poisoned],
    abilities: [
      {
        key: 'stench',
        name: 'Stench',
        timing: 'trait',
        icon: 'gi/GiPoisonBottle',
        save: {
          ability: 'con',
          dc: 'con',
          target: { area: { shape: refs.rules.emanation, size: 5 } },
          onFail: {
            conditions: [refs.rules.poisoned],
            also: [
              'A creature saves when it starts its turn there. The poison lasts until the start of its next turn; on a success it is immune to this stench for 24 hours.',
            ],
          },
          onSuccess: 'none',
        },
      },
      {
        key: 'turn-defiance',
        name: 'Turn Defiance',
        timing: 'trait',
        icon: 'gi/GiHolySymbol',
        text: [
          'It and any ghouls within 30 ft. of it have ',
          refs.rules.advantage,
          ' on saves against effects that turn undead.',
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
          damage: [{ dice: '2d8', type: refs.rules.piercing, addModifier: true }],
        },
      },
      {
        key: 'claws',
        name: 'Claws',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [{ dice: '2d6', type: refs.rules.slashing, addModifier: true }],
        },
        save: {
          ability: 'con',
          dc: 'con',
          target: { creatures: 1, range: 5 },
          onFail: {
            conditions: [refs.rules.paralyzed],
            also: [
              'Only a creature hit by the claws that is not undead. It lasts 1 minute; the target repeats the save at the end of each of its turns.',
            ],
          },
          onSuccess: 'none',
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_ghast'],
      changes: 'Numbers as in the 2014 SRD. Also immune to exhaustion.',
    },
  },
})

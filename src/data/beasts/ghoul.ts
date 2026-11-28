import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Ghoul',
  location: refs.locations.the_old_battlefield,
  species: 'Ghoul',
  notes: [['A grey, starved-looking corpse that hunts the living and eats them.']],
  background: [
    [
      'The crew of a battleship that crashed on ',
      refs.locations.the_old_battlefield,
      ' never left it. They rose as ghouls in the dark of its hold.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'undead',
    cr: '1',
    ac: 12,
    hitDice: '5d8',
    speed: { walk: 30 },
    scores: { str: 13, dex: 15, con: 10, int: 7, wis: 10, cha: 6 },
    senses: { darkvision: 60 },
    damageImmunities: [refs.rules.poison],
    conditionImmunities: [refs.rules.charmed, refs.rules.poisoned],
    abilities: [
      {
        key: 'bite',
        name: 'Bite',
        timing: 'action',
        icon: 'gi/GiFangs',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '2d6', type: refs.rules.piercing, addModifier: true }],
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
          damage: [{ dice: '2d4', type: refs.rules.slashing, addModifier: true }],
        },
        save: {
          ability: 'con',
          dc: 'con',
          target: { creatures: 1, range: 5 },
          onFail: {
            conditions: [refs.rules.paralyzed],
            also: [
              'Only a creature hit by the claws that is neither an elf nor undead. It lasts 1 minute; the target repeats the save at the end of each of its turns.',
            ],
          },
          onSuccess: 'none',
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_ghoul'],
      changes: 'Numbers as in the 2014 SRD. Also immune to exhaustion.',
    },
  },
})

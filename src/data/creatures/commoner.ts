import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Commoner',
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '0',
    ac: 10,
    hitDice: '1d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    abilities: [
      {
        key: 'club',
        name: 'Club',
        timing: 'action',
        icon: 'gi/GiSpikedBat',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d4',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'stone',
        name: 'Thrown Stone',
        timing: 'action',
        icon: 'gi/GiSlingshot',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [20, 60],
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
      adaptedFrom: ['srd-2024_commoner'],
      changes:
        'Club and a thrown stone; the SRD dagger and sling become what an ordinary townsperson grabs.',
    },
  },
})

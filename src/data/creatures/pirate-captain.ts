import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Pirate Captain',
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '6',
    ac: 17,
    armor: 'studded leather',
    hitDice: '15d8',
    speed: {
      walk: 30,
      swim: 30,
    },
    scores: {
      str: 10,
      dex: 18,
      con: 16,
      int: 14,
      wis: 14,
      cha: 17,
    },
    saves: {
      dex: 'proficient',
      wis: 'proficient',
    },
    skills: {
      acrobatics: 'proficient',
      athletics: 'proficient',
      intimidation: 'proficient',
      perception: 'proficient',
    },
    abilities: [
      {
        key: 'sea-legs',
        name: 'Sea Legs',
        timing: 'trait',
        icon: 'gi/GiWaterSplash',
        text: [
          'Never loses footing on a moving deck and has advantage on saves against being knocked ',
          refs.rules.prone,
          '.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Three ',
          {
            ability: 'rapier',
          },
          ' attacks, or two ',
          {
            ability: 'pistol',
          },
          ' shots.',
        ],
      },
      {
        key: 'rapier',
        name: 'Rapier',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d8',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'pistol',
        name: 'Pistol',
        timing: 'action',
        icon: 'gi/GiSaberAndPistol',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [30, 90],
          damage: [
            {
              dice: '1d10',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'captains-orders',
        name: 'Captain’s Orders',
        timing: 'bonus action',
        icon: 'gi/GiSonicShout',
        intent: 'support',
        text: ['One ally within 30 ft. that can hear it may use its reaction to make one attack.'],
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'Adds 3 to its AC against one melee attack that would hit it, while holding a weapon.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_pirate-captain'],
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Borris',
  avatar: '/assets/npcs/borris-portrait.png',
  location: refs.locations.borris_s_gambling_den,
  species: 'unknown',
  notes: [['A recurring crime boss and friend of ', refs.pcs.devan, '.']],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '4',
    ac: 16,
    armor: 'chain shirt',
    hitDice: '14d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 17,
      dex: 14,
      con: 16,
      int: 11,
      wis: 10,
      cha: 14,
    },
    saves: {
      str: 'proficient',
      con: 'proficient',
    },
    skills: {
      intimidation: 'proficient',
      insight: 'proficient',
    },
    abilities: [
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          refs.rules.advantage,
          ' on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          refs.rules.incapacitated,
          '.',
        ],
        effects: [],
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
            ability: 'warhammer',
          },
          ' attacks.',
        ],
      },
      {
        key: 'warhammer',
        name: 'Warhammer',
        timing: 'action',
        icon: 'gi/GiWarhammer',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d10',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
        text: ['If the target is Medium or smaller, Borris pushes it up to 10 ft. away.'],
      },
      {
        key: 'heavy-crossbow',
        name: 'Heavy Crossbow',
        timing: 'action',
        icon: 'gi/GiCrossbow',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [100, 400],
          damage: [
            {
              dice: '2d10',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'call-in-a-favour',
        name: 'Call In a Favour',
        timing: 'bonus action',
        icon: 'gi/GiTwoCoins',
        text: [
          'One ally within 30 ft. that can hear him moves up to its speed without provoking an ',
          refs.rules.opportunity_attack,
          '.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_tough-boss'],
      changes: 'A crime boss with friends everywhere: the warhammer shove and the favour are new.',
    },
  },
})

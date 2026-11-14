import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylvia’s Brother',
  notes: [['The as-yet unidentified brother of ', refs.npcs.sylvia, '.']],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1',
    ac: 14,
    armor: 'leather armor',
    hitDice: '6d8',
    speed: {
      walk: 30,
      swim: 30,
    },
    scores: {
      str: 12,
      dex: 16,
      con: 12,
      int: 10,
      wis: 11,
      cha: 13,
    },
    skills: {
      acrobatics: 'proficient',
      athletics: 'proficient',
    },
    abilities: [
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'cutlass',
          },
          ' attacks.',
        ],
      },
      {
        key: 'cutlass',
        name: 'Cutlass',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.slashing,
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
    ],
    source: {
      adaptedFrom: ['srd-2024_pirate'],
      changes: 'An SRD pirate from an established pirate family.',
    },
  },
})

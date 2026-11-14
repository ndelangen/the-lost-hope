import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Verdant Haven Rangers',
  location: refs.locations.verdant_haven,
  species: 'Wood elves',
  notes: [
    [
      'A nature-aligned community of rangers with a comfortable, well-established settlement; the party described them colloquially as rednecks.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '1/2',
    ac: 13,
    armor: 'leather armor',
    hitDice: '4d8',
    speed: {
      walk: 35,
    },
    scores: {
      str: 11,
      dex: 14,
      con: 12,
      int: 11,
      wis: 13,
      cha: 11,
    },
    skills: {
      nature: 'proficient',
      perception: 'expert',
      stealth: 'proficient',
      survival: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'mask-of-the-wild',
        name: 'Mask of the Wild',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: [
          'Can take the ',
          {
            action: 'hide',
          },
          ' action when only lightly obscured by foliage, rain, or mist.',
        ],
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
            ability: 'longbow',
          },
          ' or ',
          {
            ability: 'shortsword',
          },
          ' attacks.',
        ],
      },
      {
        key: 'shortsword',
        name: 'Shortsword',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: 'piercing',
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'longbow',
        name: 'Longbow',
        timing: 'action',
        icon: 'gi/GiCrossbow',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [150, 600],
          damage: [
            {
              dice: '1d8',
              type: 'piercing',
              addModifier: true,
            },
          ],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_scout'],
      changes:
        'Wood-elf rangers: SRD scouts with elven speed and stealth. One stat block per ranger.',
    },
  },
})

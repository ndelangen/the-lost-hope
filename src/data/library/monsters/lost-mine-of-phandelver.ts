import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.lost_mine_of_phandelver,
  monsters: {
    gundren_rockseeker: {
      name: 'Gundren Rockseeker',
      alignment: 'any alignment',
      languages: [
        'any one language (usually Common)',
        'Dwarvish',
        'any one language (usually Common)',
        'Dwarvish',
      ],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Commoner'],
        ['Applied templates: Mountain Dwarf'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '0',
        ac: 10,
        hitDice: '1d8',
        speed: { walk: 25 },
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        senses: { darkvision: 60 },
        damageResistances: [rules.poison],
        abilities: [
          {
            key: 'dwarven-resilience',
            name: 'Dwarven Resilience',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Roll poison saves with advantage. Poison damage is resisted.'],
          },
          {
            key: 'club',
            name: 'Club',
            timing: 'action',
            icon: 'gi/GiSpikedBat',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Commoners include peasants, serfs, slaves, servants, pilgrims, merchants, artisans, and hermits.',
            ],
          },
        ],
      },
    },
    nundro_rockseeker: {
      name: 'Nundro Rockseeker',
      alignment: 'any alignment',
      languages: [
        'any one language (usually Common)',
        'Dwarvish',
        'any one language (usually Common)',
        'Dwarvish',
      ],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Commoner'],
        ['Applied templates: Mountain Dwarf'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '0',
        ac: 10,
        hitDice: '1d8',
        speed: { walk: 25 },
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        senses: { darkvision: 60 },
        damageResistances: [rules.poison],
        abilities: [
          {
            key: 'dwarven-resilience',
            name: 'Dwarven Resilience',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Roll poison saves with advantage. Poison damage is resisted.'],
          },
          {
            key: 'club',
            name: 'Club',
            timing: 'action',
            icon: 'gi/GiSpikedBat',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Commoners include peasants, serfs, slaves, servants, pilgrims, merchants, artisans, and hermits.',
            ],
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.dragonlance_shadow_of_the_dragon_queen,
  monsters: {
    cudgel_ironsmile: {
      name: 'Cudgel Ironsmile',
      alignment: 'neutral',
      languages: [
        'any one language (usually Common)',
        'Dwarvish',
        'any one language (usually Common)',
        'Dwarvish',
      ],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Veteran'],
        ['Applied templates: Hill Dwarf'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 17,
        hitDice: '9d8',
        speed: { walk: 25 },
        scores: { str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
        skills: { athletics: 'proficient', perception: 'proficient' },
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
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.',
            ],
          },
          {
            key: 'longsword',
            name: 'Longsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              twoHanded: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
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
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Veterans are professional fighters that take up arms for pay or to protect something they believe in or value. Their ranks include soldiers retired from long service and warriors who never served anyone but themselves.',
            ],
          },
        ],
      },
    },
    tatina_rookledust: {
      name: 'Tatina Rookledust',
      alignment: 'neutral good',
      languages: [
        'any one language (usually Common)',
        'Gnomish',
        'any one language (usually Common)',
        'Gnomish',
      ],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Acolyte'],
        ['Applied templates: Rock Gnome'],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '1/4',
        ac: 10,
        hitDice: '2d8',
        speed: { walk: 25 },
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 14, cha: 11 },
        skills: { medicine: 'proficient', religion: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save ',
              { dc: 'wis' },
              ', ',
              { toHit: 'wis' },
              ' to hit with spell attacks). The acolyte has following cleric spells prepared: Cantrips (at will): ',
              refs.spells.light_srd_5_1,
              ', ',
              refs.spells.sacred_flame_srd_5_1,
              ', ',
              refs.spells.thaumaturgy_srd_5_1,
              '; 1st level (3 slots): ',
              refs.spells.bless_srd_5_1,
              ', ',
              refs.spells.cure_wounds_srd_5_1,
              ', ',
              refs.spells.sanctuary_srd_5_1,
            ],
          },
          {
            key: 'gnome-cunning',
            name: 'Gnome Cunning',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Roll Intelligence, Wisdom, and Charisma saves against magic with advantage.'],
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
              'Acolytes are junior members of a clergy, usually answerable to a priest. They perform a variety of functions in a temple and are granted minor spellcasting power by their deities.',
            ],
          },
        ],
      },
    },
  },
})

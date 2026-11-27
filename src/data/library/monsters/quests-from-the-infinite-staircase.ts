import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.quests_from_the_infinite_staircase,
  monsters: {
    iaseda: {
      name: 'Iaseda',
      alignment: 'lawful good',
      languages: ['any one language (usually Common)'],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Acolyte'],
        ['Applied templates: Human'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/4',
        ac: 10,
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 14, cha: 11 },
        skills: { medicine: 'proficient', religion: 'proficient' },
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
    isabela_folcarae: {
      name: 'Isabela Folcarae',
      alignment: 'lawful good',
      languages: ['any two languages'],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Bandit Captain'],
        ['Applied templates: Human'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 15,
        hitDice: '10d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 16, con: 14, int: 14, wis: 11, cha: 14 },
        saves: { str: 'proficient', dex: 'proficient', wis: 'proficient' },
        skills: { athletics: 'proficient', deception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.',
            ],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'dagger',
            name: 'Dagger',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon. It takes a strong personality, ruthless cunning, and a silver tongue to keep a gang of bandits in line. The bandit captain has these qualities in spades. In addition to managing a crew of selfish malcontents, the pirate captain is a variation of the bandit captain, with a ship to protect and command. To keep the crew in line, the captain must mete out rewards and punishment on a regular basis. More than treasure, a bandit captain or pirate captain craves infamy. A prisoner who appeals to the captain’s vanity or ego is more likely to be treated fairly than a prisoner who does not or claims not to know anything of the captain’s colorful reputation.',
            ],
          },
        ],
      },
    },
    uma: {
      name: 'Uma',
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Knight'],
        ['Applied templates: Human'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 18,
        hitDice: '8d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 11, con: 14, int: 11, wis: 11, cha: 15 },
        saves: { con: 'proficient', wis: 'proficient' },
        abilities: [
          {
            key: 'brave',
            name: 'Brave',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The knight has advantage on saving throws against being ',
              rules.frightened,
              '.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The knight makes two melee attacks.'],
          },
          {
            key: 'greatsword',
            name: 'Greatsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.slashing, addModifier: true }],
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
          },
          {
            key: 'leadership-recharges-after-a-short-or-long-rest',
            name: 'Leadership (Recharges after a Short or Long Rest)',
            timing: 'action',
            icon: 'gi/GiBull',
            text: [
              'For 1 minute, the knight can utter a special command or warning whenever a nonhostile creature that it can see within 30 feet of it makes an attack roll or a saving throw. The creature can add a d4 to its roll provided it can hear and understand the knight. A creature can benefit from only one Leadership die at a time. This effect ends if the knight is ',
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon. Knights are warriors who pledge service to rulers, religious orders, and noble causes. A knight’s alignment determines the extent to which a pledge is honored. Whether undertaking a quest or patrolling a realm, a knight often travels with an entourage that includes squires and hirelings who are commoners.',
            ],
          },
        ],
      },
    },
  },
})

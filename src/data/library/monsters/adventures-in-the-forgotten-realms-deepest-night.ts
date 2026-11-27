import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.adventures_in_the_forgotten_realms_deepest_night,
  monsters: {
    giant_zombie_constrictor_snake: {
      name: 'Giant Zombie Constrictor Snake',
      alignment: 'neutral evil',
      languages: [],
      appearance: [['An enormous, rotting snake slithers on, a husk of what it was.']],
      lore: [
        [
          'The yuan-ti gave Medium-sized constrictors to Kyrilla as offerings to win her knowledge and power. Fed on supplicants and prisoners, they grew huge. After the yuan-ti turned on Kyrilla and killed the snakes, cursed magic in her lair got them moving again. Leaving the lair kills them.',
        ],
        ['Sources: ', 'Adventures in the Forgotten Realms: Deepest Night'],
      ],
      stats: {
        size: 'huge',
        type: 'undead',
        cr: '8',
        ac: 15,
        armor: 'natural armor',
        hitDice: '22d12',
        speed: { walk: 30, climb: 20, swim: 30 },
        scores: { str: 19, dex: 16, con: 14, int: 1, wis: 15, cha: 4 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60, blindsight: 15 },
        damageVulnerabilities: [rules.poison],
        abilities: [
          {
            key: 'sunlight-vulnerability',
            name: 'Sunlight Vulnerability',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the snake has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight. When the snake begins its turn in sunlight, it immediately suffers 10 radiant damage.',
            ],
          },
          {
            key: 'undead-fortitude',
            name: 'Undead Fortitude',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If damage reduces the snake to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the snake drops to 1 hit point instead.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The snake makes two attacks: one with its bite and one with a constrict attack.',
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
              reach: 10,
              damage: [{ dice: '3d8', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'str',
              target: { creatures: 1, range: 10, which: 'it hits' },
              onFail: {
                damage: [{ dice: '5d6', type: rules.poison }],
              },
              onSuccess: 'half',
            },
            effects: [],
          },
          {
            key: 'constrict',
            name: 'Constrict',
            timing: 'action',
            icon: 'gi/GiTentacleStrike',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'The target is ',
              { effect: 'grabbed' },
              ' and the snake cannot constrict another target.',
            ],
            effects: [
              {
                key: 'grabbed',
                name: 'Grabbed',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.restrained],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 16 } },
              },
            ],
          },
        ],
      },
    },
    hamish_hewland: {
      name: 'Hamish Hewland',
      alignment: 'neutral good',
      languages: ['Common', 'Dwarvish', 'Giant'],
      appearance: [
        [
          'Hamish is a gentle giant with brown skin, good posture and long hair in three neat braids. He carries a big axe, and his pockets bulge with snacks.',
        ],
      ],
      lore: [
        [
          "He has a fierce laugh and comes from Waterdeep, and he went into the Sword Coast wilds with his friends Sylvene and Artura, in a party that also had Waltarn Everlake, a human from Secomber. He overpacks, carrying both a dungeoneer's and an explorer's pack, and once had a wooden shield Artura made him, now rotted away. He would risk his life for his friends, and he trusts others so readily that he can be naive.",
        ],
        ['Sources: ', 'Adventures in the Forgotten Realms: Deepest Night'],
      ],
      stats: {
        size: 'huge',
        type: 'giant',
        cr: '5',
        ac: 13,
        hitDice: '10d12',
        speed: { walk: 40 },
        scores: { str: 23, dex: 11, con: 15, int: 10, wis: 14, cha: 10 },
        saves: { str: 'proficient', wis: 'proficient' },
        skills: {
          athletics: 'proficient',
          history: 'proficient',
          insight: 'proficient',
          perception: 'proficient',
        },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Hamish makes two attacks with his axe or throws two rocks.'],
          },
          {
            key: 'axe',
            name: 'Axe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d10', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'rock',
            name: 'Rock',
            timing: 'action',
            icon: 'gi/GiSlingshot',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'str',
              range: [60, 240],
              damage: [{ dice: '2d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Hamish adds 2 to his AC against one melee attack that would hit him. To do so, he must see the attacker and be wielding a melee weapon or a shield.',
            ],
          },
        ],
      },
    },
  },
})

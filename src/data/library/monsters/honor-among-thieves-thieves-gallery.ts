import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.honor_among_thieves_thieves_gallery,
  monsters: {
    forge_fitzwilliam: {
      name: 'Forge Fitzwilliam',
      alignment: 'neutral evil',
      languages: ['Common', "Thieves' cant"],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '8',
        ac: 17,
        armor: 'disarming charm',
        hitDice: '20d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 14, con: 13, int: 15, wis: 17, cha: 20 },
        saves: { dex: 'proficient', int: 'proficient' },
        skills: {
          acrobatics: 'proficient',
          deception: 'expert',
          investigation: 'expert',
          persuasion: 'expert',
          sleight_of_hand: 'proficient',
          stealth: 'expert',
        },
        abilities: [
          {
            key: 'disarming-charm',
            name: 'Disarming Charm',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ["While Forge isn't wearing armor, his AC includes his Charisma modifier."],
          },
          {
            key: 'double-cross',
            name: 'Double-Cross',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If Forge hits a creature friendly to him with an attack roll, the attack is automatically a critical hit.',
            ],
          },
          {
            key: 'evasion',
            name: 'Evasion',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "If Forge is subjected to an effect that allows him to make a Dexterity saving throw to take only half damage, he takes no damage if he succeeds on the saving throw, and only half damage if he fails, provided he isn't ",
              rules.incapacitated,
              '.',
            ],
            effects: [],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Forge makes two ',
              { ability: 'dagger' },
              ' attacks, two ',
              { ability: 'heavy-crossbow' },
              ' attacks, or one of each.',
            ],
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
              damage: [
                { dice: '1d4', type: rules.piercing, addModifier: true },
                { dice: '7d6', type: rules.poison },
              ],
            },
            text: ['The target is ', { effect: 'dagger-poisoned' }, '.'],
            effects: [
              {
                key: 'dagger-poisoned',
                name: 'Poisoned by the dagger',
                lands: { on: 'hit' },
                conditions: [rules.poisoned],
                lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
              },
            ],
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
                { dice: '1d10', type: rules.piercing, addModifier: true },
                { dice: '7d6', type: rules.poison },
              ],
            },
            text: [
              "Hit or Miss: If the target is a creature, it has disadvantage on the next attack roll it makes before the start of Forge's next turn.",
            ],
          },
          {
            key: 'cunning',
            name: 'Cunning',
            timing: 'bonus action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Forge takes the Dash, Disengage, or Hide action, or he gives himself advantage on the next attack roll he makes before the end of this turn.',
            ],
          },
          {
            key: 'uncanny-dodge',
            name: 'Uncanny Dodge',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Forge halves the damage he takes from an attack that hits him. He must be able to see the attacker.',
            ],
          },
        ],
      },
    },
  },
})

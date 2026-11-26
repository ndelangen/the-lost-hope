import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_13_the_horseman,
  monsters: {
    dominated_lumberjack: {
      name: 'Dominated Lumberjack',
      tags: ['human'],
      alignment: 'any alignment',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 13,
        armor: 'hide armor',
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 12, con: 17, int: 9, wis: 11, cha: 9 },
        abilities: [
          {
            key: 'reckless',
            name: 'Reckless',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'At the start of its turn, the dominated lumberjack can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.',
            ],
          },
          {
            key: 'woodaxe',
            name: 'Woodaxe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
            },
            text: ['Ersonal use only.'],
          },
        ],
      },
    },
    treant: {
      name: 'Treant',
      alignment: 'chaotic good',
      languages: ['Common', 'Druidic', 'Elvish', 'Sylvan'],
      stats: {
        size: 'huge',
        type: 'plant',
        cr: '9',
        ac: 16,
        armor: 'natural armor',
        hitDice: '12d12',
        speed: { walk: 30 },
        scores: { str: 23, dex: 8, con: 21, int: 12, wis: 16, cha: 12 },
        damageResistances: [rules.bludgeoning, rules.piercing],
        damageVulnerabilities: [rules.fire],
        abilities: [
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the treant remains motionless, it is indistinguishable from a normal tree.',
            ],
          },
          {
            key: 'siege-monster',
            name: 'Siege Monster',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['The treant deals double damage to objects and structures.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The treant makes two slam attacks.'],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d6', type: rules.bludgeoning, addModifier: true }],
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
              range: [60, 180],
              damage: [{ dice: '4d10', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Peter Fitzpatrick (order #9367545) Animate Trees (1/Day). The treant magically animates one or two trees it can see within 60 feet of it. These trees have the same statistics as a treant, except they have Intelligence and Charisma scores of 1, they, can’t speak, and they have only the ',
              { ability: 'slam' },
              ' action option. An animated tree acts as an ally of the treant. The tree remains animate for 1 day or until it dies; until the treant dies or is more than 120 feet from the tree; or until the treant takes a bonus action to turn it back into an inanimate tree. The tree then takes root if possible. ersonal use only.',
            ],
          },
          {
            key: 'appendix',
            name: 'Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['A Shrine to Peter Fitzpatrick (order #9367545) ersonal use only.'],
          },
          {
            key: 'player-handout-1',
            name: 'Player Handout 1',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Ring of Ring of Animal Influence Ring, rare This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expand 1 of its charges to cast one of the following spells:  ',
              refs.spells.animal_friendship,
              ' (save ',
              { dc: 'int' },
              ')  Fear (save ',
              { dc: 'int' },
              '), targeting only beasts that have an Intelligence of 3 or lower  Speak with animals This ring is decorated with canid and raptor symbols. The wearer feels predatory urges and desires a diet of fresh meat. This item can be found in the Dungeon Master’s Guide.',
            ],
          },
        ],
      },
    },
  },
})

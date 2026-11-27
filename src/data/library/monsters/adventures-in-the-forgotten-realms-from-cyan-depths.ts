import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.adventures_in_the_forgotten_realms_from_cyan_depths,
  monsters: {
    mercenary_envoy: {
      name: 'Mercenary Envoy',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 15,
        armor: 'chain shirt',
        hitDice: '4d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 15, con: 15, int: 10, wis: 12, cha: 9 },
        saves: { str: 'proficient', con: 'proficient' },
        skills: { athletics: 'proficient', perception: 'proficient' },
        abilities: [
          {
            key: 'inspired-courage',
            name: 'Inspired Courage',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The mercenary has advantage on savings throws against being ',
              rules.charmed,
              ', ',
              rules.frightened,
              ', ',
              rules.grappled,
              ', or ',
              rules.restrained,
              ' while within 5 feet of at least one ally.',
            ],
          },
          {
            key: 'martial-advantage',
            name: 'Martial Advantage',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Once per turn, the mercenary can deal an extra ',
              { roll: '2d6' },
              " damage to a creature it hits with a weapon attack if that creature is within 5 feet of an ally of the mercenary that isn't ",
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The mercenary makes two longsword attacks.'],
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
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
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
              ability: 'str',
              range: [100, 400],
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

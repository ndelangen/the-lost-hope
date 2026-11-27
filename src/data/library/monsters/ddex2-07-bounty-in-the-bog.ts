import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_07_bounty_in_the_bog,
  monsters: {
    black_earth_guard: {
      name: 'Black Earth Guard',
      reprintedIn: [refs.publications.princes_of_the_apocalypse],
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common'],
      appearance: [
        [
          'A brutal, heavily armoured thug in special plate made of elemental stone, which falls apart when the guard is killed.',
        ],
      ],
      lore: [
        [
          "The earth cult's fighters serve Ogrémoch, and that loyalty gives them an unnatural resilience against battering blows. They obey the cult's priests and leaders with fanatic zeal and will battle until they drop if told to. Those showing greater promise are turned into burrowsharks.",
        ],
        ['Sources: ', 'DDEX2-07 - Bounty in the Bog'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 18,
        armor: 'plate',
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 17, dex: 11, con: 14, int: 10, wis: 10, cha: 9 },
        skills: { intimidation: 'proficient', perception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The guard makes two melee attacks.'],
          },
          {
            key: 'morningstar',
            name: 'Morningstar',
            timing: 'action',
            icon: 'gi/GiFlangedMace',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'unyielding',
            name: 'Unyielding',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'When the guard is subjected to an effect that would move it, knock it ',
              rules.prone,
              ', or both, it can use its reaction to be neither moved nor knocked ',
              rules.prone,
              '.',
            ],
            effects: [],
          },
        ],
      },
    },
    sacred_stone_monk: {
      name: 'Sacred Stone Monk',
      tags: ['human'],
      alignment: 'lawful evil',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 14,
        hitDice: '4d8',
        speed: { walk: 40 },
        scores: { str: 13, dex: 15, con: 12, int: 10, wis: 14, cha: 9 },
        skills: { acrobatics: 'proficient', athletics: 'proficient', perception: 'proficient' },
        senses: { tremorsense: 10 },
        abilities: [
          {
            key: 'unarmored-defense',
            name: 'Unarmored Defense',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the monk is wearing no armor and wielding no shield, its AC includes its Wisdom modifier.',
            ],
          },
          {
            key: 'unarmored-movement',
            name: 'Unarmored Movement',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the monk is wearing no armor and wielding no shield, its walking speed increases by 10 feet (included in its speed).',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The monk makes two melee attacks.'],
          },
          {
            key: 'unarmed-strike',
            name: 'Unarmed Strike',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The monk adds 2 to its AC against one melee or ranged weapon attack that would hit it. To do so, the monk must see the attacker.',
            ],
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_14_death_on_the_wall,
  monsters: {
    guard: {
      name: 'Guard',
      reprintedIn: [
        refs.publications.monster_manual_2024,
        refs.publications.stranger_things_welcome_to_the_hellfire_club,
      ],
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 16,
        armor: 'chain shirt, shield',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'spear',
            name: 'Spear',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    incubus: {
      name: 'Incubus',
      tags: ['shapechanger'],
      alignment: 'neutral evil',
      languages: ['Abyssal', 'Common', 'Infernal', 'telepathy 60 ft'],
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '4',
        ac: 15,
        hitDice: '12d8',
        speed: { walk: 30, fly: 60 },
        scores: { str: 8, dex: 17, con: 13, int: 15, wis: 12, cha: 20 },
        skills: {
          deception: 'expert',
          insight: 'expert',
          perception: 'expert',
          persuasion: 'expert',
          stealth: 'expert',
        },
        senses: { darkvision: 60 },
        damageResistances: [rules.cold, rules.fire, rules.lightning, rules.poison],
        nonmagicalResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'telepathic-bond',
            name: 'Telepathic Bond',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The fiend ignores the range restriction on its telepathy when communicating with a creature it has ',
              rules.charmed,
              '. The two don’t even need to be on the same plane of existence.',
            ],
          },
        ],
      },
    },
  },
})

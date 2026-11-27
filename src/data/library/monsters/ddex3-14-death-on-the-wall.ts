import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_14_death_on_the_wall,
  monsters: {
    incubus: {
      name: 'Incubus',
      reprintedIn: [refs.publications.monster_manual_2014],
      tags: ['shapechanger'],
      alignment: 'neutral evil',
      languages: ['Abyssal', 'Common', 'Infernal', 'telepathy 60 ft.'],
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
            effects: [],
          },
        ],
      },
    },
  },
})

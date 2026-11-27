import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_03_the_drowned_tower,
  monsters: {
    crushing_wave_reaver: {
      name: 'Crushing Wave Reaver',
      reprintedIn: [
        refs.publications.princes_of_the_apocalypse,
        refs.publications.princes_of_the_apocalypse_d_d_encounters,
      ],
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common'],
      appearance: [
        [
          "A sea raider with a shield made from a giant crab shell and a sword edged with shark's teeth.",
        ],
      ],
      lore: [
        [
          "Reavers are the cult's rank-and-file, vicious sea raiders, many of them former pirates, who still crave blood and loot. They understand the worth of surprise and strike suddenly from hiding where they can. They are devoted to the priests but usually retreat rather than die if there is a way out.",
        ],
        ['Sources: ', 'DDEX2-03 - The Drowned Tower'],
      ],
      habitats: ['Coastal'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 14,
        armor: 'shield',
        hitDice: '4d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 14, con: 13, int: 10, wis: 11, cha: 8 },
        skills: { athletics: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'sharktoothed-longsword',
            name: 'Sharktoothed Longsword',
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
            text: [
              'Against a target is wearing no armor, the reaver deals an extra die of damage with this sword.',
            ],
          },
          {
            key: 'javelin',
            name: 'Javelin',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

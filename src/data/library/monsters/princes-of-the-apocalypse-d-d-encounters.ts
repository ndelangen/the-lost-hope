import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.princes_of_the_apocalypse_d_d_encounters,
  monsters: {
    howling_hatred_initiate: {
      name: 'Howling Hatred Initiate',
      reprintedIn: [
        refs.publications.ddep2_mulmaster_undone_v2,
        refs.publications.princes_of_the_apocalypse,
      ],
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common'],
      appearance: [
        [
          'A new cultist, either a dreamy youth or a weary adult, pale from a month of near-fasting.',
        ],
      ],
      lore: [
        [
          "Recruits come for the cult's teaching of detachment from possessions, not knowing what it really is. The month-long fast is sold as purification but really leaves them desperate for food and ready for indoctrination. Soon they justify heinous acts: human sacrifice is freeing the soul, and calling a whirlwind on unbelievers shows faith.",
        ],
        ['Sources: ', 'Princes of the Apocalypse - D&D Encounters'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 13,
        armor: 'leather',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 10, int: 10, wis: 9, cha: 11 },
        skills: { deception: 'proficient', religion: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'guiding-wind-recharges-after-a-short-or-long-rest',
            name: 'Guiding Wind (Recharges after a Short or Long Rest)',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'As a bonus action, the initiate gains advantage on the next ranged attack roll it makes before the end of its next turn.',
            ],
          },
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The initiate can hold its breath for 30 minutes.'],
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
        ],
      },
    },
  },
})

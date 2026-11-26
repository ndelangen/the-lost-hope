import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.princes_of_the_apocalypse_d_d_encounters,
  monsters: {
    crushing_wave_reaver: {
      name: 'Crushing Wave Reaver',
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common'],
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
    howling_hatred_initiate: {
      name: 'Howling Hatred Initiate',
      reprintedIn: [refs.publications.ddep2_mulmaster_undone_v2],
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common'],
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

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.out_of_the_abyss_d_d_encounters,
  monsters: {
    drow_spore_servant: {
      name: 'Drow Spore Servant',
      reprintedIn: [refs.publications.out_of_the_abyss],
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/8',
        ac: 15,
        armor: 'chain shirt',
        hitDice: '3d8',
        speed: { walk: 20 },
        scores: { str: 10, dex: 14, con: 10, int: 2, wis: 6, cha: 1 },
        senses: { blindsight: 30 },
        conditionImmunities: [rules.blinded, rules.charmed, rules.frightened, rules.paralyzed],
        abilities: [
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    duergar_spore_servant: {
      name: 'Duergar Spore Servant',
      reprintedIn: [refs.publications.out_of_the_abyss],
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/2',
        ac: 16,
        armor: 'scale armor, shield',
        hitDice: '4d8',
        speed: { walk: 15 },
        scores: { str: 14, dex: 11, con: 14, int: 2, wis: 6, cha: 1 },
        senses: { blindsight: 30 },
        damageResistances: [rules.poison],
        conditionImmunities: [rules.blinded, rules.charmed, rules.frightened, rules.paralyzed],
        abilities: [
          {
            key: 'war-pick',
            name: 'War Pick',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

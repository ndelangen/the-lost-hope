import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_02_secrets_of_sokol_keep,
  monsters: {
    skeleton: {
      name: 'Skeleton',
      alignment: 'lawful evil',
      languages: ['understands all languages it knew in life but can’t speak'],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1/4',
        ac: 13,
        armor: 'armor scraps',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        damageVulnerabilities: [rules.bludgeoning],
        conditionImmunities: [rules.exhaustion, rules.poisoned],
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
  },
})

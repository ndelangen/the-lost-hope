import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_10_the_artifact,
  monsters: {
    ogre_zombie: {
      name: 'Ogre Zombie',
      alignment: 'neutral evil',
      languages: ['understands Giant and Common but can’t speak'],
      stats: {
        size: 'large',
        type: 'undead',
        cr: '2',
        ac: 8,
        hitDice: '9d10',
        speed: { walk: 30 },
        scores: { str: 19, dex: 6, con: 18, int: 3, wis: 6, cha: 5 },
        saves: { wis: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
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
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

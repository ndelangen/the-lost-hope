import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_14_the_darklord,
  monsters: {
    strahds_animated_armor: {
      name: "Strahd's Animated Armor",
      alignment: 'lawful evil',
      languages: ["Understands Common but can't speak"],
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '6',
        ac: 21,
        armor: 'natural armor',
        hitDice: '15d8',
        speed: { walk: 30 },
        scores: { str: 17, dex: 13, con: 16, int: 9, wis: 10, cha: 9 },
        skills: { perception: 'proficient' },
        senses: { blindsight: 60 },
        damageResistances: [rules.cold, rules.fire],
        damageImmunities: [rules.lightning, rules.poison],
        conditionImmunities: [
          rules.blinded,
          rules.charmed,
          rules.deafened,
          rules.exhaustion,
          rules.frightened,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
        ],
        abilities: [
          {
            key: 'antimagic-susceptibility',
            name: 'Antimagic Susceptibility',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The armor is ',
              rules.incapacitated,
              " while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster's spell save DC or fall ",
              rules.unconscious,
              ' for 1 minute.',
            ],
            effects: [],
          },
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the armor remains motionless, it is indistinguishable from a normal suit of armor.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The armor makes two melee attacks or uses ',
              { ability: 'shocking-bolt' },
              ' twice.',
            ],
          },
          {
            key: 'greatsword',
            name: 'Greatsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [
                { dice: '2d6', type: rules.slashing, addModifier: true },
                { dice: '1d6', type: rules.lightning },
              ],
            },
          },
          {
            key: 'shocking-bolt',
            name: 'Shocking Bolt',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'wis',
              range: [60, 60],
              printedBonus: 4,
              damage: [{ dice: '3d6', type: rules.lightning, addModifier: true }],
            },
            text: [
              'With advantage on the attack roll if the target is wearing armor made of metal.',
            ],
          },
        ],
      },
    },
  },
})

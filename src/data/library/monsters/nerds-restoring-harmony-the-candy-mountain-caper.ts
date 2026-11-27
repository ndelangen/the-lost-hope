import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.nerds_restoring_harmony_the_candy_mountain_caper,
  monsters: {
    mr_honeycutt: {
      name: 'Mr. Honeycutt',
      tags: ['human', 'shapechanger'],
      alignment: 'lawful evil',
      languages: ["Common (can't speak in rat form)"],
      habitats: ['forest', 'urban'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        nonmagicalExcept: 'silvered',
        nonmagicalImmunities: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
          },
          {
            key: 'mr',
            name: 'Mr',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "Honeycutt can use its action to polymorph into a rat-humanoid hybrid or into a giant rat, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.",
            ],
          },
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
          },
          {
            key: 'mr-2',
            name: 'Mr',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Honeycutt has advantage on Wisdom (Perception) checks that rely on smell.'],
          },
          {
            key: 'multiattack-humanoid-or-hybrid-form-only',
            name: 'Multiattack (Humanoid or Hybrid Form Only)',
            timing: 'action',
            icon: 'gi/GiPaw',
          },
          {
            key: 'mr-3',
            name: 'Mr',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Honeycutt makes two attacks, only one of which can be a bite.'],
          },
          {
            key: 'bite-rat-or-hybrid-form-only',
            name: 'Bite (Rat or Hybrid Form Only)',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a humanoid, it must succeed on a ',
              { dc: 'con' },
              ' Constitution saving throw or be ',
              { effect: 'wererat-lycanthropy' },
              '.',
            ],
            effects: [
              {
                key: 'wererat-lycanthropy',
                name: 'Wererat lycanthropy',
                lands: { on: 'save', save: 'con', dc: 'con' },
                text: ['cursed with wererat lycanthropy'],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'shortsword-humanoid-or-hybrid-form-only',
            name: 'Shortsword (Humanoid or Hybrid Form Only)',
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
          {
            key: 'hand-crossbow-humanoid-or-hybrid-form-only',
            name: 'Hand Crossbow (Humanoid or Hybrid Form Only)',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.d_d_world_of_warcraft,
  monsters: {
    pandarian_dragon_turtle: {
      name: 'Pandarian Dragon Turtle',
      alignment: 'unaligned',
      languages: ['None.'],
      appearance: [
        [
          'A large dragon turtle used as a mount. The existing portrait shows a broad armored shell and a horned head on plain parchment.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 17,
        hitDice: '4d10',
        speed: { walk: 30, swim: 60 },
        scores: { str: 16, dex: 12, con: 15, int: 2, wis: 12, cha: 9 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The turtle breathes in air and underwater.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
            text: ['A Large or smaller creature hit by the bite is ', { effect: 'grappled' }, '.'],
            effects: [
              {
                key: 'grappled',
                name: 'Grappled',
                lands: { on: 'hit' },
                conditions: [rules.grappled],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 13 } },
              },
            ],
          },
        ],
      },
    },
  },
})

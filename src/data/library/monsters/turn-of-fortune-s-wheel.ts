import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.turn_of_fortune_s_wheel,
  monsters: {
    ophelia: {
      name: 'Ophelia',
      page: 50,
      alignment: 'lawful good',
      languages: ['Common'],
      habitats: ['grassland'],
      appearance: [
        ['A sapient elephant with thick gray hide, an expressive trunk and long tusks.'],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '4',
        ac: 12,
        armor: 'natural armor',
        hitDice: '8d12',
        speed: { walk: 40 },
        scores: { str: 22, dex: 9, con: 17, int: 10, wis: 14, cha: 14 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'A ',
              { ability: 'gore' },
              ' hit after moving at least 20 ft. straight toward a creature that turn forces a ',
              { dc: 'wis', save: 'str' },
              ' Strength save. On a failure the target falls ',
              { effect: 'prone-charge' },
              '. Ophelia can then ',
              { ability: 'stomp' },
              ' that ',
              rules.prone,
              ' target once as a bonus action.',
            ],
            effects: [
              {
                key: 'prone-charge',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'wis' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'gore',
            name: 'Gore',
            timing: 'action',
            icon: 'gi/GiBullHorns',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'stomp',
            name: 'Stomp',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

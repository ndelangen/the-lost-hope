import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.nerds_restoring_harmony_a_web_of_lies,
  monsters: {
    szikzith: {
      name: 'Szikzith',
      alignment: 'neutral',
      languages: ['none in the stat block'],
      habitats: ['grassland', 'forest', 'hill', 'desert', 'coastal'],
      appearance: [
        [
          'An awakened, rust-brown giant wolf spider with a rounded abdomen swollen from eating honey.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        hitDice: '2d8',
        speed: { walk: 40, climb: 40 },
        scores: { str: 12, dex: 16, con: 13, int: 8, wis: 12, cha: 4 },
        skills: { perception: 'proficient', stealth: 'expert' },
        senses: { darkvision: 60, blindsight: 10 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'Szikzith can traverse difficult surfaces, including ceilings, without a check.',
            ],
          },
          {
            key: 'web-sense',
            name: 'Web Sense',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['While touching a web she can pinpoint creatures touching that web.'],
          },
          {
            key: 'web-walker',
            name: 'Web Walker',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['Webbing places no limits on her movement.'],
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
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            text: [
              'The creature makes a ',
              { dc: 'con' },
              ' Constitution save, taking ',
              { roll: '2d6' },
              ' poison on failure or half on success. If that poison reduces the creature to 0 HP, it stabilizes and remains ',
              { effect: 'bite-stable-poisoned' },
              ', even if it regains HP. It is ',
              rules.paralyzed,
              ' for as long as that bite keeps it ',
              rules.poisoned,
              '.',
            ],
            effects: [
              {
                key: 'bite-stable-poisoned',
                name: 'Poisoned and paralyzed',
                lands: { on: 'use' },
                conditions: [rules.poisoned, rules.paralyzed],
                lasts: { kind: 'time', amount: '1', unit: 'hour' },
              },
            ],
          },
        ],
      },
    },
  },
})

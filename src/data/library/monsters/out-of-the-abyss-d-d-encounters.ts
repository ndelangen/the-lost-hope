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
      appearance: [
        ["A drow infected with Zuggtmoy's spores and transformed into a fungal thrall."],
      ],
      lore: [
        [
          'Drow spore servants silently watch the party. They do not attack unless threatened. They appear in groups of several along Underdark tunnels.',
        ],
        ['Sources: ', 'Out of the Abyss, PDF page 193'],
      ],
      habitats: ['Underdark'],
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
      appearance: [["A duergar infected with Zuggtmoy's spores and made into a fungal thrall."]],
      lore: [
        [
          'Spore servants observe passers-by without communicating and attack only in self-defence. A random Underdark encounter may bring one or more duergar spore servants.',
        ],
        ['Sources: ', 'Out of the Abyss, PDF page 31'],
      ],
      habitats: ['Underdark'],
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
    female_steeder: {
      name: 'Female Steeder',
      page: 62,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Underdark', 'Duergar settlements'],
      appearance: [['A large tarantula-like steeder with a broad body and thick hairy legs.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 14,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 15, dex: 16, con: 14, int: 2, wis: 10, cha: 3 },
        skills: { stealth: 'expert' },
        senses: { darkvision: 120 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'It can climb difficult surfaces, including ceilings upside down, without an ability check.',
            ],
          },
          {
            key: 'leap',
            name: 'Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'If its speed is at least 30 ft., the steeder can spend all its movement on its turn to jump up to 90 ft. vertically or horizontally.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '2d8', type: rules.acid }],
              },
              onSuccess: 'half',
            },
            effects: [],
          },
          {
            key: 'sticky-leg-recharges-when-no-creatures-are-grappled-by-the-steeder',
            name: 'Sticky Leg (recharges when no creatures are grappled by the steeder)',
            timing: 'action',
            icon: 'gi/GiBull',
            text: [
              'Melee weapon attack, attack bonus 5, reach 5 ft., one Medium or smaller creature. On a hit, the target sticks to its leg and is ',
              { effect: 'sticky-grappled' },
              '.',
            ],
            effects: [
              {
                key: 'sticky-grappled',
                name: 'Stuck to the leg',
                lands: { on: 'use' },
                conditions: [rules.grappled],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 12 } },
              },
            ],
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.curse_of_strahd,
  monsters: {
    piccolo: {
      name: 'Piccolo',
      page: 118,
      alignment: 'unaligned',
      languages: [],
      habitats: ['forest', 'hill'],
      appearance: [
        [
          'A small, dark-furred monkey with pale fur around the eyes, a curled tail, and a custom ballerina tutu.',
        ],
      ],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '0',
        ac: 12,
        hitDice: '1d6',
        speed: { walk: 30, climb: 30 },
        scores: { str: 8, dex: 14, con: 11, int: 4, wis: 12, cha: 6 },
        abilities: [
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'Piccolo has advantage on an attack roll against a creature if an ally is within 5 ft. of that target and the ally is not ',
              rules.incapacitated,
              '.',
            ],
            effects: [],
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
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    wereraven: {
      name: 'Wereraven',
      tags: ['human', 'shapechanger'],
      alignment: 'lawful good',
      languages: ['Common'],
      habitats: ['Barovia', 'Blue Water Inn', 'Vallaki', 'Wizard of Wines'],
      appearance: [
        [
          'A Barovian shapeshifter that can appear human, raven, or as a winged hybrid with a raven head and black feathers.',
        ],
      ],
      tableNotes: [
        ['Rules source: Curse of Strahd, p. 242, original printed profile.'],
        [
          'Encounter: The Martikov family and other Keepers of the Feather hide among the ravens of Barovia. Allies can find them around the Blue Water Inn and the Wizard of Wines. Wereravens favor weapons in their human and hybrid forms to avoid spreading their curse.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '7d8',
        speed: { walk: 30, fly: 50 },
        scores: { str: 10, dex: 15, con: 11, int: 13, wis: 15, cha: 14 },
        skills: { insight: 'proficient', perception: 'expert' },
        nonmagicalExcept: 'silvered',
        nonmagicalImmunities: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The wereraven can spend an action to become a raven, a raven-humanoid hybrid, or its human form. Its other statistics carry across forms except for size and the listed flight. Its gear does not change with it. It returns to human form when it dies.',
            ],
          },
          {
            key: 'mimicry',
            name: 'Mimicry',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'It can imitate simple sounds it has heard. A listener can identify an imitation with a DC 10 Wisdom (Insight) check.',
            ],
          },
          {
            key: 'multiattack-human-or-hybrid-only',
            name: 'Multiattack (human or hybrid only)',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two weapon attacks, with at most one Hand Crossbow attack.'],
          },
          {
            key: 'beak-raven-or-hybrid-only',
            name: 'Beak (raven or hybrid only)',
            timing: 'action',
            icon: 'gi/GiRaven',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'In hybrid form. A humanoid hit must succeed on a ',
              { dc: 'con' },
              ' Constitution save or ',
              { effect: 'wereraven-lycanthropy' },
              '.',
            ],
            effects: [
              {
                key: 'wereraven-lycanthropy',
                name: 'Wereraven lycanthropy',
                lands: { on: 'save', save: 'con', dc: 'con' },
                text: ['contract wereraven lycanthropy'],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'shortsword-human-or-hybrid-only',
            name: 'Shortsword (human or hybrid only)',
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
            key: 'hand-crossbow-human-or-hybrid-only',
            name: 'Hand Crossbow (human or hybrid only)',
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

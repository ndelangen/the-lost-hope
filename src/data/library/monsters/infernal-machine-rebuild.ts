import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.infernal_machine_rebuild,
  monsters: {
    tiefling_muralist: {
      name: 'Tiefling Muralist',
      alignment: 'lawful neutral chaotic neutral evil',
      languages: [
        'any one language (usually Common)',
        'Infernal',
        'any one language (usually Common)',
        'Infernal',
      ],
      tableNotes: [
        ['Applied the named source templates to the base creature.'],
        ['Base creature: Cultist'],
        ['Applied templates: Tiefling'],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 12,
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 12, con: 10, int: 10, wis: 11, cha: 10 },
        skills: { deception: 'proficient', religion: 'proficient' },
        senses: { darkvision: 60 },
        damageResistances: [rules.fire],
        abilities: [
          {
            key: 'dark-devotion',
            name: 'Dark Devotion',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The cultist has advantage on saving throws against being ',
              rules.charmed,
              ' or ',
              rules.frightened,
              '.',
            ],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
            text: [
              'Cultists swear allegiance to dark powers such as elemental princes, demon lords, or archdevils. Most conceal their loyalties to avoid being ostracized, imprisoned, or executed for their beliefs. Unlike evil acolytes, cultists often show signs of insanity in their beliefs and practices.',
            ],
          },
        ],
      },
    },
    two_headed_crocodile: {
      name: 'Two-Headed Crocodile',
      page: 89,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Swamp', 'Temple guardroom'],
      appearance: [['A low, armored crocodile with two independent heads and one long tail.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 12,
        armor: 'natural armor',
        hitDice: '3d10',
        speed: { walk: 20, swim: 30 },
        scores: { str: 15, dex: 10, con: 13, int: 2, wis: 10, cha: 5 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The crocodile holds its breath for up to 15 minutes.'],
          },
          {
            key: 'two-heads',
            name: 'Two Heads',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'It has advantage on Wisdom (Perception) checks and on saves against being ',
              rules.blinded,
              ', ',
              rules.charmed,
              ', ',
              rules.deafened,
              ', ',
              rules.frightened,
              ', ',
              rules.stunned,
              ', or knocked ',
              rules.unconscious,
              '.',
            ],
            effects: [],
          },
          {
            key: 'wakeful',
            name: 'Wakeful',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['If one head falls asleep, the other stays awake.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'bite' }, ' attacks.'],
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
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'The captive is ',
              { effect: 'croc-grapple' },
              '. The head holding it cannot bite another target until the grapple ends.',
            ],
            effects: [
              {
                key: 'croc-grapple',
                name: 'Grappled by the crocodile',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.restrained],
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

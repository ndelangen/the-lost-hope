import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.journeys_through_the_radiant_citadel,
  monsters: {
    koi_prawn: {
      name: 'Koi Prawn',
      page: 25,
      alignment: 'unaligned',
      languages: [],
      habitats: ['underwater'],
      appearance: [
        [
          'An eight-foot jagged prawn with a segmented violet shell, cyan bands, long blue-violet antennae, and a spiny pointed rostrum.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d10',
        speed: { walk: 0, swim: 40 },
        scores: { str: 12, dex: 15, con: 11, int: 2, wis: 12, cha: 5 },
        abilities: [
          {
            key: 'charge',
            name: 'Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'Moving at least 20 ft. straight toward a target and hitting it with Ram on the same turn adds ',
              { roll: '2d6' },
              ' bludgeoning damage. A creature hit this way makes a ',
              { dc: 'str' },
              ' Strength save or falls ',
              { effect: 'charge-prone' },
              '.',
            ],
            effects: [
              {
                key: 'charge-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'water-breathing',
            name: 'Water Breathing',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The prawn breathes only underwater.'],
          },
          {
            key: 'ram',
            name: 'Ram',
            timing: 'action',
            icon: 'gi/GiBull',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    rooster: {
      name: 'Rooster',
      page: 206,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Grasslands', 'Shelter'],
      appearance: [
        ['A domestic rooster with a red comb and wattles, curved back feathers, and clawed feet.'],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 10 },
        scores: { str: 5, dex: 16, con: 8, int: 2, wis: 14, cha: 6 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-sight',
            name: 'Keen Sight',
            timing: 'trait',
            icon: 'lucide/Eye',
            text: ['The rooster has advantage on sight-based Wisdom (Perception) checks.'],
          },
          {
            key: 'talons',
            name: 'Talons',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1', type: rules.slashing }],
            },
          },
        ],
      },
    },
    sensa_prince: {
      name: 'Sensa Prince',
      tags: ['human'],
      alignment: 'alignment varies by prince',
      languages: ['any one language', 'usually Common'],
      habitats: ['Anisa', 'Sensa Empire', 'Goldwarren'],
      appearance: [
        ['An unarmored Sensa royal with court robes, a draped mantle, and a longsword.'],
      ],
      tableNotes: [
        [
          'Rules source: Journeys through the Radiant Citadel, Gold for Fools and Princes, pp. 94–95. Base Veteran rules from Monster Manual (2014), p. 350.',
        ],
        [
          'Princes and Scorpions: Prince Kirina and Prince Simbon use this profile when five summoned giant scorpions attack in Anisa. Kirina charges first and Simbon follows. Both fight alongside the characters. A prince at half his hit points or fewer (29 HP with the listed average) takes the Dodge action to avoid further harm.\nA DC 16 Intelligence (Nature) check identifies the attackers as twilight dune scorpions. The scorpions vanish when killed. A DC 12 Intelligence (Arcana or Religion) check identifies that as evidence of magical summoning.',
        ],
        [
          "The rival princes: Kirina, Prince of Niba, is chaotic evil. He works with High Priest Kedjou to stage a crisis that will make him look like Empress Inaya's strongest heir.\nSimbon, Prince of Anisa, is neutral. He takes charge of the Goldwarren rescue at his father's direction and feels obligated to act as a candidate for the throne.",
        ],
      ],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 11,
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
        skills: { athletics: 'proficient', perception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'longsword' }, ' attacks.'],
          },
          {
            key: 'longsword',
            name: 'Longsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              twoHanded: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

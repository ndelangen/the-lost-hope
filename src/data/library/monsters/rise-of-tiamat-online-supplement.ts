import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.rise_of_tiamat_online_supplement,
  monsters: {
    giant_octopus: {
      name: 'Giant Octopus',
      page: 16,
      alignment: 'unaligned',
      habitats: ['Coastal waters', 'Submerged caves'],
      appearance: [['A reddish brown octopus with eight curling arms and rows of pale suckers.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 11,
        hitDice: '8d10',
        speed: { walk: 10, swim: 60 },
        scores: { str: 17, dex: 13, con: 13, int: 4, wis: 10, cha: 4 },
        skills: { perception: 'expert', stealth: 'expert' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['It can hold its breath for 1 hour out of water.'],
          },
          {
            key: 'underwater-camouflage',
            name: 'Underwater Camouflage',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['It has advantage on underwater Dexterity (Stealth) checks.'],
          },
          {
            key: 'water-breathing',
            name: 'Water Breathing',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['It can breathe only underwater.'],
          },
          {
            key: 'tentacles',
            name: 'Tentacles',
            timing: 'action',
            icon: 'gi/GiTentacleStrike',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 15,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'A creature hit is ',
              rules.grappled,
              ' (escape DC 16) and remains ',
              rules.restrained,
              ' until the grapple ends. The octopus cannot use Tentacles on another target during that grapple.',
            ],
          },
          {
            key: 'ink-cloud-recharges-after-a-short-or-long-rest',
            name: 'Ink Cloud (recharges after a short or long rest)',
            timing: 'action',
            icon: 'gi/GiBull',
            text: [
              'If the octopus is underwater, it releases ink in a 20-ft. radius around itself. The area is heavily obscured for 1 minute. A significant current can disperse the ink. After releasing it, the octopus can Dash as a bonus action.',
            ],
          },
        ],
      },
    },
    warhorse: {
      name: 'Warhorse',
      page: 26,
      alignment: 'unaligned',
      habitats: ['Grassland', 'Cavalry stables'],
      appearance: [['A bay horse with a dark mane, tail, and lower legs.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 11,
        hitDice: '3d10',
        speed: { walk: 60 },
        scores: { str: 18, dex: 12, con: 13, int: 2, wis: 12, cha: 7 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'If the horse moves at least 20 ft. straight toward a creature and hits it with ',
              { ability: 'hooves' },
              ' on the same turn, the target must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the horse can make another ',
              { ability: 'hooves' },
              ' attack against it as a bonus action.',
            ],
          },
          {
            key: 'hooves',
            name: 'Hooves',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              printedBonus: 4,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

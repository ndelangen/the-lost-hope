import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.plane_shift_amonkhet,
  monsters: {
    ammit: {
      name: 'Ammit',
      page: 324,
      alignment: 'unaligned',
      languages: [],
      habitats: ['swamp'],
      appearance: [
        [
          'A massive lion-bodied predator with thick hide, heavy paws, and an alligator-like snout. Its eyes are red.',
        ],
      ],
      tableNotes: [
        [
          'After the ammit grabs with Bite, Tail must target something other than the creature in its jaws. The encounter uses the Giant Crocodile’s creature type and alignment even though the setting calls ammits demons.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '5',
        ac: 14,
        armor: 'natural armor',
        hitDice: '9d12',
        speed: { walk: 30, swim: 50 },
        scores: { str: 21, dex: 9, con: 17, int: 2, wis: 10, cha: 7 },
        skills: { stealth: 'expert' },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The creature can hold its breath for up to 30 minutes.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'bite' },
              ' attack and one ',
              { ability: 'tail' },
              ' attack.',
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
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d10', type: rules.piercing, addModifier: true }],
            },
            text: ['Grapples the target.'],
          },
          {
            key: 'escape-dc-16',
            name: 'Escape DC 16',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The target is ',
              rules.restrained,
              ' while ',
              rules.grappled,
              ', and the ammit cannot bite a different target until that grapple ends.',
            ],
          },
          {
            key: 'tail',
            name: 'Tail',
            timing: 'action',
            icon: 'gi/GiWhiplash',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'A creature hit must pass a ',
              { dc: 'str' },
              ' Strength save or fall ',
              { effect: 'prone' },
              '.',
            ],
            effects: [
              {
                key: 'prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
    cerodon: {
      name: 'Cerodon',
      page: 332,
      alignment: 'unaligned',
      languages: [],
      habitats: ['arctic'],
      appearance: [
        [
          'A towering bull-shaped quadruped. Its horns jut out over the nose and sweep back nearly the full length of its body in ridges like a sandstone cliff.',
        ],
      ],
      tableNotes: [
        [
          'Gore can reach 10 ft. Stomp needs the prone target within 5 ft., so save enough movement to close the gap after the charge. Against an object or structure, a Gore hit averages 50 piercing damage.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '6',
        ac: 13,
        armor: 'natural armor',
        hitDice: '11d12',
        speed: { walk: 40 },
        scores: { str: 24, dex: 9, con: 21, int: 3, wis: 11, cha: 6 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'On a turn when the cerodon moves at least 20 ft. straight toward a creature and then hits it with ',
              { ability: 'gore' },
              ', that creature must make a ',
              { dc: 'str' },
              ' Strength save or fall ',
              { effect: 'prone' },
              '. If the target is ',
              rules.prone,
              ', the cerodon can make one ',
              { ability: 'stomp' },
              ' attack against it as a bonus action.',
            ],
            effects: [
              {
                key: 'prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'siege-monster',
            name: 'Siege Monster',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Damage the cerodon deals to objects and structures is doubled.'],
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
              reach: 10,
              damage: [{ dice: '4d8', type: rules.piercing, addModifier: true }],
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
              damage: [{ dice: '4d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    hippopotamus: {
      name: 'Hippopotamus',
      page: 322,
      alignment: 'unaligned',
      languages: [],
      habitats: ['grassland'],
      appearance: [
        [
          'A broad-bodied river animal with thick folded skin, a wide blunt muzzle, and long lower canine teeth.',
        ],
      ],
      tableNotes: [
        [
          'The Bite replaces Gore both in the action list and as the trigger for Trampling Charge. Use the Elephant’s published DC 12. Bite and Stomp both have 5-ft. reach.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '4',
        ac: 12,
        armor: 'natural armor',
        hitDice: '8d12',
        speed: { walk: 40, swim: 30 },
        scores: { str: 22, dex: 9, con: 17, int: 3, wis: 11, cha: 6 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'On a turn when the hippopotamus moves at least 20 ft. straight toward a creature and then hits it with ',
              { ability: 'bite' },
              ', that creature must make a ',
              { dc: 'str', printed: 12 },
              ' Strength save or fall ',
              { effect: 'prone' },
              '. If the target is ',
              rules.prone,
              ', the hippopotamus can make one ',
              { ability: 'stomp' },
              ' attack against it as a bonus action.',
            ],
            effects: [
              {
                key: 'prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'str', printed: 12 },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The creature can hold its breath for up to 30 minutes.'],
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
    large_drake: {
      name: 'Large Drake',
      page: 324,
      alignment: 'neutral good',
      languages: [
        'Speaks Giant Eagle from the base stat block and understands Common and Auran without speaking either',
      ],
      habitats: ['mountain', 'grassland', 'hill', 'coastal'],
      appearance: [
        ['A reptilian flyer with a scaled head, two legs, and enormous leathery wings.'],
      ],
      tableNotes: [
        [
          'The 2014 Giant Eagle provides the mechanical alignment, languages, and attack names. The drake’s head still looks reptilian. It has no fire breath.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 13,
        hitDice: '4d10',
        speed: { walk: 10, fly: 80 },
        scores: { str: 16, dex: 17, con: 13, int: 8, wis: 14, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-sight',
            name: 'Keen Sight',
            timing: 'trait',
            icon: 'lucide/Eye',
            text: ['Sight-based Wisdom (Perception) checks have advantage.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'beak' },
              ' attack and one ',
              { ability: 'talons' },
              ' attack.',
            ],
          },
          {
            key: 'beak',
            name: 'Beak',
            timing: 'action',
            icon: 'gi/GiRaven',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'talons',
            name: 'Talons',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    small_drake: {
      name: 'Small Drake',
      page: 80,
      alignment: 'unaligned',
      languages: [],
      habitats: ['mountain', 'grassland', 'coastal'],
      appearance: [
        [
          'A smaller reptilian flyer with a scaled head, two clawed legs, and broad leathery wings.',
        ],
      ],
      tableNotes: [
        [
          'Small is the variant name. The Pteranodon supplies the Medium mechanical size. Flyby applies when leaving reach by flying. The drake has no fire breath.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d8',
        speed: { walk: 10, fly: 60 },
        scores: { str: 12, dex: 15, con: 10, int: 2, wis: 9, cha: 5 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'flyby',
            name: 'Flyby',
            timing: 'trait',
            icon: 'gi/GiFeather',
            text: ['Leaving an enemy’s reach by flying does not trigger an opportunity attack.'],
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
              damage: [{ dice: '2d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'The Mossback',
  location: refs.locations.thornwall_maze,
  species: 'Bulette',
  notes: [['A huge old bulette, its armoured back grown over with moss and fungus.']],
  background: [
    [
      'It sleeps under the clearing at the heart of the ',
      refs.locations.thornwall_maze,
      ', so long that the garden on its back has become the ground. The Dust in its moss catches the moonlight: that is where the moon shines brightest.',
    ],
    [
      'It hunts by feeling the ground shake. Four stomps on its back are the call that wakes it, and it comes up hungry.',
    ],
    ['Why ', refs.npcs.bob_the_merchant, ' wants it dead is not decided.'],
  ],
  stats: {
    size: 'huge',
    type: 'monstrosity',
    cr: '8',
    ac: 17,
    armor: 'natural armor',
    hitDice: '15d12',
    speed: { walk: 40, burrow: 40 },
    scores: { str: 21, dex: 11, con: 22, int: 2, wis: 12, cha: 5 },
    skills: { perception: 'proficient' },
    senses: { darkvision: 60, tremorsense: 120 },
    abilities: [
      {
        key: 'answers-the-stomp',
        name: 'Answers the Stomp',
        timing: 'trait',
        icon: 'gi/GiStomp',
        text: [
          'While it is underground, a creature that uses its action to stomp four times draws it: on its next turn it must come up under that creature with ',
          { ability: 'burst-from-below' },
          ' if it can reach.',
        ],
      },
      {
        key: 'garden-on-its-back',
        name: 'Garden on Its Back',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: [
          'The first time it drops to half its hit points or fewer, the garden on its back breaks loose: two violet fungi tumble into empty spaces next to it and join the fight on their own initiative.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['Two ', { ability: 'bite' }, ' attacks.'],
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
          damage: [{ dice: '2d12', type: refs.rules.piercing, addModifier: true }],
        },
      },
      {
        key: 'burst-from-below',
        name: 'Burst from Below',
        timing: 'action',
        icon: 'gi/GiWingfoot',
        intent: 'damage',
        save: {
          ability: 'dex',
          dc: 'str',
          target: { area: { shape: refs.rules.cube, size: 15 }, range: 40 },
          onFail: {
            damage: [
              { dice: '3d8', type: refs.rules.bludgeoning, addModifier: true },
              { dice: '2d8', type: refs.rules.slashing },
            ],
            conditions: [refs.rules.prone],
          },
          onSuccess: 'half',
        },
        text: [
          'It leaps or bursts out of the ground into the area and lands there. Anyone who saves is pushed out of its space.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'dive',
        name: 'Dive',
        timing: 'bonus action',
        icon: 'lucide/Footprints',
        text: [
          'It sinks into the ground. Underground it cannot be seen or attacked, and only ',
          { ability: 'answers-the-stomp' },
          ' or its own hunger brings it back up.',
        ],
      },
    ],
    legendary: {
      uses: 2,
      actions: [
        {
          key: 'ground-shake',
          name: 'Ground Shake',
          icon: 'gi/GiStomp',
          save: {
            ability: 'dex',
            dc: 'str',
            target: { area: { shape: refs.rules.emanation, size: 20 } },
            onFail: { conditions: [refs.rules.prone] },
          },
          text: ['It slams the ground. Only creatures standing on the ground are affected.'],
        },
        {
          key: 'tunnel',
          name: 'Tunnel',
          icon: 'lucide/MoveUp',
          text: [
            'It moves up to half its ',
            { speed: 'burrow' },
            ' without provoking opportunity attacks.',
          ],
        },
      ],
    },
    source: {
      adaptedFrom: ['srd-2024_bulette'],
      changes:
        'An old bulette grown Huge: more hit points, two bites, legendary actions that shake the ground and tunnel, a leap that also works from underground, and a stomp the party can use to pull it up. Moss and fungus grow on its back.',
    },
  },
})

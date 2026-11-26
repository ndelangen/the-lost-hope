import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The 12th Marshal',
  avatar: '/assets/npcs/the-12th-marshal-portrait.png',
  species: 'Dragon',
  notes: [
    [
      'Alive and worshipped as a god by a group in the snowy mountains; said to greatly extend life.',
    ],
  ],
  memberships: [
    {
      organization: refs.organizations.marshals_court,
      status: 'active',
      rank: '12th Marshal',
    },
  ],
  stats: {
    size: 'gargantuan',
    type: 'dragon',
    cr: '20',
    ac: 20,
    armor: 'natural armor',
    hitDice: '18d20',
    speed: {
      walk: 40,
      burrow: 40,
      fly: 80,
      swim: 40,
    },
    scores: {
      str: 26,
      dex: 10,
      con: 26,
      int: 10,
      wis: 13,
      cha: 18,
    },
    saves: {
      dex: 'proficient',
      wis: 'proficient',
    },
    skills: {
      perception: 'expert',
      stealth: 'proficient',
    },
    senses: {
      blindsight: 60,
      darkvision: 120,
    },
    damageImmunities: [refs.rules.cold],
    abilities: [
      {
        key: 'ice-walk',
        name: 'Ice Walk',
        timing: 'trait',
        icon: 'lucide/Footprints',
        text: [
          'Moves across icy surfaces without an ability check; difficult terrain of ice or snow costs no extra movement.',
        ],
      },
      {
        key: 'worshipped',
        name: 'Worshipped',
        timing: 'trait',
        icon: 'gi/GiHolySymbol',
        text: [
          'Its worshippers within 120 ft. live far beyond their natural span and have ',
          refs.rules.advantage,
          ' on saves against being ',
          refs.rules.frightened,
          '.',
        ],
        effects: [],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If it fails a ', refs.rules.saving_throw, ', it can choose to succeed instead.'],
        uses: 4,
        recharge: 'Long rest',
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Three ',
          {
            ability: 'rend',
          },
          ' attacks.',
        ],
      },
      {
        key: 'rend',
        name: 'Rend',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 15,
          damage: [
            {
              dice: '2d8',
              type: refs.rules.slashing,
              addModifier: true,
            },
            {
              dice: '2d8',
              type: refs.rules.cold,
            },
          ],
        },
      },
      {
        key: 'cold-breath',
        name: 'Cold Breath',
        timing: 'action',
        icon: 'gi/GiIceBolt',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'con',
          target: { area: { shape: refs.rules.cone, size: 90 } },
          onFail: { damage: [{ dice: '14d8', type: refs.rules.cold }] },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
        effects: [],
      },
    ],
    legendary: {
      uses: 3,
      actions: [
        {
          key: 'frost-pounce',
          name: 'Frost Pounce',
          icon: 'gi/GiClaws',
          intent: 'damage',
          text: [
            'Moves up to ',
            {
              speed: 'walk',
              times: 0.5,
            },
            ' and makes one ',
            {
              ability: 'rend',
            },
            ' attack.',
          ],
        },
        {
          key: 'freezing-gaze',
          name: 'Freezing Gaze',
          icon: 'gi/GiIceBolt',
          save: {
            ability: 'con',
            dc: 'con',
            target: { creatures: 1, range: 60 },
            onFail: {
              also: [{ effect: 'frozen' }],
            },
          },
          effects: [
            {
              key: 'frozen',
              name: 'Held by ice',
              lands: { on: 'failed-save' },
              conditions: [refs.rules.restrained],
              text: ['Ice holds it.'],
              lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
            },
          ],
        },
      ],
    },
    source: {
      adaptedFrom: ['srd-2024_ancient-white-dragon'],
      changes:
        'A dragon governor worshipped in the snowy mountains: ancient white dragon numbers with a worshipper aura.',
    },
  },
})

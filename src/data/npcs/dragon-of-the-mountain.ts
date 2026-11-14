import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dragon of the Mountain',
  avatar: '/assets/npcs/dragon-of-the-mountain.png',
  location: refs.locations.mountain_top,
  species: 'Dragon',
  languages: ['Common'],
  notes: [
    [
      'A dragon dwelling atop the ',
      refs.locations.mountain_top,
      ', married to ',
      refs.npcs.misha,
      '. Its name, color, age, and draconic type (chromatic, metallic, gem, or other) are unknown, as is why it married an angel.',
    ],
  ],
  stats: {
    size: 'Huge',
    type: 'dragon',
    cr: '17',
    ac: 19,
    armor: 'natural armor',
    hitDice: '17d12',
    speed: {
      walk: 40,
      climb: 40,
      fly: 80,
    },
    scores: {
      str: 27,
      dex: 14,
      con: 25,
      int: 16,
      wis: 15,
      cha: 24,
    },
    saves: {
      dex: 'proficient',
      wis: 'proficient',
    },
    skills: {
      insight: 'proficient',
      perception: 'expert',
      persuasion: 'proficient',
      stealth: 'proficient',
    },
    senses: {
      blindsight: 60,
      darkvision: 120,
    },
    damageImmunities: [refs.rules.fire],
    abilities: [
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If it fails a saving throw, it can choose to succeed instead.'],
        uses: 3,
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
          reach: 10,
          damage: [
            {
              dice: '2d8',
              type: refs.rules.slashing,
              addModifier: true,
            },
            {
              dice: '1d8',
              type: refs.rules.fire,
            },
          ],
        },
      },
      {
        key: 'fire-breath',
        name: 'Fire Breath',
        timing: 'action',
        icon: 'gi/GiFireBreath',
        intent: 'damage',
        text: [
          'Each creature in a 60-ft. ',
          refs.rules.cone,
          ': Dexterity ',
          refs.rules.saving_throw,
          ', ',
          {
            dc: 'con',
          },
          '. Failure: 11d10 ',
          refs.rules.fire,
          ' damage. Success: ',
          refs.rules.half_damage,
          '.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'frightful-presence',
        name: 'Frightful Presence',
        timing: 'action',
        icon: 'gi/GiDragonBreath',
        text: [
          'Each creature of its choice within 120 ft.: Wisdom ',
          refs.rules.saving_throw,
          ', ',
          {
            dc: 'cha',
          },
          '. Failure: ',
          refs.rules.frightened,
          ' for 1 minute.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    legendary: {
      uses: 3,
      actions: [
        {
          key: 'tail-sweep',
          name: 'Tail Sweep',
          icon: 'gi/GiStomp',
          intent: 'damage',
          text: [
            'Makes one ',
            {
              ability: 'rend',
            },
            ' attack against a creature within 15 ft.',
          ],
        },
        {
          key: 'wing-buffet',
          name: 'Wing Buffet',
          icon: 'gi/GiBatWing',
          text: [
            'Each creature within 10 ft.: Strength saving throw, ',
            {
              dc: 'str',
            },
            '. Failure: ',
            refs.rules.prone,
            '. It then flies up to ',
            {
              speed: 'fly',
              times: 0.5,
            },
            '.',
          ],
        },
      ],
    },
    source: {
      adaptedFrom: ['srd-2024_adult-gold-dragon'],
      changes:
        'Its colour and kind are unknown, so it uses adult gold dragon numbers with fire breath and no weakening breath.',
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.adventures_in_the_forgotten_realms_the_hidden_page,
  monsters: {
    greater_shadow_horror: {
      name: 'Greater Shadow Horror',
      alignment: 'neutral evil',
      languages: [],
      appearance: [
        ['A formless thing made of living shadow, dull in reasoning yet strangely cunning.'],
      ],
      lore: [
        [
          "Tyreus conjured it as an example of the terrors from Ravnica's dark corners, and left it to keep trespassers out of his refuge unless he allows them in.",
        ],
        ['Sources: ', 'Adventures in the Forgotten Realms: The Hidden Page'],
      ],
      stats: {
        size: 'huge',
        type: 'aberration',
        cr: '12',
        ac: 13,
        hitDice: '20d12',
        speed: { walk: 40 },
        scores: { str: 14, dex: 16, con: 14, int: 2, wis: 17, cha: 18 },
        skills: { perception: 'proficient', stealth: 'expert' },
        senses: { darkvision: 120 },
        damageVulnerabilities: [rules.radiant],
        conditionImmunities: [rules.frightened],
        abilities: [
          {
            key: 'incorporeal-movement',
            name: 'Incorporeal Movement',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The horror can move through other creatures and objects as if they were 3. It takes ',
              { roll: '1d10' },
              ' force damage if it ends its turn inside an object.',
            ],
          },
          {
            key: 'legendary-resistance',
            name: 'Legendary Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['If the horror fails a saving throw, it can choose to succeed instead.'],
            uses: 2,
            recharge: 'Long rest',
          },
          {
            key: 'shadow-stealth',
            name: 'Shadow Stealth',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in dim light or darkness, the horror can take the Hide action as a bonus action.',
            ],
          },
          {
            key: 'shadow-stride',
            name: 'Shadow Stride',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'As a bonus action, the horror can step into a shadow within 5 feet of it and magically appear in an unoccupied space within 5 feet of a second shadow that is up to 60 feet away. Both shadows must be cast by a Medium or larger creature or object.',
            ],
          },
          {
            key: 'sunlight-sensitivity',
            name: 'Sunlight Sensitivity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the horror has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The horror makes three attacks: one with its bite and two with its claws.'],
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
              damage: [{ dice: '4d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '4d6', type: rules.slashing, addModifier: true }],
            },
            text: [
              'The target must succeed on a ',
              { dc: 'cha', save: 'wis' },
              ' Wisdom saving throw or be ',
              { effect: 'frightened-of-horror' },
              '.',
            ],
            effects: [
              {
                key: 'frightened-of-horror',
                name: 'Frightened of the horror',
                lands: { on: 'save', save: 'wis', dc: 'cha' },
                conditions: [rules.frightened],
                lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
              },
            ],
          },
          {
            key: 'lashing-shadows',
            name: 'Lashing Shadows',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            intent: 'damage',
            save: {
              ability: 'dex',
              dc: 'cha',
              target: { area: { shape: rules.emanation, size: 60 } },
              onFail: {
                damage: [{ dice: '8d8', type: rules.necrotic }],
              },
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
              key: 'claw-2',
              name: 'Claw',
              icon: 'gi/GiClaws',
              text: ['The horror makes a weapon attack.'],
            },
            {
              key: 'glide',
              name: 'Glide',
              icon: 'gi/GiMagicSwirl',
              text: ['The horror moves up to 20 feet without provoking opportunity attacks.'],
            },
            {
              key: 'frighten-foe',
              name: 'Frighten Foe',
              icon: 'gi/GiMagicSwirl',
              cost: 2,
              text: [
                'The horror targets one enemy it can see within 30 feet of it. If the target can see and hear it, the target must succeed on a ',
                { dc: 'cha', save: 'wis' },
                ' Wisdom saving throw or be ',
                { effect: 'frightened-foe' },
                '.',
              ],
              effects: [
                {
                  key: 'frightened-foe',
                  name: 'Frightened',
                  lands: { on: 'save', save: 'wis', dc: 'cha' },
                  conditions: [rules.frightened],
                  lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
                },
              ],
            },
          ],
        },
      },
    },
  },
})

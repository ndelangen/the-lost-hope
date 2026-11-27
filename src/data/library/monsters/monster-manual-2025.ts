import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.monster_manual_2025,
  monsters: {
    empyrean: {
      name: 'Empyrean',
      tags: ['titan'],
      alignment: 'neutral',
      languages: ['all'],
      habitats: ['any'],
      stats: {
        size: 'huge',
        type: 'celestial',
        cr: '23',
        ac: 22,
        hitDice: '21d12',
        speed: { walk: 50, fly: 50, swim: 50 },
        scores: { str: 30, dex: 21, con: 30, int: 21, wis: 22, cha: 27 },
        initiative: 'expert',
        saves: { str: 'proficient', wis: 'proficient' },
        skills: { insight: 'proficient', perception: 'proficient' },
        senses: { truesight: 120 },
        damageResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        damageImmunities: [rules.necrotic, rules.radiant],
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            text: [
              'As a Magic action, the empyrean casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save ',
              { dc: 'cha' },
              '): At will: ',
              refs.spells.calm_emotions,
              ', ',
              refs.spells.greater_restoration,
              ', ',
              refs.spells.pass_without_trace,
              ', ',
              refs.spells.water_breathing,
              '; 1/day each: ',
              refs.spells.commune,
              ', ',
              refs.spells.dispel_evil_and_good,
              ', ',
              refs.spells.plane_shift,
            ],
            effects: [],
          },
          {
            key: 'legendary-resistance',
            name: 'Legendary Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['If the empyrean fails a saving throw, it can choose to succeed instead.'],
            uses: 4,
            recharge: 'Long rest',
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The empyrean has Advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The empyrean makes two attacks, using ',
              { ability: 'sacred-weapon' },
              ' or ',
              { ability: 'divine-ray' },
              ' in any combination.',
            ],
          },
          {
            key: 'sacred-weapon',
            name: 'Sacred Weapon',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '6d6', type: rules.force, addModifier: true }],
            },
            text: [
              'The target has the ',
              { effect: 'sacred-stun' },
              '. The target can choose not to be ',
              rules.stunned,
              ', in which case it takes an extra 21 Force damage that bypasses Resistance or Immunity.',
            ],
            effects: [
              {
                key: 'sacred-stun',
                name: 'Stunned by sacred weapon',
                lands: { on: 'hit' },
                conditions: [rules.stunned],
                lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
              },
            ],
          },
          {
            key: 'divine-ray',
            name: 'Divine Ray',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'cha',
              range: [600, 600],
              damage: [{ dice: '6d8', type: rules.necrotic, addModifier: true }],
            },
            text: ["Or Radiant damage (empyrean's choice)."],
          },
        ],
        legendary: {
          uses: 3,
          actions: [
            {
              key: 'bolster',
              name: 'Bolster',
              icon: 'gi/GiMagicSwirl',
              text: [
                "The empyrean gains 10 Temporary Hit Points, and the empyrean and each ally within 30 feet of it gain Advantage on D20 Tests until the end of the empyrean's next turn. The empyrean can't take this action again until the start of its next turn.",
              ],
            },
            {
              key: 'shockwave-of-glory',
              name: 'Shockwave of Glory',
              icon: 'gi/GiMagicSwirl',
              intent: 'damage',
              save: {
                ability: 'con',
                dc: 'cha',
                target: { area: { shape: rules.emanation, size: 30 } },
                onFail: {
                  damage: [{ dice: '6d8', type: rules.force }],

                  also: [{ effect: 'shockwave-prone' }],
                },
                onSuccess: 'half',
              },
              text: [
                "Failure or Success: The empyrean can't take this action again until the start of its next turn.",
              ],
              effects: [
                {
                  key: 'shockwave-prone',
                  name: 'Knocked prone',
                  lands: { on: 'failed-save' },
                  conditions: [rules.prone],
                  lasts: { kind: 'until-removed' },
                },
              ],
            },
            {
              key: 'smite',
              name: 'Smite',
              icon: 'gi/GiMagicSwirl',
              text: ['The empyrean makes one ', { ability: 'divine-ray' }, ' attack.'],
            },
          ],
        },
      },
    },
  },
})

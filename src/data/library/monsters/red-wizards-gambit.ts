import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.red_wizards_gambit,
  monsters: {
    riall: {
      name: "Ri'all",
      alignment: 'neutral evil',
      languages: ['Common'],
      habitats: ['any'],
      tableNotes: [['Gear: splint armor']],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '8',
        ac: 17,
        hitDice: '15d8',
        speed: { walk: 30 },
        scores: { str: 19, dex: 12, con: 18, int: 12, wis: 16, cha: 14 },
        initiative: 'proficient',
        saves: { con: 'proficient', wis: 'proficient' },
        skills: { insight: 'proficient', perception: 'proficient', religion: 'proficient' },
        conditionImmunities: [
          rules.blinded,
          rules.charmed,
          rules.deafened,
          rules.exhaustion,
          rules.frightened,
          rules.grappled,
          rules.incapacitated,
          rules.invisible,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
          rules.prone,
          rules.restrained,
          rules.stunned,
          rules.unconscious,
        ],
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            text: [
              'As a Magic action, the cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save ',
              { dc: 'wis' },
              '): At will: ',
              refs.spells.speak_with_dead,
              ', ',
              refs.spells.thaumaturgy,
            ],
          },
          {
            key: 'immunities-and-saves',
            name: 'Immunities and Saves',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ["Ri'all automatically succeeds on all saving throws."],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              "Ri'all makes three attacks, using ",
              { ability: 'dread-scythe' },
              ' or ',
              { ability: 'deathly-ray' },
              ' in any combination.',
            ],
          },
          {
            key: 'dread-scythe',
            name: 'Dread Scythe',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [
                { dice: '1d10', type: rules.slashing, addModifier: true },
                { dice: '2d10', type: rules.necrotic },
              ],
            },
            text: ["The target can't regain Hit Points until the end of its next turn."],
          },
          {
            key: 'deathly-ray',
            name: 'Deathly Ray',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'wis',
              range: [120, 120],
              damage: [{ dice: '4d10', type: rules.necrotic }],
            },
          },
          {
            key: 'spirit-wail',
            name: 'Spirit Wail',
            timing: 'bonus action',
            icon: 'gi/GiMagicSwirl',
            intent: 'damage',
            save: {
              ability: 'wis',
              dc: 'wis',
              target: { area: { shape: rules.emanation, size: 20 } },
              onFail: {
                damage: [{ dice: '2d6', type: rules.psychic }],
                also: [
                  'The target has the ',
                  rules.frightened,
                  ' condition until the end of its next turn.',
                ],
              },
              onSuccess: 'half',
            },
            uses: 1,
            recharge: 'Recharge 5–6',
          },
        ],
      },
    },
  },
})

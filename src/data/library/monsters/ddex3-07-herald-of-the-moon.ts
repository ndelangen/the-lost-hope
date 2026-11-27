import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_07_herald_of_the_moon,
  monsters: {
    drow_elite_warrior: {
      name: 'Drow Elite Warrior',
      reprintedIn: [
        refs.publications.critical_role_call_of_the_netherdeep,
        refs.publications.icewind_dale_rime_of_the_frostmaiden,
        refs.publications.monster_manual_2014,
        refs.publications.phandelver_and_below_the_shattered_obelisk,
        refs.publications.waterdeep_dragon_heist,
        refs.publications.waterdeep_dungeon_of_the_mad_mage,
      ],
      tags: ['elf'],
      alignment: 'neutral evil',
      languages: ['Elvish', 'Undercommon'],
      appearance: [
        [
          'A lean drow in studded leather with a shield, a shortsword in one hand and a hand crossbow ready, its blades and bolts dark with poison.',
        ],
      ],
      lore: [
        [
          'Elite warriors defend their house and its superiors against all enemies and specialise in fighting dwarves, gnomes and elves, other drow included. They often raid surface settlements. They coat blades and bolts with a drow poison that can knock a victim out, because they look forward to the interrogation and torture that follows a fight.',
        ],
        ['Sources: ', 'Monster Manual (2014), p. 128'],
      ],
      habitats: ['Underdark'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '5',
        ac: 18,
        armor: 'studded leather, shield',
        hitDice: '11d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 18, con: 14, int: 11, wis: 13, cha: 12 },
        saves: { dex: 'proficient', con: 'proficient', wis: 'proficient' },
        skills: { perception: 'proficient', stealth: 'expert' },
        senses: { darkvision: 120 },
        abilities: [
          {
            key: 'fey-ancestry',
            name: 'Fey Ancestry',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The drow has advantage on saving throws against being ',
              rules.charmed,
              ', and magic can’t put the drow to sleep.',
            ],
            effects: [],
          },
          {
            key: 'innate-spellcasting',
            name: 'Innate Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'The drow’s spellcasting ability is Charisma (spell save ',
              { dc: 'cha' },
              '). It can innately cast the following spells, requiring no material components: At will: ',
              refs.spells.dancing_lights_srd_5_1,
              '; 1/day each: ',
              refs.spells.darkness_srd_5_1,
              ', ',
              refs.spells.faerie_fire_srd_5_1,
              ', ',
              refs.spells.levitate_srd_5_1,
              ' (self only)',
            ],
            effects: [],
          },
          {
            key: 'sunlight-sensitivity',
            name: 'Sunlight Sensitivity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The drow makes two shortsword attacks.'],
          },
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 10,
              damage: [
                { dice: '1d6', type: rules.piercing, addModifier: true },
                { dice: '3d6', type: rules.poison },
              ],
            },
          },
          {
            key: 'hand-crossbow',
            name: 'Hand Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            text: [
              'The target must succeed on a ',
              { dc: 'con' },
              ' Constitution saving throw or be ',
              { effect: 'poisoned' },
              '. The target wakes up if it takes damage or if another creature takes an action to shake it awake.',
            ],
            effects: [
              {
                key: 'poisoned',
                name: 'Poisoned',
                lands: { on: 'save', save: 'con', dc: 'con' },
                conditions: [rules.poisoned],
                text: [
                  'If the saving throw fails by 5 or more, the target is also ',
                  rules.unconscious,
                  ' while ',
                  rules.poisoned,
                  ' in this way.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'hour' },
              },
            ],
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The drow adds 3 to its AC against one melee attack that would hit it. To do so, the drow must see the attacker and be wielding a melee weapon.',
            ],
          },
        ],
      },
    },
  },
})

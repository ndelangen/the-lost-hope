import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_04_dues_for_the_dead,
  monsters: {
    rorreth_red_wizard: {
      name: 'Rorreth (Red Wizard)',
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common', 'Draconic', 'Dwarvish', 'Elvish'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 9, dex: 14, con: 11, int: 17, wis: 12, cha: 11 },
        saves: { int: 'proficient', wis: 'proficient' },
        skills: { arcana: 'proficient', history: 'proficient' },
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'Spellcasting. The red wizard is a 4th-level spellcaster. Its spellcasting ability is Intelligence (spell save ',
              { dc: 'int' },
              ', ',
              { toHit: 'int' },
              ' to hit with spell attacks). The mage has the following wizard spells prepared: Cantrips (at will): ',
              refs.spells.light_srd_5_1,
              ', fireblast, ',
              refs.spells.shocking_grasp_srd_5_1,
              '; 1st level (4 slots): ',
              refs.spells.shield_srd_5_1,
              ', ',
              refs.spells.mage_armor_srd_5_1,
              ', ',
              refs.spells.magic_missile_srd_5_1,
              '; 2nd level (3 slots): ',
              refs.spells.invisibility_srd_5_1,
              ', ',
              refs.spells.misty_step_srd_5_1,
            ],
            effects: [],
          },
          {
            key: 'quarterstaff',
            name: 'Quarterstaff',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    skeleton: {
      name: 'Skeleton',
      alignment: 'lawful evil',
      languages: ['understands all languages it knew in life but can’t speak'],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1/4',
        ac: 13,
        armor: 'armor scraps',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        damageVulnerabilities: [rules.bludgeoning],
        conditionImmunities: [rules.exhaustion, rules.poisoned],
        abilities: [
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})

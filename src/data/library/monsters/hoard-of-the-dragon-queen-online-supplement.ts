import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.hoard_of_the_dragon_queen_online_supplement,
  monsters: {
    yuan_ti_pureblood: {
      name: 'Yuan-ti Pureblood',
      reprintedIn: [
        refs.publications.rise_of_tiamat_online_supplement,
        refs.publications.tomb_of_annihilation,
        refs.publications.waterdeep_dungeon_of_the_mad_mage,
      ],
      tags: ['yuan-ti'],
      alignment: 'neutral evil',
      languages: ['Abyssal', 'Common', 'Draconic'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 11,
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 12, con: 11, int: 13, wis: 12, cha: 14 },
        skills: { deception: 'expert', perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'innate-spellcasting',
            name: 'Innate Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'The yuan-ti’s spellcasting ability is Charisma (spell save ',
              { dc: 'cha' },
              '). The yuan-ti can innately cast the following spells, requiring no material components: At will: ',
              refs.spells.animal_friendship_srd_5_1,
              ' (snakes only); 3/day each: ',
              refs.spells.poison_spray_srd_5_1,
              ', ',
              refs.spells.suggestion_srd_5_1,
            ],
            effects: [],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The yuan-ti has advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The yuan-ti makes two melee attacks.'],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'shortbow',
            name: 'Shortbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [80, 320],
              damage: [
                { dice: '1d6', type: rules.piercing, addModifier: true },
                { dice: '2d6', type: rules.poison },
              ],
            },
          },
        ],
      },
    },
  },
})

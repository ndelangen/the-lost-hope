import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.red_dragon_s_tale_a_lego_adventure,
  monsters: {
    ervan_soulfallen: {
      name: 'Ervan Soulfallen',
      tags: ['human'],
      alignment: 'chaotic evil',
      languages: ['Common', 'Draconic'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '5',
        ac: 12,
        hitDice: '13d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 14, int: 11, wis: 8, cha: 17 },
        skills: { deception: 'proficient' },
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            text: [
              'As an action, ervan casts one of the following spells, using Charisma as the spellcasting ability (spell save ',
              { dc: 'cha' },
              '): At will: ',
              refs.spells.light_srd_5_1,
              ', ',
              refs.spells.mage_hand_srd_5_1,
              '; 2/day: ',
              refs.spells.dimension_door_srd_5_1,
              '; 1/day each: ',
              refs.spells.disguise_self_srd_5_1,
              ', ',
              refs.spells.levitate_srd_5_1,
              ', ',
              refs.spells.mage_armor_srd_5_1,
            ],
            effects: [],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Ervan uses his staff to make three ', { ability: 'arcane-blast' }, ' attacks.'],
          },
          {
            key: 'arcane-blast',
            name: 'Arcane Blast',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'cha',
              reach: 5,
              thrown: [120, 120],
              damage: [{ dice: '3d6', type: rules.force, addModifier: true }],
            },
          },
          {
            key: 'acid-rain-recharges-after-a-short-or-long-rest',
            name: 'Acid Rain (Recharges after a Short or Long Rest)',
            timing: 'action',
            icon: 'gi/GiBull',
            intent: 'damage',
            save: {
              ability: 'dex',
              dc: 'cha',
              target: { area: { shape: rules.sphere, size: 10 } },
              onFail: {
                damage: [{ dice: '4d10', type: rules.acid }],
              },
              onSuccess: 'half',
            },
            text: [
              'Acid falls in a 10-foot-radius, 20-foot-high cylinder centered on a point Ervan can see within 120 feet of himself.',
            ],
            effects: [],
          },
        ],
      },
    },
  },
})

import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_07_drums_in_the_marsh,
  monsters: {
    lizardfolk_shaman: {
      name: 'Lizardfolk Shaman',
      reprintedIn: [refs.publications.ddex1_12_raiders_of_the_twilight_marsh],
      tags: ['lizardfolk'],
      alignment: 'neutral',
      languages: ['Draconic'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 13,
        armor: 'natural armor',
        hitDice: '5d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 15, dex: 10, con: 13, int: 10, wis: 15, cha: 8 },
        skills: { perception: 'proficient', stealth: 'expert', survival: 'expert' },
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'Spellcasting (Lizardfolk Form Only). The lizardfolk is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save ',
              { dc: 'wis' },
              ', ',
              { toHit: 'wis' },
              ' to hit with spell attacks). The lizardfolk has the following druid spells prepared: Cantrips (at will): ',
              refs.spells.druidcraft_srd_5_1,
              ', ',
              refs.spells.produce_flame_srd_5_1,
              ', thorn whip; 1st Level (4 slots): ',
              refs.spells.entangle_srd_5_1,
              ', ',
              refs.spells.fog_cloud_srd_5_1,
              '; 2nd Level (3 slots): ',
              refs.spells.heat_metal_srd_5_1,
              ', ',
              refs.spells.spike_growth_srd_5_1,
              '; 3rd Level (2 slots): ',
              refs.spells.conjure_animals_srd_5_1,
              ' (reptiles only), ',
              refs.spells.plant_growth_srd_5_1,
            ],
            effects: [],
          },
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The lizardfolk can hold its breath for 15 minutes.'],
          },
          {
            key: 'multiattack-lizardfolk-form-only',
            name: 'Multiattack (Lizardfolk Form Only)',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The lizardfolk makes two attacks: one with its bite and one with its claws.'],
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
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Or ',
              { roll: '1d10', mod: 'str' },
              ' piercing damage in crocodile form. If the lizardfolk is in crocodile form and the target is a Large or smaller creature, the target is ',
              { effect: 'croc-grapple' },
              '.',
            ],
            effects: [
              {
                key: 'croc-grapple',
                name: 'Grappled in crocodile jaws',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.restrained],
                text: [
                  'The lizardfolk can’t bite another target. If the lizardfolk reverts to its true form, the grapple ends.',
                ],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 12 } },
              },
            ],
          },
          {
            key: 'claws-lizardfolk-form-only',
            name: 'Claws (Lizardfolk Form Only)',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'change-shape-recharges-after-a-short-or-long-rest',
            name: 'Change Shape (Recharges after a Short or Long Rest)',
            timing: 'action',
            icon: 'gi/GiBull',
            text: [
              'The lizardfolk magically polymorphs into a crocodile, remaining in that form for up to 1 hour. It can revert to its true form as a bonus action. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn’t transformed. It reverts to its true form if it dies.',
            ],
          },
        ],
      },
    },
  },
})

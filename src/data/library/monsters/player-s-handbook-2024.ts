import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.player_s_handbook_2024,
  monsters: {
    aberrant_spirit: {
      name: 'Aberrant Spirit',
      page: 322,
      alignment: 'neutral',
      languages: ['Deep Speech', 'understands the languages you know'],
      stats: {
        scaling: {
          by: 'spell',
          of: 'Summon Aberration',
          min: 4,
          max: 9,
          ac: { base: 11, level: 1 },
          hitPoints: { base: 40, level: 10, above: 4 },
          attackBonus: 'spell-attack',
          damageBonus: { base: 3, level: 1 },
          saveDc: 'spell-save-dc',
          attacks: { level: 0.5 },
        },
        options: [
          {
            key: 'beholderkin',
            name: 'Beholderkin',
            form: true,
            speed: { fly: 30 },
            abilities: [
              {
                key: 'eye-ray',
                name: 'Eye Ray',
                timing: 'action',
                icon: 'gi/GiEyeTarget',
                intent: 'damage',
                attack: {
                  kind: 'ranged',
                  ability: 'int',
                  range: [150, 150],
                  damage: [{ dice: '1d8', type: rules.psychic, addModifier: true }],
                },
                text: [],
              },
            ],
          },
          {
            key: 'mind-flayer',
            name: 'Mind Flayer',
            form: true,
            abilities: [
              {
                key: 'whispering-aura',
                name: 'Whispering Aura',
                timing: 'trait',
                icon: 'gi/GiPsychicWaves',
                intent: 'damage',
                save: {
                  ability: 'wis',
                  dc: 'int',
                  target: { area: { shape: rules.emanation, size: 5 } },
                  onFail: { damage: [{ dice: '2d6', type: rules.psychic }] },
                },
                text: [
                  "At the start of each of the spirit's turns, the spirit emits psionic energy if it doesn't have the ",
                  rules.incapacitated,
                  ' condition. Each creature other than you within 5 feet of the spirit saves.',
                ],
              },
              {
                key: 'psychic-slam',
                name: 'Psychic Slam',
                timing: 'action',
                icon: 'gi/GiPsychicWaves',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'int',
                  reach: 5,
                  damage: [{ dice: '1d8', type: rules.psychic, addModifier: true }],
                },
                text: [],
              },
            ],
          },
          {
            key: 'slaad',
            name: 'Slaad',
            form: true,
            abilities: [
              {
                key: 'regeneration',
                name: 'Regeneration',
                timing: 'trait',
                icon: 'gi/GiHealthIncrease',
                text: [
                  'The spirit regains 5 Hit Points at the start of its turn if it has at least 1 Hit Point.',
                ],
              },
              {
                key: 'claw',
                name: 'Claw',
                timing: 'action',
                icon: 'gi/GiClaws',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'int',
                  reach: 5,
                  damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
                },
                text: [
                  "The target can't regain Hit Points until the start of the spirit's next turn.",
                ],
              },
            ],
          },
        ],
        size: 'medium',
        type: 'aberration',
        cr: '0',
        ac: 11,
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 10, con: 15, int: 16, wis: 10, cha: 6 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.psychic],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of attacks equal to half this spell's level (round down).",
            ],
          },
        ],
      },
    },
  },
})

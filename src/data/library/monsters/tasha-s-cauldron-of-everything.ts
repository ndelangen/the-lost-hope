import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.tasha_s_cauldron_of_everything,
  monsters: {
    juvenile_mimic: {
      name: 'Juvenile Mimic',
      tags: ['shapechanger'],
      alignment: 'unaligned',
      languages: ['Common', 'Undercommon', 'telepathy 120 ft'],
      stats: {
        size: 'tiny',
        type: 'monstrosity',
        cr: '0',
        ac: 11,
        hitDice: '2d4',
        speed: { walk: 10, climb: 10 },
        scores: { str: 1, dex: 12, con: 13, int: 10, wis: 13, cha: 10 },
        skills: { stealth: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.acid],
        conditionImmunities: [rules.prone],
        abilities: [
          {
            key: 'false-appearance-object-form-only',
            name: 'False Appearance (Object Form Only)',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the mimic remains motionless, it is indistinguishable from an ordinary object.',
            ],
          },
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'The mimic can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
            ],
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
              damage: [{ dice: '1d4', type: rules.acid }],
            },
          },
          {
            key: 'shape-shift',
            name: 'Shape-Shift',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              "The mimic polymorphs into an object or back into its true, amorphous form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.",
            ],
          },
        ],
      },
    },
    reflection: {
      name: 'Reflection',
      alignment: 'chaotic evil',
      languages: [],
      habitats: ['underdark', 'urban'],
      stats: {
        size: 'medium',
        type: 'fey',
        cr: '1/2',
        ac: 12,
        hitDice: '3d8',
        speed: { walk: 40 },
        scores: { str: 6, dex: 14, con: 13, int: 6, wis: 10, cha: 8 },
        skills: { stealth: 'proficient' },
        senses: { darkvision: 60 },
        damageResistances: [rules.acid, rules.cold, rules.fire, rules.lightning, rules.thunder],
        damageImmunities: [rules.necrotic, rules.poison],
        damageVulnerabilities: [rules.bludgeoning],
        conditionImmunities: [
          rules.exhaustion,
          rules.frightened,
          rules.grappled,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
          rules.prone,
          rules.restrained,
        ],
        nonmagicalResistances: [rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'amorphous',
            name: 'Amorphous',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The reflection can move through a space as narrow as 1 inch wide without squeezing.',
            ],
          },
          {
            key: 'shadow-stealth',
            name: 'Shadow Stealth',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in dim light or darkness, the reflection can take the Hide action as a bonus action. Its stealth bonus is also improved to +6.',
            ],
          },
          {
            key: 'sunlight-weakness',
            name: 'Sunlight Weakness',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the reflection has disadvantage on attack rolls, ability checks, and saving throws.',
            ],
          },
          {
            key: 'strength-drain',
            name: 'Strength Drain',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.necrotic, addModifier: true }],
            },
            text: [
              "The target's Strength score is reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest. If a non-evil humanoid dies from this attack, a new reflection rises from the corpse 1d4 hours later.",
            ],
          },
        ],
      },
    },
  },
})

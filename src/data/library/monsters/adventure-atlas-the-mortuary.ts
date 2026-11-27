import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.adventure_atlas_the_mortuary,
  monsters: {
    animated_coffin: {
      name: 'Animated Coffin',
      alignment: 'unaligned',
      languages: ["understands the languages of its creator but can't speak"],
      stats: {
        size: 'large',
        type: 'construct',
        cr: '3',
        ac: 16,
        armor: 'natural armor',
        hitDice: '8d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 16, dex: 12, con: 15, int: 3, wis: 11, cha: 3 },
        senses: { blindsight: 60 },
        damageImmunities: [rules.poison, rules.psychic],
        conditionImmunities: [
          rules.blinded,
          rules.charmed,
          rules.deafened,
          rules.exhaustion,
          rules.frightened,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
        ],
        abilities: [
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "If the animated coffin is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the coffin move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the coffin is animate.",
            ],
          },
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'The animated coffin can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The animated coffin makes two ', { ability: 'slam' }, ' attacks.'],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'entrap',
            name: 'Entrap',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d6', type: rules.piercing }],
            },
            text: [
              'At the start of each of its turns. The animated coffin can grapple only one creature at a time.',
            ],
          },
        ],
      },
    },
    heralds_of_dust_exorcist: {
      name: 'Heralds of Dust Exorcist',
      alignment: 'any alignment',
      languages: ['Common plus three more languages'],
      appearance: [
        [
          'An exorcist of the Dust faction carries a staff that shoots bolts of death or radiant force at spirits.',
        ],
      ],
      lore: [
        [
          "Unafraid of death, these exorcists purify creatures and burial grounds plagued by ghosts, specters and similar hostile presences that stop the dead being laid down or disturb those at peace. Most work in the Mortuary, but many answer calls across Sigil and beyond. Experience with apparitions lets them channel death's forces to protect the living, talk to the dead and send hostile spirits to their rest. Their sight reaches past the veil, spotting ghosts drifting on the Ethereal Plane and shadowy incorporeal things, and a brief chant can drive a harmful entity out of a possessed creature or leave it open to a painful spiritual haunting.",
        ],
        ['Sources: ', 'Adventure Atlas: The Mortuary'],
      ],
      habitats: ['Sigil'],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '6',
        ac: 13,
        hitDice: '15d8',
        speed: { walk: 30 },
        scores: { str: 8, dex: 16, con: 16, int: 17, wis: 14, cha: 11 },
        saves: { int: 'proficient', wis: 'proficient', cha: 'proficient' },
        skills: { arcana: 'proficient', perception: 'proficient', religion: 'proficient' },
        senses: { truesight: 60 },
        damageResistances: [rules.necrotic],
        conditionImmunities: [rules.charmed, rules.frightened],
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            text: [
              'As an action, the exorcist casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save ',
              { dc: 'int' },
              ', ',
              { toHit: 'int' },
              ' to hit with spell attacks): At will: ',
              refs.spells.detect_evil_and_good_srd_5_1,
              ', ',
              refs.spells.mage_armor_srd_5_1,
              ' (self only), ',
              refs.spells.mage_hand_srd_5_1,
              '; 2/day each: ',
              refs.spells.protection_from_evil_and_good_srd_5_1,
              ', ',
              refs.spells.remove_curse_srd_5_1,
              ', ',
              refs.spells.speak_with_dead_srd_5_1,
              '; 1/day each: ',
              refs.spells.banishment_srd_5_1,
              ', ',
              refs.spells.dispel_evil_and_good_srd_5_1,
            ],
            effects: [],
          },
          {
            key: 'incorruptible-vessel',
            name: 'Incorruptible Vessel',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ["The exorcist can't be possessed by Celestials, Fiends, or Undead."],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The exorcist makes two ', { ability: 'grave-burst' }, ' attacks.'],
          },
          {
            key: 'grave-burst',
            name: 'Grave Burst',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'int',
              reach: 5,
              thrown: [120, 120],
              damage: [{ dice: '3d10', type: rules.necrotic, addModifier: true }],
            },
            text: ["Or radiant damage (exorcist's choice)."],
          },
          {
            key: 'admit-entity',
            name: 'Admit Entity',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            intent: 'damage',
            save: {
              ability: 'cha',
              dc: 'int',
              target: { creatures: 1, range: 60 },
              onFail: {
                damage: [{ dice: '8d8', type: rules.psychic }],

                also: [{ effect: 'retching' }],
              },
            },
            text: [
              'The exorcist thins the veil of death for a creature it can see within 60 feet of itself, exposing the target to malevolent entities. On a successful save, the target takes half as much damage only.',
            ],
            effects: [
              {
                key: 'retching',
                name: 'Incapacitated',
                lands: { on: 'failed-save' },
                conditions: [rules.incapacitated],
                text: [
                  'during which time it retches and babbles incoherently in a voice that is not its own.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
                ends: { repeatSave: ['end-of-turn'] },
              },
            ],
            uses: 1,
            recharge: 'Recharge 5–6',
          },
        ],
      },
    },
  },
})

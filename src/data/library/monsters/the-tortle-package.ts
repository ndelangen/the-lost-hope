import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.the_tortle_package,
  monsters: {
    decapus: {
      name: 'Decapus',
      alignment: 'unaligned',
      languages: [],
      appearance: [
        [
          'A long-limbed creature hangs from a branch or ceiling, with suckered tentacles dangling beneath it, each about ten feet long.',
        ],
      ],
      lore: [
        [
          'A solitary carnivore that swings through trees and snatches prey with its tentacles. It climbs walls and ceilings the same way, and prefers to dangle from one tentacle by a high perch while striking with the rest. On flat ground it is far less dangerous, since half the tentacles must hold its body up. A marine variant exists that lives and breathes only in water and swims well.',
        ],
        ['Sources: ', 'The Tortle Package'],
      ],
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '4',
        ac: 14,
        armor: 'natural armor',
        hitDice: '10d10',
        speed: { walk: 15, climb: 30 },
        scores: { str: 15, dex: 14, con: 14, int: 4, wis: 10, cha: 7 },
        skills: { athletics: 'proficient', perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The decapus makes two attacks: one with its bite and one with its tentacles.'],
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
              damage: [{ dice: '2d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'tentacles',
            name: 'Tentacles',
            timing: 'action',
            icon: 'gi/GiTentacleStrike',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '9d4', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Or ',
              { roll: '5d4', mod: 'str' },
              ' bludgeoning damage if the decapus is grappling a creature other than the target or if the decapus is on the ground or floor. The target is also ',
              { effect: 'tentacle-grab' },
              ' unless the decapus is already grappling a creature.',
            ],
            effects: [
              {
                key: 'tentacle-grab',
                name: 'Grabbed',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.restrained],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 14 } },
              },
            ],
          },
        ],
      },
    },
    geonid: {
      name: 'Geonid',
      alignment: 'neutral',
      languages: [],
      appearance: [
        [
          'A small boulder with a hole in its underside from which limbs emerge. When the limbs are tucked in, it looks just like a rock.',
        ],
      ],
      lore: [
        [
          'Also called rocklings or rock hermits, small intelligent beings from the Elemental Plane of Earth. Curled up it cannot see and relies on tremorsense. They dwell in natural caverns and passages, feeding on small vermin such as lizards, rats and slugs along with lichen and moss, and like hoarding coins and gems. They rarely face larger creatures except to rob or frighten them. They can read stone to sense who has recently passed, vaguely and without identity or exact timing, which they use for tracking prey and spotting trespassers.',
        ],
        ['Sources: ', 'The Tortle Package'],
      ],
      habitats: ['Caves'],
      stats: {
        size: 'small',
        type: 'elemental',
        cr: '1/4',
        ac: 17,
        armor: 'natural armor',
        hitDice: '4d6',
        speed: { walk: 30 },
        scores: { str: 12, dex: 10, con: 16, int: 9, wis: 14, cha: 11 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60, tremorsense: 30 },
        abilities: [
          {
            key: 'boulder-guise',
            name: 'Boulder Guise',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "While fully withdrawn into its shell, the geonid can't see and is indistinguishable from a small boulder",
            ],
          },
          {
            key: 'club',
            name: 'Club',
            timing: 'action',
            icon: 'gi/GiSpikedBat',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'stone-tell',
            name: 'Stone Tell',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The geonid touches a stone object or surface and knows what types of creatures have been within 10 feet of that stone in the past 24 hours. The geonid can also determine the number of creatures of each type, but not their identities.',
            ],
          },
        ],
      },
    },
    topi: {
      name: 'Topi',
      alignment: 'chaotic evil',
      languages: ["understands the languages it knew in life but can't speak"],
      appearance: [
        [
          'A tiny, spongy corpse that stands barely knee high and walks like a zombie. Something coils in its chest where the heart should be.',
        ],
      ],
      lore: [
        [
          'A zombie variant made by evil priests and necromancers. The corpse is shrunk, and its heart is replaced by a leather pouch holding a living venomous snake that needs no food or air. The snake is what makes the claws poisonous, and it dies when the topi does. Topis shrug off blunt blows better than ordinary zombies and are harder to turn away.',
        ],
        ['Sources: ', 'The Tortle Package'],
      ],
      stats: {
        size: 'small',
        type: 'undead',
        cr: '1/2',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d6',
        speed: { walk: 30 },
        scores: { str: 7, dex: 15, con: 12, int: 6, wis: 10, cha: 5 },
        senses: { darkvision: 60 },
        damageResistances: [rules.bludgeoning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'turn-resistance',
            name: 'Turn Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['The topi has advantage on saving throws against any effect that turns undead.'],
          },
          {
            key: 'undead-fortitude',
            name: 'Undead Fortitude',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If damage reduces the topi to 0 hit points, it must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, the topi drops to 1 hit point instead.',
            ],
          },
          {
            key: 'venomous-claws',
            name: 'Venomous Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [
                { dice: '1d4', type: rules.slashing, addModifier: true },
                { dice: '1d4', type: rules.poison },
              ],
            },
            text: [
              'The target must succeed on a ',
              { dc: 'con' },
              ' Constitution saving throw or be ',
              { effect: 'poisoned' },
              '.',
            ],
            effects: [
              {
                key: 'poisoned',
                name: 'Poisoned',
                lands: { on: 'save', save: 'con', dc: 'con' },
                conditions: [rules.poisoned],
                lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
              },
            ],
          },
        ],
      },
    },
  },
})

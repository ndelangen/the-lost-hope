import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.the_wild_beyond_the_witchlight,
  monsters: {
    bullywug_knight: {
      name: 'Bullywug Knight',
      page: 231,
      alignment: 'typically lawful good',
      languages: ['Bullywug', 'Common.'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 18,
        hitDice: '12d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 16, dex: 12, con: 13, int: 9, wis: 11, cha: 14 },
        saves: { con: 'proficient', wis: 'proficient' },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The knight breathes air and water.'],
          },
          {
            key: 'speak-with-frogs-and-toads',
            name: 'Speak with Frogs and Toads',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['When speaking Bullywug, it can communicate simple ideas to frogs and toads.'],
          },
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'It can long jump up to 20 ft. or high jump up to 10 ft. without a running start.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'glaive' }, ' attacks.'],
          },
          {
            key: 'glaive',
            name: 'Glaive',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'croak-of-charming-recharges-after-a-short-or-long-rest',
            name: 'Croak of Charming (recharges after a short or long rest)',
            timing: 'bonus action',
            icon: 'gi/GiBull',
            text: [
              'Target one creature the knight can see within 30 ft. The knight croaks loudly. The target must pass a ',
              { dc: 'cha', save: 'wis' },
              ' Wisdom save or become ',
              rules.charmed,
              ' through the end of its next turn.',
            ],
          },
        ],
      },
    },
    giant_dragonfly: {
      name: 'Giant Dragonfly',
      page: 234,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Witchlight Carnival', 'Ponds'],
      appearance: [
        [
          'A metallic blue-green dragonfly with large compound eyes, four clear veined wings and a long, tapered abdomen.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 16,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 10, fly: 60 },
        scores: { str: 15, dex: 18, con: 11, int: 3, wis: 10, cha: 3 },
        abilities: [
          {
            key: 'drone',
            name: 'Drone',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Its wingbeats can be heard as a loud drone up to 120 ft. away.'],
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
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'uncanny-dodge',
            name: 'Uncanny Dodge',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The dragonfly halves the damage from an attack against it if it can see the attacker.',
            ],
          },
        ],
      },
    },
    giant_snail: {
      name: 'Giant Snail',
      page: 234,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Witchlight Carnival'],
      appearance: [
        [
          'A russet-brown snail with long eyestalks, a broad muscular foot and a sturdy brown spiral shell with a dark band.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 11,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 10, climb: 10 },
        scores: { str: 15, dex: 3, con: 11, int: 3, wis: 10, cha: 3 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'salt-osmosis',
            name: 'Salt Osmosis',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Starting its turn in contact with at least 1 pound of salt deals the snail 1d4 necrotic damage. A creature can use an action to sprinkle 1 pound of salt on the snail. Provided the snail has not withdrawn into its shell, it takes 1d4 necrotic damage immediately and another 1d4 necrotic damage at the start of its next turn, when the salt rubs off.',
            ],
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
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'shell-defense',
            name: 'Shell Defense',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The snail withdraws into its shell and gains +4 AC until it emerges. It can emerge as a bonus action on its turn.',
            ],
          },
        ],
      },
    },
    gloam: {
      name: 'Gloam',
      page: 93,
      alignment: 'unaligned',
      stats: {
        size: 'tiny',
        type: 'undead',
        cr: '0',
        ac: 12,
        hitDice: '1d4',
        speed: { walk: 40, climb: 30 },
        scores: { str: 3, dex: 15, con: 10, int: 3, wis: 12, cha: 7 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.exhaustion, rules.poisoned],
        abilities: [
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['Gloam has advantage on Wisdom (Perception) checks that use smell.'],
          },
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              printedBonus: 0,
              damage: [{ dice: '1', type: rules.slashing }],
            },
          },
          {
            key: 'cloud-of-dust-encounter-trigger',
            name: 'Cloud of Dust (encounter trigger)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'On Gloam’s first turn in combat or when it drops to 0 hit points, it releases a cloud that works like Dust of Sneezing and Choking. Gloam and creatures within 30 ft. that need to breathe make a ',
              { dc: 'con', printed: 15 },
              ' Constitution save. A creature that fails is ',
              rules.incapacitated,
              ' and suffocating. While conscious, it can repeat the save at the end of each of its turns. A success or Lesser Restoration ends the effect. Under the 2014 suffocation rule, a choking creature lasts a number of rounds equal to its Constitution modifier, with a minimum of one round. It then starts its next turn dying at 0 hit points and cannot heal or stabilize while it still cannot breathe.',
            ],
          },
        ],
      },
    },
    pixie: {
      name: 'Pixie',
      alignment: 'neutral good',
      habitats: ['Forests'],
      appearance: [['A tiny woodland faerie with bright, translucent wings and pointed ears.']],
      tableNotes: [
        [
          'Uses the verified Monster Manual (2014) stat block for this creature. Check this publication for encounter-specific changes.',
        ],
        ['Rules source: Monster Manual (2014), p. 253.'],
      ],
      stats: {
        size: 'tiny',
        type: 'fey',
        cr: '1/4',
        ac: 15,
        hitDice: '1d4',
        speed: { walk: 10, fly: 30 },
        scores: { str: 2, dex: 20, con: 8, int: 10, wis: 14, cha: 15 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'Innate spellcasting uses Charisma, save ',
              { dc: 'wis' },
              '. Pixie dust is its sole component. At will · Druidcraft. 1/day each · Confusion, Dancing Lights, Detect Evil and Good, Detect Thoughts, Dispel Magic, Entangle, Fly, Phantasmal Force, Polymorph and Sleep.',
            ],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['The pixie has Advantage on saves against spells and other magical effects.'],
          },
          {
            key: 'superior-invisibility',
            name: 'Superior Invisibility',
            timing: 'action',
            icon: 'gi/GiInvisible',
            text: [
              'It turns itself and all worn or carried gear ',
              rules.invisible,
              ' while it maintains Concentration.',
            ],
          },
        ],
      },
    },
    pollenella_the_honeybee: {
      name: 'Pollenella the Honeybee',
      page: 135,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Yon', 'Feywild'],
      appearance: [
        [
          'An orange-sized queen honeybee with a fuzzy thorax, a long banded abdomen and translucent veined wings.',
        ],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 5, fly: 30 },
        scores: { str: 1, dex: 16, con: 8, int: 1, wis: 10, cha: 1 },
        abilities: [
          {
            key: 'sting',
            name: 'Sting',
            timing: 'action',
            icon: 'gi/GiPoisonBottle',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '3', type: rules.piercing }],
            },
          },
        ],
      },
    },
  },
})

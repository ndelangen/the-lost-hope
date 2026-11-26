import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.planescape_adventures_in_the_multiverse,
  monsters: {
    cranium_rat_squeaker: {
      name: 'Cranium Rat Squeaker',
      alignment: 'unaligned',
      languages: ['telepathy 30 ft'],
      habitats: ['Sigil'],
      appearance: [['A small rat with exposed brain tissue visible above its eyes.']],
      tableNotes: [
        [
          "Uses the verified Morte's Planar Parade stat block for this creature. Check this publication for encounter-specific changes.",
        ],
        ["Rules source: Morte's Planar Parade, p. 22."],
      ],
      stats: {
        size: 'tiny',
        type: 'aberration',
        cr: '0',
        ac: 12,
        hitDice: '1d4',
        speed: { walk: 30 },
        scores: { str: 2, dex: 14, con: 10, int: 4, wis: 11, cha: 8 },
        senses: { darkvision: 30 },
        abilities: [
          {
            key: 'shared-telepathy',
            name: 'Shared Telepathy',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'A creature touching the rat may use its telepathy if the rat permits it. A borrower who knows a language can send both words and emotions.',
            ],
          },
          {
            key: 'telepathic-shroud',
            name: 'Telepathic Shroud',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The rat is immune to divination spells and effects that read its thoughts or sense its emotions.',
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
              damage: [{ dice: '1', type: rules.piercing }],
            },
          },
          {
            key: 'illumination',
            name: 'Illumination',
            timing: 'bonus action',
            icon: 'gi/GiMagicSwirl',
            text: ['Light the exposed brain for dim light within 5 ft., or extinguish it.'],
          },
        ],
      },
    },
    morte: {
      name: 'Morte',
      alignment: 'chaotic good',
      languages: ['Common'],
      habitats: ['Sigil', 'Mortuary', 'Planar routes'],
      appearance: [['A small talking skull that floats and has expressive eyes.']],
      tableNotes: [
        [
          "Uses the verified Turn of Fortune's Wheel stat block for this creature. Check this publication for encounter-specific changes.",
        ],
        ["Rules source: Turn of Fortune's Wheel, p. 10."],
      ],
      stats: {
        size: 'tiny',
        type: 'undead',
        cr: '1/4',
        ac: 13,
        hitDice: '4d4',
        speed: { walk: 0, fly: 30 },
        scores: { str: 10, dex: 16, con: 16, int: 13, wis: 10, cha: 12 },
        skills: { arcana: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        damageVulnerabilities: [rules.bludgeoning],
        conditionImmunities: [rules.exhaustion, rules.poisoned],
        abilities: [
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
        ],
      },
    },
    sunfly: {
      name: 'Sunfly',
      alignment: 'chaotic good',
      languages: ["understands Celestial but can't speak"],
      habitats: ['Outer Planes', 'Sigil'],
      appearance: [['A luminous flying insect with a pointed stinger.']],
      tableNotes: [
        [
          "Uses the verified Morte's Planar Parade stat block for this creature. Check this publication for encounter-specific changes.",
        ],
        ["Rules source: Morte's Planar Parade, p. 47."],
      ],
      stats: {
        size: 'tiny',
        type: 'celestial',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 10, fly: 40 },
        scores: { str: 4, dex: 17, con: 10, int: 4, wis: 10, cha: 6 },
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
              damage: [{ dice: '1d4', type: rules.piercing }],
            },
            text: ['On an Outer Plane, the hit also injects a toxin.'],
          },
          {
            key: 'upper-plane',
            name: 'Upper Plane',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['The target sheds bright light within 5 ft. until the end of its next turn.'],
          },
          {
            key: 'neutral-plane',
            name: 'Neutral Plane',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'A target maintaining Concentration makes the Constitution save caused by the hit with Disadvantage.',
            ],
          },
          {
            key: 'lower-plane',
            name: 'Lower Plane',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ["Reduce the target's speed by 5 ft. until the end of its next turn."],
          },
          {
            key: 'illumination',
            name: 'Illumination',
            timing: 'bonus action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Emit bright light within 5 ft. and dim light for 5 ft. more, or turn off the light.',
            ],
          },
        ],
      },
    },
  },
})

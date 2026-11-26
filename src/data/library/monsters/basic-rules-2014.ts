import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.basic_rules_2014,
  monsters: {
    dust_devil: {
      name: 'Dust Devil',
      alignment: 'neutral',
      languages: ['Auran'],
      habitats: ['Deserts', 'Mountains', 'Blue dragon lairs'],
      appearance: [
        [
          'A twisting funnel of dust and grit with a faint resemblance to a face in the swirling cloud.',
        ],
      ],
      tableNotes: [
        [
          'The Monster Manual (2014), p. 92, defines the blue dragon regional variant using the Air Elemental rules on p. 124. D&D Beyond lists its standalone stat block under Basic Rules (2014).',
        ],
        [
          'Blue dragon regional effect: Dust devils scour the land within 6 miles of a legendary blue dragon’s lair. The dust devils tied to that lair vanish immediately when the dragon dies.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '5',
        ac: 15,
        hitDice: '12d10',
        speed: { walk: 50 },
        scores: { str: 14, dex: 20, con: 14, int: 1, wis: 10, cha: 1 },
        senses: { darkvision: 60 },
        conditionImmunities: [
          rules.exhaustion,
          rules.grappled,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
          rules.prone,
          rules.restrained,
          rules.unconscious,
        ],
        nonmagicalResistances: [
          rules.bludgeoning,
          rules.lightning,
          rules.piercing,
          rules.slashing,
          rules.thunder,
        ],
        abilities: [
          {
            key: 'air-form',
            name: 'Air Form',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "The dust devil can enter a hostile creature's space and stop there. It can move through a gap as narrow as 1 inch without squeezing.",
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'slam' }, ' attacks.'],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'whirlwind',
            name: 'Whirlwind',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              "Each creature sharing the dust devil's space makes a Strength saving throw (",
              { dc: 'con' },
              '). On a failure it takes ',
              { roll: '3d8', mod: 'str' },
              ' bludgeoning damage, is thrown up to 20 ft. in a random direction, and falls ',
              { effect: 'whirlwind-prone' },
              '. On a success it takes half damage and is neither thrown nor knocked ',
              rules.prone,
              '.',
            ],
            effects: [
              {
                key: 'whirlwind-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'con' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
            uses: 1,
            recharge: 'Recharge 4–6',
          },
          {
            key: 'collision',
            name: 'Collision',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'A thrown creature that hits an object takes an additional ',
              { roll: '1d6' },
              ' bludgeoning damage per 10 ft. thrown. If thrown at another creature, that creature makes a ',
              { dc: 'con', save: 'dex' },
              ' Dexterity save or takes the same distance-based damage and falls ',
              { effect: 'collision-prone' },
              '.',
            ],
            effects: [
              {
                key: 'collision-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'dex', dc: 'con' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
  },
})

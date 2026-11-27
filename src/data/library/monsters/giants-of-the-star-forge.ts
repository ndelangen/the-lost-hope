import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.giants_of_the_star_forge,
  monsters: {
    acidic_mist_apparition: {
      name: 'Acidic Mist Apparition',
      alignment: 'neutral',
      languages: ['Auran'],
      habitats: ['mountain', 'desert'],
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '5',
        ac: 15,
        hitDice: '12d10',
        speed: { fly: 90, walk: 0 },
        scores: { str: 14, dex: 20, con: 14, int: 6, wis: 10, cha: 6 },
        senses: { darkvision: 60 },
        damageResistances: [rules.lightning, rules.thunder],
        damageImmunities: [rules.acid, rules.poison],
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
        nonmagicalResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'air-form',
            name: 'Air Form',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "The apparition can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.",
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The apparition makes two slam attacks.'],
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
              damage: [{ dice: '2d8', type: rules.acid, addModifier: true }],
            },
          },
          {
            key: 'whirlwind',
            name: 'Whirlwind',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              "Each creature in the apparition's space must make a Strength saving throw (",
              { dc: 'con' },
              '). On a failure, a target takes ',
              { roll: '3d8', mod: 'str' },
              ' bludgeoning damage and is flung up 20 feet away from the apparition in a random direction and knocked ',
              { effect: 'whirl-prone' },
              '. If a thrown target strikes an object, such as a wall or floor, the target takes ',
              { roll: '1d6' },
              ' bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a Dexterity saving throw (',
              { dc: 'con' },
              ') or take the same damage and be knocked ',
              { effect: 'struck-prone' },
              ". If the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked ",
              rules.prone,
              '.',
            ],
            effects: [
              {
                key: 'whirl-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'con' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
              {
                key: 'struck-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'dex', dc: 'con' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
            uses: 1,
            recharge: 'Recharge 4–6',
          },
        ],
      },
    },
  },
})

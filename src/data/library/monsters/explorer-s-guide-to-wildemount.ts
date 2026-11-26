import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.explorer_s_guide_to_wildemount,
  monsters: {
    lacedon: {
      name: 'Lacedon',
      alignment: 'chaotic evil',
      languages: ['Common'],
      habitats: ['Brokenveil Marsh', 'Fort Venture'],
      appearance: [
        ['A waterlogged, aquatic ghoul with long claws and a gaunt goblinoid silhouette.'],
      ],
      tableNotes: [
        [
          "Rules source: Explorer's Guide to Wildemount, p. 254, Unwelcome Spirits, Brokenveil Marsh Encounters. Base rules from Monster Manual (2014), p. 148.",
        ],
        [
          'Encounter: In Unwelcome Spirits, 2d4 goblinoid lacedons hunt in Brokenveil Marsh. A character with passive Perception 12 or higher hears and smells them approaching. There is a 20% chance the group includes one or two recently turned Fort Venture guards.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1',
        ac: 12,
        hitDice: '5d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 13, dex: 15, con: 10, int: 7, wis: 10, cha: 6 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.charmed, rules.exhaustion, rules.poisoned],
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
              printedBonus: 2,
              damage: [{ dice: '2d6', type: rules.piercing, addModifier: true }],
            },
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
              damage: [{ dice: '2d4', type: rules.slashing, addModifier: true }],
            },
            text: [
              'A creature struck must succeed on a ',
              { dc: 'con' },
              ' Constitution save or become ',
              rules.paralyzed,
              ' for 1 minute. Elves and undead ignore this effect. A ',
              rules.paralyzed,
              ' target repeats the save at the end of each of its turns, ending the effect on a success.',
            ],
          },
        ],
      },
    },
  },
})

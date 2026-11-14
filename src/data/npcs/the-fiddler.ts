import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Fiddler',
  location: refs.locations.gambling_deck,
  notes: [
    [
      'A relaxed casino dealer on ',
      refs.locations.gambling_deck,
      ' aboard ',
      refs.locations.the_flying_whale,
      ' who seemed to know the party before meeting them and to know parts of their future. He appears to perceive multiple possible timelines and sometimes confuses visitors with alternate versions of themselves.',
    ],
    [
      refs.npcs.the_fiddler,
      ' chooses and runs dangerous games with the ',
      refs.items.deck_of_many_more_things,
      '. He promised that every future meeting with the party would feature a different game.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'fey',
    cr: '8',
    ac: 15,
    hitDice: '14d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 18,
      con: 14,
      int: 16,
      wis: 16,
      cha: 20,
    },
    saves: {
      dex: 'proficient',
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      deception: 'expert',
      insight: 'expert',
      performance: 'expert',
      sleight_of_hand: 'proficient',
    },
    damageResistances: [refs.rules.psychic],
    conditionImmunities: [refs.rules.charmed],
    abilities: [
      {
        key: 'many-timelines',
        name: 'Many Timelines',
        timing: 'trait',
        icon: 'gi/GiHourglass',
        text: [
          'Can’t be surprised. Attack rolls against him can’t have ',
          refs.rules.advantage,
          '.',
        ],
      },
      {
        key: 'the-dealer',
        name: 'The Dealer',
        timing: 'trait',
        icon: 'gi/GiCardRandom',
        text: [
          'Starts each fight with three cards. Drawing one is a ',
          refs.rules.bonus_action,
          '; the DM picks the effect from the Deck of Many More Things.',
        ],
        uses: 3,
        recharge: 'Long rest',
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'fate-cut',
          },
          ' attacks.',
        ],
      },
      {
        key: 'fate-cut',
        name: 'Fiddle-Bow Cut',
        timing: 'action',
        icon: 'gi/GiMusicalNotes',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '2d6',
              type: refs.rules.slashing,
              addModifier: true,
            },
            {
              dice: '2d6',
              type: refs.rules.psychic,
            },
          ],
        },
      },
      {
        key: 'rewind',
        name: 'Rewind',
        timing: 'reaction',
        icon: 'gi/GiHourglass',
        text: [
          'When a creature he can see succeeds on a d20 test, he forces it to reroll and use the lower result.',
        ],
        uses: 3,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_archmage'],
      changes:
        'A timeline-seeing dealer: his danger lies in the deck and in rewinding luck, not raw damage. Species unknown; fey chosen for his otherworldly air.',
    },
  },
})

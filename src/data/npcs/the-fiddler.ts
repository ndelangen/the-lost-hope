import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Fiddler',
  avatar: '/assets/npcs/the-fiddler-portrait.png',
  location: refs.locations.borris_s_gambling_den,
  notes: [
    [
      'A relaxed, travelling casino dealer, first met on ',
      refs.locations.gambling_deck,
      ' aboard ',
      refs.locations.the_flying_whale,
      ', who rarely turns up in the same place twice. He seemed to know the party before meeting them and to know parts of their future. He appears to perceive multiple possible timelines and sometimes confuses visitors with alternate versions of themselves.',
    ],
    [
      refs.npcs.the_fiddler,
      ' chooses and runs dangerous games with the ',
      refs.items.deck_of_many_more_things,
      '.',
    ],
  ],
  motivations: [
    [
      'A free agent: neutral chaos embodied. He turns up at random in time and space, and is not always sure himself where or when he is. He belongs to no side.',
    ],
    ['Whether he has an agenda of his own is not decided yet.'],
  ],
  background: [
    ['How to play him (DM steering):'],
    [
      'Relaxed, warm and a little lost. He greets the party as if picking up a conversation from another time, mixes them up with other versions of themselves, and now and then asks what day, or what year, it is. Never menacing: the danger at his table comes from the deck, not from him.',
    ],
    [
      'He deals straight. The cards are never rigged and a draw always stands. Undoing one has a price, and it is steep, like the 10,000 GP to release ',
      refs.pcs.cassian_veyl,
      '.',
    ],
    [
      'He never says how he knows things. Answer a question about it with a question of his own, or with a slip into the wrong tense.',
    ],
    [
      'At most one hint per meeting, and keep it ambiguous. What he says may come from a timeline that never happens here, so nothing he says is a promise. Until his agenda is decided, play his hints as a fan calling out to the stage, not as a plan.',
    ],
    [
      'Use him sparingly, and never in the same place twice in a row. Chance brings him, not the plot. ',
      refs.locations.borris_s_gambling_den,
      ' is where the party is most likely to look for him, not where he always is.',
    ],
    [
      'He is hard to threaten: he survived the avatar of death at his own table (',
      refs.events.n2_e195,
      '). If the party turns on him, he does not fight back for long; he is simply gone, the way he came.',
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

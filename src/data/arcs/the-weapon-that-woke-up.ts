import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The weapon that woke up',
  icon: 'gi/GiMechaHead',
  direction: [
    [
      'Can a machine built to destroy the elves make amends, and what does ',
      refs.pcs.auren,
      ' do when he finds the master who built him?',
    ],
  ],
  notes: [
    [
      'His backstory lives on ',
      refs.pcs.auren,
      '. The war he fought in is the Second Great War between the dwarves and the elves.',
    ],
    [
      'Working idea from brainstorming, not settled: his master and ',
      refs.npcs.light_13th_marshal,
      ' may have learned their craft from the same source, since both write on a body to change who owns it.',
    ],
  ],
  plots: [
    {
      name: 'A pilot for the flying ship',
      hook: [
        [refs.pcs.auren, ' has joined the party’s expedition. What help does he want from them?'],
      ],
      npcs: [refs.npcs.esia],
      events: [refs.events.n2_e179, refs.events.n2_e213, refs.events.n2_e214, refs.events.n2_e218],
      notes: [
        [
          refs.pcs.auren,
          ' delivered and piloted ',
          refs.items.little_purple,
          ', joined the expedition, and said he had followed stolen Hand records to ',
          refs.pcs.jim,
          '. His unrevealed backstory remains private.',
        ],
      ],
    },
    {
      name: 'The marks on his plating',
      hook: [
        [
          'Elves recognise dwarven war markings. ',
          refs.pcs.swift_starblade,
          ' is a half-elf, and ',
          refs.locations.greenhollow,
          ' did not survive that war. Was ',
          refs.pcs.auren,
          ' there? Do not answer it. Let the two players find out together.',
        ],
      ],
    },
    {
      name: 'The master’s remnants',
      hook: [
        [
          'Other constructs built by ',
          refs.npcs.magister_orrin_valdrek,
          ' may still be bound and still obeying. Each one he finds is someone awake behind their own eyes. ',
          refs.locations.foundry_nine,
          ' is where the trail starts.',
        ],
      ],
      npcs: [refs.npcs.magister_orrin_valdrek],
    },
    {
      name: 'The elf who freed him',
      hook: [
        [
          'Why would ',
          refs.npcs.aeliana,
          ', an elf, free a dwarven war machine, and where is she now?',
        ],
      ],
      npcs: [refs.npcs.aeliana],
    },
    {
      name: 'The name he was given to serve',
      hook: [
        [
          'His enemies call him the Iron Warden, and somewhere a dwarven officer still knows the designation KHAZ-THUR. Let someone say it to his face as an order, and let his player decide what it does to him.',
        ],
      ],
    },
    {
      name: 'Runes and the tattoo',
      hook: [
        [
          'His master carved a record into his body to take his will. The tattoo of the ',
          refs.organizations.adventurers_guild,
          ' is a record on the body that protects it. Show ',
          refs.npcs.light_13th_marshal,
          ' taking a close interest in the shattered runes on his core.',
        ],
      ],
    },
  ],
})

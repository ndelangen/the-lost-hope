import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The weapon that woke up',
  icon: 'gi/GiMechaHead',
  direction: [['Can a machine built to obey rid the world of its masters?']],
  notes: [
    [
      'Not a revenge arc: his own master, ',
      refs.npcs.magister_orrin_valdrek,
      ', is already dead. There are other masters: ',
      refs.npcs.the_11th_marshal,
      ', whose people call it master, and the twelve marshals who hold the world still. It runs alongside what ',
      refs.npcs.light_13th_marshal,
      ' wants.',
    ],
    [
      'His backstory lives on ',
      refs.pcs.auren,
      '. The war he fought in is the Second Great War between the dwarves and the elves.',
    ],
    [
      refs.pcs.auren,
      ' cannot consume Arcane Dust, so his own memories are safe. The danger is his perfect memory: he could store an endless amount of other people’s memories and work out what to change in them even better than ',
      refs.pcs.jim,
      '. That would make ',
      refs.pcs.jim,
      ' replaceable to ',
      refs.npcs.the_father,
      ', who would then have him killed. ',
      refs.npcs.light_13th_marshal,
      ' is giving ',
      refs.pcs.jim,
      ' another chance at escape, and at a life after ',
      refs.npcs.the_father,
      ' is defeated, which is why the perfect memory has to go.',
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
    {
      name: 'A walk before sunset',
      hook: [
        [
          refs.npcs.light_13th_marshal,
          ' knows what ',
          refs.pcs.auren,
          ' once was. He does not know what he is now, and means to find out before dark.',
        ],
        [
          'An avenger, a liberator, an adventurer, or a man again? ',
          refs.npcs.light_13th_marshal,
          ' asks, and offers ',
          refs.pcs.auren,
          ' a way to reclaim his humanity.',
        ],
        [
          'Becoming more human again is an arc to offer the player, who may refuse it. Refusing brings conflict with ',
          refs.npcs.light_13th_marshal,
          '. The first thing that has to go is the perfect memory.',
        ],
      ],
      npcs: [refs.npcs.magister_orrin_valdrek],
      scene: refs.scenes.light_walks_auren_through_fajanet,
    },
  ],
})

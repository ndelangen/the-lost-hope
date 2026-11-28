import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

const rollers = [refs.pcs.cassian_veyl, refs.pcs.devan, refs.pcs.swift_starblade]

const round = (dc: number) => ({
  title: [['Round of drinks']],
  ability: 'con' as const,
  dc,
  rollers,
  passed: 'Still standing',
  failed: 'Drunker',
})

export default createScene({
  name: 'Fix’s last delivery',
  location: refs.locations.skynet_s_second_best_inn,
  illustrations: ['/assets/scenes/fix-s-last-delivery.png'],
  setup: [
    [
      'The next time the party stops in a town, ',
      refs.organizations.the_eyeless_hand,
      ' sends ',
      refs.pcs.fix,
      ' to find them, against her will. The inn is a stand-in: play it wherever they are.',
    ],
    [
      'It comes on the party’s second evening in ',
      refs.locations.rustmoor,
      ', or wherever else they have gone by then. ',
      refs.pcs.auren,
      ' never met ',
      refs.pcs.jim,
      ', so the warning is not for him.',
    ],
    [
      'What the party does not know: when ',
      refs.pcs.jim,
      ' came home to the flying fortress, solid again because the beam pulled him back into his body, ',
      refs.npcs.the_father,
      ' cut out his tongue to rid him of the mark of ',
      refs.npcs.light_13th_marshal,
      '. The guild tattoo is still on it. ',
      refs.pcs.jim,
      ' is alive.',
    ],
  ],
  beats: [
    {
      title: 'A box from home',
      lines: [
        {
          do: [[refs.pcs.fix, ' walks up to the party, pale and shaking, holding a small box.']],
        },
        {
          speaker: refs.pcs.fix,
          say: [
            ['I was sent here against my will, but I must obey.'],
            ['We know you still care about ', refs.pcs.jim, '.'],
            ['You must stop caring, or they will never stop trying to kill you for it.'],
            ['I was told to deliver this.'],
          ],
        },
        { do: [[refs.pcs.fix, ' hands over the box.']] },
        {
          note: [
            [
              'Let them open it right away, while ',
              refs.pcs.fix,
              ' is still standing there. Do not hurry them along.',
            ],
          ],
        },
        {
          say: [
            [
              'Inside lies a human tongue, freshly cut. It still bears the tattoo of the ',
              refs.organizations.adventurers_guild,
              '.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Can I please go?',
      lines: [
        { speaker: refs.pcs.fix, say: [['Can I please go?']] },
        {
          note: [
            [
              refs.pcs.fix,
              ' is no threat, vulnerable and miserable, and only wants to leave. Whatever the party does now is their choice alone.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiCrossedSwords',
          when: [['The party attacks ', refs.pcs.fix, '.']],
          response: [
            [
              refs.pcs.fix,
              ' does not fight back. This was her last life, and this death is for good: ',
              refs.npcs.the_father,
              ' has no more use for her and brings nobody back out of mercy.',
            ],
          ],
        },
      ],
    },
    {
      title: 'My last life',
      onlyIf: [['The party lets ', refs.pcs.fix, ' speak, or go.']],
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            ['This is my last life…'],
            ['I’ve done EVERYTHING they asked, and more.'],
            ['Everything, and I died… again and again, and again, and again.'],
            [
              'I got trampled, drugged, beaten to a pulp, burned. I still remember each one, you know.',
            ],
            ['It hurts.'],
            ['And I’ve got nothing left I care about.'],
            ['I’m going to sit in the nearest bar, and drink myself to death.'],
            ['Will you join me?'],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiCancel',
          when: [['The party says no.']],
          response: [
            [refs.pcs.fix, ' walks into the bar alone and drinks herself to death there.'],
          ],
        },
        {
          icon: 'gi/GiBeerStein',
          when: [['The party joins ', refs.pcs.fix, '.']],
          response: [['Play the drinking game below.']],
        },
      ],
    },
    {
      title: 'The drinking game',
      onlyIf: [['The party sits down with ', refs.pcs.fix, '.']],
      lines: [
        {
          do: [
            [
              'Each round, ',
              refs.pcs.fix,
              ' tells one fact about ',
              refs.npcs.the_father,
              ', and the whole party must drink: everyone who is able to. Whoever cannot drink sits it out and stays sober.',
            ],
          ],
        },
        {
          do: [
            [
              'Everyone drinking makes a ',
              refs.rules.con,
              ' ',
              refs.rules.saving_throw,
              '. The DC starts at 10 and goes up by 2 each round. The first failure leaves them tipsy, the second ',
              refs.rules.poisoned,
              ', the third passed out and ',
              refs.rules.unconscious,
              '.',
            ],
          ],
        },
        {
          note: [
            [
              refs.pcs.fix,
              ' keeps talking as long as at least one of them keeps drinking. Expect about half the party to pass out before the end.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Round 1',
      onlyIf: [['They are drinking with ', refs.pcs.fix, '.']],
      groupSave: round(10),
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            [
              'Nobody ever sees him. He’s buried in paperwork, day and night. Everything we hear ends up on his desk.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Round 2',
      onlyIf: [['Someone is still drinking.']],
      groupSave: round(12),
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            [
              'Ask ten of us what his face looks like, you’ll get ten faces. I don’t know who he is. Nobody does.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Round 3',
      onlyIf: [['Someone is still drinking.']],
      groupSave: round(14),
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            [
              'I made a deal with seven necromancers. That’s how he got me. Every time I died, they brought me back for him.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Round 4',
      onlyIf: [['Someone is still drinking.']],
      groupSave: round(16),
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            [
              'Every one of the twelve marshals has his people in their court. Not enough to own them. Not yet.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Round 5',
      onlyIf: [['Someone is still drinking.']],
      groupSave: round(18),
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            [
              'The tongue. He cut it out the day ',
              refs.pcs.jim,
              ' came home. To get the mark of ',
              refs.npcs.light_13th_marshal,
              ' off him.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Round 6',
      onlyIf: [['Someone is still drinking.']],
      groupSave: round(20),
      lines: [
        {
          speaker: refs.pcs.fix,
          say: [
            [
              'He doesn’t want ',
              refs.pcs.jim,
              ' as a prisoner. He wants an equal, someone to run it all with him. But ',
              refs.pcs.jim,
              ' has to say yes. That’s why you have to stop caring.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Fix’s head hits the table',
      onlyIf: [['They drank with ', refs.pcs.fix, '.']],
      lines: [
        {
          do: [
            [
              'After the last fact, or when the last of the party passes out, ',
              refs.pcs.fix,
              '’s head sinks onto the table. She has drunk herself to death, right there in the bar.',
            ],
          ],
        },
        {
          note: [['No fight follows. Let the silence sit: combat now would deflate the moment.']],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiWalk',
          when: [['Those still standing carry their passed-out friends home.']],
          response: [['Everyone wakes up hungover, with everything they own.']],
        },
        {
          icon: 'gi/GiNightSleep',
          when: [['They leave the passed-out ones to sleep in the bar.']],
          response: [['Those left behind wake up robbed. The DM decides what is gone.']],
        },
      ],
    },
  ],
})

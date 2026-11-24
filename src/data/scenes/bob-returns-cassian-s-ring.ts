import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Bob returns Cassian’s ring',
  location: refs.locations.rustmoor,
  alternateLocations: [refs.locations.bob_s_stall],
  setup: [
    [
      refs.npcs.bob_the_merchant,
      ' has set up his stall in ',
      refs.locations.rustmoor,
      ' and is buying scavenged parts. Play this whenever the party finds him there.',
    ],
    [
      'The point of the scene is to end ',
      refs.effects.werewolf_transformation,
      ' for ',
      refs.pcs.cassian_veyl,
      ' without making him work for it: his player does not want to play a werewolf. ',
      refs.beasts.wolfie,
      ' stays as he is, upright and talking, a loyal companion to ',
      refs.pcs.cassian_veyl,
      ' alone.',
    ],
  ],
  npcs: [refs.npcs.bob_the_merchant],
  beats: [
    {
      title: 'Buying scrap',
      lines: [
        {
          do: [
            [
              refs.npcs.bob_the_merchant,
              ' haggles with scavengers over parts pulled from the wrecks of ',
              refs.locations.the_old_battlefield,
              '.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A fine piece of scrap',
      lines: [
        {
          do: [
            [
              refs.npcs.bob_the_merchant,
              ' looks ',
              refs.pcs.auren,
              ' over like salvage and talks to the party about him, not to him.',
            ],
          ],
        },
        {
          say: [
            [
              'I’ll give you 10,000 gold pieces for it. It seems to be in working condition! Does it obey commands well?',
            ],
          ],
          speaker: refs.npcs.bob_the_merchant,
        },
        {
          note: [
            [
              'Played for laughs, but the question cuts close to ',
              refs.pcs.auren,
              '’s backstory: he was built to obey. The other players do not know that, so leave the answer to his player.',
            ],
          ],
        },
      ],
    },
    {
      title: 'How neutrality works',
      lines: [
        {
          note: [
            [
              'Play this when ',
              refs.pcs.cassian_veyl,
              ' asks ',
              refs.npcs.bob_the_merchant,
              ' to fix something. He explains his rule and is not keen to hear complaints about it.',
            ],
          ],
        },
        {
          say: [
            [
              'Something good must be balanced by something less good. Something lawful is balanced by a bit of chaos.',
            ],
          ],
          speaker: refs.npcs.bob_the_merchant,
        },
        {
          note: [
            [
              'This fits ',
              refs.pcs.devan,
              '’s Detect Evil and Good, which found nothing on him. Let ',
              refs.pcs.cassian_veyl,
              ' get creative; nothing he says here is needed for the ring.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiConversation',
          when: [
            [refs.pcs.cassian_veyl, ' asks him to take away ', refs.beasts.wolfie, '’s sentience.'],
          ],
          response: [
            [
              '“You’d have to do something rather good to balance that out. What good deeds can you name that you did?”',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [[refs.pcs.cassian_veyl, ' asks him to remove the werewolf change.']],
          response: [
            [
              '“That sounds like I’d be doing something rather good. What, ahem, less good act would I do to compensate?”',
            ],
          ],
        },
      ],
    },
    {
      title: 'The ring comes back',
      lines: [
        {
          do: [
            [
              refs.npcs.bob_the_merchant,
              ' hands back the ',
              refs.items.ring_of_hunger,
              ' for free. It is still ',
              refs.pcs.cassian_veyl,
              '’s property, so returning it is neutral.',
            ],
          ],
        },
        {
          say: [['Try not to lose it again. It turned up in my pie, of all places.']],
          speaker: refs.npcs.bob_the_merchant,
        },
        {
          note: [
            [
              'A nod to the amulet ',
              refs.pcs.jim,
              ' found in a pie. The curse on the ring is gone: it only finds ',
              refs.beasts.wolfie,
              ' now. Its hunger and the werewolf change end with it; the drain from ',
              refs.effects.hunger,
              ' stays. ',
              refs.npcs.bob_the_merchant,
              ' does not say why, and the scene does not explain it.',
            ],
          ],
        },
      ],
    },
  ],
})

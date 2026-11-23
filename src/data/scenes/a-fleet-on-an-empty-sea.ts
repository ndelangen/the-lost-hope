import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'A fleet on an empty sea',
  location: refs.locations.the_marshal_s_waters,
  alternateLocations: [refs.locations.the_caves_of_steel],
  npcs: [refs.npcs.caves_of_steel_fisher],
  setup: [
    [
      'The party is in their airship over a giant ocean with no land in sight. This is their first contact with ',
      refs.locations.the_caves_of_steel,
      ' and the people of ',
      refs.npcs.the_11th_marshal,
      '.',
    ],
    [
      'Its real job is to get the players telling their characters’ stories, backgrounds included: the people pay for every story they hear.',
    ],
    ['A rough draft: what brings the party here, and when, is still open.'],
  ],
  beats: [
    {
      title: 'Strange ships below',
      lines: [
        {
          do: [
            [
              'Nothing but water, for hours. Then a fishing fleet on the surface: riveted iron hulls, working decks, no masts. Some of them sit low in the water, as if they could go under.',
            ],
            [
              'The crews have seen the airship. They wave flags and their arms, and shout up at it.',
            ],
          ],
        },
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [['Come down! Come meet us! We’re friendly!']],
        },
      ],
    },
    {
      title: 'Alongside the fleet',
      lines: [
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [
            ['Visitors! From the outside?'],
            [
              'Come down with us, come home with us! There will be a feast. We want to hear everything.',
            ],
          ],
        },
        {
          note: [
            [
              'Their welcome is sincere. The ships are subships, and the only way into the Caves is underwater, so the airship has to stay behind.',
            ],
          ],
        },
        {
          do: [
            [
              'Among the fish in the nets is something that is not a fish: a sentient sea creature, alive, bound, and looking straight at the party.',
            ],
          ],
        },
        {
          note: [
            [
              'Besides their own food, the fleet hunts sentient creatures to feed to ',
              refs.npcs.the_11th_marshal,
              '. They cannot help it: it is an order.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiOpenGate',
          when: [['They set the catch free.']],
          response: [
            [
              'The fishers are annoyed, but they do not fight the party over it, and they still invite them down. They know it is only a setback: once the party is gone, they will catch more.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Welcomed like royalty',
      onlyIf: [['The party goes down with the fleet.']],
      lines: [
        {
          do: [
            [
              'Inside the cave of steel, people crowd in to see the strangers. There is a feast, and everyone wants a story: who are they, where are they from, what is happening in the world?',
            ],
          ],
        },
        {
          note: [
            [
              'The people have no contact with the outside and know nothing of it. They cannot get enough of stories about anything at all, and they pay in valuables for every one, including the characters’ own backgrounds.',
            ],
            [
              'This is the point of the scene: invite each player to tell where their character comes from, and pay them for it. What the party tells them is all the people will ever have of the outside.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiMagnifyingGlass',
          when: [
            ['They find, or ask about, the ', refs.locations.the_caves_of_steel_holding_area, '.'],
          ],
          response: [
            [
              'More sentient catch is held there, waiting for ',
              refs.npcs.the_11th_marshal,
              '. Freeing it gets the same answer as at the fleet: annoyance, never a fight.',
            ],
          ],
        },
        {
          icon: 'gi/GiPrisoner',
          when: [['Someone asks whether they would wish to leave.']],
          response: [
            [
              'They go silent. Not awkward, not afraid: silent, mid-breath, until the subject changes. They cannot imagine taking any action to leave.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['Someone asks about the Marshal, or about the laws.']],
          response: [
            [
              'They recite the three laws of ',
              refs.npcs.the_11th_marshal,
              ' word for word, in the first person, like children reciting a lesson. They strongly advise the party never to go looking for the Marshal.',
            ],
          ],
        },
        {
          icon: 'gi/GiPuzzle',
          when: [['They try to take someone with them.']],
          response: [
            [
              'The third law stops anyone who knowingly tries to leave. A clever plan may get around it: judge by what the person does and what they know.',
            ],
          ],
        },
      ],
    },
  ],
})

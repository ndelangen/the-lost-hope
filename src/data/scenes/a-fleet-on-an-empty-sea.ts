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
          ],
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
              'You can come down with us, if you want. We would be glad of it. But honestly, it is not a good idea.',
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
              'Let the players tell their stories and reward them for it. The people have no contact with the outside and know nothing of it. What the party tells them is all they will ever have.',
            ],
          ],
        },
      ],
      outcomes: [
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

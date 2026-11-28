import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The crew that never left',
  location: refs.locations.the_old_battlefield,
  setup: [
    [
      'A job from ',
      refs.scenes.the_rustmoor_job_board,
      ': a scrap dealer sent two men into the hold of a crashed battleship on ',
      refs.locations.the_old_battlefield,
      ', and they did not come back. Clear it. 120 gp, and first pick of whatever is down there.',
    ],
    [
      'The ship’s crew never left it: they rose as ghouls, and their captain as a ghast. Pitched for a level-6 party.',
    ],
  ],
  beats: [
    {
      title: 'Down the hatch',
      lines: [
        {
          do: [
            [
              'A dark, tilted hold. Torn hammocks, scattered gnawed bones, and the dealer’s two men, or what is left of them. Something scrapes in the dark.',
            ],
          ],
        },
        {
          note: [
            [
              'Their claws paralyse anyone who is not an elf. ',
              refs.pcs.swift_starblade,
              ' is a half-elf, so he is not spared.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.ghoul, count: 3 }],
        tactics: [
          [
            'They come out of the hammocks and the dark from all sides, and drag off anyone paralysed.',
          ],
        ],
      },
    },
    {
      title: 'The captain’s cabin',
      lines: [
        {
          do: [
            [
              'At the end of the hold, a cabin door hangs open. Inside, a figure in a rotted officer’s coat stands over a chart table, as if still plotting a course. The stench hits first.',
            ],
          ],
        },
        {
          note: [
            [
              'The captain can speak, barely: he orders the party off his ship. In his cabin lies the “first pick”: one item of your choice from the ship’s strongbox.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [
          { creature: refs.beasts.ghast, count: 1 },
          { creature: refs.beasts.ghoul, count: 2 },
        ],
        tactics: [
          [
            'The captain holds back behind his two crewmen and lets his stench work, then moves in on whoever is paralysed.',
          ],
        ],
      },
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiTakeMyMoney',
      when: [['The hold is clear.']],
      response: [
        [
          'The dealer pays 120 gp, and they head back to the guildhall: see ',
          refs.scenes.the_rustmoor_job_board,
          '.',
        ],
      ],
    },
  ],
})

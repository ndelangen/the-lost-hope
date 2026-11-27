import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Rats in the hold',
  location: refs.locations.the_old_battlefield,
  setup: [
    [
      'A job from ',
      refs.scenes.the_rustmoor_job_board,
      ': a scrap dealer wants the hold of a crashed ship on ',
      refs.locations.the_old_battlefield,
      ' cleared of nesting rats before his crew goes in. 30 gp, and first pick of whatever is down there.',
    ],
  ],
  beats: [
    {
      title: 'Down the hatch',
      lines: [
        {
          do: [
            [
              'A dark, tilted hold, knee-deep in torn sacks and rotten cargo. Squeaking everywhere. Eyes in the lamplight.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.giant_rat, count: 6 }],
        tactics: [['They swarm the nearest light, three to a target.']],
      },
    },
    {
      title: 'The nest',
      lines: [
        {
          do: [['Deeper in, a nest of shredded sailcloth, and four more rats, bigger and bolder.']],
        },
        {
          note: [['In the nest lies one small trinket of your choice: their “first pick”.']],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.giant_rat, count: 4 }],
        tactics: [['They defend the nest to the last.']],
      },
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiTakeMyMoney',
      when: [['The hold is clear.']],
      response: [
        [
          'The dealer pays 30 gp, and they head back to the guildhall: see ',
          refs.scenes.the_rustmoor_job_board,
          '.',
        ],
      ],
    },
  ],
})

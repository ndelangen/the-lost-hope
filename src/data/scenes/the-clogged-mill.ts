import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The clogged mill',
  location: refs.locations.rustmoor,
  setup: [
    [
      'A job from ',
      refs.scenes.the_rustmoor_job_board,
      ': the sludge river through ',
      refs.locations.rustmoor,
      ' has backed up against a mill wheel, and something lives in the blockage. 80 gp.',
    ],
  ],
  beats: [
    {
      title: 'The stuck wheel',
      lines: [
        {
          do: [
            [
              'A big scrap-iron water wheel stands still in a stinking dam of sludge, rags and junk. Bubbles rise from the middle. The miller keeps well back.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Food?',
      lines: [
        {
          do: [
            [
              'An eye on a stalk rises out of the muck. A voice speaks inside their heads, simple and hungry: “FOOD? YOU BRING FOOD?”',
            ],
          ],
        },
        {
          note: [
            [
              'It is an ',
              refs.beasts.otyugh,
              ', and it would rather bargain than fight. It wants garbage, lots of it.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.otyugh, count: 1 }],
        tactics: [
          [
            'It grabs the nearest two with its tentacles and slams them together. Below half its hit points it sinks into the sludge and swims off downstream.',
          ],
        ],
      },
      outcomes: [
        {
          icon: 'gi/GiShakingHands',
          when: [['They bargain: garbage somewhere else.']],
          response: [
            [
              'Point it to a better dump (Rustmoor has plenty) and it heaves itself out and goes. The wheel turns again.',
            ],
          ],
        },
        {
          icon: 'gi/GiCrossedSwords',
          when: [['They fight it.']],
          response: [['A messy fight in knee-deep sludge. Its bite carries disease.']],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiTakeMyMoney',
      when: [['The wheel turns again.']],
      response: [
        [
          'The miller pays 80 gp, and they head back to the guildhall: see ',
          refs.scenes.the_rustmoor_job_board,
          '.',
        ],
      ],
    },
  ],
})

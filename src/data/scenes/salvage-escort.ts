import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Salvage escort',
  location: refs.locations.the_old_battlefield,
  npcs: [refs.npcs.rustmoor_scavenger],
  setup: [
    [
      'A job from ',
      refs.scenes.the_rustmoor_job_board,
      ': a scavenger crew is hauling a huge cannon barrel out of ',
      refs.locations.the_old_battlefield,
      ' on a creaking cart, and wants guards. 60 gp.',
    ],
  ],
  beats: [
    {
      title: 'Hauling the barrel',
      lines: [
        {
          do: [
            [
              'Four scavengers, two mules and a cart groaning under a cannon barrel, crawling between wrecks and dust drifts.',
            ],
          ],
        },
        {
          speaker: refs.npcs.rustmoor_scavenger,
          say: [['Keep your eyes open. Out here, things smell iron.']],
        },
      ],
    },
    {
      title: 'Something smells the iron',
      lines: [
        {
          do: [
            [
              'Feathery antennae rise over a ridge of scrap. Then three armoured, bug-like beasts come scuttling at the cart, and at anyone wearing metal.',
            ],
          ],
        },
        {
          note: [
            [
              'They go for the most metal first: the barrel, armour, then weapons. Their touch rusts metal for good, so let the players feel it.',
            ],
            [
              'Whether ',
              refs.pcs.auren,
              '’s body counts as ferrous metal is his player’s call, asked before the fight.',
            ],
          ],
        },
      ],
      fight: {
        opponents: [{ creature: refs.beasts.rust_monster, count: 3 }],
        allies: [{ creature: refs.npcs.rustmoor_scavenger, count: 4 }],
        tactics: [
          [
            'They want metal, not meat. A rust monster distracted by a dropped sword or a scrap pile stops to eat it. The scavengers run behind the cart at the first bite.',
          ],
        ],
      },
      outcomes: [
        {
          icon: 'gi/GiHand',
          when: [['They throw scrap or spare metal to distract them.']],
          response: [['It works: each one that gets metal to eat stops fighting to eat it.']],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiTakeMyMoney',
      when: [['The barrel reaches town.']],
      response: [
        [
          'The crew pays 60 gp, and they head back to the guildhall: see ',
          refs.scenes.the_rustmoor_job_board,
          '.',
        ],
      ],
    },
  ],
})

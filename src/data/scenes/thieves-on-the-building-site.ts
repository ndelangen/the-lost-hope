import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Thieves on the building site',
  location: refs.locations.rustmoor_guildhall,
  npcs: [refs.npcs.scrap_thief],
  setup: [
    [
      'A job from ',
      refs.scenes.the_rustmoor_job_board,
      ': copper pipe and rivets keep disappearing from the building site of the guildhall itself. 40 gp. It is a guild job for the guild, with ',
      refs.npcs.hex,
      ' right there, which makes it extra ironic.',
    ],
  ],
  beats: [
    {
      title: 'The stake-out',
      lines: [
        {
          do: [
            [
              'Scaffolding, crates and stacks of pipe. Tracks in the dust lead to a loose board in the fence.',
            ],
          ],
        },
        {
          note: [
            [
              'If they wait for dusk, three thieves slip in. In daylight, the tracks lead to their hut nearby.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Caught in the act',
      lines: [
        {
          do: [
            [
              'Three thin figures with sacks. When the light hits them: silver glitter in glassy eyes.',
            ],
          ],
        },
        {
          note: [['They are Dust users, stealing to buy more. They fight only if cornered.']],
        },
      ],
      fight: {
        opponents: [{ creature: refs.npcs.scrap_thief, count: 3 }],
        tactics: [['They drop the sacks and run at the first sign of a real fight.']],
      },
      outcomes: [
        {
          icon: 'gi/GiConversation',
          when: [['They talk instead.']],
          response: [
            [
              'The thieves are easy to scare and hard to reason with: all they think about is the next pinch of Dust. They give the loot back and promise anything.',
            ],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiTakeMyMoney',
      when: [['The thefts stop.']],
      response: [
        [
          'The site foreman pays 40 gp. ',
          refs.npcs.hex,
          ' saw all of it: see ',
          refs.scenes.the_rustmoor_job_board,
          '.',
        ],
      ],
    },
  ],
})

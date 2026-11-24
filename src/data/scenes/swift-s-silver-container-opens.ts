import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Swift’s silver container opens',
  location: refs.locations.rustmoor,
  setup: [
    [
      'It is full moon when the party arrives in ',
      refs.locations.rustmoor,
      ', so this is the night ',
      refs.pcs.swift_starblade,
      ' can open ',
      refs.items.swifts_silver_container,
      '. Play it whenever he tries, in between ',
      refs.scenes.hex_loses_patience,
      ' and ',
      refs.scenes.down_through_the_rubble,
      '.',
    ],
    [
      'What is inside and how it works is in the background of ',
      refs.items.swifts_silver_container,
      ' and of ',
      refs.items.demon_possessed_flying_broom,
      '. Nothing is explained to him. Improvise the hints.',
    ],
  ],
  beats: [
    {
      title: 'Under the full moon',
      lines: [
        {
          do: [
            [
              'In the moonlight ',
              refs.items.swifts_silver_container,
              ' opens for ',
              refs.pcs.swift_starblade,
              '. Inside lies a key, and nothing else.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A locked door',
      lines: [
        {
          do: [
            [
              'When he tries the key on a locked door with the right type of lock, the door opens onto a broom closet and not onto the room that should be behind it. ',
              refs.items.demon_possessed_flying_broom,
              ' stands in the closet.',
            ],
          ],
        },
        {
          note: [
            [
              'He cannot simply take it: to get it back he has to lock someone into the closet in its place.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Where to?',
      lines: [
        {
          do: [
            [
              'Once ',
              refs.pcs.swift_starblade,
              ' is inside and closes the door behind him, the door is locked. He has to use the key from the inside.',
            ],
          ],
        },
        {
          say: [['WHERE TO, MASTER?']],
        },
        {
          note: [
            [
              'It is the demon voice he knows well. The closet opens onto any door he has previously opened.',
            ],
          ],
        },
      ],
    },
  ],
})

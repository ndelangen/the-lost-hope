import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The green pulse over the sky islands',
  illustration: '/assets/scenes/the-green-pulse-over-the-sky-islands.png',
  location: refs.locations.three_sky_kingdoms,
  setup: [
    [
      'A green pulse washes over all three sky islands at once. Everyone on ',
      refs.locations.nimbus,
      ', ',
      refs.locations.skynet,
      ' and ',
      refs.locations.tempest,
      ' feels it, wherever they are. Run this scene for the whole party together, even while it is split.',
    ],
  ],
  beats: [
    {
      title: 'The field of connection',
      lines: [
        {
          say: [
            [
              'There is a special field of connection. Something you cannot really feel the presence of, though some people say they can. This field is what binds people: a network.',
            ],
            [
              'Sometimes this field is particularly strong, such as between a parent and a child. But often this field, these connections, these threads if you will, are not noticed much until the strings snap.',
            ],
            [
              'Every snap vibrates the field, and can often be felt from afar. Right now, you can feel this web vibrate to its breaking point. Something is pulled out of the web by brute force.',
            ],
            ['Your connection to ', refs.pcs.jim, ' is lost.'],
            [
              'You get one chance to keep this connection, but you must want it enough. Tell me why your character would want to stay connected, and I will give you a +5 on your ',
              refs.rules.wis,
              ' ',
              refs.rules.saving_throw,
              ' to remember ',
              refs.pcs.jim,
              '.',
            ],
            [
              'And spoiler alert: if ',
              refs.pcs.jim,
              ' loses connection with everything, that is BAD!',
            ],
          ],
        },
      ],
    },
    {
      title: 'Who still remembers Jim',
      groupSave: {
        title: [['Who still cares about ', refs.pcs.jim, '?']],
        ability: 'wis',
        dc: 15,
        reasonBonus: 5,
        rollers: [
          refs.pcs.swift_starblade,
          refs.pcs.cassian_veyl,
          refs.pcs.devan,
          refs.npcs.crowy,
          refs.npcs.abraham,
          refs.beasts.wolfie,
          refs.npcs.sarogarth,
          refs.npcs.the_fiddler,
          refs.pcs.fix,
          { who: refs.npcs.light_13th_marshal, always: 'passed' },
          refs.beasts.phoenix_chick,
          refs.npcs.borris,
          refs.npcs.bob_the_merchant,
          refs.npcs.gruumsh_high_priest,
          refs.npcs.sylvia,
          refs.npcs.bessy,
          { who: refs.npcs.silas_wren, always: 'passed' },
          { who: refs.npcs.cloaked_snatcher, always: 'failed' },
          { who: refs.npcs.the_father, always: 'passed' },
        ],
        passed: 'Still cares',
        failed: 'No longer cares',
      },
      lines: [
        {
          do: [
            [
              'Everyone who cared about ',
              refs.pcs.jim,
              ' makes the saving throw below. On a failure they lose all interest in ',
              refs.pcs.jim,
              '.',
            ],
          ],
        },
        {
          note: [
            [
              'Met him, but have no bond to lose, so no roll: ',
              refs.npcs.onana_tempest,
              ', ',
              refs.npcs.esia,
              ', ',
              refs.npcs.stefanio,
              ' and ',
              refs.npcs.hollin_slowbough,
              '. ',
              refs.pcs.auren,
              ' has not met him in play.',
            ],
          ],
        },
        {
          note: [
            [
              'Anyone who did not care about ',
              refs.pcs.jim,
              ' does not roll: the pulse cannot make someone stop caring who never did. ',
              refs.npcs.the_father,
              ' is immune. Agents of ',
              refs.organizations.the_eyeless_hand,
              ', such as ',
              refs.pcs.fix,
              ', can be affected, but they will be re-instructed eventually.',
            ],
          ],
        },
        {
          note: [
            [
              'One thread ripped out of the field does not mean death at once. Let that uncertainty hang: it builds tension before the beams.',
            ],
          ],
        },
      ],
    },
    {
      title: 'On to the beams',
      lines: [
        {
          do: [
            [
              'Once everyone has rolled and said why, run ',
              refs.scenes.the_green_beam_over_the_sky_islands,
              '.',
            ],
          ],
        },
      ],
    },
  ],
})

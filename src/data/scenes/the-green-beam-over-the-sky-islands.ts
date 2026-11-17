import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The green beam over the sky islands',
  illustration: '/assets/scenes/the-green-pulse-over-the-sky-islands.png',
  location: refs.locations.three_sky_kingdoms,
  npcs: [refs.npcs.abraham, refs.npcs.crowy],
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
      title: 'The beam strikes',
      lines: [
        {
          do: [
            [
              'Then a bright green beam strikes the docks of ',
              refs.locations.nimbus,
              ', and part of it explodes outwards across the harbour. ',
              refs.pcs.swift_starblade,
              ' is close by on ',
              refs.locations.nimbus,
              '. ',
              refs.pcs.cassian_veyl,
              ' and ',
              refs.pcs.devan,
              ' see it from ',
              refs.locations.skynet,
              '.',
            ],
            [{ type: 'image', url: '/assets/scenes/the-green-beam-over-the-sky-islands.png' }],
          ],
        },
      ],
    },
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
      lines: [
        {
          do: [
            [
              'Everyone who cared about ',
              refs.pcs.jim,
              ' makes a DC 15 ',
              refs.rules.wis,
              ' ',
              refs.rules.saving_throw,
              ', with +5 for a player who says why their character wants to stay connected. On a failure they lose all interest in ',
              refs.pcs.jim,
              '.',
            ],
          ],
        },
        {
          note: [
            [
              'Anyone who did not care about ',
              refs.pcs.jim,
              ' does not roll: the beam cannot make someone stop caring who never did. ',
              refs.npcs.the_father,
              ' is immune. Agents of ',
              refs.organizations.the_eyeless_hand,
              ', such as ',
              refs.pcs.fix,
              ', can be affected, but they will be re-instructed eventually.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Crowy arrives',
      lines: [
        {
          do: [
            [
              refs.npcs.crowy,
              ' was with ',
              refs.pcs.swift_starblade,
              ' and ',
              refs.pcs.jim,
              ' on ',
              refs.locations.nimbus,
              ', and the beam critically wounded him. Once he is revived there, he flies across to ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              '. Bring him in a little after the beam, still singed. Who saved him is decided in ',
              refs.scenes.the_hand_comes_for_jim,
              ', and he remembers it either way.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Chaos on the islands',
      lines: [
        {
          do: [
            [
              'The populations of all three sky islands are in chaos. The normally calm streets are packed, and the usual links between the islands are clogged.',
            ],
            [
              'On ',
              refs.locations.skynet,
              ', there are few civilians left on the streets. ',
              refs.npcs.old_pell,
              ' boards up his shop, and ',
              refs.npcs.maren_of_fairhaven,
              ' pushes towards the ferries with her child. ',
              refs.npcs.sergeant_bruna_kell,
              ' shouts for recruits from a crate while ',
              refs.npcs.tempest_soldier,
              's drill and load supplies for the rollout.',
            ],
          ],
        },
        {
          note: [
            [
              refs.beasts.wolfie,
              ' and ',
              refs.npcs.abraham,
              ' are at the stables. What happens to them is up to the party: ask before they leave.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [
            ['They head for ', refs.locations.tempest, ' to find ', refs.npcs.onana_tempest, '.'],
          ],
          response: [
            [
              'That way is a sky bridge too, and it is clogged just the same. Run ',
              refs.scenes.the_clogged_ferry_landing,
              '.',
            ],
          ],
        },
        {
          when: [['They stay where they are.']],
          response: [
            [
              refs.npcs.captain_garran,
              ' and his soldiers come to collect them, as they did before (',
              refs.events.n2_e168,
              '). Run ',
              refs.scenes.boarded_by_the_battle_cruiser,
              ' from his questions on.',
            ],
          ],
        },
        {
          when: [['They help ', refs.npcs.maren_of_fairhaven, ' or ', refs.npcs.old_pell, '.']],
          response: [
            ['A friendly face in the chaos, and someone who points them through the back streets.'],
          ],
        },
        {
          when: [['They talk to ', refs.npcs.sergeant_bruna_kell, '.']],
          response: [
            ['She tries to sign them up. Signing gets them a pass through the clogged links.'],
          ],
        },
        {
          when: [
            ['They want to see where the beam hit, or to find ', refs.pcs.swift_starblade, '.'],
          ],
          response: [
            ['The only way across is the ferry. Run ', refs.scenes.the_clogged_ferry_landing, '.'],
          ],
        },
        {
          when: [['They head to the shipyard for their airship.']],
          response: [['Run ', refs.scenes.the_ents_hold_the_shipyard, '.']],
        },
      ],
    },
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Chaos on the sky islands',
  location: refs.locations.stables_at_skynet_s_second_best_inn,
  npcs: [refs.npcs.abraham, refs.npcs.crowy],
  setup: [
    [
      refs.pcs.devan,
      ' and ',
      refs.pcs.cassian_veyl,
      ' stand outside the stables on ',
      refs.locations.skynet,
      '. They saw both beams strike the docks of ',
      refs.locations.nimbus,
      ', where ',
      refs.pcs.swift_starblade,
      ' went. This scene picks up where ',
      refs.scenes.the_green_beam_over_the_sky_islands,
      ' cuts away from him.',
    ],
  ],
  beats: [
    {
      title: 'Crowy arrives',
      onlyIf: [['', refs.pcs.swift_starblade, ' saved ', refs.npcs.crowy, ' on the docks.']],
      lines: [
        {
          do: [
            [
              refs.npcs.crowy,
              ' stood on the docks of ',
              refs.locations.nimbus,
              ' with ',
              refs.pcs.swift_starblade,
              ' and ',
              refs.pcs.jim,
              ' when the second beam struck, and it left him dying there (',
              refs.scenes.the_green_beam_over_the_sky_islands,
              '). ',
              refs.pcs.swift_starblade,
              ' got him back on his feet, so now he flies across to ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              ' on ',
              refs.locations.skynet,
              '.',
            ],
            ['Bring him in a little after the beam, still singed. He remembers who saved him.'],
          ],
        },
      ],
    },
    {
      title: 'No word from the docks',
      onlyIf: [['', refs.npcs.crowy, ' died on the docks.']],
      lines: [
        {
          do: [
            [
              'Nobody brings word from ',
              refs.locations.nimbus,
              '. All ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              ' know is what they saw from here: the beams struck the docks where ',
              refs.pcs.swift_starblade,
              ' went. What happened there, they hear from him when they find him in ',
              refs.scenes.picking_up_swift_at_nimbus,
              '.',
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

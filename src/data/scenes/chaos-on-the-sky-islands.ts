import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Chaos on the sky islands',
  illustrations: ['/assets/scenes/chaos-on-the-sky-islands.png'],
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
            [
              'Bring him in a little after the beam, still singed. The flight takes everything he has left: he arrives at exhaustion level 5, and delivers a small speech:',
            ],
          ],
        },
        {
          speaker: refs.npcs.crowy,
          say: [['Get to the Nimbus docks, fast! Jim… Swifty they are in trouble!']],
        },
        { do: [['Then ', refs.npcs.crowy, ' collapses.']] },
        {
          note: [
            [
              'This is what sends ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              ' to the docks of ',
              refs.locations.nimbus,
              '. The ways there are under Chaos on the islands, below.',
            ],
            [
              'Exhaustion level 5 is one step from death: a sixth level kills him. A ',
              refs.rules.long_rest,
              ' takes one level off. What they do with him is up to them.',
            ],
            ['He remembers who saved him.'],
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
          icon: 'gi/GiPathDistance',
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
          icon: 'gi/GiHourglass',
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
          icon: 'gi/GiLifeBuoy',
          when: [['They help ', refs.npcs.maren_of_fairhaven, ' or ', refs.npcs.old_pell, '.']],
          response: [
            ['A friendly face in the chaos, and someone who points them through the back streets.'],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['They talk to ', refs.npcs.sergeant_bruna_kell, '.']],
          response: [
            ['She tries to sign them up. Signing gets them a pass through the clogged links.'],
          ],
        },
        {
          icon: 'gi/GiMagnifyingGlass',
          when: [
            ['They want to see where the beam hit, or to find ', refs.pcs.swift_starblade, '.'],
          ],
          response: [
            ['The only way across is the ferry. Run ', refs.scenes.the_clogged_ferry_landing, '.'],
          ],
        },
        {
          icon: 'gi/GiShipBow',
          when: [['They head to the shipyard for their airship.']],
          response: [['Run ', refs.scenes.the_ents_hold_the_shipyard, '.']],
        },
      ],
    },
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Tempest family',
  icon: 'gi/GiBoltEye',
  direction: [['Who rules Tempest, who owes them, and where does the party stand?']],
  quests: [refs.quests.settle_the_shipwright_s_favors, refs.quests.recover_ride_the_lightning],
  plots: [
    {
      name: 'Summoned to Tempest',
      status: 'closed',
      npcs: [refs.npcs.onana_tempest],
      events: [
        refs.events.n2_e168,
        refs.events.n2_e169,
        refs.events.n2_e170,
        refs.events.n2_e171,
        refs.events.n2_e172,
        refs.events.n2_e173,
      ],
    },
    {
      name: 'The airship and the shipwright',
      status: 'closed',
      npcs: [refs.npcs.esia],
      events: [refs.events.n2_e179, refs.events.n2_e180, refs.events.n2_e181, refs.events.n2_e182],
    },
    {
      name: 'The gang’s stories',
      status: 'closed',
      npcs: [refs.npcs.skynet_gang_leader, refs.npcs.barbara],
      events: [refs.events.n2_e183, refs.events.n2_e184],
    },
    {
      name: 'The shipwright’s favours',
      hook: [
        ['', refs.npcs.esia, ' is owed two favours. Which Tempest does the first one point at?'],
      ],
      npcs: [refs.npcs.esia, refs.npcs.charles_tempest],
    },
    {
      name: 'The islands in chaos',
      hook: [
        [
          'The beams have struck, the streets are packed, and the army is rolling out. Where do ',
          refs.pcs.devan,
          ' and ',
          refs.pcs.cassian_veyl,
          ' go?',
        ],
      ],
      scene: refs.scenes.chaos_on_the_sky_islands,
      events: [refs.events.n2_e209, refs.events.n2_e212, refs.events.n2_e215],
      notes: [
        [
          refs.pcs.devan,
          ' and ',
          refs.pcs.cassian_veyl,
          ' crossed to ',
          refs.locations.nimbus,
          '; the party and the troops of ',
          refs.npcs.captain_garran,
          ' helped the residents. The fallen ferry passengers were not accounted for.',
        ],
      ],
    },
    {
      name: 'The crossing is shut',
      status: 'closed',
      hook: [['The beam took a ferry, and the army is taking the other. How do they get across?']],
      scene: refs.scenes.the_clogged_ferry_landing,
      events: [refs.events.n2_e212, refs.events.n2_e213],
      notes: [
        [
          'The ferryman refused passage. ',
          refs.pcs.auren,
          ' arrived with ',
          refs.items.little_purple,
          ' and provided the crossing; the prepared military confrontation at the ferry was not played.',
        ],
      ],
    },
    {
      name: 'Taking the airship early',
      status: 'closed',
      hook: [[refs.items.little_purple, ' has been delivered and flown, but remains unfinished.']],
      scene: refs.scenes.the_ents_hold_the_shipyard,
      events: [refs.events.n2_e213],
      notes: [
        [
          refs.pcs.auren,
          ' delivered ',
          refs.items.little_purple,
          ' before it was finished, with its crystal not fully charged. The party did not play through the prepared shipyard confrontation.',
        ],
      ],
    },
    {
      name: 'A shadow on the crossing',
      status: 'closed',
      hook: [
        [
          'A battle-cruiser orders them to heave to and casts its hooks. Do they run, cut loose, talk, or stop?',
        ],
      ],
      scene: refs.scenes.running_from_the_battle_cruiser,
      events: [refs.events.n2_e214],
      notes: [
        [
          'The party cut the grappling hooks and reached ',
          refs.locations.nimbus,
          ' without being boarded. The cruiser followed them there.',
        ],
      ],
    },
    {
      name: 'Impounded',
      hook: [['', refs.npcs.onana_tempest, ' is seizing every vessel for the war, theirs too.']],
      scene: refs.scenes.boarded_by_the_battle_cruiser,
      events: [refs.events.n2_e215, refs.events.n2_e219],
      notes: [
        [
          'The party met ',
          refs.npcs.captain_garran,
          ' on the Nimbus docks, not through a completed boarding during the crossing. ',
          refs.items.little_purple,
          ' was subsequently held aboard ',
          refs.items.master_of_puppets,
          '.',
        ],
      ],
    },
    {
      name: 'Collecting the rest',
      status: 'closed',
      hook: [
        [
          'The cruiser puts in at the docks of ',
          refs.locations.nimbus,
          ' to look at where the beam struck. Can the party find ',
          refs.pcs.swift_starblade,
          ' before the captain loses patience?',
        ],
      ],
      scene: refs.scenes.picking_up_swift_at_nimbus,
      events: [refs.events.n2_e215],
      notes: [
        [
          'The party reunited with ',
          refs.pcs.swift_starblade,
          ' at the Nimbus harbor and helped the civilians before reporting to ',
          refs.npcs.onana_tempest,
          '.',
        ],
      ],
    },
    {
      name: 'The Tempests go to war',
      hook: [
        [
          refs.npcs.onana_tempest,
          ' will return their vessel for a promise to help. Will the party stand with him?',
        ],
      ],
      npcs: [refs.npcs.the_father],
      scene: refs.scenes.onana_calls_the_party_to_war,
      events: [refs.events.n2_e219, refs.events.n2_e220],
      notes: [
        [
          'The party accepted the recovery mission. The party could not tell which of their thoughts ',
          refs.npcs.onana_tempest,
          ' had probed. The promised return and repair of ',
          refs.items.little_purple,
          ' and any further reward remain outstanding.',
        ],
      ],
    },
    {
      name: 'Getting aboard',
      status: 'closed',
      hook: [
        [
          'A boarding torpedo that holds one person at a time, or a way of their own. How does the party get onto ',
          refs.items.ride_the_lightning,
          '?',
        ],
      ],
      scene: refs.scenes.boarding_ride_the_lightning,
      events: [refs.events.n2_e221],
      notes: [
        [
          'All four boarded by capsule. ',
          refs.pcs.swift_starblade,
          ', ',
          refs.pcs.cassian_veyl,
          ', and ',
          refs.pcs.devan,
          ' used one entry room; ',
          refs.pcs.auren,
          ' used the other.',
        ],
      ],
    },
    {
      name: 'A fleet at war with itself',
      hook: [
        [
          'Some of the twenty battle-cruisers answer to ',
          refs.organizations.the_eyeless_hand,
          '. Can the party take one back?',
        ],
      ],
      scene: refs.scenes.taking_back_a_battle_cruiser,
      events: [refs.events.n2_e220, refs.events.n2_e222],
      notes: [
        [
          'Only the initial boarding rooms have been cleared. The bridge, crystal, lower deck, and all remaining prepared encounters are unplayed. Both bow rooms on the main deck were cleared.',
        ],
      ],
    },
    {
      name: 'Whose cruiser now?',
      hook: [
        [
          refs.npcs.captain_garran,
          ' wants to take over the cruiser the party just won back. Will they hand it over, or run with it?',
        ],
      ],
      scene: refs.scenes.garran_comes_for_the_cruiser,
    },
    {
      name: 'A debt and a word of advice',
      hook: [
        [
          'If the party hands the cruiser over, ',
          refs.npcs.onana_tempest,
          ' gives ',
          refs.items.little_purple,
          ' back with two more cannons and a boarding torpedo tube, and sends them away with one piece of advice: go to a guildhall. Do they take it?',
        ],
      ],
      scene: refs.scenes.onana_sends_the_party_on,
    },
    {
      name: 'A letter instead of a fleet',
      hook: [
        [
          'Either way, ',
          refs.npcs.onana_tempest,
          ' writes to ',
          refs.npcs.light_13th_marshal,
          ' about the party, and ',
          refs.npcs.crowy,
          ' brings the letter up in front of them. What do they make of being observed? And if they ran with the cruiser, do they bring her home?',
        ],
      ],
      npcs: [refs.npcs.onana_tempest, refs.npcs.crowy],
      scene: refs.scenes.crowy_brings_up_onana_s_letter,
    },
  ],
})

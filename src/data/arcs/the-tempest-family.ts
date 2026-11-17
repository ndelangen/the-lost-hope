import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Tempest family',
  icon: 'gi/GiBoltEye',
  direction: [['Who rules Tempest, who owes them, and where does the party stand?']],
  quests: [refs.quests.settle_the_shipwright_s_favors],
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
      name: 'The crossing is shut',
      hook: [['The beam took a ferry, and the army is taking the other. How do they get across?']],
      scene: refs.scenes.the_clogged_ferry_landing,
    },
    {
      name: 'Taking the airship early',
      hook: [['The airship is not finished, and nobody in the party can fly it.']],
      scene: refs.scenes.the_ents_hold_the_shipyard,
    },
    {
      name: 'A shadow on the crossing',
      hook: [
        [
          'A battle-cruiser orders them to heave to and casts its hooks. Do they run, cut loose, talk, or stop?',
        ],
      ],
      scene: refs.scenes.running_from_the_battle_cruiser,
    },
    {
      name: 'Impounded',
      hook: [['', refs.npcs.onana_tempest, ' is seizing every vessel for the war, theirs too.']],
      scene: refs.scenes.boarded_by_the_battle_cruiser,
    },
    {
      name: 'Collecting the rest',
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
    },
    {
      name: 'Getting aboard',
      hook: [
        [
          'A boarding torpedo that holds one person at a time, or a way of their own. How does the party get onto ',
          refs.items.ride_the_lightning,
          '?',
        ],
      ],
      scene: refs.scenes.boarding_ride_the_lightning,
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
  ],
})

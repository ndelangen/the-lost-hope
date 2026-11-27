import { refs } from '#/data/generated/refs.ts'
import { create as createTable } from '#/definitions/table.ts'

export default createTable({
  past: [
    refs.scenes.borris_shutters_the_casino,
    refs.scenes.the_hand_comes_for_jim,
    refs.scenes.the_green_pulse_over_the_sky_islands,
    refs.scenes.the_green_beam_over_the_sky_islands,
    refs.scenes.chaos_on_the_sky_islands,
    refs.scenes.the_clogged_ferry_landing,
    refs.scenes.the_ents_hold_the_shipyard,
    refs.scenes.running_from_the_battle_cruiser,
    refs.scenes.boarded_by_the_battle_cruiser,
    refs.scenes.picking_up_swift_at_nimbus,
    refs.scenes.the_party_reunites_on_the_docks,
    refs.scenes.onana_calls_the_party_to_war,
    refs.scenes.boarding_ride_the_lightning,
  ],
  likely: [
    refs.scenes.taking_back_a_battle_cruiser,
    refs.scenes.garran_comes_for_the_cruiser,
    refs.scenes.onana_sends_the_party_on,
    refs.scenes.crowy_brings_up_onana_s_letter,
  ],
  ready: [
    refs.scenes.a_fleet_on_an_empty_sea,
    refs.scenes.hex_loses_patience,
    refs.scenes.swift_s_silver_container_opens,
    refs.scenes.down_through_the_rubble,
    refs.scenes.light_walks_auren_through_fajanet,
    refs.scenes.fix_s_last_delivery,
    refs.scenes.questions_for_light,
    refs.scenes.the_bard_s_new_song,
    refs.scenes.bob_returns_cassian_s_ring,
    refs.scenes.four_stomps_under_the_moon,
  ],
})

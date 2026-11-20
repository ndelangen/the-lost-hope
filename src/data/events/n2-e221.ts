import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party boards Ride the Lightning through two entry rooms',
  day: 24,
  location: refs.locations.ride_the_lightning_main_deck,
  mark: { type: 'icon', name: 'gi/GiCargoShip' },
  notes: [
    [
      'From the ',
      refs.locations.master_of_puppets_gun_deck,
      ', ',
      refs.npcs.captain_garran,
      ' fired the party in individual boarding capsules into ',
      refs.items.ride_the_lightning,
      '. They arrived in the order ',
      refs.pcs.swift_starblade,
      ', ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.auren,
      ', then ',
      refs.pcs.devan,
      '.',
    ],
    [
      refs.pcs.swift_starblade,
      ' chose one of the two bow compartments. ',
      refs.pcs.cassian_veyl,
      ' followed into the same room, while ',
      refs.pcs.auren,
      ' chose the other entry. ',
      refs.pcs.devan,
      ' followed ',
      refs.pcs.cassian_veyl,
      '; his capsule’s impact destroyed the earlier capsule and freed ',
      refs.pcs.cassian_veyl,
      ', but also injured him.',
    ],
    [
      refs.beasts.captain_squawk,
      ' had perched on the first capsule and was killed when the next capsule struck it. The route continued through the entry rooms and their connecting doorway.',
    ],
  ],
})

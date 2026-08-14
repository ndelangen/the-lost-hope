import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Guild tattoos pass for papers at the gate',
  day: 12,
  location: refs.locations.fairhaven_city_gate,
  mark: { type: 'icon', name: 'gi/GiPassport' },
  notes: [
    [
      'At ',
      refs.locations.fairhaven_city_gate,
      ', the guards demanded standard traveler paperwork to enter ',
      refs.locations.fairhaven,
      '.',
    ],
    [
      'The party had none, but their ',
      refs.organizations.adventurers_guild,
      ' tattoos were accepted as sufficient credentials because the ',
      refs.organizations.adventurers_guild,
      ' is a recognized regional authority, and they were let in.',
    ],
    [
      refs.pcs.jim,
      ' was anxious throughout the exchange because he has no formal papers and is on the run from both the law and ',
      refs.organizations.the_eyeless_hand,
      '.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})

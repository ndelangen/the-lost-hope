import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Guild tattoos pass for papers at the gate',
  day: 12,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'gi/GiPassport' },
  notes: [
    [
      'On arrival at ',
      refs.locations.fairhaven,
      ', the gate guards demanded standard traveler paperwork to enter the city.',
    ],
    [
      'The party had none, but their ',
      refs.organizations.adventurers_guild,
      ' tattoos were accepted as sufficient credentials because the guild is a recognized regional authority, and they were let in.',
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

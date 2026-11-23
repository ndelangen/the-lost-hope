import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'The Eyeless Hand',
  icon: 'gi/GiHand',
  notes: [
    [
      'A global criminal syndicate trading in illegal and semi-illegal drugs, with operatives seemingly everywhere.',
    ],
    ['Senior operatives are called "fingers".'],
  ],
  background: [
    [
      'Arcane Dust is supplied only to the twelve marshals by ',
      refs.npcs.light_13th_marshal,
      ', so every grain the Hand sells comes from the secondary market that the marshals’ corruption feeds.',
    ],
    [
      'The Eyes are a rank addressed ahead of the Fingers in the orders of ',
      refs.npcs.the_father,
      '. When conventional means fail, the Hand escalates through Eyes authorization tiers and Eyes-level intervention.',
    ],
  ],
})

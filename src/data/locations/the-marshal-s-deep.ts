import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Marshal’s Deep',
  icon: 'gi/GiKrakenTentacle',
  type: 'wilderness',
  parent: refs.locations.the_marshal_s_waters,
  at: [525, 600],
  notes: [
    [
      'The seabed far below ',
      refs.locations.the_caves_of_steel,
      '. The people of the Caves strongly advise anyone against going looking for it.',
    ],
  ],
  background: [['Where ', refs.npcs.the_11th_marshal, ' rests, and from where it never leaves.']],
})

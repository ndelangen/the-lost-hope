import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim talks with an old holly ent',
  day: 24,
  location: refs.locations.skynet_airship_shipyard,
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      'At the shipyard, ',
      refs.pcs.jim,
      ' spoke with ',
      refs.npcs.hollin_slowbough,
      ', one of the ents who work the yard.',
    ],
  ],
})

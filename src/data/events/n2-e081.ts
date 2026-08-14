import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'A phoenix feather guides the party out of the shadow realm',
  day: 9,
  location: refs.locations.shadow_realm,
  mark: { type: 'icon', name: 'gi/GiFeather' },
  notes: [
    [refs.items.phoenix_feather, ' cast bright light, guiding the party to safety.'],
    [refs.items.phoenix_feather, ' burned up and dissolved afterward.'],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
      '.',
    ],
  ],
})

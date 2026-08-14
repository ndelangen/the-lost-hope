import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Find a phoenix feather in an offshoot',
  day: 2,
  location: refs.locations.fajanet_tunnel_phoenix_offshoot,
  mark: { type: 'icon', name: 'gi/GiFeather' },
  notes: [
    ['Following the tunnel, the party found an offshoot and explored it.'],
    [
      'In the offshoot they found a ',
      refs.items.phoenix_feather,
      ' hanging from a root in the underground tunnel.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

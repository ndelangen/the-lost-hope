import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Reach a cliff with a sign',
  day: 9,
  location: refs.locations.mountain_cliff,
  illustrations: ['/assets/scenes/reach-a-cliff-with-a-sign.png'],
  mark: { type: 'icon', name: 'gi/GiWoodenSign' },
  notes: [
    ['The party reached a cliff. There was a sign.'],
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
    ],
  ],
})

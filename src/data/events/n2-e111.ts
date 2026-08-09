import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian discovers his ring’s hunger',
  day: 20,
  location: refs.locations.gambling_deck,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      'Despite eating a large breakfast, ',
      refs.pcs.cassian_veyl,
      ' remained insatiably hungry and recognized the ',
      refs.items.wolfie_tracking_ring,
      ' as the cause. Having worn it for a full day, he became attuned to it.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'A drake carriage carries the party to Tempest',
  day: 24,
  location: refs.locations.onana_tempest_s_estate,
  mark: { type: 'avatar', of: refs.pcs.devan },
  notes: [
    [
      'The escort provided a luxurious carriage mounted on a drake-like creature. Crystal-powered magical screens kept the wind out as it carried the party across the clouds to a castle estate.',
    ],
    [
      'During the journey, ',
      refs.pcs.devan,
      ' scattered advertising flyers for ',
      refs.npcs.bessy,
      "'s work.",
    ],
  ],
  illustrations: ['/assets/scenes/a-drake-carriage-carries-the-party-to-tempest.png'],
})

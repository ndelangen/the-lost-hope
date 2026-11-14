import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim draws Cage, Vessel, and Voidwalker',
  notes: [
    [
      refs.pcs.jim,
      ' drew ',
      refs.effects.cage,
      ', ',
      refs.effects.vessel,
      ', and ',
      refs.effects.voidwalker,
      '.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
})

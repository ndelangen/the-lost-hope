import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet Light in the morning and leave Fajanet',
  date: new Date('2026-08-17T08:00'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiFootsteps' },
  parts: [
    [
      refs.pcs.jim,
      " rejected the letter's invitation and hurried the party to meet with ",
      refs.npcs.third_marshal_light,
      ', then made for a hasty leave of ',
      refs.locations.fajanet,
      '.',
    ],
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

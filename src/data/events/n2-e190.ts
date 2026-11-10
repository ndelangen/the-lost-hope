import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim draws Cage, Vessel, and Voidwalker',
  notes: [
    [
      refs.pcs.jim,
      ' drew Cage, Vessel, and Voidwalker. Cage bound him within 100 feet of the drawing spot for at least thirty days, teleporting him back and dealing 2d6 force damage if he tried to leave.',
    ],
    [
      'Vessel let him store a spell of up to fifth level in his body for later casting without a spell slot. Failing to store a spell within 24 hours would deal 2d8 force damage; leaving a stored spell unused for seven days would deal 3d8 force damage.',
    ],
    [
      'Voidwalker made him ethereal for four weeks. He could still be seen and heard, and his equipment changed with him, but he could not touch or affect material objects or creatures. A Wish or divine intervention could end the effect early. The DM allowed speech but ruled that he could not send Message to other creatures. His interaction with other spells and physical barriers required further rulings.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
})

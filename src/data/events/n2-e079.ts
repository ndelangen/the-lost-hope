import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party meets worshippers of the 12th Marshal',
  day: 16,
  location: refs.locations.snowy_mountain_ruin,
  mark: { type: 'avatar', url: '/assets/pcs/jim-kenku.jpg' },
  notes: [
    [
      'At ',
      refs.locations.snowy_mountain_ruin,
      ', clear signs showed that someone was repairing the ruins. Six people were chanting there. The party joined them for a meal and conversation.',
    ],
    [
      'The group invited the party to worship ',
      refs.npcs.the_12th_marshal,
      ', whom they described as a living dragon god capable of greatly extending life.',
    ],
    [
      refs.pcs.jim,
      ' considered the offer but decided to speak with ',
      refs.npcs.light_13th_marshal,
      ' first. He felt that having a short life was not the problem he needed to solve.',
    ],
  ],
})

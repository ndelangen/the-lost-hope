import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Bulletin board — pick a quest',
  date: new Date('2026-08-10T11:00'),
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'fa/FaScroll' },
  parts: [
    [
      'The party browsed the ',
      refs.locations.fajanet_guildhall,
      ' bulletin board and chose the quest posted by the ',
      refs.npcs.rare_animal_dealer,
      '.',
    ],
    'Details of the trainer, the animal, and the actual problem are TBD. The party has accepted the job.',
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

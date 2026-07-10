import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Night falls; tavern closes up',
  day: 1,
  location: refs.locations.the_nest,
  mark: { type: 'icon', name: 'fa/FaMoon' },
  notes: [
    [
      'The party sat in the common room of ',
      refs.locations.the_nest,
      '. Night fell. ',
      refs.npcs.samantha,
      ' closed the tavern and boarded it up.',
    ],
    [
      'Boarding up seemed routine. The party retired to their rooms before the strange sounds began later that night.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

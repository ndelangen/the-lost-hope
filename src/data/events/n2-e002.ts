import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim receives a letter from Light',
  day: 1,
  location: refs.locations.the_boat_to_fajanet_celesta,
  mark: { type: 'avatar', url: '/assets/pcs/jim-kenku.jpg' },
  notes: [
    [
      refs.pcs.jim,
      ' received a letter from ',
      refs.npcs.light_13th_marshal,
      " inviting them to the city and to join the Adventurers' Guild. Jim quietly passed copies of the letter to ",
      refs.pcs.william_greenhove,
      ' and ',
      refs.pcs.revin_grumblefist,
      '.',
    ],
  ],
})

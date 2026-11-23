import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim receives a letter from Light',
  day: 1,
  location: refs.locations.the_boat_to_fajanet_celesta,
  illustrations: ['/assets/scenes/jim-receives-a-letter-from-light.png'],
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      refs.pcs.jim,
      ' and ',
      refs.pcs.william_greenhove,
      ' were each handed a letter from ',
      refs.npcs.light_13th_marshal,
      ' inviting them to the city and to join the ',
      refs.organizations.adventurers_guild,
      '.',
    ],
    [refs.pcs.revin_grumblefist, ' also received a copy.'],
  ],
})

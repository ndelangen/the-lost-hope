import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Month-long boat journey',
  day: 1,
  location: refs.locations.the_boat_to_fajanet_celesta,
  mark: { type: 'icon', name: 'gi/GiSailboat' },
  notes: [
    [
      'The three PCs arrived by boat after a month-long journey. They got to know each other only shallowly during the trip — long enough to learn names, races, and a few habits, not long enough for real trust.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

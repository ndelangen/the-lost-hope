import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Two zombies attack at the docks',
  day: 1,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiCrossedSwords' },
  notes: [
    [
      'After deboarding, two zombies attacked the party at the docks. The party fought them off. Injuries sustained: not recorded.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Bob’s skeletal appearance triggers a final warning',
  day: 20,
  location: refs.locations.bob_s_stall,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      'While the party was still shopping at ',
      refs.npcs.bob_the_merchant,
      '’s stall, ',
      refs.pcs.jim,
      ' asked whether Bob and his parents were skeletons. Bob denied being dead.',
    ],
    [
      'The party froze and each witnessed a creature beyond mortal understanding: a single eye staring from the abyss. Time then reversed by five seconds.',
    ],
    [
      'The supernatural episode served as a final warning not to call Bob undead or acknowledge his skeletal appearance. Bob warned that another violation would cost the party their gold and the ',
      refs.items.bag_of_holding,
      '.',
    ],
  ],
})

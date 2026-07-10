import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Visit the exotic animal dealer',
  day: 2,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaMapMarkerAlt' },
  notes: [
    [
      'The party went to the ',
      refs.npcs.rare_animal_dealer,
      ' to follow up on the guild bulletin-board quest.',
    ],
    ['The dealer is missing 3 animals. The party agreed to recover them.'],
    [
      'Originally filed as "rare-animal trainer"; per this session the in-fiction name is "exotic animal dealer".',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

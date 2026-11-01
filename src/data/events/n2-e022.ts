import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "William's bathroom experience",
  day: 2,
  location: refs.locations.fajanet_guildhall_bathroom,
  mark: { type: 'icon', name: 'lucide/Toilet' },
  notes: [
    [
      refs.pcs.william_greenhove,
      ' had a private experience in the ',
      refs.locations.fajanet_guildhall_bathroom,
      '. Its details are not recorded.',
    ],
    [
      'This personal story will not continue because ',
      refs.pcs.william_greenhove,
      "'s player has left the party.",
    ],
    ['Party: ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

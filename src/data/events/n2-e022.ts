import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "William's bathroom experience",
  day: 2,
  location: refs.locations.fajanet_guildhall_bathroom,
  illustrations: ['/assets/scenes/william-s-bathroom-experience.png'],
  mark: { type: 'icon', name: 'lucide/Toilet' },
  notes: [
    [
      refs.pcs.william_greenhove,
      ' saw a ghostly figure of a girl in the ',
      refs.locations.fajanet_guildhall_bathroom,
      '. She was connected to his past, but her identity remains unknown.',
    ],
    [
      'This personal story will not continue because ',
      refs.pcs.william_greenhove,
      "'s player has left the party.",
    ],
    ['Party: ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

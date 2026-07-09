import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "William's bathroom experience",
  date: new Date('2026-08-10T22:00'),
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'fa/FaDoorOpen' },
  parts: [
    [
      refs.pcs.william_greenhove,
      ' had an experience in the ',
      refs.locations.fajanet_guildhall,
      ' bathroom relating to a ',
      refs.npcs.mystery_girl,
      ' from his background story (session 3).',
    ],
    "Author note: likely never resolved — William's player has left the party.",
    ['Party: ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

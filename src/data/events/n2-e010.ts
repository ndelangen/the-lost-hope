import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet Light 13th Marshal at the guildhall',
  day: 2,
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'fa/FaHandshake' },
  notes: [
    [
      'The party reached the ',
      refs.locations.fajanet_guildhall,
      ' and met ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
    [
      refs.npcs.light_13th_marshal,
      ' officially offered them membership in the ',
      refs.organizations.adventurers_guild,
      '. With membership, each new recruit gets one favor from ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})

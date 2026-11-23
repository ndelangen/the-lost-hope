import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Mr. Peace joins for one session',
  day: 3,
  location: refs.locations.fajanet,
  illustrations: ['/assets/scenes/mr-peace-joins-for-one-session.png'],
  mark: { type: 'avatar', of: refs.pcs.mr_peace },
  notes: [
    [
      refs.pcs.mr_peace,
      ' joined the party for one day only — arranged by the ',
      refs.organizations.adventurers_guild,
      ' / ',
      refs.npcs.light_13th_marshal,
      '. Everyone knew his visit was temporary.',
    ],
  ],
})

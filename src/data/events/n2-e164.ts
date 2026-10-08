import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party prepares to travel to Tempest with Sarogarth',
  day: 23,
  location: refs.locations.skynet,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      refs.npcs.sarogarth,
      ' agreed to accompany the party to ',
      refs.locations.tempest,
      ', despite wanting to reach solid ground. They discussed the noble rulers and colosseum on the third island. The session ended before travel was recorded.',
    ],
    [
      'Because ',
      refs.pcs.swift_starblade,
      ' had been banned from the casino, they agreed that ',
      refs.npcs.sarogarth,
      " would disguise him as a famous pirate from two thousand years ago. The pirate's identity was not chosen in the surviving record. They told him to use a new name on any business cards he handed out. The transformation was still a plan.",
    ],
  ],
})

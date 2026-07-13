import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Devan drunkenly reveals Jim's name to Fix",
  day: 13,
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'icon', name: 'gi/GiDrinking' },
  notes: [
    [
      'During the same early-morning guildhall scene as ',
      refs.events.n2_e058,
      ', ',
      refs.pcs.fix,
      "'s first interaction with a very drunk ",
      refs.pcs.devan,
      ', ',
      refs.pcs.devan,
      ' told her that the kenku was named ',
      refs.pcs.jim,
      '.',
    ],
    [
      refs.pcs.devan,
      ' had learned the name when ',
      refs.pcs.jim,
      ' truthfully answered a question about his identity in ',
      refs.events.n2_e034,
      '.',
    ],
    [
      'The disclosure gave ',
      refs.pcs.fix,
      ' the name of the person she had secretly been sent to hunt.',
    ],
  ],
})

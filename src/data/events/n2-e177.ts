import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The party connects the Fiddler's questions to their future",
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiPuzzle' },
  notes: [
    [
      'The party reconsidered ',
      refs.npcs.the_fiddler,
      "'s questions from ",
      refs.events.n2_e105,
      '. They connected ',
      refs.pcs.devan,
      "'s priesthood and the idea of ",
      refs.pcs.swift_starblade,
      ' owning an airship with his earlier remarks. ',
      refs.pcs.jim,
      ' recalled being asked whether he was already the new Father.',
    ],
    [
      'They suspected time travel or movement between timelines, rather than simple foresight. The DM encouraged the connection, but the discussion did not establish the explanation as fact. They decided they wanted to find the dealer again.',
    ],
    [
      'They also revisited ',
      refs.npcs.crowy,
      "'s observation of the dealer changing after a card draw. They could not agree on the exact change or what they themselves had perceived.",
    ],
  ],
})

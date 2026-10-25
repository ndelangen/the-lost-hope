import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The gang tells the party about Barbara',
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiTavernSign' },
  notes: [
    [
      'The gang described ',
      refs.npcs.barbara,
      " as an elderly customer who beat their much larger members when they tried to deny her drugs. They said they had given her free halfling weed to make her leave, and that she returned for stronger substances. These were the dealers' accounts, not a meeting with her.",
    ],
    [
      'The party returned to asking about weaknesses or possessions of ',
      refs.npcs.anton_tempest,
      '. A statue was mentioned, but its description and whether anyone accepted a task involving it were not preserved clearly before the recording ended.',
    ],
  ],
})

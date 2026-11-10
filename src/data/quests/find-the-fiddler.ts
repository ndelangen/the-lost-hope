import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Find the Fiddler',
  icon: 'gi/GiMagnifyingGlass',
  type: 'mystery',
  notes: [
    [
      'Find ',
      refs.npcs.the_fiddler,
      ' and understand how he knew the party and possible events in their future.',
    ],
  ],
  clues: [
    [
      refs.events.n2_e105,
      ' records his questions before the party understood their possible significance.',
    ],
    [
      refs.events.n2_e177,
      ' connects those questions to later developments without settling whether he travels through time or between timelines.',
    ],
    [
      refs.events.n2_e178,
      ' provides two smoke trails through a blood ritual tied to the ',
      refs.items.deck_of_many_more_things,
      '. The party subsequently followed one trail to him.',
    ],
    [
      refs.events.n2_e187,
      ' records finding him in the casino VIP room on ',
      refs.locations.nimbus,
      '. Finding him did not explain his knowledge of possible futures. ',
      refs.events.n2_e203,
      ' places the second trail toward an unvisited flying fortress.',
    ],
  ],
  status: 'open',
})

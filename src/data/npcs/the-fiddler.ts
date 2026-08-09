import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The Fiddler',
  location: refs.locations.gambling_deck,
  notes: [
    [
      'A relaxed casino dealer on ',
      refs.locations.gambling_deck,
      ' aboard ',
      refs.locations.sylvias_flying_bazaar,
      ' who seemed to know the party before meeting them and to know parts of their future. He appears to perceive multiple possible timelines and sometimes confuses visitors with alternate versions of themselves.',
    ],
    [
      'The Fiddler chooses and runs dangerous games with a Deck of Many More Things. He promised that every future meeting with the party would feature a different game.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Sarogarth's tracking ritual produces two smoke trails",
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiRaven' },
  notes: [
    [
      refs.npcs.sarogarth,
      ' explained that unresolved effects of the ',
      refs.items.deck_of_many_more_things,
      ' still connected their recipients to the deck. Using blood supplied by the party and the ',
      refs.items.dagger_of_passive_aggression,
      ', he performed a tracking ritual intended to lead them to ',
      refs.npcs.the_fiddler,
      '.',
    ],
    [
      'Black smoke appeared and split into two trails. ',
      refs.npcs.crowy,
      ' flew up to scout and returned after about ten minutes. The split puzzled the group; multiple timelines and other explanations remained speculation. The smoke would last three days, but they did not follow it to a destination during the session.',
    ],
    [
      'The party told ',
      refs.npcs.sarogarth,
      ' about ',
      refs.npcs.bob_the_merchant,
      "'s skeletal appearance and the danger of acknowledging it. He was interested in meeting him, but warned that tracing a magical item could lead to its maker rather than its seller.",
    ],
  ],
})

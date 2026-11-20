import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim speaks with Light 1:1',
  day: 2,
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      'Rather than obey the letter, ',
      refs.pcs.jim,
      ' spoke with ',
      refs.npcs.light_13th_marshal,
      ' 1:1.',
    ],
    [
      refs.npcs.light_13th_marshal,
      ' was understanding and told ',
      refs.pcs.jim,
      ' to meet him with the rest of the party in the morning.',
    ],
    [
      'This is the first time ',
      refs.pcs.jim,
      ' has met ',
      refs.npcs.light_13th_marshal,
      ' one-on-one, separate from the rest of the party.',
    ],
    [
      refs.pcs.jim,
      ' told ',
      refs.npcs.light_13th_marshal,
      ' that he does not like wearing ',
      refs.items.jim_s_kenku_suit,
      ', that it smells, and that he does not wear it because he wants to. He wants his past to let him go.',
    ],
  ],
})

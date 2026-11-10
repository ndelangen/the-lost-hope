import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The Fiddler leaves more hints about Jim's future",
  notes: [
    [
      'Before leaving with ',
      refs.npcs.the_fiddler_s_knight,
      ', ',
      refs.npcs.the_fiddler,
      ' addressed ',
      refs.pcs.jim,
      ' as Jimmy boy, said he looked forward to his new suit, and again suggested that becoming the Father would suit him. These were hints, not a confirmed future or a revealed identity.',
    ],
    [
      "Other remarks about the party's prospects have unclear addressees in the transcript. His question about ",
      refs.beasts.wolfie,
      ' walking on two legs remained unexplained. The party had found him, but still did not understand his knowledge of possible futures.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiSecretBook' },
})

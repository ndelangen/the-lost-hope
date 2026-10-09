import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The party plans a crossroads ritual for Swift's broom",
  day: 23,
  location: refs.locations.skynet,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'The party discussed recovering ',
      refs.pcs.swift_starblade,
      "'s ",
      refs.items.demon_possessed_flying_broom,
      '. ',
      refs.npcs.sarogarth,
      ' gave them an envelope containing a ritual circle and ingredients, while repeatedly warning them not to perform it and denying that he would help.',
    ],
    [
      'They planned to find a crossroads on solid ground. The ritual was not performed and the broom remained missing.',
    ],
  ],
})

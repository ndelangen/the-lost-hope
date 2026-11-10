import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift gains the Mask card',
  notes: [
    [
      refs.pcs.swift_starblade,
      ' drew Mask, gaining the ability to change his appearance as with Alter Self. He must use it at least once daily or suffer psychic damage as his true form tries to reassert itself. The damage amount is unclear. The table discussed limits on the transformation, without establishing a different permanent identity.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
})

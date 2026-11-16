import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift gains the Mask card',
  notes: [
    [
      refs.pcs.swift_starblade,
      ' drew ',
      refs.effects.mask,
      '. The table discussed limits on the transformation, without establishing a different permanent identity.',
    ],
  ],
  day: 24,
  location: refs.locations.borris_s_gambling_den,
  mark: { type: 'avatar', of: refs.pcs.swift_starblade },
})

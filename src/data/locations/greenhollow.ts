import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Greenhollow',
  type: 'settlement',
  parent: refs.locations.world,
  at: [285, 410],
  notes: [
    [
      'A small border village where humans and elves lived together for generations. It was completely destroyed in the aftermath of the Second Great War.',
    ],
  ],
})

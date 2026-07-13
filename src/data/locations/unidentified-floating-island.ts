import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Unidentified Floating Island',
  type: 'landmark',
  parent: refs.locations.snowy_mountains,
  at: [0, 0],
  notes: [
    ['A mysterious island floating near the mountain peak; nobody in the party could identify it.'],
  ],
})

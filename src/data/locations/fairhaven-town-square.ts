import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Town Square',
  icon: 'gi/GiWaterFountain',
  type: 'landmark',
  parent: refs.locations.fairhaven,
  at: [0, 0],
  notes: [['A central public square used for civic gatherings and major announcements.']],
})

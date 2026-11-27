import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Lost Map Loop',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [430, 370],
  notes: [['A small loop around a block of thorns.']],
})

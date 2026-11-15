import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Port Where Swift Went Free',
  type: 'settlement',
  parent: refs.locations.world,
  at: [765, 410],
  notes: [
    [
      'A port city near the waters ',
      refs.npcs.captain_blackthorn,
      ' sailed. Its name is not recorded.',
    ],
  ],
})

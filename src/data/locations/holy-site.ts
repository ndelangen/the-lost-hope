import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Holy Site (mountains)',
  icon: 'gi/GiByzantinTemple',
  type: 'landmark',
  parent: refs.locations.world,
  at: [445, 410],
  notes: [
    [
      'The holy site represents the domain of the ',
      refs.npcs.misha,
      ', a safe haven he created for his ',
      refs.beasts.dragon_children,
      '.',
    ],
    [
      'A holy site between ',
      refs.locations.mountain_cliff,
      ' and the ',
      refs.locations.puzzle_room,
      '.',
    ],
  ],
  map: { url: '/assets/locations/holy-site-mountains.png', width: 1200, height: 800 },
})

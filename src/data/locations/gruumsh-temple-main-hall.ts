import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Main Hall',
  illustration: '/assets/locations/gruumsh-temple-main-hall-illustration.png',
  icon: 'gi/GiThroneKing',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [691, 369],
  map: { url: '/assets/maps/gruumsh-temple-main-hall.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'The initial gathering hall of the ',
      refs.locations.gruumsh_war_temple,
      ', used by the temple’s worshippers and the ',
      refs.npcs.gruumsh_high_priest,
      '.',
    ],
  ],
})

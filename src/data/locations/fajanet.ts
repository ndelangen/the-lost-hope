import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet',
  icon: 'gi/GiCastle',
  aliases: ['Citadel of Reve'],
  type: 'settlement',
  parent: refs.locations.reve,
  at: [500, 350],
  notes: [
    [
      'A small, secret settlement beside the mountains at the edge of the known world, governed by its guildmaster ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
  ],
  map: { url: '/assets/locations/fajanet.png', width: 1200, height: 700 },
})

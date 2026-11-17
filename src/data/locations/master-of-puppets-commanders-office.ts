import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Master of Puppets Commander’s Office',
  map: { url: '/assets/maps/master-of-puppets-commanders-office.jpg', width: 1536, height: 1024 },
  illustration: '/assets/locations/master-of-puppets-commanders-office-illustration.png',
  notes: [
    ['The office of ', refs.npcs.onana_tempest, ' aboard ', refs.items.master_of_puppets, '.'],
    [
      'In the corner stands a jukebox: a tall cabinet of brass and polished wood, with a glass front over a rack of engraved metal discs. A mechanical arm lifts a disc onto a turntable, and the machine plays music back with no musician in the room.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim talks with an old holly ent',
  day: 24,
  location: refs.locations.skynet_airship_shipyard,
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      'At the shipyard, ',
      refs.pcs.jim,
      ' spoke with ',
      refs.npcs.hollin_slowbough,
      ', one of the ents who work the yard.',
    ],
    [
      refs.pcs.jim,
      ' asked how the ents feel about their dead friends’ bodies being turned into people’s boats, and was surprised to learn that it is a great honour. The dead want to roam the world as a tribute, a voyage the ents call “the great journey beyond”.',
    ],
  ],
  illustrations: ['/assets/scenes/jim-talks-with-an-old-holly-ent.png'],
})

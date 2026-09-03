import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party passes the dungeon memorial',
  day: 22,
  location: refs.locations.serpent_eclipse_reception_hall,
  mark: { type: 'icon', name: 'gi/GiDoorway' },
  notes: [
    [
      refs.organizations.beasts_and_dwarf,
      ' returned to the dungeon and passed a memorial for twenty-three adventurers who had died there the previous week. Six more had already died that week.',
    ],
  ],
})

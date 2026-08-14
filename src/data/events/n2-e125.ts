import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party chooses the left door at the blood-fed altar',
  day: 21,
  location: refs.locations.serpent_eclipse_three_door_chamber,
  mark: { type: 'icon', name: 'gi/GiFloorHatch' },
  notes: [
    [
      'In the ',
      refs.locations.serpent_eclipse_three_door_chamber,
      ', the party fed blood to the altar and found three identical iron doors.',
    ],
    [
      'When they opened the left-hand door, a shadow announced that there would be one door, one challenge, one party, and one death. The party accepted that route; the other two doors remain unexplored.',
    ],
  ],
})

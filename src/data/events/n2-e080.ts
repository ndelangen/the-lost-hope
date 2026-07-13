import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party takes the mountain elevator down',
  day: 16,
  location: refs.locations.snowy_mountain_ruin,
  mark: { type: 'icon', name: 'gi/GiElevator' },
  notes: [
    [
      'As the party prepared to leave ',
      refs.locations.snowy_mountain_ruin,
      ', they asked whether another route existed. The worshippers revealed an elevator that travelled both up and down, and the party took it downward.',
    ],
  ],
})

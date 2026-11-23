import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim wakes to another lightning strike',
  day: 22,
  location: refs.locations.jim_s_room_at_skynet_s_second_best_inn,
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      'After a night at the inn, ',
      refs.pcs.jim,
      ' suffered another morning strike from his ',
      refs.effects.storm,
      ', taking nine damage. The party prepared to return to the dungeon after breakfast.',
    ],
  ],
  illustrations: ['/assets/scenes/jim-wakes-to-another-lightning-strike.png'],
})

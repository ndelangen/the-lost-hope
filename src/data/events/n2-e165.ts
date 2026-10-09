import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party travels from Nimbus to Skynet',
  day: 20,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiIsland' },
  notes: [
    [
      'When the party decided to go to ',
      refs.locations.skynet_s_second_best_inn,
      ', they left ',
      refs.locations.nimbus,
      ' and travelled to ',
      refs.locations.skynet,
      '. Their means of transport is not recorded.',
    ],
  ],
})

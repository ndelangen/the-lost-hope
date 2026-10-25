import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'An armed escort summons the party to Tempest',
  day: 24,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'icon', name: 'gi/GiPrisoner' },
  notes: [
    [
      'A heavily armoured man arrived with six companions and ordered the party to accompany him to a lord. They gathered food from breakfast and followed the escort outside.',
    ],
  ],
})

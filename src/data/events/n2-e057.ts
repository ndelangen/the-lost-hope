import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Fix dies and a shadow revives her',
  day: 17,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    ['During the chaos, the party saw ', refs.pcs.fix, ' die.'],
    [
      'A shadow performed a necromantic ritual and pushed her soul back into her body, reviving her.',
    ],
  ],
})

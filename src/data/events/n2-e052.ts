import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan punches the foreman and starts a mine fight',
  day: 17,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'icon', name: 'gi/GiPunch' },
  notes: [
    [
      refs.pcs.jim,
      ' questioned ',
      refs.pcs.devan,
      '’s uncharacteristic generosity. Devan then punched the foreman and triggered a large fight.',
    ],
  ],
})

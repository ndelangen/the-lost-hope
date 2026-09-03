import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian tests his luck with cheesecake',
  day: 22,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' tried a small portion of cheesecake with breakfast to test whether he could tolerate dairy. The resulting digestive accident answered that question, and he used Prestidigitation to clean up and conceal the smell.',
    ],
  ],
})

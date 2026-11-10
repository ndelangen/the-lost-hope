import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian replaces the meat and buys ritual goats',
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' bought twenty kilograms of meat to replace the lost supplies and feed ',
      refs.beasts.wolfie,
      '. The party also bought two sacrificial goats for possible future tracking rituals. No new ritual was performed.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiChecklist' },
})

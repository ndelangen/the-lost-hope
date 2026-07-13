import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim and Victor rescue Abraham from the guildhall stables',
  day: 14,
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'icon', name: 'gi/GiStable' },
  notes: [
    [
      refs.pcs.jim,
      ' and ',
      refs.pcs.victor_dranzig,
      ' went to the stables at ',
      refs.locations.fairhaven_guildhall,
      ' and freed ',
      refs.npcs.abraham,
      ', who had been locked inside during the invasion.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The alchemist sends the party after a rival',
  day: 12,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'fa/FaScroll' },
  notes: [
    [
      'An alchemist hired the party to eliminate a competitor, claiming the rival had stolen his recipe. The party learned that this was a lie and that the hiring alchemist had actually stolen the recipe from the rival.',
    ],
  ],
})

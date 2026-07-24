import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Alberto warns Swift against returning to the sea',
  day: 18,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' drank with ',
      refs.npcs.alberto,
      ', a former pirate captain turned bartender and information broker.',
    ],
    [
      refs.npcs.alberto,
      ' warned that returning to the ',
      refs.locations.sea_of_unknown,
      ' would require at least a small army because ',
      refs.npcs.blackbeard,
      ' and others remained hostile. Swift admitted that he still did not know whether he wanted to return.',
    ],
    [
      refs.npcs.alberto,
      ' had sold his own ship and crew because he expected the sea to become lethally dangerous during the coming decade and wanted no responsibility for what would happen.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The party breakfasts at Onana Tempest's estate",
  day: 24,
  location: refs.locations.tempest,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'Two water genasi attendants welcomed the party into the estate. Inside were gardens, a fountain, elaborate woodwork, and floating suits of armour. The party discussed an invisibility scheme but decided to wait rather than carry it out.',
    ],
    [
      'They were served another breakfast and a selection of old wines and spirits before ',
      refs.npcs.onana_tempest,
      ' joined them. ',
      refs.pcs.swift_starblade,
      ' drank the thousand-year-old Rainbow Skittles, which was said to grant advantage on skill checks for two days, but not attacks.',
    ],
  ],
})

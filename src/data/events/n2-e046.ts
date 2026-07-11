import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift tames a demon-possessed flying broom',
  day: 12,
  location: refs.locations.fairhaven,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' set his sights on acquiring a flying broom possessed by a demon and succeeded in taming it.',
    ],
  ],
})

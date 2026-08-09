import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party finds Cassian in the Lower Stables',
  day: 20,
  location: refs.locations.lower_stables,
  mark: { type: 'icon', name: 'gi/GiStable' },
  notes: [
    [
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' found ',
      refs.pcs.cassian_veyl,
      ' in the ship’s lowest stables after the Fiddler released him from the void sphere.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Auren accepts the Zodiac dagger',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'icon', name: 'gi/GiDaggers' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' approached the ',
      refs.items.dagger_of_the_zodiac_signs,
      ', felt the same lethal warning as ',
      refs.pcs.swift_starblade,
      ', and did not take it.',
    ],
    [
      refs.pcs.auren,
      ' picked it up, took 73 damage, and survived. The ',
      refs.items.dagger_of_the_zodiac_signs,
      ' fused into his arm rather than remaining a loose weapon.',
    ],
  ],
  illustrations: ['/assets/scenes/auren-accepts-the-zodiac-dagger.png'],
})

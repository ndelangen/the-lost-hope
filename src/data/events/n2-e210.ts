import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim disappears in the second fortress beam',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'icon', name: 'gi/GiLightningStorm' },
  notes: [
    [
      refs.pcs.jim,
      ' began an urgent warning to ',
      refs.pcs.swift_starblade,
      ', telling him to take a ship, but a second beam from the flying fortress interrupted him.',
    ],
    [
      refs.pcs.jim,
      ' disappeared and his possessions became material on the ground. The witnesses did not establish whether he had died or been taken somewhere.',
    ],
  ],
  illustrations: ['/assets/scenes/jim-disappears-in-the-second-fortress-beam.png'],
})

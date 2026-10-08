import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party chooses the anti-magic passage',
  day: 22,
  location: refs.locations.serpent_eclipse_crystal_oasis,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'After ',
      refs.events.n2_e149,
      ', the party chose the left passage, where magic weakened, rather than the right passage, which made people feel sick. They reached the ',
      refs.locations.serpent_eclipse_crystal_oasis,
      ' and found ',
      refs.npcs.sarogarth,
      ' motionless inside its floating crystal.',
    ],
    [
      refs.pcs.swift_starblade,
      ' carved his signature into the crystal with his rapier, cracking its surface. The crystal drew magic from visitors, and attempts to turn it upside down failed.',
    ],
  ],
})

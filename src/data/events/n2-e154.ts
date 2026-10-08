import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sarogarth opens a portal back to the altar',
  day: 22,
  location: refs.locations.serpent_eclipse_crystal_oasis,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'The newly freed ',
      refs.npcs.sarogarth,
      ' ate twelve rations and paid with an unfamiliar old silver coin. He then opened a doorway through a growing sapling, allowing the party, ',
      refs.npcs.dax,
      ', and ',
      refs.npcs.sylf,
      ' to return to the ',
      refs.locations.serpent_eclipse_three_door_chamber,
      '.',
    ],
    [
      'As the portal closed, ',
      refs.pcs.swift_starblade,
      ' felt ',
      refs.beasts.captain_squawk,
      " being attacked and killed by the oasis birds. Their feeding on life force was revealed through the familiar's death.",
    ],
  ],
})

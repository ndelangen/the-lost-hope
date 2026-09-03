import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The birds help the party escape the serpent',
  day: 22,
  location: refs.locations.serpent_eclipse_flooded_cavern,
  mark: { type: 'icon', name: 'gi/GiLifeBuoy' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' sent ',
      refs.beasts.captain_squawk,
      ' to carry a rope to ',
      refs.pcs.jim,
      '. The party used ropes and helping hands to pull one another toward the bank while the ',
      refs.beasts.serpent_eclipse_lake_serpent,
      ' battered them with whirlpools and jets of water.',
    ],
    [
      refs.npcs.crowy,
      " pecked at the serpent's eye and drew its attention away from ",
      refs.pcs.jim,
      ', buying him another chance to escape. The bird survived the distraction, and the party eventually got everyone out of the water.',
    ],
  ],
})

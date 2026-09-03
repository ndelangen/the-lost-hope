import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The lake serpent disrupts the crossing',
  day: 22,
  location: refs.locations.serpent_eclipse_flooded_cavern,
  mark: { type: 'icon', name: 'gi/GiFloatingPlatforms' },
  notes: [
    [
      refs.npcs.crowy,
      ' flew across the water and back while the party considered the stone platforms. Below them moved the ',
      refs.beasts.serpent_eclipse_lake_serpent,
      '.',
    ],
    [
      refs.pcs.swift_starblade,
      ' made a narrow jump with Bardic Inspiration from ',
      refs.pcs.jim,
      '. ',
      refs.pcs.cassian_veyl,
      ' used Misty Step to cross a gap, while ',
      refs.pcs.devan,
      ' used Peerless Athlete for his jumps.',
    ],
    [
      'An illusory fish created by ',
      refs.pcs.cassian_veyl,
      ' drew a lunge from the serpent. The impact shook the cavern, broke parts of the platforms, and threw adventurers into the water. Waves made climbing back out difficult.',
    ],
  ],
})

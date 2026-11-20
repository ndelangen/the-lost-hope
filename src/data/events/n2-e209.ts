import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The first fortress beam scatters across Nimbus',
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiBlast' },
  illustrations: ['/assets/scenes/the-green-beam-over-the-sky-islands.png'],
  notes: [
    [
      'The flying fortress fired a beam of light and lightning directly toward ',
      refs.pcs.jim,
      '. For a reason unknown to the witnesses, it broke apart and struck roughly ten to twenty places across ',
      refs.locations.nimbus,
      ', causing fires and damage.',
    ],
    [
      'A ',
      refs.locations.sky_bridge_ferry,
      ' carrying twelve people was struck. It fell about 3 km into the ocean and the wreckage sank. All twelve people aboard died.',
    ],
    [
      refs.npcs.crowy,
      ' was hit and fell badly injured beside ',
      refs.pcs.swift_starblade,
      '. ',
      refs.pcs.swift_starblade,
      ' saved him with first aid. ',
      refs.npcs.crowy,
      ' survived but could barely fly.',
    ],
  ],
})

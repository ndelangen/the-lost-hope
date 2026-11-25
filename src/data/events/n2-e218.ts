import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Auren explains how the Hand’s records led him to Jim',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'icon', name: 'gi/GiPathDistance' },
  notes: [
    [
      refs.pcs.auren,
      ' told the party that he had tortured a member of ',
      refs.organizations.the_eyeless_hand,
      ' and obtained documents that tracked their movements. He said those records had led him toward ',
      refs.pcs.jim,
      ' and that he needed the party’s help.',
    ],
    [
      'This was ',
      refs.pcs.auren,
      '’s account. It did not establish the tracking mechanism or prove that ',
      refs.items.robertos_map_pages,
      ' revealed their reader’s location.',
    ],
  ],
  illustrations: ['/assets/scenes/auren-explains-how-the-hand-s-records-led-him-to-jim.png'],
})

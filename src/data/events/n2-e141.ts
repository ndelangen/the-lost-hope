import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim eats a golden apple and cannot stop',
  day: 22,
  location: refs.locations.serpent_eclipse_golden_tree_chamber,
  mark: { type: 'icon', name: 'gi/GiFairyWings' },
  notes: [
    [
      'Despite warnings from the fairies near the tree, ',
      refs.pcs.jim,
      ' ate a golden apple and became compelled to eat another. The fairies warned that another apple could kill him.',
    ],
    [
      'A Mage Hand took the next apple away and returned it to the tree, where its stem reattached. That did not stop ',
      refs.pcs.jim,
      ' from reaching for more, so ',
      refs.pcs.cassian_veyl,
      ' cast Suggestion to keep him from eating the apples for up to eight hours.',
    ],
  ],
})

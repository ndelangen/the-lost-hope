import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sarogarth draws permanent blight and loses an attunement slot',
  notes: [
    [
      'The party selected three more draws for ',
      refs.npcs.sarogarth,
      ': ',
      refs.effects.sealed_attunement_slot,
      ', ',
      refs.effects.blight,
      ', and ',
      refs.effects.guardian,
      '.',
    ],
    [
      'The group discussed the danger of his ',
      refs.effects.blight,
      ' to ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      '.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiPlantsAndAnimals' },
})

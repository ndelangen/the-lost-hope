import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sarogarth draws permanent blight and loses an attunement slot',
  notes: [
    [
      'The party selected three more draws for ',
      refs.npcs.sarogarth,
      '. One closed an attunement slot, limiting him to two attuned magic items, removable only by Wish. Blight caused plants within one mile to wither and die, and animals and beasts to become hostile and attack him on sight. The DM explicitly ruled that neither Wish nor divine intervention could remove Blight.',
    ],
    [
      'Guardian granted +2 Armor Class, stacking with armour and shields, and advantage on saves against being frightened. The group discussed the danger of his new blight to ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      ', without establishing how it applied to their non-animal natures.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiPlantsAndAnimals' },
})

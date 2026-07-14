import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The cursed sword decays Verdant Haven forest',
  day: 15,
  location: refs.locations.verdant_haven_forest,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      refs.items.cursed_shadow_sword,
      ' caused decay in the surrounding forest, attracting the ',
      refs.beasts.ent_guardians,
      '.',
    ],
    [
      refs.pcs.jim,
      ' used Mage Hand to drag ',
      refs.items.cursed_shadow_sword,
      ' back toward ',
      refs.locations.verdant_haven,
      ' without touching it.',
    ],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The cursed sword breaks Verdant Haven’s ward',
  day: 15,
  location: refs.locations.verdant_haven,
  mark: { type: 'icon', name: 'gi/GiBrokenShield' },
  notes: [
    [
      'Bringing ',
      refs.items.cursed_shadow_sword,
      ' into ',
      refs.locations.verdant_haven,
      ' broke the magical ward that hid the settlement from maps. ',
      refs.pcs.jim,
      ' was repeatedly told to wrap it in cloth but did so only very late. The party restored the protective ward.',
    ],
    [
      refs.npcs.roberto,
      ' was taken to the ',
      refs.npcs.frog_medicine_man_of_verdant_haven,
      ', a pipe-smoking healer.',
    ],
    [
      'The party also sought out ',
      refs.npcs.bessy,
      ', who made a permanent sheath capable of containing ',
      refs.items.cursed_shadow_sword,
      '.',
    ],
  ],
})

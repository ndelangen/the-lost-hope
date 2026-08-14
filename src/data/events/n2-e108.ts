import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim finds the Jaded Amulet in a pie',
  day: 20,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/jim-kenku.jpg' },
  notes: [
    [
      'At ',
      refs.locations.nimbus_s_second_best_inn,
      ', ',
      refs.pcs.jim,
      ' bit into something metallic inside a slice of pumpkin pie and found the ',
      refs.items.jaded_amulet,
      ' with a note from ',
      refs.npcs.bob_the_merchant,
      ' reading “Gotcha.”',
    ],
    [
      'The staff of ',
      refs.locations.nimbus_s_second_best_inn,
      ' said ',
      refs.npcs.bob_the_merchant,
      ' had taken their cook and temporarily replaced him so he could hide the ',
      refs.items.jaded_amulet,
      ' in the pie. They described ',
      refs.npcs.bob_the_merchant,
      ' as a normal, exceptionally handsome human man with black hair rather than as a skeleton.',
    ],
  ],
})

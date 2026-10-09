import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Sarogarth corrects Devan's holy text",
  day: 23,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      'At breakfast, ',
      refs.npcs.sarogarth,
      ' summoned ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      ' from their bracelets. The party stocked the ',
      refs.items.bag_of_holding,
      ' with fruit and provisions.',
    ],
    [
      refs.npcs.sarogarth,
      ' corrected and expanded ',
      refs.pcs.devan,
      "'s book, producing ",
      refs.items.devan_s_corrected_holy_text,
      '. He added a more nuanced history and previously private family details about ',
      refs.npcs.grimgor_the_bloody,
      '.',
    ],
  ],
})

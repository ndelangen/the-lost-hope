import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Borris welcomes the party and delivers Crowy',
  day: 13,
  location: refs.locations.the_sullen_monk,
  mark: { type: 'icon', name: 'fa/FaBeer' },
  notes: [
    [
      refs.npcs.borris,
      ', a friendly old acquaintance and crime boss, welcomed the party with free rooms and drinks.',
    ],
    [
      'He also delivered a caged talking crow sent indirectly by ',
      refs.npcs.light_13th_marshal,
      '. The party debated its name and unanimously chose ',
      refs.npcs.crowy,
      '.',
    ],
  ],
})

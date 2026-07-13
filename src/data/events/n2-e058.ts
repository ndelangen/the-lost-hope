import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Fix joins the guild with her rival party under a fake tattoo',
  day: 13,
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      'Early in the morning, as everyone was getting up, ',
      refs.pcs.fix,
      ' arrived with ',
      refs.npcs.hex,
      ' and ',
      refs.npcs.sneeve,
      '. The three belonged to ',
      refs.organizations.lucky_palm,
      ', a rival adventuring party; Fix did not join ',
      refs.organizations.beasts_and_dwarf,
      '.',
    ],
    [
      'They joined the ',
      refs.organizations.adventurers_guild,
      '. For an undisclosed reason, ',
      refs.npcs.light_13th_marshal,
      ' could not give ',
      refs.pcs.fix,
      ' his usual guild-mark tattoo and fabricated one instead.',
    ],
    [
      refs.organizations.beasts_and_dwarf,
      ' did not realize the tattoo was fake and received praise for bringing more adventurers into the guild.',
    ],
  ],
})

import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Guild tattoos pass for papers at the gate',
  date: new Date('2026-08-20T10:00'),
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'fa/FaPassport' },
  parts: [
    [
      'On arrival at ',
      refs.locations.fairhaven,
      ', the gate guards demanded papers to enter the city.',
    ],
    [
      'The party had none, but their ',
      refs.organizations.adventurers_guild,
      ' tattoos were accepted as sufficient credentials, and they were let in.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_the_badesh_lumberjack,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})

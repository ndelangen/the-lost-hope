import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Consult the Fairhaven guildhall quest board',
  day: 12,
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'icon', name: 'gi/GiChecklist' },
  notes: [
    [
      'The quest board advertised jobs connected to ',
      refs.locations.giggles_and_gadgets,
      ' and ',
      refs.npcs.mr_bumblefoot,
      '; a potion-shop investigation posted by ',
      refs.npcs.giggles,
      '; a sewer problem initially described in terms of rats; the fortune teller ',
      refs.npcs.madame_esmeralda,
      '; and ',
      refs.npcs.sering_ravenwood,
      '.',
    ],
    [
      refs.npcs.hex,
      ' later said that floating heads were involved in the sewer job. The party did not take ',
      refs.npcs.madame_esmeralda,
      '’s quest; the exact sewer and ',
      refs.npcs.sering_ravenwood,
      ' jobs were never disclosed and will not be recovered.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})

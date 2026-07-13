import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Victor receives his guild tattoo and asks a favor',
  day: 12,
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      'After arriving in ',
      refs.locations.fairhaven,
      ', ',
      refs.pcs.victor_dranzig,
      ' entered a booth at ',
      refs.locations.fairhaven_guildhall,
      ' and met ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
    [
      refs.pcs.victor_dranzig,
      ' received an ',
      refs.organizations.adventurers_guild,
      ' tattoo and requested his guildmaster favor. The party does not know what he asked for.',
    ],
  ],
})

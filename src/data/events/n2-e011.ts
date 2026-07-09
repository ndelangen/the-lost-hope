import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The guild tattoo ritual',
  date: new Date('2026-08-10T10:30'),
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'hi/HiSparkles' },
  notes: [
    ['Each PC asked a favor. The ritual was performed by ', refs.npcs.third_marshal_light, '.'],
    [
      refs.pcs.jim,
      ' — asked to be left alone by his past (Light has not yet fulfilled this favor); his guild-mark was placed on his tongue, a deliberately conspicuous spot.',
    ],
    [refs.pcs.william_greenhove, ' — tattoo placed as a tramp stamp (lower back).'],
    [refs.pcs.revin_grumblefist, ' — asked for something; specifics forgotten.'],
  ],
})

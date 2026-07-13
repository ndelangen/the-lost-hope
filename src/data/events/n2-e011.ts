import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The guild tattoo ritual',
  day: 2,
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'gi/GiNeedleDrill' },
  notes: [
    ['Each PC asked a favor. The ritual was performed by ', refs.npcs.light_13th_marshal, '.'],
    [
      refs.pcs.jim,
      ' — asked to be left alone by his past (Light has not yet fulfilled this favor); his guild-mark was placed on his tongue, a deliberately conspicuous spot.',
    ],
    [refs.pcs.william_greenhove, ' — tattoo placed as a tramp stamp (lower back).'],
    [refs.pcs.revin_grumblefist, ' — asked for something; specifics forgotten.'],
  ],
})

import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The high priest removes Cassian’s curse',
  day: 21,
  location: refs.locations.gruumsh_temple_ritual_room,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' donated 50 GP for the ',
      refs.npcs.gruumsh_high_priest,
      ' to remove an unidentified curse incurred during ',
      refs.events.n2_e105,
      '. The curse improved his spell attacks by one but gave every opponent advantage when attacking him.',
    ],
    [
      'Over an hour in the ',
      refs.locations.gruumsh_temple_ritual_room,
      ', the ',
      refs.npcs.gruumsh_high_priest,
      ' repeatedly beat and healed ',
      refs.pcs.cassian_veyl,
      ' until the curse was gone.',
    ],
    [
      refs.npcs.gruumsh_high_priest,
      ' could not remove the hunger caused by the ',
      refs.items.wolfie_tracking_ring,
      ' because its effect was not a curse.',
    ],
  ],
})

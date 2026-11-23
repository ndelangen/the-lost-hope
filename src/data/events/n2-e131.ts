import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The high priest removes Cassian’s curse',
  day: 21,
  location: refs.locations.gruumsh_temple_ritual_room,
  mark: { type: 'avatar', of: refs.pcs.cassian_veyl },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' donated 50 GP for the ',
      refs.npcs.gruumsh_high_priest,
      ' to remove ',
      refs.effects.cassian_s_unidentified_curse,
      ', incurred during ',
      refs.events.n2_e105,
      '.',
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
      ', because his ',
      refs.effects.werewolf_transformation,
      ' is not a curse.',
    ],
  ],
  illustrations: ['/assets/scenes/the-high-priest-removes-cassian-s-curse.png'],
})
